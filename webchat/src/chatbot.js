// src/chatbot.js front-desk layer 
//
// MARM v1.4 - Manual activation required
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

// Loading indicator functions
function showLoadingIndicator() {
  const chatMessages = document.getElementById('chat-log');
  
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading-indicator';
  loadingDiv.id = 'loading-indicator';
  
  loadingDiv.innerHTML = `
    <div class="message-name">MARM bot</div>
    <div class="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideLoadingIndicator() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// Updated appendMessage function with name tags
function appendMessage(sender, text) {
  const chatMessages = document.getElementById('chat-log');
  
  // Create message container
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  // Add name tag
  const nameTag = document.createElement('div');
  nameTag.className = 'message-name';
  nameTag.textContent = sender === 'user' ? 'User' : 'MARM bot';
  messageDiv.appendChild(nameTag);
  
// Add message content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  // Use innerHTML to render Markdown, textContent for plain text
  // Assuming you have marked.js loaded from the previous step
  if (sender === 'bot') {
    contentDiv.innerHTML = marked.parse(text); 
  } else {
    contentDiv.textContent = text;
  }
  messageDiv.appendChild(contentDiv);

  // --- NEW: Add the copy button ---
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.title = 'Copy text';
  copyBtn.onclick = function() {
    // Copy the plain text content to the clipboard
    navigator.clipboard.writeText(contentDiv.textContent).then(() => {
      // Visual feedback
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      // Revert back after 2 seconds
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  messageDiv.appendChild(copyBtn);
  // --- END of new code ---
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Command menu functions - Updated for v1.4
function createCommandMenu() {
  const commandMenu = document.createElement('div');
  commandMenu.className = 'command-menu';
  commandMenu.id = 'command-menu';
  
  // Check if menu was previously collapsed
  if (localStorage.getItem('commandMenuCollapsed') === 'true') {
    commandMenu.classList.add('collapsed');
  }
  
  commandMenu.innerHTML = `
    <div class="command-menu-header" onclick="toggleCommandMenu()">
      <span class="command-menu-title">Quick Commands</span>
      <button class="command-menu-toggle">▼</button>
    </div>
    <div class="command-menu-content">
      <div class="command-item" onclick="insertCommand('/start marm')" title="Activate MARM protocol">
        <div class="command-name">/start marm</div>
      </div>
      <div class="command-item" onclick="insertCommand('/refresh marm')" title="Refresh session state">
        <div class="command-name">/refresh marm</div>
      </div>
      <div class="command-item" onclick="insertCommand('/log session:')" title="Name your session">
        <div class="command-name">/log session:</div>
      </div>
      <div class="command-item" onclick="insertCommand('/log entry ')" title="Log entry [Date-Summary-Result]">
        <div class="command-name">/log entry</div>
      </div>
      <div class="command-item" onclick="insertCommand('/contextual reply')" title="Generate response with reasoning">
        <div class="command-name">/contextual reply</div>
      </div>
      <div class="command-item" onclick="insertCommand('/show reasoning')" title="Display logic behind last response">
        <div class="command-name">/show reasoning</div>
      </div>
      <div class="command-item" onclick="insertCommand('/compile ')" title="Compile session summary">
        <div class="command-name">/compile</div>
      </div>
      <div class="command-item notebook-item" onclick="handleNotebookClick(event)" title="Manage your knowledge library">
        <div class="command-name">/notebook</div>
        <div class="notebook-submenu" id="notebook-submenu" style="display: none;">
          <div class="submenu-item" onclick="insertCommand('/notebook key:')" title="Store information">key:</div>
          <div class="submenu-item" onclick="insertCommand('/notebook get:')" title="Retrieve specific entry">get:</div>
          <div class="submenu-item" onclick="insertCommand('/notebook show:')" title="Display all entries">show:</div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(commandMenu);
}

window.toggleCommandMenu = function() {
  const menu = document.getElementById('command-menu');
  menu.classList.toggle('collapsed');
  
  // Save state to localStorage
  localStorage.setItem('commandMenuCollapsed', menu.classList.contains('collapsed'));
}

// Add this new function to handle notebook submenu
window.handleNotebookClick = function(event) {
  event.stopPropagation();
  const submenu = document.getElementById('notebook-submenu');
  const isVisible = submenu.style.display === 'block';
  
  // Hide all submenus first
  document.querySelectorAll('.notebook-submenu').forEach(menu => {
    menu.style.display = 'none';
  });
  
  // Toggle this submenu
  submenu.style.display = isVisible ? 'none' : 'block';
  // Do not insert '/notebook ' when clicking the main notebook item; only toggle submenu.
}

// Update the insertCommand function to handle submenu items properly
window.insertCommand = function(command) {
  const input = document.getElementById('user-input');
  input.value = command;
  input.focus();
  
  // Hide notebook submenu after selection
  const submenu = document.getElementById('notebook-submenu');
  if (submenu) {
    submenu.style.display = 'none';
  }
  
  // Place cursor at end if command ends with space
  if (command.endsWith(' ')) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to toggle command menu
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      window.toggleCommandMenu();
    }
  });
}

async function handleUserInput(userInput) {
  appendMessage('user', userInput);
  
  // Show loading indicator
  showLoadingIndicator();
  
  let botResponse = "";

  try {
    if (userInput.startsWith('/')) {
      const [command, ...rest] = userInput.split(' ');
      const args = rest.join(' ').trim();
      
      switch (command) {
        
        // NEW: /start marm command
        case '/start': {
          if (args === 'marm') {
            isMarmActive = true;
            currentSessionId = Date.now().toString(36);
            await activateMarmSession(currentSessionId);
            
            // Let AI acknowledge the activation
            const messagesForLLM = [];
            messagesForLLM.push({ 
              role: 'system', 
              content: 'You are MARM Bot. The user just activated Memory Accurate Response Mode v1.4 (MARM) Acknowledge activation with: 1) Confirm "MARM activated. Ready to log context." 2) Brief 2-line explanation of what MARM is and why useful.' 
            });
            messagesForLLM.push({ role: 'user', content: '/start marm' });
            
            const geminiResponse = await generateContent(messagesForLLM);
            botResponse = await geminiResponse.text();
            
            // Update session history so AI remembers activation
            updateSessionHistory(currentSessionId, '/start marm', botResponse);
          } else {
            botResponse = 'Usage: /start marm';
          }
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }
        
        // NEW: /refresh marm command
        case '/refresh': {
          if (args === 'marm' && isMarmActive) {
            // Refresh session state
            trimForContext(currentSessionId);
            
            // Let AI acknowledge the refresh
            const messagesForLLM = [];
            const hist = getSessionContext(currentSessionId);
            if (hist && hist.trim()) {
              messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
            }
            messagesForLLM.push({ 
              role: 'system', 
              content: 'The user just refreshed MARM. Acknowledge that session state has been updated and protocol reaffirmed. Keep response brief.' 
            });
            messagesForLLM.push({ role: 'user', content: '/refresh marm' });
            
            const geminiResponse = await generateContent(messagesForLLM);
            botResponse = await geminiResponse.text();
            
            updateSessionHistory(currentSessionId, '/refresh marm', botResponse);
          } else {
            botResponse = isMarmActive ? 'Usage: /refresh marm' : 'MARM not active. Use /start marm first.';
          }
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }
        
        // UPDATED: /log to handle both session: and entry
        case '/log': {
          if (!isMarmActive) {
            botResponse = 'MARM not active. Use /start marm first.';
          } else if (!args) {
            botResponse = 'Usage: /log session:Name or /log entry [Date-Summary-Result]';
          } else if (args.startsWith('session:')) {
            // Handle /log session:Name
            const sessionName = args.substring(8).trim();
            if (sessionName) {
              currentSessionId = sessionName;
              
              // Let AI acknowledge the session naming
              const messagesForLLM = [];
              const hist = getSessionContext(currentSessionId);
              if (hist && hist.trim()) {
                messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
              }
              messagesForLLM.push({ 
                role: 'system', 
                content: `The user just named this session "${sessionName}". Acknowledge this briefly and suggest what they might log next.` 
              });
              messagesForLLM.push({ role: 'user', content: `/log session:${sessionName}` });
              
              const geminiResponse = await generateContent(messagesForLLM);
              botResponse = await geminiResponse.text();
              
              updateSessionHistory(currentSessionId, `/log session:${sessionName}`, botResponse);
            } else {
              botResponse = 'Usage: /log session:Name';
            }
          } else if (args.startsWith('entry')) {
            // Handle /log entry [Date-Summary-Result]
            const entryData = args.substring(5).trim();
            if (entryData) {
              // Store the log entry
              logSession(currentSessionId, entryData);
              
              // Let AI acknowledge and understand the log entry
              const messagesForLLM = [];
              const hist = getSessionContext(currentSessionId);
              if (hist && hist.trim()) {
                messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
              }
              messagesForLLM.push({ 
                role: 'system', 
                content: `The user just logged: "${entryData}". Acknowledge this log entry briefly and show you understand its context.` 
              });
              messagesForLLM.push({ role: 'user', content: `/log entry ${entryData}` });
              
              const geminiResponse = await generateContent(messagesForLLM);
              botResponse = await geminiResponse.text();
              
              updateSessionHistory(currentSessionId, `/log entry ${entryData}`, botResponse);
            } else {
              botResponse = 'Usage: /log entry [Date-Summary-Result]';
            }
          } else {
            botResponse = 'Usage: /log session:Name or /log entry [Date-Summary-Result]';
          }
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/contextual': {
          if (!isMarmActive) {
            hideLoadingIndicator();
            appendMessage('bot', 'MARM not active. Use /start marm first.');
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
          
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }
        
        case '/show':
          botResponse =
            args === 'reasoning' && isMarmActive
              ? getMostRecentBotResponseLogic(currentSessionId) || 'No reasoning trail available.'
              : 'Use /show reasoning';
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
          
        // UPDATED: /compile to support --summary and --fields
        case '/compile': {
          if (!isMarmActive) {
            botResponse = 'MARM not active. Use /start marm first.';
          } else {
            // Parse compile arguments
            const compileArgs = args.split('--');
            const sessionName = compileArgs[0].trim() || currentSessionId;
            const hasSummary = args.includes('--summary');
            const fieldsMatch = args.match(/--fields=([^\s]+)/);
            
            // For now, call existing compile function
            // TODO: Add support for --fields filter
            botResponse = await compileSessionSummary(sessionName);
            
            if (hasSummary) {
              botResponse = `Summary for ${sessionName}:\n${botResponse}`;
            }
          }
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }
        
        // UPDATED: /notebook to v1.4 format
        case '/notebook': {
          if (!isMarmActive) {
            hideLoadingIndicator();
            appendMessage('bot', 'MARM not active. Use /start marm first.');
            return;
          }
          
          // Handle new v1.4 format
          if (args.startsWith('key:')) {
            // /notebook key:name data
            const keyData = args.substring(4);
            const colonIndex = keyData.indexOf(' ');
            if (colonIndex > 0) {
              const key = keyData.substring(0, colonIndex).trim();
              const value = keyData.substring(colonIndex + 1).trim();
              
              // Store in notebook
              manageUserNotebook(currentSessionId, 'add', key, value);
              
              // Let AI acknowledge and remember this
              const messagesForLLM = [];
              const hist = getSessionContext(currentSessionId);
              if (hist && hist.trim()) {
                messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
              }
              
              // Include all notebook entries in context
              const notebookData = manageUserNotebook(currentSessionId, 'all');
              messagesForLLM.push({ 
                role: 'system', 
                content: `Current Notebook Contents:\n${notebookData}\n\nThe user just stored "${key}" = "${value}" in the notebook. Acknowledge this and show you understand what was stored.` 
              });
              messagesForLLM.push({ role: 'user', content: `/notebook key:${key} ${value}` });
              
              const geminiResponse = await generateContent(messagesForLLM);
              botResponse = await geminiResponse.text();
              
              updateSessionHistory(currentSessionId, `/notebook key:${key} ${value}`, botResponse);
            } else {
              botResponse = 'Usage: /notebook key:name your data here';
            }
          } else if (args.startsWith('get:')) {
            // /notebook get:name
            const key = args.substring(4).trim();
            const storedValue = manageUserNotebook(currentSessionId, 'get', key);
            
            // Let AI retrieve and explain the value
            const messagesForLLM = [];
            const hist = getSessionContext(currentSessionId);
            if (hist && hist.trim()) {
              messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
            }
            
            // Include all notebook entries
            const notebookData = manageUserNotebook(currentSessionId, 'all');
            messagesForLLM.push({ 
              role: 'system', 
              content: `Current Notebook Contents:\n${notebookData}\n\nThe user requested notebook entry "${key}". Result: ${storedValue}. Provide this information naturally.` 
            });
            messagesForLLM.push({ role: 'user', content: `/notebook get:${key}` });
            
            const geminiResponse = await generateContent(messagesForLLM);
            botResponse = await geminiResponse.text();
            
            updateSessionHistory(currentSessionId, `/notebook get:${key}`, botResponse);
          } else if (args === 'show:' || args === 'show') {
            // /notebook show:
            const allEntries = manageUserNotebook(currentSessionId, 'all');
            
            // Let AI present the notebook contents
            const messagesForLLM = [];
            const hist = getSessionContext(currentSessionId);
            if (hist && hist.trim()) {
              messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
            }
            messagesForLLM.push({ 
              role: 'system', 
              content: `The user wants to see all notebook entries. Here's what's stored:\n${allEntries}\n\nPresent this information clearly.` 
            });
            messagesForLLM.push({ role: 'user', content: '/notebook show:' });
            
            const geminiResponse = await generateContent(messagesForLLM);
            botResponse = await geminiResponse.text();
            
            updateSessionHistory(currentSessionId, '/notebook show:', botResponse);
          } else {
            botResponse = 'Usage: /notebook key:name data | /notebook get:name | /notebook show:';
          }
          
          hideLoadingIndicator();
          appendMessage('bot', botResponse);
          return;
        }

        default: 
          hideLoadingIndicator();
          appendMessage('bot', 'Unknown command. Use /start marm to begin.');
          return;
      }
    }

    // Standard LLM call for non-command inputs
    const messagesForLLM = [];
    
    // Only add MARM identity if MARM is active
    if (isMarmActive) {
      trimForContext(currentSessionId);
      const hist = getSessionContext(currentSessionId);
      if (hist && hist.trim()) {
        messagesForLLM.push({ role: 'system', content: `Current Session History:\n${hist}` });
      }
      
      // Include notebook contents in every message for context
      const notebookData = manageUserNotebook(currentSessionId, 'all');
      if (notebookData && !notebookData.includes('empty')) {
        messagesForLLM.push({ 
          role: 'system', 
          content: `Current Notebook Contents:\n${notebookData}` 
        });
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
    if (isMarmActive) {
      setSessionReasoning(currentSessionId, '');
    }
    
    hideLoadingIndicator();
    appendMessage('bot', botResponse);
    
    if (isMarmActive && currentSessionId) {
      updateSessionHistory(currentSessionId, userInput, botResponse);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    hideLoadingIndicator();
    appendMessage('bot', 'Sorry, I encountered an error. Please try again.');
  }
}

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

// Remove duplicate event listener - keep only one
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

window.handleUserMessage = handleUserInput;

// UI functionality (moved from ui.js)
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('help-modal');
const closeHelp = document.getElementById('close-help');
const darkModeBtn = document.getElementById('darkModeToggle');

// Help modal toggle
if (helpBtn && helpModal && closeHelp) {
  helpBtn.onclick = () => helpModal.classList.remove('hidden');
  closeHelp.onclick = () => helpModal.classList.add('hidden');
  window.onclick = (e) => {
    if (e.target === helpModal) helpModal.classList.add('hidden');
  };
}

// Dark mode
if (localStorage.getItem('darkMode') === '1') {
  document.body.classList.add('dark-mode');
}

if (darkModeBtn) {
  darkModeBtn.onclick = function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', '1');
    } else {
      localStorage.removeItem('darkMode');
    }
  };
}

// Create command menu and setup shortcuts
createCommandMenu();
setupKeyboardShortcuts();

// Note: MARM no longer auto-activates. User must use /start marm
