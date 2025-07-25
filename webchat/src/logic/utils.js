// General utility functions for MARM logic

export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function stripHTML(input) {
  return input.replace(/<[^>]*>?/gm, '');
}

export function validateNotebookEntry(key, value) {
  if (!key || typeof key !== 'string' || key.length > 64 || !/^[\w\- ]+$/.test(key)) return false;
  if (!value || typeof value !== 'string' || value.length > 2048) return false;
  return true;
}

export function validateLogEntry(entry) {
  return /^\s*\d{4}-\d{2}-\d{2}\s*[-|] .+ [-|] .+/.test(entry);
}

export function checkProtocolCompliance(type, data) {
  if (type === 'log') return validateLogEntry(data);
  if (type === 'notebook') return validateNotebookEntry(data.key, data.value);
  return true;
}

export function estimateTokens(str) {
  return Math.ceil((str || '').length / 3.5);
} 
