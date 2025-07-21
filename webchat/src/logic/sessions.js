import { PROTOCOL_VERSION, MARM_PROTOCOL_TEXT, RESPONSE_FORMATTING_RULES } from './constants.js';
import { validateLogEntry, estimateTokens } from './utils.js';
import { loadDocs } from './docs.js';

let sessions = {};
const LS_KEY = 'marm-sessions-v1';
const CURRENT_SESSION_KEY = 'marm-current-session'; // New key for current session only
const MAX_SESSIONS = 50;
const SESSION_EXPIRY_DAYS = 30;
const MAX_SESSION_SIZE = 35000;
const PRUNING_THRESHOLD = 5000; // Start pruning old messages when session exceeds 5KB

function ensureSession(id) {
  if (!sessions[id]) sessions[id] = {
    history: [],
    logs: [],
    notebook: {},
    lastReasoning: '',
    created: Date.now()
  };
  return sessions[id];
}

function pruneOldSessions() {
  const now = Date.now();
  const ids = Object.keys(sessions);
  ids.forEach(id => {
    const s = sessions[id];
    if (s.created && (now - s.created) > SESSION_EXPIRY_DAYS * 86400000) {
      delete sessions[id];
    }
  });
  let remaining = Object.keys(sessions);
  if (remaining.length > MAX_SESSIONS) {
    remaining.sort((a, b) => (sessions[a].created || 0) - (sessions[b].created || 0));
    remaining.slice(0, remaining.length - MAX_SESSIONS).forEach(id => delete sessions[id]);
  }
}

function trimSessionSize(s) {
  let total = (JSON.stringify(s.history).length + JSON.stringify(s.logs).length);
  // Start pruning when session exceeds 5KB to keep it lean
  while (total > PRUNING_THRESHOLD && s.history.length > 0) {
    s.history.shift();
    total = (JSON.stringify(s.history).length + JSON.stringify(s.logs).length);
  }
  // Hard limit at 35KB - remove logs if necessary
  while (total > MAX_SESSION_SIZE && s.logs.length > 0) {
    s.logs.shift();
    total = (JSON.stringify(s.history).length + JSON.stringify(s.logs).length);
  }
}

function persistSessions() {
  pruneOldSessions();
  // Only persist to long-term storage if user has enabled persistence
  const isPersistenceEnabled = localStorage.getItem('marm-persistence-enabled') === 'true';
  if (isPersistenceEnabled) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(sessions)); } catch (_) {}
  }
}

function persistCurrentSession() {
  // Always persist current session for refresh protection
  try { 
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(sessions)); 
  } catch (_) {}
}

function restoreSessions() {
  // Always restore current session first (for refresh protection)
  try {
    const currentRaw = localStorage.getItem(CURRENT_SESSION_KEY);
    if (currentRaw) sessions = JSON.parse(currentRaw);
  } catch (_) { sessions = {}; }
  
  // Then merge in long-term saved sessions if user has persistence enabled
  const isPersistenceEnabled = localStorage.getItem('marm-persistence-enabled') === 'true';
  if (isPersistenceEnabled) {
    try {
      const savedRaw = localStorage.getItem(LS_KEY);
      if (savedRaw) {
        const savedSessions = JSON.parse(savedRaw);
        // Merge saved sessions with current session (current takes priority)
        sessions = { ...savedSessions, ...sessions };
      }
    } catch (_) {}
  }
}
restoreSessions();

export {
  sessions,
  ensureSession,
  pruneOldSessions,
  trimSessionSize,
  persistSessions,
  persistCurrentSession,
  restoreSessions,
  LS_KEY,
  CURRENT_SESSION_KEY,
  MAX_SESSIONS,
  SESSION_EXPIRY_DAYS,
  MAX_SESSION_SIZE,
  PRUNING_THRESHOLD
};

// --- Core API functions ---

export function getSessionContext(id) {
  const s = sessions[id];
  if (!s) {
    return `MARM v${PROTOCOL_VERSION}\n\n` + MARM_PROTOCOL_TEXT + '\n\n' + RESPONSE_FORMATTING_RULES;
  }
  let context = `You are operating under MARM v${PROTOCOL_VERSION} protocol:\n\n${MARM_PROTOCOL_TEXT}\n\n${RESPONSE_FORMATTING_RULES}\n\n`;
  context += `Current Session ID: ${id}\n\n`;
  const notebookKeys = Object.keys(s.notebook || {});
  if (notebookKeys.length > 0) {
    context += `Current Notebook Contents:\n`;
    notebookKeys.forEach(key => {
      context += `- ${key}: ${s.notebook[key]}\n`;
    });
    context += '\n';
  }
  if (s.logs && s.logs.length > 0) {
    context += `Recent Log Entries:\n`;
    s.logs.slice(-5).forEach(log => {
      context += `- ${log}\n`;
    });
    context += '\n';
  }
  const tail = s.history.slice(-20).map(m => `${m.role}: ${m.content}`).join('\n');
  if (tail) {
    context += `Conversation History:\n${tail}`;
  }
  return context;
}

export async function activateMarmSession(id = 'default_session') {
  pruneOldSessions();
  await loadDocs();
  ensureSession(id);
  persistCurrentSession(); // Always persist current session
  persistSessions(); // Persist to long-term storage if enabled
  return `MARM session activated (v${PROTOCOL_VERSION}). Docs loaded.`;
}

export function updateSessionHistory(id, userText, botText, reasoning = '') {
  const s = ensureSession(id);
  s.history.push({ role: 'user', content: userText, ts: Date.now() });
  s.history.push({ role: 'bot', content: botText, ts: Date.now() });
  if (reasoning) s.lastReasoning = reasoning;
  trimSessionSize(s);
  persistCurrentSession(); // Always persist current session
  persistSessions(); // Persist to long-term storage if enabled
}

export function setSessionReasoning(id, reasoning) {
  const s = ensureSession(id);
  s.lastReasoning = reasoning;
  persistCurrentSession(); // Always persist current session
  persistSessions(); // Persist to long-term storage if enabled
}

export function logSession(id, logLine) {
  if (!validateLogEntry(logLine)) {
    return 'Invalid log entry format. Use: [Date-Summary-Result]';
  }
  const s = ensureSession(id);
  s.logs.push(logLine);
  trimSessionSize(s);
  persistCurrentSession(); // Always persist current session
  persistSessions(); // Persist to long-term storage if enabled
  return `Logged: ${logLine}`;
}

export function trimForContext(id, maxTokens = 8000) {
  const s = sessions[id];
  if (!s) return;
  const estTokens = arr => arr.reduce((t, m) => t + estimateTokens(m.content), 0);
  while (estTokens(s.history) > maxTokens) s.history.shift();
}

export function resetSession(id) {
  delete sessions[id];
  persistCurrentSession(); // Always persist current session
  persistSessions(); // Persist to long-term storage if enabled
  return 'Session reset. Starting fresh.';
}

export function getAllSessions() {
  return Object.keys(sessions);
}

export function getMostRecentBotResponseLogic(id) {
  const s = sessions[id];
  return s?.lastReasoning || '';
} 
