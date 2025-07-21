// General utility functions for MARM logic

// Debounce utility
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Strip HTML tags for sanitization
export function stripHTML(input) {
  return input.replace(/<[^>]*>?/gm, '');
}

// Validate notebook key/value
export function validateNotebookEntry(key, value) {
  if (!key || typeof key !== 'string' || key.length > 64 || !/^[\w\- ]+$/.test(key)) return false;
  if (!value || typeof value !== 'string' || value.length > 2048) return false;
  return true;
}

// Validate log entry format: [Date-Summary-Result]
export function validateLogEntry(entry) {
  // Accepts: 2024-06-01 - Did X - Result Y
  return /^\s*\d{4}-\d{2}-\d{2}\s*[-|] .+ [-|] .+/.test(entry);
}

// Protocol compliance check (logs, notebook)
export function checkProtocolCompliance(type, data) {
  if (type === 'log') return validateLogEntry(data);
  if (type === 'notebook') return validateNotebookEntry(data.key, data.value);
  return true;
}

// Improved token estimation (rough, but better)
export function estimateTokens(str) {
  // Roughly 1 token per 3.5 chars for English text
  return Math.ceil((str || '').length / 3.5);
} 
