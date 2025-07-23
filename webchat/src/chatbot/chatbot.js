// chatbot2.js - Main entry point and initializer for MARM chatbot
// This is the refactored modular version of the original chatbot.js

// Barrel exports for all modules
export * from './core.js';
export * from './ui.js';
export * from './voice.js';
export * from './commands.js';

// Import specific functions for initialization
import { handleUserInput } from './core.js';
import { 
  createCommandMenu, 
  setupHelpModal, 
  setupDarkMode, 
  setupAutoExpandingTextarea,
  setupTokenCounter,
  setupNewChat,
  setupChatsButton,
  setupKeyboardShortcuts,
  setupSaveSession,
  restoreChatHistory
} from './ui.js';
import { initializeVoice } from './voice.js';

/**
 * Initialize the chatbot application
 */
function initializeChatbot() {
  // Setup UI components
  createCommandMenu();
  setupHelpModal();
  setupDarkMode();
  setupAutoExpandingTextarea();
  setupTokenCounter();
  setupNewChat();
  setupChatsButton();
  setupKeyboardShortcuts();
  setupSaveSession();
  
  // Initialize voice functionality
  initializeVoice();
  
  // Restore chat history for current active session (if any)
  restoreChatHistory();
  
  // Setup main form event listener
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
        // Reset textarea height after clearing
        input.style.height = 'auto';
      }
    });
  }
  
  console.log('MARM Chatbot initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

// Export cleanup function for memory management
export function cleanup() {
  // Cleanup voice resources
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  // Note: No global functions to clean up - we removed all global pollution
  console.log('MARM Chatbot cleanup completed');
} 
