// Config: commands, session settings, and app constants
export const COMMANDS = [
  '/log [entry]',
  '/contextual reply',
  '/show reasoning',
  '/compile [name] --summary',
  '/notebook add key:value',
  '/notebook get key',
  '/notebook all',
  '/reset'
];

export const SESSION = {
  maxHistory: 50,
  maxTokens: 8000,
  logSchema: 'YYYY-MM-DD | User | Intent | Outcome',
  storageKey: 'marm-sessions-v1',
  lastSessionKey: 'marm-last-session'
};

export const ERRORS = {
  marmNotActive: 'MARM not active (unexpected).',
  invalidLogFormat: 'Invalid format. Use: /log YYYY-MM-DD|user|intent|outcome',
  noLogEntry: 'Provide entry: /log YYYY-MM-DD|user|intent|outcome',
  unknownCommand: 'Unknown command. Type /help for available commands.',
  apiError: 'Sorry, I encountered an error. Please try again.'
};

export const WELCOME_MESSAGES = {
  newSession: 'MARM activated. Ready to log context.',
  marmDescription: 'MARM helps maintain conversation memory and provides accurate, transparent responses with reasoning trails.',
  previousSession: 'Previous session detected. Continue chatting or type /reset to start fresh.',
  sessionReset: 'Session reset. Starting fresh with MARM activated.'
};
