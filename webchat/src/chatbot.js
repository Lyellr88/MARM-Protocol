// src/chatbot.js

import {
    activateMarmSession,
    logSession,
    compileSessionSummary,
    manageUserNotebook,
    getSessionContext,
    updateSessionHistory,
    getMostRecentBotResponseLogic
} from './marmLogic.js';

import { performGoogleSearch, queryNeedsExternalKnowledge } from './search.js';
import { OPENAI_API_KEY } from './config.js';
import { handleUIResponse } from './ui.js';

let isMarmActive = false;
let currentSessionId = null;
let currentSessionHistory = [];
let lastBotResponseReasoning = "";

async function handleUserInput(userInput) {
    appendMessage('user', userInput);

    let botResponse = '';
    let suppressLLMCall = false;

    if (userInput.startsWith('/')) {
        const commandParts = userInput.split(' ');
        const command = commandParts[0];
        const args = commandParts.slice(1).join(' ').trim();

        switch (command) {
            case '/start':
                if (args === 'marm') {
                    isMarmActive = true;
                    currentSessionId = 'default_session';
                    botResponse = activateMarmSession();
                    appendMessage('bot', botResponse);
                    appendMessage('bot', `MARM activated. Ready to log context.\n\nMARM is a memory and accuracy system ensuring clear, transparent AI outputs by managing context and enabling user-defined knowledge. \n\nQuick Start Command List:\n/start marm – Turn on memory + accuracy\n/log [name] – Save session notes\n/contextual reply – Safer, logic-based answers\n/show reasoning – See how it responded\n/compile [name] --summary – Get a session recap\n/notebook – Store custom info for focused replies\n\nDo not include extended explanations. For full usage and examples, see HANDBOOK.md.`);
                } else {
                    botResponse = "Invalid /start command. Use /start marm.";
                    appendMessage('bot', botResponse);
                }
                suppressLLMCall = true;
                break;

            case '/log':
                if (isMarmActive && args) {
                    botResponse = `Session logging initiated for: "${args}". (Logic for schema enforcement/errors needed here)`;
                } else {
                    botResponse = "MARM not active or missing session name. Use /start marm and provide a name (e.g., /log Project Alpha).";
                }
                appendMessage('bot', botResponse);
                suppressLLMCall = true;
                break;

            case '/contextual':
                if (isMarmActive && args === 'reply') {
                    // Future logic hook
                } else {
                    botResponse = "Invalid /contextual command. Use /contextual reply.";
                    appendMessage('bot', botResponse);
                    suppressLLMCall = true;
                }
                break;

            case '/show':
                if (isMarmActive && args === 'reasoning') {
                    botResponse = lastBotResponseReasoning || "No reasoning trail available for the last response.";
                } else {
                    botResponse = "Invalid /show command. Use /show reasoning.";
                }
                appendMessage('bot', botResponse);
                suppressLLMCall = true;
                break;

            case '/compile':
                if (isMarmActive && args) {
                    botResponse = `Compiling summary for: "${args}". (Logic for summary generation needed here)`;
                } else {
                    botResponse = "MARM not active or missing session name for compilation. Use /start marm and provide a name (e.g., /compile Project Alpha --summary).";
                }
                appendMessage('bot', botResponse);
                suppressLLMCall = true;
                break;

            case '/notebook':
                if (isMarmActive) {
                    botResponse = "Initiating interaction with your personal knowledge library. What would you like to store or retrieve?";
                } else {
                    botResponse = "MARM not active. Use /start marm to enable the notebook feature.";
                }
                appendMessage('bot', botResponse);
                suppressLLMCall = true;
                break;

            default:
                botResponse = "Unknown command. Please refer to the Quick Start Command List.";
                appendMessage('bot', botResponse);
                suppressLLMCall = true;
        }
    }

    if (!suppressLLMCall) {
        let messagesForLLM = [];

        // Core MARM system prompt with structure hint
        messagesForLLM.push({
            role: 'system',
            content: `You are MARM, an AI designed for accurate, transparent, and context-aware responses.
                      Always prioritize factual accuracy and align with provided session context.
                      If you lack context, state it clearly: "I don’t have that context, can you restate?".
                      When providing a response, structure it as:
                      RESPONSE::[your answer]||LOGIC::[your reasoning for this answer].`
        });

        // Inject session history if active
        if (isMarmActive && currentSessionId) {
            const sessionContext = getSessionContext(currentSessionId);
            if (sessionContext) {
                messagesForLLM.push({ role: 'system', content: `Current Session History: ${sessionContext}` });
            }
        }

        // Inject external info if search is needed
        if (queryNeedsExternalKnowledge(userInput)) {
            const searchResults = await performGoogleSearch(userInput);
            if (searchResults) {
                messagesForLLM.push({
                    role: 'system',
                    content: `Relevant external information: ${searchResults}. Use this to inform your response.`
                });
            }
        }

        // Add user input
        messagesForLLM.push({ role: 'user', content: userInput });

        // Call LLM
        const llmResponse = await fetchOpenAIResponse(messagesForLLM);

        // Split into response + reasoning
        const parts = llmResponse.split('||LOGIC::');
        botResponse = parts[0].replace('RESPONSE::', '').trim();
        lastBotResponseReasoning = parts[1] ? parts[1].trim() : "No explicit reasoning provided.";
    }

    appendMessage('bot', botResponse);

    // Update session history
    if (isMarmActive && currentSessionId) {
        updateSessionHistory(currentSessionId, userInput, botResponse);
    }

    handleUIResponse(botResponse);
}

async function fetchOpenAIResponse(messages) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const body = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7
    };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('OpenAI API error:', errorData);
            return `[Error from AI: ${errorData.error?.message || 'Unknown error'}]`;
        }

        const data = await res.json();
        const llmContent = data.choices?.[0]?.message?.content || '[Error: No response from AI]';
        return llmContent;

    } catch (error) {
        console.error('Network or parsing error:', error);
        return '[Error: Could not connect to AI service.]';
    }
}

function appendMessage(sender, text) {
    const chatLog = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = sender;
    div.innerHTML = `${sender === 'user' ? 'You' : 'MARM'}: ${text}`;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userInput = input.value.trim();
    if (userInput) {
        handleUserInput(userInput);
        input.value = '';
    }
});

// Reentry scanner on load
async function initializeChatbot() {
    // Example placeholder
    // const lastSession = await getMostRecentArchivedSession();
    // if (lastSession) {
    //     appendMessage('bot', `Last time, we were in Session "${lastSession.name}". Resume, archive, or start fresh?`);
    // } else if (!isMarmActive) {
    appendMessage('bot', "Welcome! To activate memory and accuracy features, type /start marm.");
    // }
}

document.addEventListener('DOMContentLoaded', initializeChatbot);
