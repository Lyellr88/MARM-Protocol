// sessionUI.js - Session management UI functions
import { appendMessage } from './ui.js';

// ===== SESSION MANAGEMENT =====
export function setupNewChat() {
}

export function setupChatsButton() {
}

function loadChatsList() {
  import('../logic/session.js').then(sessionModule => {
    const { sessions } = sessionModule;
    const menuContent = document.getElementById('chats-menu-content');
    if (!menuContent) return;

    const savedSessions = Object.entries(sessions)
      .filter(([id, session]) => id.startsWith('saved_') && session.title)
      .sort((a, b) => (b[1].savedAt || 0) - (a[1].savedAt || 0));

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

    menuContent.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-chat-btn')) return;
        
        const sessionId = item.getAttribute('data-session-id');
        loadSavedChat(sessionId);
        
        // Close menu
        const chatsMenu = document.getElementById('chats-menu');
        if (chatsMenu) {
          chatsMenu.classList.remove('visible');
        }
      });
    });

    menuContent.querySelectorAll('.delete-chat-btn').forEach(deleteBtn => {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const sessionId = deleteBtn.getAttribute('data-session-id');
        const chatTitle = deleteBtn.parentElement.querySelector('.chat-title').textContent;
        
        if (confirm(`Are you sure you want to delete "${chatTitle}"?`)) {
          deleteSavedChat(sessionId);
          loadChatsList();
          
          // Close menu if no chats left
          const chatsMenu = document.getElementById('chats-menu');
          const menuContent = document.getElementById('chats-menu-content');
          if (chatsMenu && menuContent && menuContent.innerHTML.includes('No saved chats yet')) {
            chatsMenu.classList.remove('visible');
          }
        }
      });
    });
  });
}

function deleteSavedChat(sessionId) {
  import('../logic/session.js').then(sessionModule => {
    const { sessions, persistSessions } = sessionModule;
    
    if (sessions[sessionId]) {
      const chatTitle = sessions[sessionId].title;
      delete sessions[sessionId];
      persistSessions();
      
      appendMessage('bot', `🗑️ **Deleted chat:** "${chatTitle}"`);
    }
  });
}

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

      const chatMessages = document.getElementById('chat-log');
      if (chatMessages) {
        chatMessages.innerHTML = '';
      }

      updateState({
        isMarmActive: true,
        currentSessionId: sessionId
      });

      if (savedSession.history && savedSession.history.length > 0) {
        savedSession.history.forEach(msg => {
          if (msg.role === 'user') {
            appendMessage('user', msg.content);
          } else if (msg.role === 'bot') {
            appendMessage('bot', msg.content);
          }
        });
      }

      appendMessage('bot', `📂 **Loaded saved chat:** "${savedSession.title}"`);
    });
  });
}

export function setupSaveSession() {
  const saveBtn = document.getElementById('saveSessionBtn');
  if (!saveBtn) return;

  saveBtn.innerHTML = '💾 Save Session';
  saveBtn.title = 'Save your current session with a custom title';

  saveBtn.addEventListener('click', () => {
    const sessionTitle = prompt('Enter a title for this session:');
    
    if (sessionTitle && sessionTitle.trim()) {
      localStorage.setItem('marm-persistence-enabled', 'true');
      
      import('../logic/session.js').then(sessionModule => {
        import('./state.js').then(stateModule => {
          const { sessions, persistSessions } = sessionModule;
          const { state } = stateModule;
          
          if (state.currentSessionId && sessions[state.currentSessionId]) {
            const savedSessionId = `saved_${Date.now()}`;
            sessions[savedSessionId] = {
              ...sessions[state.currentSessionId],
              title: sessionTitle.trim(),
              savedAt: Date.now()
            };
            
            persistSessions();
            
            appendMessage('bot', `✅ Session saved as "${sessionTitle.trim()}"`);
          }
        });
      });
    }
  });
}

export function restoreChatHistory() {
  import('../logic/session.js').then(sessionModule => {
    import('./state.js').then(stateModule => {
      const { sessions } = sessionModule;
      const { state } = stateModule;
      
      if (state.isMarmActive && state.currentSessionId && sessions[state.currentSessionId]) {
        const session = sessions[state.currentSessionId];
        
        if (session.history.length > 0) {
          const chatMessages = document.getElementById('chat-log');
          if (!chatMessages) return;
          
          chatMessages.innerHTML = '';
          
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
