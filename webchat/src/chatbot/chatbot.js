// chatbot2.js - Main entry point and initializer for MARM chatbot

export * from './core.js';
export * from './ui.js';
export * from './voice.js';
export * from './commands.js';

import { handleUserInput } from './core.js';
import { 
  createCommandMenu, 
  setupHelpModal, 
  setupDarkMode, 
  setupAutoExpandingTextarea,
  setupKeyboardShortcuts
} from './ui.js';
import { 
  setupSaveSession,
  restoreChatHistory
} from './sessionUI.js';
import { initializeVoice } from './voice.js';
import { cleanupConnections } from '../geminiHelper.js';

function initializeChatbot() {
  createCommandMenu();
  setupHelpModal();
  setupDarkMode();
  setupAutoExpandingTextarea();
  setupKeyboardShortcuts();
  setupSaveSession();
  
  initializeVoice();
  
  restoreChatHistory();
  
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('user-input');
      if (!input) return;
      const userMessage = input.value.trim();
      if (userMessage) {
        handleUserInput(userMessage);
        input.value = '';
        input.style.height = 'auto';
      }
    });
  }
  
  console.log('MARM Chatbot initialized successfully');
  
  // Initialize mobile FAB functionality
  initializeMobileFAB();
  
  // Cleanup connections when user leaves page
  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('pagehide', cleanup);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

// FAB button action functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', '1');
  } else {
    localStorage.setItem('darkMode', '0');
  }
}

function toggleChatsMenu() {
  let chatsMenu = document.getElementById('chats-menu');
  
  // Create chats menu if it doesn't exist
  if (!chatsMenu) {
    chatsMenu = document.createElement('div');
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
  }
  
  const isVisible = chatsMenu.classList.contains('visible');
  
  if (isVisible) {
    // Close menu
    chatsMenu.classList.remove('visible');
    // Remove click-outside listener
    document.removeEventListener('click', handleClickOutside);
  } else {
    // Open menu
    chatsMenu.classList.add('visible');
    // Add click-outside listener
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
    
    // Load chats list if needed
    const menuContent = document.getElementById('chats-menu-content');
    if (menuContent && menuContent.innerHTML.includes('No saved chats yet')) {
      // Trigger load function
      import('./sessionUI.js').then(module => {
        if (module.loadChatsList) {
          module.loadChatsList();
        }
      });
    }
  }
}

// Handle clicking outside the chats menu to close it
function handleClickOutside(event) {
  const chatsMenu = document.getElementById('chats-menu');
  const fabContainer = document.getElementById('fab-container');
  
  if (!chatsMenu || !chatsMenu.classList.contains('visible')) return;
  
  // Check if click is outside the menu and not on the FAB
  const isClickOutsideMenu = !chatsMenu.contains(event.target);
  const isClickOnFAB = fabContainer && fabContainer.contains(event.target);
  
  if (isClickOutsideMenu && !isClickOnFAB) {
    chatsMenu.classList.remove('visible');
    document.removeEventListener('click', handleClickOutside);
  }
}

function startNewChat() {
  const chatsMenu = document.getElementById('chats-menu');
  if (chatsMenu) chatsMenu.classList.remove('visible');
  
  import('./state.js').then(stateModule => {
    import('../logic/session.js').then(sessionModule => {
      const { resetState } = stateModule;
      const { CURRENT_SESSION_KEY } = sessionModule;
      
      try {
        localStorage.removeItem(CURRENT_SESSION_KEY);
      } catch (e) {
        console.warn('Failed to clear current session:', e);
      }
      
      resetState();
      
      const chatMessages = document.getElementById('chat-log');
      if (chatMessages) {
        chatMessages.innerHTML = '';
      }
      
      import('./ui.js').then(uiModule => {
        uiModule.appendMessage('bot', '🆕 **New chat started!** Ready for a fresh conversation. Use `/start marm` to activate MARM protocol.');
      });
    });
  });
}

function toggleTokenCounter() {
  window.open('https://quizgecko.com/tools/token-counter', '_blank');
}

// Mobile FAB functionality
function initializeMobileFAB() {
  const fabContainer = document.getElementById('fab-container');
  const fabMain = document.getElementById('fab-main');
  
  if (!fabContainer || !fabMain) return;
  
  // Toggle FAB expansion
  fabMain.addEventListener('click', () => {
    fabContainer.classList.toggle('fab-expanded');
  });
  
  // Handle FAB button clicks
  document.getElementById('fab-dark-mode')?.addEventListener('click', () => {
    toggleDarkMode();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-chats')?.addEventListener('click', () => {
    toggleChatsMenu();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-new-chat')?.addEventListener('click', () => {
    startNewChat();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-token-counter')?.addEventListener('click', () => {
    toggleTokenCounter();
    fabContainer.classList.remove('fab-expanded');
  });
  
  // Close FAB when clicking outside
  document.addEventListener('click', (e) => {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove('fab-expanded');
    }
  });
}

export function cleanup() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  cleanupConnections();
  
  console.log('MARM Chatbot cleanup completed');
} 
