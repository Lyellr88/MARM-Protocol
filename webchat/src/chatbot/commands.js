// commands.js - Command handling and specific command logic for MARM chatbot
import {
  activateMarmSession,
  logSession,
  compileSessionSummary,
  manageUserNotebook,
  getSessionContext,
  updateSessionHistory,
  getMostRecentBotResponseLogic,
  setSessionReasoning,
  trimForContext
} from '../logic/marmLogic.js';

import { generateContent } from '../geminiHelper.js';
import { appendMessage, hideLoadingIndicator } from './ui.js';
import { state, updateState } from './state.js';

// ===== MAIN COMMAND HANDLER =====
export async function handleCommand(userInput) {
  const [command, ...rest] = userInput.split(' ');
  const args = rest.join(' ').trim();
  
  switch (command) {
    case '/start':
      await handleStartCommand(args);
      break;
    case '/refresh':
      await handleRefreshCommand(args);
      break;
    case '/log':
      await handleLogCommand(args);
      break;
    case '/contextual':
      await handleContextualCommand(args);
      break;
    case '/show':
      await handleShowCommand(args);
      break;
    case '/compile':
      await handleCompileCommand(args);
      break;
    case '/notebook':
      await handleNotebookCommand(args);
      break;
    default:
      hideLoadingIndicator();
      appendMessage('bot', 'Unknown command. Use /start marm to begin.');
  }
}

// ===== START COMMAND =====
async function handleStartCommand(args) {
  if (args === 'marm') {
    updateState({
      isMarmActive: true,
      currentSessionId: Date.now().toString(36)
    });
    await activateMarmSession(state.currentSessionId);
    
    const messagesForLLM = [];
    messagesForLLM.push({ 
      role: 'system', 
      content: 'You are MARM Bot. The user just activated Memory Accurate Response Mode v1.4 (MARM) Acknowledge activation with: 1) Confirm "MARM activated. Ready to log context." 2) Brief 2-line explanation of what MARM is and why useful.' 
    });
    messagesForLLM.push({ role: 'user', content: '/start marm' });
    
    const geminiResponse = await generateContent(messagesForLLM);
    const botResponse = await geminiResponse.text();
    
    updateSessionHistory(state.currentSessionId, '/start marm', botResponse);
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
  } else {
    hideLoadingIndicator();
    appendMessage('bot', 'Usage: /start marm');
  }
}

// ===== REFRESH COMMAND =====
async function handleRefreshCommand(args) {
  if (args === 'marm' && state.isMarmActive) {
    trimForContext(state.currentSessionId);
    
    const messagesForLLM = [];
    const hist = getSessionContext(state.currentSessionId);
    if (hist && hist.trim()) {
      messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
    }
    messagesForLLM.push({ 
      role: 'system', 
      content: 'The user just refreshed MARM. Acknowledge that session state has been updated and protocol reaffirmed. Keep response brief.' 
    });
    messagesForLLM.push({ role: 'user', content: '/refresh marm' });
    
    const geminiResponse = await generateContent(messagesForLLM);
    const botResponse = await geminiResponse.text();
    
    updateSessionHistory(state.currentSessionId, '/refresh marm', botResponse);
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
  } else {
    const botResponse = state.isMarmActive ? 'Usage: /refresh marm' : 'MARM not active. Use /start marm first.';
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
  }
}

// ===== LOG COMMAND =====
async function handleLogCommand(args) {
  if (!state.isMarmActive) {
    hideLoadingIndicator();
    appendMessage('bot', 'MARM not active. Use /start marm first.');
    return;
  }
  
  if (!args) {
    hideLoadingIndicator();
    appendMessage('bot', 'Usage: /log session:Name or /log entry [Date-Summary-Result]');
    return;
  }
  
  if (args.startsWith('session:')) {
    const sessionName = args.substring(8).trim();
    if (sessionName) {
      updateState({ currentSessionId: sessionName });
      
      const messagesForLLM = [];
      const hist = getSessionContext(state.currentSessionId);
      if (hist && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
      messagesForLLM.push({ 
        role: 'system', 
        content: `The user just named this session "${sessionName}". Acknowledge this briefly and suggest what they might log next.` 
      });
      messagesForLLM.push({ role: 'user', content: `/log session:${sessionName}` });
      
      const geminiResponse = await generateContent(messagesForLLM);
      const botResponse = await geminiResponse.text();
      
      updateSessionHistory(state.currentSessionId, `/log session:${sessionName}`, botResponse);
      hideLoadingIndicator();
      appendMessage('bot', botResponse);
    } else {
      hideLoadingIndicator();
      appendMessage('bot', 'Usage: /log session:Name');
    }
  } else if (args.startsWith('entry')) {
    const entryData = args.substring(5).trim();
    if (entryData) {
      logSession(state.currentSessionId, entryData);
      
      const messagesForLLM = [];
      const hist = getSessionContext(state.currentSessionId);
      if (hist && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
      messagesForLLM.push({ 
        role: 'system', 
        content: `The user just logged: "${entryData}". Acknowledge this log entry briefly and show you understand its context.` 
      });
      messagesForLLM.push({ role: 'user', content: `/log entry ${entryData}` });
      
      const geminiResponse = await generateContent(messagesForLLM);
      const botResponse = await geminiResponse.text();
      
      updateSessionHistory(state.currentSessionId, `/log entry ${entryData}`, botResponse);
      hideLoadingIndicator();
      appendMessage('bot', botResponse);
    } else {
      hideLoadingIndicator();
      appendMessage('bot', 'Usage: /log entry [Date-Summary-Result]');
    }
  } else {
    hideLoadingIndicator();
    appendMessage('bot', 'Usage: /log session:Name or /log entry [Date-Summary-Result]');
  }
}

// ===== CONTEXTUAL COMMAND =====
async function handleContextualCommand(args) {
  if (!state.isMarmActive) {
    hideLoadingIndicator();
    appendMessage('bot', 'MARM not active. Use /start marm first.');
    return;
  }

  const messagesForLLM = [];
  
  const hist = getSessionContext(state.currentSessionId);
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
  
  let botResponse;
  if (reasoningMatch) {
    botResponse = botAnswer.substring(0, reasoningMatch.index).trim();
    setSessionReasoning(state.currentSessionId, reasoningMatch[1].trim());
  } else {
    botResponse = botAnswer;
    setSessionReasoning(state.currentSessionId, 'Contextual response provided, but no explicit reasoning section found.');
  }
  
  hideLoadingIndicator();
  appendMessage('bot', botResponse);
}

// ===== SHOW COMMAND =====
async function handleShowCommand(args) {
  const botResponse = args === 'reasoning' && state.isMarmActive
    ? getMostRecentBotResponseLogic(state.currentSessionId) || 'No reasoning trail available.'
    : 'Use /show reasoning';
  hideLoadingIndicator();
  appendMessage('bot', botResponse);
}

// ===== COMPILE COMMAND =====
async function handleCompileCommand(args) {
  if (!state.isMarmActive) {
    hideLoadingIndicator();
    appendMessage('bot', 'MARM not active. Use /start marm first.');
    return;
  }
  
  const compileArgs = args.split('--');
  const sessionName = compileArgs[0].trim() || state.currentSessionId;
  const hasSummary = args.includes('--summary');
  const fieldsMatch = args.match(/--fields=([^\s]+)/);
  
  let botResponse;
  if (fieldsMatch) {
    const fields = fieldsMatch[1].split(',').map(f => f.trim());
    botResponse = await compileSessionSummary(sessionName, { fields });
  } else {
    botResponse = await compileSessionSummary(sessionName);
  }
  
  if (hasSummary) {
    botResponse = `Summary for ${sessionName}:\n${botResponse}`;
  }
  
  hideLoadingIndicator();
  appendMessage('bot', botResponse);
}

// ===== NOTEBOOK COMMAND =====
async function handleNotebookCommand(args) {
  if (!state.isMarmActive) {
    hideLoadingIndicator();
    appendMessage('bot', 'MARM not active. Use /start marm first.');
    return;
  }
  
  if (args.startsWith('key:')) {
    const keyData = args.substring(4);
    const colonIndex = keyData.indexOf(' ');
    if (colonIndex > 0) {
      const key = keyData.substring(0, colonIndex).trim();
      const value = keyData.substring(colonIndex + 1).trim();
      
      manageUserNotebook(state.currentSessionId, 'add', key, value);
      
      const messagesForLLM = [];
      const hist = getSessionContext(state.currentSessionId);
      if (hist && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
      
      const notebookData = manageUserNotebook(state.currentSessionId, 'all');
      messagesForLLM.push({ 
        role: 'system', 
        content: `Current Notebook Contents:\n${notebookData}\n\nThe user just stored "${key}" = "${value}" in the notebook. Acknowledge this and show you understand what was stored.` 
      });
      messagesForLLM.push({ role: 'user', content: `/notebook key:${key} ${value}` });
      
      const geminiResponse = await generateContent(messagesForLLM);
      const botResponse = await geminiResponse.text();
      
      updateSessionHistory(state.currentSessionId, `/notebook key:${key} ${value}`, botResponse);
      hideLoadingIndicator();
      appendMessage('bot', botResponse);
    } else {
      hideLoadingIndicator();
      appendMessage('bot', 'Usage: /notebook key:name your data here');
    }
  } else if (args.startsWith('get:')) {
    const key = args.substring(4).trim();
    const storedValue = manageUserNotebook(state.currentSessionId, 'get', key);
    
    const messagesForLLM = [];
    const hist = getSessionContext(state.currentSessionId);
    if (hist && hist.trim()) {
      messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
    }
    
    const notebookData = manageUserNotebook(state.currentSessionId, 'all');
    messagesForLLM.push({ 
      role: 'system', 
      content: `Current Notebook Contents:\n${notebookData}\n\nThe user requested notebook entry "${key}". Result: ${storedValue}. Provide this information naturally.` 
    });
    messagesForLLM.push({ role: 'user', content: `/notebook get:${key}` });
    
    const geminiResponse = await generateContent(messagesForLLM);
    const botResponse = await geminiResponse.text();
    
    updateSessionHistory(state.currentSessionId, `/notebook get:${key}`, botResponse);
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
  } else if (args === 'show:' || args === 'show') {
    const allEntries = manageUserNotebook(state.currentSessionId, 'all');
    
    const messagesForLLM = [];
    const hist = getSessionContext(state.currentSessionId);
    if (hist && hist.trim()) {
      messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
    }
    messagesForLLM.push({ 
      role: 'system', 
      content: `The user wants to see all notebook entries. Here's what's stored:\n${allEntries}\n\nPresent this information clearly.` 
    });
    messagesForLLM.push({ role: 'user', content: '/notebook show:' });
    
    const geminiResponse = await generateContent(messagesForLLM);
    const botResponse = await geminiResponse.text();
    
    updateSessionHistory(state.currentSessionId, '/notebook show:', botResponse);
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
  } else {
    hideLoadingIndicator();
    appendMessage('bot', 'Usage: /notebook key:name data | /notebook get:name | /notebook show:');
  }
} 
