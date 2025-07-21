// ui.js - DOM manipulation and UI functions
import { speakText, voiceConfig, addVoiceToggleToHelp } from './voice.js';

/**
 * Show loading indicator in chat
 */
export function showLoadingIndicator() {
  const chatMessages = document.getElementById('chat-log');
  if (!chatMessages) throw new Error('Chat log not found');
  
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

/**
 * Hide loading indicator
 */
export function hideLoadingIndicator() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

/**
 * Append a message to the chat log
 * @param {string} sender - 'user' or 'bot'
 * @param {string} text - Message content
 */
export function appendMessage(sender, text) {
  const chatMessages = document.getElementById('chat-log');
  if (!chatMessages) throw new Error('Chat log not found');
  
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
  contentDiv.setAttribute('aria-live', 'polite');
  
  // Use innerHTML to render Markdown, textContent for plain text
  if (sender === 'bot') {
    try {
      contentDiv.innerHTML = window.marked ? marked.parse(text) : text;
    } catch (e) {
      contentDiv.textContent = text;
    }
  } else {
    contentDiv.textContent = text;
  }
  messageDiv.appendChild(contentDiv);

  // Add copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.title = 'Copy text';
  copyBtn.onclick = function() {
    navigator.clipboard.writeText(contentDiv.textContent).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  messageDiv.appendChild(copyBtn);
  
  // Add voice button for bot messages
  if (sender === 'bot') {
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-btn';
    voiceBtn.textContent = '🔊';
    voiceBtn.title = 'Read aloud';
    voiceBtn.onclick = function() {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.querySelectorAll('.bot-message').forEach(msg => {
          msg.classList.remove('speaking');
        });
      } else {
        if (typeof speakText === 'function') {
          speakText(text, true);
          messageDiv.classList.add('speaking');
        }
      }
    };
    messageDiv.appendChild(voiceBtn);
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Auto-speak if voice is enabled
  if (sender === 'bot' && voiceConfig && voiceConfig.enabled) {
    setTimeout(() => {
      speakText(text, true);
      messageDiv.classList.add('speaking');
    }, 100);
  }
}

/**
 * Create the command menu UI
 */
export function createCommandMenu() {
  const commandMenu = document.createElement('div');
  commandMenu.className = 'command-menu';
  commandMenu.id = 'command-menu';
  
  // Check if menu was previously collapsed
  let commandMenuCollapsed = false;
  try {
    commandMenuCollapsed = localStorage.getItem('commandMenuCollapsed') === 'true';
  } catch (e) {
    commandMenuCollapsed = false;
  }
  if (commandMenuCollapsed) {
    commandMenu.classList.add('collapsed');
  }
  
  commandMenu.setAttribute('aria-expanded', 'false');

  commandMenu.innerHTML = `
    <div class="command-menu-header">
      <span class="command-menu-title">Quick Commands</span>
      <button class="command-menu-toggle">▼</button>
    </div>
    <div class="command-menu-content">
      <div class="command-item" data-command="/start marm" title="Activate MARM protocol">
        <div class="command-name">/start marm</div>
      </div>
      <div class="command-item" data-command="/refresh marm" title="Refresh session state">
        <div class="command-name">/refresh marm</div>
      </div>
      <div class="command-item" data-command="/log session:" title="Name your session">
        <div class="command-name">/log session:</div>
      </div>
      <div class="command-item" data-command="/log entry " title="Log entry [Date-Summary-Result]">
        <div class="command-name">/log entry</div>
      </div>
      <div class="command-item" data-command="/contextual reply" title="Generate response with reasoning">
        <div class="command-name">/contextual reply</div>
      </div>
      <div class="command-item" data-command="/show reasoning" title="Display logic behind last response">
        <div class="command-name">/show reasoning</div>
      </div>
      <div class="command-item" data-command="/compile " title="Compile session summary">
        <div class="command-name">/compile</div>
      </div>
      <div class="command-item notebook-item" title="Manage your knowledge library">
        <div class="command-name">/notebook</div>
        <div class="notebook-submenu" id="notebook-submenu" style="display: none;">
          <div class="submenu-item" data-command="/notebook key:" title="Store information">key:</div>
          <div class="submenu-item" data-command="/notebook get:" title="Retrieve specific entry">get:</div>
          <div class="submenu-item" data-command="/notebook show:" title="Display all entries">show:</div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(commandMenu);
  
  // Add event delegation instead of global functions
  commandMenu.addEventListener('click', (e) => {
    if (e.target.closest('.command-menu-header')) {
      toggleCommandMenu();
    } else if (e.target.closest('.submenu-item')) {
      const command = e.target.closest('.submenu-item').getAttribute('data-command');
      if (command) insertCommand(command);
    } else if (e.target.closest('.notebook-item')) {
      handleNotebookClick(e);
      return;
    } else if (e.target.closest('.command-item')) {
      const command = e.target.closest('.command-item').getAttribute('data-command');
      if (command) insertCommand(command);
    }
  });
}

/**
 * Toggle command menu visibility
 */
export function toggleCommandMenu() {
  const menu = document.getElementById('command-menu');
  if (!menu) return;
  menu.classList.toggle('collapsed');
  
  localStorage.setItem('commandMenuCollapsed', menu.classList.contains('collapsed'));
}

/**
 * Handle notebook submenu clicks
 * @param {Event} event - Click event
 */
export function handleNotebookClick(event) {
  event.stopPropagation();
  const submenu = document.getElementById('notebook-submenu');
  if (!submenu) return;
  const isVisible = submenu.style.display === 'block';
  
  // Hide all submenus first
  document.querySelectorAll('.notebook-submenu').forEach(menu => {
    menu.style.display = 'none';
  });
  
  // Toggle this submenu
  submenu.style.display = isVisible ? 'none' : 'block';
}

/**
 * Insert command into input field
 * @param {string} command - Command to insert
 */
export function insertCommand(command) {
  const input = document.getElementById('user-input');
  if (!input) return;
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

/**
 * Setup help modal functionality
 */
export function setupHelpModal() {
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('help-modal');
  const closeHelp = document.getElementById('close-help');
  const markdownModal = document.getElementById('markdown-modal');
  const closeMarkdown = document.getElementById('close-markdown');
  const markdownContent = document.getElementById('markdown-content');
  const markdownTitle = document.getElementById('markdown-title');

  if (helpBtn && helpModal && closeHelp) {
    helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
    closeHelp.addEventListener('click', () => helpModal.classList.add('hidden'));
    document.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.classList.add('hidden');
    });
  }

  // Handle markdown modal
  if (markdownModal && closeMarkdown) {
    closeMarkdown.addEventListener('click', () => markdownModal.classList.add('hidden'));
    document.addEventListener('click', (e) => {
      if (e.target === markdownModal) markdownModal.classList.add('hidden');
    });
  }

  // Handle documentation links
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.doc-link')) {
      e.preventDefault();
      const docLink = e.target.closest('.doc-link');
      const docFile = docLink.getAttribute('data-doc');
      
      if (docFile && markdownModal && markdownContent && markdownTitle) {
        // Show modal and loading state
        markdownModal.classList.remove('hidden');
        markdownContent.innerHTML = '<div class="loading-spinner">Loading...</div>';
        
        // Set title based on document
        const titles = {
          'handbook.md': '📘 MARM Handbook',
          'faq.md': '❓ Frequently Asked Questions',
          'description.md': '📄 Project Description',
          'roadmap.md': '🗺️ Development Roadmap'
        };
        markdownTitle.textContent = titles[docFile] || 'Documentation';
        
        try {
          // Fetch and render markdown
          const response = await fetch(`data/${docFile}`);
          if (!response.ok) throw new Error('Failed to load document');
          
          const markdownText = await response.text();
          const htmlContent = marked.parse(markdownText);
          markdownContent.innerHTML = htmlContent;
        } catch (error) {
          markdownContent.innerHTML = `
            <div class="error-message">
              <h3>❌ Failed to load document</h3>
              <p>Sorry, we couldn't load the ${docFile} file. Please try again later.</p>
              <p><small>Error: ${error.message}</small></p>
            </div>
          `;
        }
      }
    }
  });
  
  // Add voice toggle to help modal when opened
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      setTimeout(() => {
        addVoiceToggleToHelp();
      }, 100);
    });
  }
}

/**
 * Setup dark mode functionality
 */
export function setupDarkMode() {
  const darkModeBtn = document.getElementById('darkModeToggle');
  
  let darkMode = false;
  try {
    darkMode = localStorage.getItem('darkMode') === '1';
  } catch (e) {
    darkMode = false;
  }
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', '1');
      } else {
        localStorage.removeItem('darkMode');
      }
    });
  }
}

/**
 * Setup keyboard shortcuts
 */
export function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to toggle command menu
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      toggleCommandMenu();
    }
  });
}

/**
 * Setup auto-expanding textarea
 */
export function setupAutoExpandingTextarea() {
  const userInput = document.getElementById('user-input');
  if (!userInput) return;

  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
  });

  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      document.getElementById('chat-form').requestSubmit();
    }
  });
}

/**
 * Setup token counter button
 */
export function setupTokenCounter() {
  document.getElementById('token-counter-btn')?.addEventListener('click', () => {
    window.open('https://quizgecko.com/tools/token-counter', '_blank');
  });
}

/**
 * Setup new chat button
 */
export function setupNewChat() {
  const newChatBtn = document.getElementById('newChatBtn');
  if (!newChatBtn) return;

  newChatBtn.addEventListener('click', () => {
    // Hide chats menu if open
    const chatsMenu = document.getElementById('chats-menu');
    if (chatsMenu) chatsMenu.classList.remove('visible');
    
    // Import required modules for clearing session
    import('./state.js').then(stateModule => {
      import('../logic/session.js').then(sessionModule => {
        const { resetState } = stateModule;
        const { CURRENT_SESSION_KEY } = sessionModule;
        
        // Clear current session data (but keep long-term saved sessions)
        try {
          localStorage.removeItem(CURRENT_SESSION_KEY);
        } catch (e) {
          console.warn('Failed to clear current session:', e);
        }
        
        // Reset MARM state to inactive
        resetState();
        
        // Clear chat UI
        const chatMessages = document.getElementById('chat-log');
        if (chatMessages) {
          chatMessages.innerHTML = '';
        }
        
        // Show fresh start message
        appendMessage('bot', '🆕 **New chat started!** Ready for a fresh conversation. Use `/start marm` to activate MARM protocol.');
      });
    });
  });
}

/**
 * Setup chats browser button
 */
export function setupChatsButton() {
  const chatsBtn = document.getElementById('chatsBtn');
  if (!chatsBtn) return;

  // Create chats menu
  const chatsMenu = document.createElement('div');
  chatsMenu.className = 'chats-menu';
  chatsMenu.id = 'chats-menu';
  
  chatsMenu.innerHTML = `
    <div class="chats-menu-header">
      Saved Chats
    </div>
    <div class="chats-menu-content" id="chats-menu-content">
      <div class="no-chats">No saved chats yet</div>
    </div>
  `;
  
  document.body.appendChild(chatsMenu);

  // Toggle menu on button click
  chatsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatsMenu.classList.toggle('visible');
    if (chatsMenu.classList.contains('visible')) {
      loadChatsList();
    }
  });

  // Hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!chatsMenu.contains(e.target) && !chatsBtn.contains(e.target)) {
      chatsMenu.classList.remove('visible');
    }
  });
}

/**
 * Load and display the list of saved chats
 */
function loadChatsList() {
  import('../logic/session.js').then(sessionModule => {
    const { sessions } = sessionModule;
    const menuContent = document.getElementById('chats-menu-content');
    if (!menuContent) return;

    // Filter for saved sessions only
    const savedSessions = Object.entries(sessions)
      .filter(([id, session]) => id.startsWith('saved_') && session.title)
      .sort((a, b) => (b[1].savedAt || 0) - (a[1].savedAt || 0)); // Sort by newest first

    if (savedSessions.length === 0) {
      menuContent.innerHTML = '<div class="no-chats">No saved chats yet</div>';
      return;
    }

    menuContent.innerHTML = savedSessions.map(([id, session]) => {
      const date = session.savedAt ? new Date(session.savedAt).toLocaleDateString() : 'Unknown date';
      const time = session.savedAt ? new Date(session.savedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
      const fullDateTime = time ? `${date} at ${time}` : date;
      return `
        <div class="chat-item" data-session-id="${id}" title="Created: ${fullDateTime}">
          <div class="chat-title">${session.title}</div>
          <button class="delete-chat-btn" data-session-id="${id}" title="Delete this chat">×</button>
        </div>
      `;
    }).join('');

    // Add click handlers for chat items
    menuContent.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', (e) => {
        // Don't load chat if delete button was clicked
        if (e.target.classList.contains('delete-chat-btn')) return;
        
        const sessionId = item.getAttribute('data-session-id');
        loadSavedChat(sessionId);
        document.getElementById('chats-menu').classList.remove('visible');
      });
    });

    // Add click handlers for delete buttons
    menuContent.querySelectorAll('.delete-chat-btn').forEach(deleteBtn => {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the chat item click
        
        const sessionId = deleteBtn.getAttribute('data-session-id');
        const chatTitle = deleteBtn.parentElement.querySelector('.chat-title').textContent;
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete "${chatTitle}"?`)) {
          deleteSavedChat(sessionId);
          loadChatsList(); // Refresh the list
        }
      });
    });
  });
}

/**
 * Delete a saved chat session
 */
function deleteSavedChat(sessionId) {
  import('../logic/session.js').then(sessionModule => {
    const { sessions, persistSessions } = sessionModule;
    
    if (sessions[sessionId]) {
      const chatTitle = sessions[sessionId].title;
      delete sessions[sessionId];
      persistSessions();
      
      // Show confirmation
      appendMessage('bot', `🗑️ **Deleted chat:** "${chatTitle}"`);
    }
  });
}

/**
 * Load a saved chat session
 */
function loadSavedChat(sessionId) {
  import('../logic/session.js').then(sessionModule => {
    import('./state.js').then(stateModule => {
      const { sessions } = sessionModule;
      const { updateState } = stateModule;
      
      const savedSession = sessions[sessionId];
      if (!savedSession) {
        appendMessage('bot', '❌ Could not load saved chat - session not found.');
        return;
      }

      // Clear current chat UI
      const chatMessages = document.getElementById('chat-log');
      if (chatMessages) {
        chatMessages.innerHTML = '';
      }

      // Update state to use the saved session
      updateState({
        isMarmActive: true,
        currentSessionId: sessionId
      });

      // Display the saved conversation
      if (savedSession.history && savedSession.history.length > 0) {
        savedSession.history.forEach(msg => {
          if (msg.role === 'user') {
            appendMessage('user', msg.content);
          } else if (msg.role === 'bot') {
            appendMessage('bot', msg.content);
          }
        });
      }

      // Show load confirmation
      appendMessage('bot', `📂 **Loaded saved chat:** "${savedSession.title}"`);
    });
  });
}

/**
 * Setup save session functionality
 */
export function setupSaveSession() {
  const saveBtn = document.getElementById('saveSessionBtn');
  if (!saveBtn) return;

  // Always show save button as ready to save
  saveBtn.innerHTML = '💾 Save Session';
  saveBtn.title = 'Save your current session with a custom title';

  saveBtn.addEventListener('click', () => {
    // Prompt user for session title
    const sessionTitle = prompt('Enter a title for this session:');
    
    if (sessionTitle && sessionTitle.trim()) {
      // Enable persistence and save with the title
      localStorage.setItem('marm-persistence-enabled', 'true');
      
      // Import session management to save with title
      import('../logic/session.js').then(sessionModule => {
        import('./state.js').then(stateModule => {
          const { sessions, persistSessions } = sessionModule;
          const { state } = stateModule;
          
          if (state.currentSessionId && sessions[state.currentSessionId]) {
            // Create a saved session with the custom title
            const savedSessionId = `saved_${Date.now()}`;
            sessions[savedSessionId] = {
              ...sessions[state.currentSessionId],
              title: sessionTitle.trim(),
              savedAt: Date.now()
            };
            
            // Persist the sessions
            persistSessions();
            
            // Show brief success message
            appendMessage('bot', `✅ Session saved as "${sessionTitle.trim()}"`);
          }
        });
      });
    }
    // If user cancels or enters empty title, do nothing
  });
}

/**
 * Restore chat history from current active session to the UI
 */
export function restoreChatHistory() {
  // Import sessions and state from their respective modules
  import('../logic/session.js').then(sessionModule => {
    import('./state.js').then(stateModule => {
      const { sessions } = sessionModule;
      const { state } = stateModule;
      
      // Only restore if MARM is active and we have a current session
      if (state.isMarmActive && state.currentSessionId && sessions[state.currentSessionId]) {
        const session = sessions[state.currentSessionId];
        
        if (session.history.length > 0) {
          const chatMessages = document.getElementById('chat-log');
          if (!chatMessages) return;
          
          // Clear any existing messages
          chatMessages.innerHTML = '';
          
          // Restore each message from history
          session.history.forEach(msg => {
            if (msg.role === 'user') {
              appendMessage('user', msg.content);
            } else if (msg.role === 'bot') {
              appendMessage('bot', msg.content);
            }
          });
          
        }
      }
    });
  });
} 
