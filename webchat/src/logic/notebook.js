// notebook.js - User knowledge library management and storage functions

import { ensureSession, trimSessionSize, persistSessions } from './session.js';
import { stripHTML, validateNotebookEntry } from './utils.js';

function addNotebookEntry(id, key, value) {
  const s = ensureSession(id);
  key = stripHTML(key);
  value = stripHTML(value);
  if (!validateNotebookEntry(key, value)) {
    return 'Invalid notebook entry. Key must be 1-64 chars (letters, numbers, dash, space). Value must be 1-2048 chars.';
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
  const entries = keys.map(k => `• ${k}: ${s.notebook[k]}`).join('\n');
  return `Notebook entries:\n${entries}`;
}

export function manageUserNotebook(id, action, key = '', value = '') {
  switch (action) {
    case 'add':
      return addNotebookEntry(id, key, value);
    case 'get':
      return getNotebookEntry(id, key);
    case 'all':
      return listNotebookEntries(id);
    default:
      return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show:';
  }
} 
