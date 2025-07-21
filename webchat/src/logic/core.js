// core.js - Main orchestration and state management for MARM chatbot
import {
  activateMarmSession,
  getSessionContext,
  updateSessionHistory,
  setSessionReasoning,
  searchDocs,
  shouldAutoSearch,
  trimForContext,
  manageUserNotebook
} from '../logic/marmLogic.js';

import { generateContent } from '../geminiHelper.js';
import { appendMessage, showLoadingIndicator, hideLoadingIndicator } from './ui.js';
import { handleCommand } from './commands.js';
import { state, updateState } from './state.js';

/**
 * Response formatting instructions for consistent output
 */
const RESPONSE_FORMATTING_INSTRUCTIONS = `
### Response Formatting Rules

**1. Prioritize Brevity and Clarity:**
- Paragraphs must be short (2-3 sentences max).
- Start a new paragraph for each distinct idea.
- Responses should feel crisp, professional, and focused.

**2. Use Basic Markdown for Readability:**
- Use bullet points (-) for lists.
- Use bold (**) to highlight key terms or commands.
- Do not use headers (#), blockquotes (>), or tables.

**3. Maintain a Professional, Conversational Tone:**
- Write like explaining to a colleague.
- If reasoning is required, naturally say: "Here's my reasoning…" but **keep it brief**.

**4. Always Follow These Formatting Rules:**
- Even in longer sessions, formatting standards remain active.
`;

/**
 * Main function to handle user input and generate responses
 * @param {string} userInput - The user's input text
 */
export async function handleUserInput(userInput) {
  if (typeof userInput !== 'string' || userInput.length === 0) return;
  if (userInput.length > 1000) {
    appendMessage('bot', 'Input too long. Please limit to 1000 characters.');
    return;
  }
  
  appendMessage('user', userInput);
  showLoadingIndicator();
  
  try {
    if (userInput.startsWith('/')) {
      await handleCommand(userInput);
    } else {
      await handleStandardMessage(userInput);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    hideLoadingIndicator();
    appendMessage('bot', 'Sorry, I encountered an error. Please try again.');
  }
}

/**
 * Handle standard (non-command) user messages
 * @param {string} userInput - The user's input text
 */
async function handleStandardMessage(userInput) {
  const messagesForLLM = [];
  
  if (state.isMarmActive) {
    trimForContext(state.currentSessionId);
    const hist = getSessionContext(state.currentSessionId);
    if (hist && hist.trim()) {
      messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
    }
    
    const notebookData = manageUserNotebook(state.currentSessionId, 'all');
    if (notebookData && !notebookData.includes('empty')) {
      messagesForLLM.push({ 
        role: 'system', 
        content: `Current Notebook Contents:\n${notebookData}` 
      });
    }
  }

  if (shouldAutoSearch(userInput)) {
    const docResult = searchDocs(userInput);
    if (docResult) {
      messagesForLLM.push({ role: 'system', content: `From MARM documentation: ${docResult}` });
    }
  }

  messagesForLLM.push({ role: 'user', content: userInput });

  // Add response formatting instructions to ensure consistent output
  messagesForLLM.push({ 
    role: 'system', 
    content: RESPONSE_FORMATTING_INSTRUCTIONS 
  });

  const geminiResponse = await generateContent(messagesForLLM);
  const botAnswer = await geminiResponse.text();
  const botResponse = botAnswer.trim();

  if (state.isMarmActive) {
    setSessionReasoning(state.currentSessionId, '');
  }
  
  hideLoadingIndicator();
  appendMessage('bot', botResponse);
  
  if (state.isMarmActive && state.currentSessionId) {
    updateSessionHistory(state.currentSessionId, userInput, botResponse);
  }
} 
