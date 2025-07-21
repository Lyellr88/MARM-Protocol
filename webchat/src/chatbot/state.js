// state.js - Centralized state management for MARM chatbot

const STATE_KEY = 'marm-current-state';

/**
 * Application state with validation
 */
export const state = { 
  isMarmActive: false, 
  currentSessionId: null 
};

/**
 * Save current state to localStorage
 */
function persistState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state:', e);
  }
}

/**
 * Restore state from localStorage
 */
function restoreState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      // Validate before applying - if validation fails, catch and reset
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

/**
 * Reset to default state without persisting (used during restore failures)
 */
function resetToDefaults() {
  state.isMarmActive = false;
  state.currentSessionId = null;
  // Don't call persistState() here to avoid infinite loops during restore
}

// Restore state when module loads
restoreState();

/**
 * State validation functions
 */
export function validateState(newState) {
  if (typeof newState.isMarmActive !== 'boolean') {
    throw new Error('isMarmActive must be boolean');
  }
  if (newState.currentSessionId && typeof newState.currentSessionId !== 'string') {
    throw new Error('currentSessionId must be string or null');
  }
  return true;
}

/**
 * Safe state update with validation
 */
export function updateState(updates) {
  const newState = { ...state, ...updates };
  validateState(newState);
  Object.assign(state, newState);
  persistState(); // Save state whenever it changes
  return state;
}

/**
 * Get current state (read-only)
 */
export function getState() {
  return { ...state };
}

/**
 * Reset state to initial values
 */
export function resetState() {
  state.isMarmActive = false;
  state.currentSessionId = null;
  persistState(); // Save the reset state
} 
