// src/chatbot.js front-desk layer (auto-MARM, 2025-06-25-final)
//
// MARM auto-activates on page-load
//
// no /start command needed
// All /start-related text removed or updated (7 occurrences)
// Rest of logic untouched as requested
//
import {
  activateMarmSession,
  logSession,
  compileSessionSummary,
  manageUserNotebook,
  getSessionContext,
  updateSessionHistory,
  getMostRecentBotResponseLogic,
  trimForContext
} from './marmLogic.js';

import { performGoogleSearch, queryNeedsExternalKnowledge } from './search.js';
import { generateContent } from './geminiHelper.js';

let isMarmActive = false;
let currentSessionId = null;
let lastBotResponseReasoning = "";

async function handleUserInput(userInput) {
  appendMessage('user', userInput);
  let botResponse = "";
  let suppressLLMCall = false;

  if (userInput.startsWith('/')) {
    const [command, ...rest] = userInput.split(' ');
    const args = rest.join(' ').trim();
    switch (command) {
      
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
      
      case '/contextual':
        appendMessage('bot', 'Contextual mode not implemented yet.');
        suppressLLMCall = true;
        break;
      
      case '/show':
        botResponse =
          args === 'reasoning' && isMarmActive
            ? lastBotResponseReasoning || 'No reasoning trail available.'
            : 'Use /show reasoning';
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;
      case '/compile': {
        botResponse = isMarmActive
          ? await compileSessionSummary(currentSessionId)
          : 'MARM not active (unexpected).';
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;
      }
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
          botResponse = 'Usage /notebook add key:value | /notebook get key | /notebook all';
        }
        appendMessage('bot', botResponse);
        suppressLLMCall = true;
        break;
      }

      default: 
        appendMessage('bot', 'Unknown command.');
        suppressLLMCall = true;
        break;
    }
  }

  if (!suppressLLMCall) {
  const geminiResponse = await generateContent(messagesForLLM);
  const botAnswer = await geminiResponse.text();
  botResponse = botAnswer.trim();

  appendMessage('bot', botResponse);
  if (isMarmActive && currentSessionId) {
    updateSessionHistory(currentSessionId, userInput, botResponse);
  }
}

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

    if (queryNeedsExternalKnowledge(userInput)) {
      const searchResults = await performGoogleSearch(userInput);
      if (searchResults) {
        messagesForLLM.push({ role: 'system', content: `Relevant information: ${searchResults}` });
      }
    }

    messagesForLLM.push({ role: 'user', content: userInput });

     const geminiResponse = await generateContent(messagesForLLM);  
     const botAnswer = await geminiResponse.text();  
       botResponse = botAnswer.trim();  


    
    if (isMarmActive && currentSessionId) updateSessionHistory(currentSessionId, userInput, botResponse);
  }
  handleUIResponse(botResponse);
}

function appendMessage(sender, text) {
  /* existing code */
}

document.getElementById('chat-form')?.addEventListener('submit', e => {
  /* existing code */
});

document.getElementById('token-counter-btn')?.addEventListener('click', () => {
  window.open('https://quizgecko.com/tools/token-counter', '_blank');
});

document.addEventListener('DOMContentLoaded', () => {
  const lastId = localStorage.getItem('marm-last-session');
  if (lastId) {
    currentSessionId = lastId;
    isMarmActive = true;
    appendMessage('bot', 'Previous session detected. Continue chatting or type /reset to start fresh.');
  } else {
      currentSessionId = Date.now().toString(36);
    localStorage.setItem('marm-last-session', currentSessionId);
    isMarmActive = true;
    appendMessage('bot', activateMarmSession());
    appendMessage('bot', 'Welcome! MARM activated. Ready to log context and a brief two-line summary of what MARM is and why it’s useful');
  }
});
window.handleUserMessage = handleUserInput;
