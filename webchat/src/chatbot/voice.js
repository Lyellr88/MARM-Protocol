// voice.js - Web Speech API and voice synthesis functionality

// ===== VOICE CONFIGURATION =====
export const voiceConfig = {
  enabled: false,
  rate: 0.95,
  pitch: 1.0,
  voice: null
};

let availableVoices = [];

// ===== VOICE LOADING =====
export function loadVoices() {
  try {
    availableVoices = speechSynthesis.getVoices();
  } catch (e) {
    console.warn('Could not load voices:', e);
    availableVoices = [];
  }
  
  const preferredVoices = [
    'Google UK English Female',
    'Google UK English Male', 
    'Google US English',
    'Microsoft Zira Desktop',
    'Microsoft David Desktop',
    'Samantha',
    'Alex',
    'Karen',
    'Microsoft Zira',
    'Microsoft David',
    'Google UK English Female',
    'Google US English'
  ];
  
  let selectedVoice = null;
  for (const preferred of preferredVoices) {
    selectedVoice = availableVoices.find(v => v.name.includes(preferred));
    if (selectedVoice) break;
  }
  
  if (!selectedVoice) {
    selectedVoice = availableVoices.find(v => 
      v.lang.startsWith('en') && !v.default
    ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
  }
  
  if (selectedVoice && !voiceConfig.voice) {
    voiceConfig.voice = selectedVoice.name;
  }
}

// ===== TEXT-TO-SPEECH =====
export function speakText(text, isBot = true) {
  if (!isBot) return;
  
  speechSynthesis.cancel();
  
  let cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/```[\s\S]*?```/g, ' [code block removed] ')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^[-*]\s/gm, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/^#+\s/gm, '')
    .replace(/([.!?])\s*\n/g, '$1 ')
    .replace(/\n{2,}/g, '. ')
    .replace(/:/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (!cleanText) return;
  
  cleanText = cleanText
    .replace(/\. /g, '. ... ')
    .replace(/, /g, ', .. ')
    .replace(/\? /g, '? ... ')
    .replace(/! /g, '! ... ');
  
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  utterance.rate = voiceConfig.rate;
  utterance.pitch = voiceConfig.pitch;
  utterance.volume = 0.9;
  
  if (voiceConfig.voice) {
    const selectedVoice = availableVoices.find(v => v.name === voiceConfig.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      if (selectedVoice.name.includes('Google')) {
        utterance.rate = voiceConfig.rate * 0.95;
      }
    }
  }
  
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

// ===== VOICE UI INTEGRATION =====
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
  
  const docsSection = helpModal.querySelector('p:last-of-type');
  helpModal.insertBefore(voiceSettings, docsSection);
  
  document.getElementById('auto-voice-toggle').onchange = (e) => {
    voiceConfig.enabled = e.target.checked;
    localStorage.setItem('marmVoiceEnabled', voiceConfig.enabled);
  };
}

export function showVoiceOptions() {
  alert(`Available voices: ${availableVoices.length}\nCurrent voice: ${voiceConfig.voice || 'Default'}\n\nFor better voices, try using Chrome or Edge browsers.`);
}

// ===== VOICE INITIALIZATION =====
export function initializeVoice() {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis unavailable");
    voiceConfig.enabled = false;
    document.querySelectorAll('.voice-btn').forEach(btn => btn.style.display = 'none');
    return;
  }
  
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  
  try {
    voiceConfig.enabled = localStorage.getItem('marmVoiceEnabled') === 'true';
  } catch (e) {
    voiceConfig.enabled = false;
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      speechSynthesis.cancel();
      document.querySelectorAll('.bot-message').forEach(msg => {
        msg.classList.remove('speaking');
      });
    }
  });
}

// ===== UTILITY FUNCTIONS =====
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function cleanupVoice() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
} 
