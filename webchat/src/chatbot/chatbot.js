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
  setupTokenCounter,
  setupKeyboardShortcuts
} from './ui.js';
import { 
  setupNewChat,
  setupChatsButton,
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
  setupTokenCounter();
  setupNewChat();
  setupChatsButton();
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
    document.getElementById('darkModeToggle')?.click();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-chats')?.addEventListener('click', () => {
    document.getElementById('chatsBtn')?.click();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-new-chat')?.addEventListener('click', () => {
    document.getElementById('newChatBtn')?.click();
    fabContainer.classList.remove('fab-expanded');
  });
  
  document.getElementById('fab-token-counter')?.addEventListener('click', () => {
    document.getElementById('token-counter-btn')?.click();
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
