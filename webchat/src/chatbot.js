// src/chatbot.js front-desk layer 
//
// MARM auto-activates on page-load
//
import {
  activateMarmSession,
  logSession,
  compileSessionSummary,
  manageUserNotebook,
  getSessionContext,
  updateSessionHistory,
  getMostRecentBotResponseLogic,
  trimForContext,
  setSessionReasoning,
  searchDocs,
  shouldAutoSearch,
  resetSession
} from './marmLogic.js';

import { generateContent } from './geminiHelper.js';

let isMarmActive = false;
let currentSessionId = null;

async function handleUserInput(userInput) {
  appendMessage('user', userInput);
  let botResponse = "";

  try {
    if (userInput.startsWith('/')) {
      const [command, ...rest] = userInput.split(' ');
      const args = rest.join(' ').trim();
      switch (command) {
        
        // FIX #4: Added /reset command
        case '/reset': {
          if (!isMarmActive) {
            botResponse = 'MARM not active (unexpected).';
          } else {
            resetSession(currentSessionId);
            currentSessionId = Date.now().toString(36);
            localStorage.setItem('marm-last-session', currentSessionId);
            await activateMarmSession(currentSessionId);
            botResponse = 'Session reset. Starting fresh with MARM activated.';
          }
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/log': {
          if (!isMarmActive) {
            botResponse = 'MARM not active (unexpected).';
          } else if (!args) {
            botResponse = 'Provide entry: /log YYYY-MM-DD|user|intent|outcome';
          } else {
            const valid = /^\d{4}-\d{2}-\d{2}\|[^|]+\|[^|]+\|[^|]+$/.test(args);
            botResponse = valid
              ? logSession(currentSessionId, args)
              : 'Invalid format. Use: /log YYYY-MM-DD|user|intent|outcome';
          }
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/contextual': {
          if (!isMarmActive) {
            appendMessage('bot', 'MARM not active (unexpected).');
            return;
          }

          const messagesForLLM = [];
          
          const hist = getSessionContext(currentSessionId);
          if (hist && hist.trim()) {
            messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
          }
          
          messagesForLLM.push({
            role: 'system',
            content: 'Provide your response. Then, on a new line, add a "REASONING:" section explaining your logic.'
          });
          
          messagesForLLM.push({ role: 'user', content: args || 'Please provide a contextual response' });
          
          const geminiResponse = await generateContent(messagesForLLM);
          const botAnswer = await geminiResponse.text();
          
          const reasoningMatch = botAnswer.match(/REASONING:\s*(.*)/is);
          
          if (reasoningMatch) {
            botResponse = botAnswer.substring(0, reasoningMatch.index).trim();
            setSessionReasoning(currentSessionId, reasoningMatch[1].trim());
          } else {
            botResponse = botAnswer;
            setSessionReasoning(currentSessionId, 'Contextual response provided, but no explicit reasoning section found.');
          }
          
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/show':
          botResponse =
            args === 'reasoning' && isMarmActive
              ? getMostRecentBotResponseLogic(currentSessionId) || 'No reasoning trail available.'
              : 'Use /show reasoning';
          appendMessage('bot', botResponse);
          return;
          
        case '/compile': {
          botResponse = isMarmActive
            ? await compileSessionSummary(currentSessionId)
            : 'MARM not active (unexpected).';
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/notebook': {
          if (!isMarmActive) {
            appendMessage('bot', 'MARM not active (unexpected).');
            return;
          }
          const [action, ...restArr] = args.split(' ');
          const restArg = restArr.join(' ');
          if (action === 'add' && restArg.includes(':')) {
            const [key, ...valParts] = restArg.split(':');
            botResponse = manageUserNotebook(
              currentSessionId, 'add', key.trim(), valParts.join(':').trim()
            );
          } else if (action === 'get') {
            botResponse = manageUserNotebook(currentSessionId, 'get', restArg.trim());
          } else if (action === 'all') {
            botResponse = manageUserNotebook(currentSessionId, 'all');
          } else {
            botResponse = 'Usage /notebook add key:value | /notebook get key | /notebook all';
          }
          appendMessage('bot', botResponse);
          return;
        }

        default: 
          appendMessage('bot', 'Unknown command.');
          return;
      }
    }

    // Standard LLM call for non-command inputs
    const messagesForLLM = [];
    
    if (isMarmActive && currentSessionId) {
      trimForContext(currentSessionId);
      const hist = getSessionContext(currentSessionId);
      if (hist && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
    }

    // Check local MARM documentation
    if (shouldAutoSearch(userInput)) {
      const docResult = searchDocs(userInput);
      if (docResult) {
        messagesForLLM.push({ role: 'system', content: `From MARM documentation: ${docResult}` });
      }
    }

    messagesForLLM.push({ role: 'user', content: userInput });

    const geminiResponse = await generateContent(messagesForLLM);
    const botAnswer = await geminiResponse.text();
    botResponse = botAnswer.trim();

    // Clear reasoning for standard responses
    setSessionReasoning(currentSessionId, '');
    
    appendMessage('bot', botResponse);
    
    if (isMarmActive && currentSessionId) {
      updateSessionHistory(currentSessionId, userInput, botResponse);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    appendMessage('bot', 'Sorry, I encountered an error. Please try again.');
  }
}

// Placeholder for the actual implementation
function appendMessage(sender, text) {
  // Your existing appendMessage code goes here
const chatMessages = document.getElementById('chat-log');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('chat-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('user-input');
  const userMessage = input.value.trim();
  if (userMessage) {
    handleUserInput(userMessage);
    input.value = '';
  }
});

document.getElementById('token-counter-btn')?.addEventListener('click', () => {
  window.open('https://quizgecko.com/tools/token-counter', '_blank');
});

document.addEventListener('DOMContentLoaded', () => {
  try {
    const lastId = localStorage.getItem('marm-last-session');
    if (lastId) {
      currentSessionId = lastId;
      isMarmActive = true;
      appendMessage('bot', 'Previous session detected. Continue chatting or type /reset to start fresh.');
    } else {
      currentSessionId = Date.now().toString(36);
      localStorage.setItem('marm-last-session', currentSessionId);
      isMarmActive = true;
      activateMarmSession(currentSessionId).then(() => {
        appendMessage('bot', 'MARM activated. Ready to log context.');
        appendMessage('bot', 'MARM helps maintain conversation memory and provides accurate, transparent responses with reasoning trails.');
        appendMessage('bot', `Quick commands:
/log [name] – Save session notes
/contextual reply – Get responses with reasoning
/show reasoning – See reasoning trail
/compile [name] – Session summary
/notebook – Store custom info
/reset – Start fresh session`);
      });
    }
  } catch (error) {
    console.error('Error initializing session:', error);
    appendMessage('bot', 'Error initializing session. Please refresh the page.');
  }
});

window.handleUserMessage = handleUserInput;
