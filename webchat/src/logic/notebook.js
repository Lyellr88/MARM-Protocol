// notebook.js - User knowledge library management and storage functions

import { ensureSession, trimSessionSize, persistSessions } from './session.js';
import { stripHTML, validateNotebookEntry, debounce } from './utils.js';

// ===== NOTEBOOK SAFETY LIMITS =====
const NOTEBOOK_LIMITS = {
  MAX_ENTRIES: 30,          
  MAX_TOTAL_SIZE: 30000,     
  RATE_LIMIT_MS: 300,      
  MAX_ENTRY_SIZE: 2048     
};

// Rate limiting for notebook saves
let lastNotebookSave = 0;
const rateLimitedAddEntry = debounce((id, key, value) => {
  const now = Date.now();
  if (now - lastNotebookSave < NOTEBOOK_LIMITS.RATE_LIMIT_MS) {
    return '⚠️ Please wait before saving another notebook entry.';
  }
  lastNotebookSave = now;
  return addNotebookEntry(id, key, value);
}, NOTEBOOK_LIMITS.RATE_LIMIT_MS);

function addNotebookEntry(id, key, value) {
  const s = ensureSession(id);
  key = stripHTML(key);
  value = stripHTML(value);
  
  if (!validateNotebookEntry(key, value)) {
    return 'Invalid notebook entry. Key must be 1-64 chars (letters, numbers, dash, space). Value must be 1-2048 chars.';
  }
  
  const currentEntries = Object.keys(s.notebook).length;
  if (currentEntries >= NOTEBOOK_LIMITS.MAX_ENTRIES) {
    return `⚠️ Notebook is full (${NOTEBOOK_LIMITS.MAX_ENTRIES} entries max). Delete some entries first.`;
  }
  
  // Check total size limit
  const currentSize = JSON.stringify(s.notebook).length;
  const newEntrySize = JSON.stringify({ [key]: value }).length;
  if (currentSize + newEntrySize > NOTEBOOK_LIMITS.MAX_TOTAL_SIZE) {
    return `⚠️ Notebook storage limit reached (${NOTEBOOK_LIMITS.MAX_TOTAL_SIZE} chars max). Delete some entries first.`;
  }
  
  s.notebook[key] = value;
  trimSessionSize(s);
  persistSessions();
  return `Stored "${key}" → "${value}"`;
}

function getNotebookEntry(id, key) {
  const s = ensureSession(id);
  if (!key) return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show:';
  return s.notebook[key] ? `"${key}": ${s.notebook[key]}` : `No entry for "${key}"`;
}

function listNotebookEntries(id) {
  const s = ensureSession(id);
  const keys = Object.keys(s.notebook);
  if (!keys.length) return 'Notebook is empty.';
  
  const totalSize = JSON.stringify(s.notebook).length;
  const usage = `📊 Usage: ${keys.length}/${NOTEBOOK_LIMITS.MAX_ENTRIES} entries, ${totalSize}/${NOTEBOOK_LIMITS.MAX_TOTAL_SIZE} chars`;
  
  const entries = keys.map(k => `• ${k}: ${s.notebook[k]}`).join('\n');
  return `${usage}\n\nNotebook entries:\n${entries}`;
}

function deleteNotebookEntry(id, key) {
  const s = ensureSession(id);
  if (!key) return 'Usage: /notebook delete:[name]';
  
  if (!s.notebook[key]) {
    return `No entry found for "${key}"`;
  }
  
  delete s.notebook[key];
  persistSessions();
  return `Deleted "${key}" from notebook`;
}

export function manageUserNotebook(id, action, key = '', value = '') {
  switch (action) {
    case 'add':
      return rateLimitedAddEntry(id, key, value);
    case 'get':
      return getNotebookEntry(id, key);
    case 'all':
      return listNotebookEntries(id);
    case 'delete':
      return deleteNotebookEntry(id, key);
    default:
      return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show: | /notebook delete:[name]';
  }
} 
