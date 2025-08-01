// universalAIHelper.js - Universal AI provider support
class AIProvider {
  constructor(provider = 'gemini') {
    this.provider = provider;
    this.apiKey = this.getAPIKey();
  }

  getAPIKey() {
    switch(this.provider) {
      case 'gemini': return process.env.GEMINI_API_KEY;
      case 'openai': return process.env.OPENAI_API_KEY;
      case 'claude': return process.env.ANTHROPIC_API_KEY;
      default: return process.env.GEMINI_API_KEY;
    }
  }

  async generateContent(messages) {
    switch(this.provider) {
      case 'gemini': return this.callGemini(messages);
      case 'openai': return this.callOpenAI(messages);
      case 'claude': return this.callClaude(messages);
      default: return this.callGemini(messages);
    }
  }

  // Your existing Gemini code here
  async callGemini(messages) {
    // Copy your existing geminiHelper.js code
  }

  async callOpenAI(messages) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages.map(m => ({
          role: m.role === 'bot' ? 'assistant' : m.role,
          content: m.content
        }))
      })
    });
    return response;
  }

  async callClaude(messages) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        messages: messages.map(m => ({
          role: m.role === 'bot' ? 'assistant' : m.role,
          content: m.content
        }))
      })
    });
    return response;
  }
}

export default AIProvider;
