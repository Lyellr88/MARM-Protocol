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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

export function cleanup() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  console.log('MARM Chatbot cleanup completed');
} 
