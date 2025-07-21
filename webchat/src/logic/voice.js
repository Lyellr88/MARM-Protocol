// voice.js - Web Speech API and voice synthesis functionality

/**
 * Voice synthesis configuration
 */
export const voiceConfig = {
  enabled: false, // Default to false, will be set by localStorage
  rate: 0.95, // Default rate
  pitch: 1.0, // Default pitch
  voice: null // Default voice
};

// Get available voices with better selection
let availableVoices = [];

/**
 * Load available voices from speech synthesis
 */
export function loadVoices() {
  try {
    availableVoices = speechSynthesis.getVoices();
  } catch (e) {
    console.warn('Could not load voices:', e);
    availableVoices = []; // Fallback to empty array
  }
  
  // Prioritize more natural-sounding voices
  const preferredVoices = [
    // Premium voices (if available)
    'Google UK English Female',
    'Google UK English Male', 
    'Google US English',
    'Microsoft Zira Desktop',
    'Microsoft David Desktop',
    'Samantha', // macOS
    'Alex', // macOS
    'Karen', // macOS
    // Fallback to standard voices
    'Microsoft Zira',
    'Microsoft David',
    'Google UK English Female',
    'Google US English'
  ];
  
  // Try to find the best available voice
  let selectedVoice = null;
  for (const preferred of preferredVoices) {
    selectedVoice = availableVoices.find(v => v.name.includes(preferred));
    if (selectedVoice) break;
  }
  
  // If no preferred voice found, pick the first non-default English voice
  if (!selectedVoice) {
    selectedVoice = availableVoices.find(v => 
      v.lang.startsWith('en') && !v.default
    ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
  }
  
  if (selectedVoice && !voiceConfig.voice) {
    voiceConfig.voice = selectedVoice.name;
  }
}

/**
 * Enhanced speak text function with more natural processing
 * @param {string} text - Text to speak
 * @param {boolean} isBot - Whether this is a bot message
 */
export function speakText(text, isBot = true) {
  if (!isBot) return;
  
  // Cancel any ongoing speech
  speechSynthesis.cancel();
  
  // Clean and enhance text for more natural speech
  let cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
    .replace(/```[\s\S]*?```/g, ' [code block removed] ')  // Indicate code blocks
    .replace(/`(.*?)`/g, '$1')       // Remove inline code
    .replace(/^[-*]\s/gm, '')        // Remove bullet points
    .replace(/\[.*?\]\(.*?\)/g, '')  // Remove links
    .replace(/^#+\s/gm, '')          // Remove headers
    .replace(/([.!?])\s*\n/g, '$1 ') // Add pauses after sentences
    .replace(/\n{2,}/g, '. ')        // Convert multiple newlines to pause
    .replace(/:/g, ',')              // Replace colons with commas for better flow
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim();
  
  if (!cleanText) return;
  
  // Add subtle pauses for more natural speech rhythm
  cleanText = cleanText
    .replace(/\. /g, '. ... ')       // Longer pause after periods
    .replace(/, /g, ', .. ')         // Medium pause after commas
    .replace(/\? /g, '? ... ')       // Longer pause after questions
    .replace(/! /g, '! ... ');       // Longer pause after exclamations
  
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  // Optimize voice parameters for more natural sound
  utterance.rate = voiceConfig.rate;
  utterance.pitch = voiceConfig.pitch;
  utterance.volume = 0.9; // Slightly lower volume sounds more natural
  
  // Set voice if available
  if (voiceConfig.voice) {
    const selectedVoice = availableVoices.find(v => v.name === voiceConfig.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      // Adjust rate based on voice characteristics
      if (selectedVoice.name.includes('Google')) {
        utterance.rate = voiceConfig.rate * 0.95; // Google voices sound better slightly slower
      }
    }
  }
  
  // Add visual feedback
  utterance.onstart = () => {
    document.querySelectorAll('.bot-message').forEach(msg => {
      msg.classList.remove('speaking');
    });
  };
  
  utterance.onend = () => {
    document.querySelectorAll('.bot-message').forEach(msg => {
      msg.classList.remove('speaking');
    });
  };
  
  speechSynthesis.speak(utterance);
}

/**
 * Add voice settings toggle to help modal
 */
export function addVoiceToggleToHelp() {
  const helpModal = document.querySelector('#help-modal .modal-content');
  if (!helpModal || document.getElementById('voice-settings')) return;
  
  const voiceSettings = document.createElement('div');
  voiceSettings.id = 'voice-settings';
  voiceSettings.style.marginTop = '15px';
  voiceSettings.style.paddingTop = '15px';
  voiceSettings.style.borderTop = '1px solid #ddd';
  
  voiceSettings.innerHTML = `
    <p><strong>Voice Settings:</strong></p>
    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" id="auto-voice-toggle" ${voiceConfig.enabled ? 'checked' : ''}>
      <span>Auto-read bot responses</span>
    </label>
    <div style="margin-top: 10px;">
      <button onclick="showVoiceOptions()" style="padding: 5px 10px; background: #3d5a80; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Voice Options
      </button>
    </div>
  `;
  
  // Insert before the documentation links
  const docsSection = helpModal.querySelector('p:last-of-type');
  helpModal.insertBefore(voiceSettings, docsSection);
  
  // Add event listener
  document.getElementById('auto-voice-toggle').onchange = (e) => {
    voiceConfig.enabled = e.target.checked;
    localStorage.setItem('marmVoiceEnabled', voiceConfig.enabled);
  };
}

/**
 * Show voice options dialog
 */
export function showVoiceOptions() {
  alert(`Available voices: ${availableVoices.length}\nCurrent voice: ${voiceConfig.voice || 'Default'}\n\nFor better voices, try using Chrome or Edge browsers.`);
}

/**
 * Initialize voice functionality
 */
export function initializeVoice() {
  // Check for speech synthesis support
  if (!window.speechSynthesis) {
    console.error("Speech synthesis unavailable");
    voiceConfig.enabled = false;
    // Hide voice buttons
    document.querySelectorAll('.voice-btn').forEach(btn => btn.style.display = 'none');
    return;
  }
  
  // Load voices when ready
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  
  // Load voice settings from localStorage
  try {
    voiceConfig.enabled = localStorage.getItem('marmVoiceEnabled') === 'true';
  } catch (e) {
    voiceConfig.enabled = false;
  }
  
  // Add keyboard shortcuts for voice control
  document.addEventListener('keydown', (e) => {
    // Escape to stop current speech
    if (e.key === 'Escape') {
      speechSynthesis.cancel();
      document.querySelectorAll('.bot-message').forEach(msg => {
        msg.classList.remove('speaking');
      });
    }
  });
  
  // Note: Functions are now properly scoped, no global pollution
}

/**
 * Debounce utility
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Cleanup voice resources
 */
export function cleanupVoice() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
} 
