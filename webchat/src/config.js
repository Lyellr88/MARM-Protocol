// config.js - AI provider configuration

export const AI_CONFIG = {
  provider: process.env.AI_PROVIDER || 'gemini',
  models: {
    gemini: 'gemini-2.5-pro',
    openai: 'gpt-4',
    claude: 'claude-3-sonnet-20240229'
  }
};
