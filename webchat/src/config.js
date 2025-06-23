// Config: commands, tone, session (expand as needed)
export const COMMANDS = [
  '/start marm',
  '/log [name]',
  '/contextual reply',
  '/show reasoning',
  '/compile [name] --summary',
  '/notebook',
  '/activate hype',
  '/deactivate hype',
];

export const TONE = {
  default: 'neutral',
  hype: 'energized',
};

export const SESSION = {
  maxHistory: 50,
  logSchema: '[YYYY-MM-DD | User | Intent | Outcome]',
};
