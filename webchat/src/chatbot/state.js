// state.js - Centralized state management for MARM chatbot

const STATE_KEY = 'marm-current-state';

// ===== APPLICATION STATE =====
export const state = { 
  isMarmActive: false, 
  currentSessionId: null 
};

// ===== STATE PERSISTENCE =====
function persistState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state:', e);
  }
}

// ===== STATE RESTORATION =====
function restoreState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      try {
        validateState(parsedState);
        Object.assign(state, parsedState);
        console.log('State restored:', state);
      } catch (validationError) {
        console.warn('Saved state failed validation, resetting to defaults:', validationError);
        resetToDefaults();
      }
    }
  } catch (e) {
    console.warn('Failed to restore state, using defaults:', e);
    resetToDefaults();
  }
}

// ===== STATE RESET =====
function resetToDefaults() {
  state.isMarmActive = false;
  state.currentSessionId = null;
}

restoreState();

// ===== STATE VALIDATION =====
export function validateState(newState) {
  if (typeof newState.isMarmActive !== 'boolean') {
    throw new Error('isMarmActive must be boolean');
  }
  if (newState.currentSessionId && typeof newState.currentSessionId !== 'string') {
    throw new Error('currentSessionId must be string or null');
  }
  return true;
}

// ===== STATE MANAGEMENT FUNCTIONS =====
export function updateState(updates) {
  const newState = { ...state, ...updates };
  validateState(newState);
  Object.assign(state, newState);
  persistState();
  return state;
}

export function getState() {
  return { ...state };
}

export function resetState() {
  state.isMarmActive = false;
  state.currentSessionId = null;
  persistState();
} 
