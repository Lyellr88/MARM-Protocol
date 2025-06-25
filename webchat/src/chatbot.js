// src/chatbot.js — front‑desk layer (auto‑MARM, 2025‑06‑25‑final)
// -----------------------------------------------------------
//  • MARM auto‑activates on page‑load — no /start command needed
//  • All /start‑related text removed or updated (7 occurrences)
//  • Rest of logic untouched as requested
// -----------------------------------------------------------

import {
  activateMarmSession,
  logSession,
  compileSessionSummary,
  manageUserNotebook,
  getSessionContext,
  updateSessionHistory,
  getMostRecentBotResponseLogic,
  trimForContext,
  composeMarmWelcome
} from './marmLogic.js';

import { performGoogleSearch, queryNeedsExternalKnowledge } from './search.js';
import { OPENAI_API_KEY } from './config.js';
import { handleUIResponse } from './ui.js';

let isMarmActive = false;
let currentSessionId = null;
let lastBotResponseReasoning = '';

// -----------------------------------------------------------
// MAIN INPUT HANDLER
// -----------------------------------------------------------
async function handleUserInput(userInput) {
  appendMessage('user', userInput);
  let botResponse     = '';
  let suppressLLMCall = false;

  // --------------- SLASH‑COMMAND PARSER --------------------
  if (userInput.startsWith('/')) {
    const [command, ...rest] = userInput.split(' ');
    const args = rest.join(' ').trim();

    switch (command) {
      // ------------------------------------------------------
      // *No /start branch — MARM auto‑activates*
      // ------------------------------------------------------

      // ----------------------- /log ------------------------
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
        suppressLLMCall = true;
        break;
      }

      // -------------------- /contextual --------------------
      case '/contextual':
        appendMessage('bot', 'Contextual mode not implemented yet.');
        suppressLLMCall = true;
        break;

      // ----------------------- /show -----------------------
      case '/show':
        botResponse =
          args === 'reasoning' && isMarmActive
            ? lastBotResponseReasoning || 'No reasoning trail available.'
            : 'Use /show reasoning';
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;

      // --------------------- /compile ----------------------
      case '/compile': {
        botResponse = isMarmActive
          ? await compileSessionSummary(currentSessionId)
          : 'MARM not active (unexpected).';
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;
      }

      // -------------------- /notebook ----------------------
      case '/notebook': {
        if (!isMarmActive) {
          appendMessage('bot', 'MARM not active (unexpected).');
          suppressLLMCall = true;
          break;
        }
        const [action, ...restArr] = args.split(' ');
        const restArg = restArr.join(' ');
        if (action === 'add' && restArg.includes(':')) {
          const [key, ...valParts] = restArg.split(':');
          botResponse = manageUserNotebook(
            currentSessionId,
            'add',
            key.trim(),
            valParts.join(':').trim()
          );
        } else if (action === 'get') {
          botResponse = manageUserNotebook(currentSessionId, 'get', restArg.trim());
        } else if (action === 'all') {
          botResponse = manageUserNotebook(currentSessionId, 'all');
        } else {
          botResponse = 'Usage → /notebook add key:value | /notebook get key | /notebook all';
        }
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;
      }

      // -------------------- UNKNOWN CMD --------------------
      default:
        appendMessage('bot', 'Unknown command.');
        suppressLLMCall = true;
    }
  }

  // -------------------- REGULAR CHAT ----------------------
  if (!suppressLLMCall) {
    const messagesForLLM = [
      {
        role: 'system',
        content:
          'You are MARM, an AI for accurate, transparent, context‑aware answers.\n' +
          'If context is missing say: "I don’t have that context, can you restate?"\n' +
          'Return as: RESPONSE::[answer]||LOGIC::[reasoning]'
      }
    ];

    // trimmed history
    if (isMarmActive && currentSessionId) {
      trimForContext(currentSessionId);
      const hist = getSessionContext(currentSessionId);
      if (Array.isArray(hist) && hist.length) {
        messagesForLLM.push({
          role: 'system',
          content: 'Current Session History:\n' + hist.map(e => `${e.role}: ${e.content}`).join('\n')
        });
      } else if (typeof hist === 'string' && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
    }

    // external search
    if (queryNeedsExternalKnowledge(userInput)) {
      const searchResults = await performGoogleSearch(userInput);
      if (searchResults) {
        messagesForLLM.push({ role: 'system', content: `Relevant information: ${searchResults}` });
      }
    }

    messagesForLLM.push({ role: 'user', content: userInput });

    const llmResponse        = await fetchOpenAIResponse(messagesForLLM);
    const [resp, reason]     = llmResponse.split('||LOGIC::');
    const botAnswer          = (resp || '').replace('RESPONSE::', '').trim();
    botResponse              = botAnswer;
    lastBotResponseReasoning = reason ? reason.trim() : '';
  }

  appendMessage('bot', botResponse);
  if (isMarmActive && currentSessionId) updateSessionHistory(currentSessionId, userInput, botResponse);
  handleUIResponse(botResponse);
}

// ---------------- RAW OPENAI FETCH (unchanged) -----------
async function fetchOpenAIResponse(messages) { /* existing code */ }

// ------------------------- DOM ---------------------------
function appendMessage(sender, text) { /* existing code */ }

// --------------------- LISTENERS -------------------------
// chat form
document.getElementById('chat-form')?.addEventListener('submit', e => { /* existing code */ });
// token counter
document.getElementById('token-counter-btn')?.addEventListener('click', () => {
  window.open('https://quizgecko.com/tools/token-counter', '_blank');
});

// -------------------- AUTO‑MARM INIT ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const lastId = localStorage.getItem('marm-last-session');

  if (lastId) {
    currentSessionId = lastId;
    isMarmActive     = true;
    appendMessage('bot', 'Previous session detected. Continue chatting or type /reset to start fresh.');
  } else {
    currentSessionId = Date.now().toString(36);
    localStorage.setItem('marm-last-session', currentSessionId);
    isMarmActive = true;
    appendMessage('bot', activateMarmSession());
    appendMessage('bot', composeMarmWelcome());
  }
});
