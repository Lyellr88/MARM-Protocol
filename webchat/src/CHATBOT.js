// MARM Protocol Chatbot core logic (basic stub)
import { COMMANDS, TONE, SESSION } from './config.js';

// Simple in-memory session (replace with localStorage or backend for persistence)
let session = {
  active: false,
  logs: [],
  notebook: {},
  hypeMode: false,
};

window.handleUserMessage = function (msg) {
  // Command parsing
  const lower = msg.trim().toLowerCase();
  if (lower === '/start marm') {
    session.active = true;
    window.appendBotMessage('MARM activated. Ready to log context.');
    return;
  }
  if (lower.startsWith('/log')) {
    const label = msg.slice(4).trim();
    if (label) {
      session.logs.push({ label, time: new Date().toISOString() });
      window.appendBotMessage(`Logged session: ${label}`);
    } else {
      window.appendBotMessage('Please provide a session name. Example: /log BrainstormX');
    }
    return;
  }
  if (lower.startsWith('/notebook')) {
    const entry = msg.slice(9).trim();
    if (entry.includes(':')) {
      const [label, ...rest] = entry.split(':');
      session.notebook[label.trim()] = rest.join(':').trim();
      window.appendBotMessage(`Notebook entry saved: ${label.trim()}`);
    } else {
      window.appendBotMessage('Usage: /notebook [label]: [info]');
    }
    return;
  }
  if (lower === '/activate hype') {
    session.hypeMode = true;
    window.appendBotMessage('Hype Mode activated. Get ready for some energized responses!');
    return;
  }
  if (lower === '/deactivate hype') {
    session.hypeMode = false;
    window.appendBotMessage('Returning to neutral tone. Hype Mode off.');
    return;
  }
  // Add more command logic here...

  // Default: simple echo
  window.appendBotMessage('(Stub) Echo: ' + msg);
};
