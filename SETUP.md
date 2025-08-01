## Local Download Setup

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.
- [SETUP.md](SETUP.md) - Local download setup guide

---

[![Requirements](https://img.shields.io/badge/Requirements-Node.js%20v16%2B-blue?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

### Quick Start Options

### Option 1: Try Online (Recommended)
Visit: https://marm-systems-chatbot.onrender.com
- No setup required
- Full MARM protocol support
- Voice synthesis, dark mode, mobile responsive

### Option 2: Local Installation
Follow this guide to run MARM locally with your own AI provider.

---

## Prerequisites

- **Node.js** (v16 or higher)
- **Git** (for cloning)
- **AI API Key** (Gemini, OpenAI, or Claude)

### Install Node.js
```bash
# Windows: Download from https://nodejs.org/
# macOS: 
brew install node

# Linux:
sudo apt update
sudo apt install nodejs npm
```

### Verify Installation
```bash
node --version
npm --version
```

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Lyellr88/MARM-Systems.git
cd MARM-Systems/webchat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Your AI API Key

#### For Gemini (Default):
1. Visit: https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the key

#### For OpenAI (GPT-4):
1. Visit: https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key

#### For Claude (Anthropic):
1. Visit: https://console.anthropic.com/
2. Create a new API key
3. Copy the key

### 4. Configure Environment

Create a `.env` file in the `webchat` directory:
```bash
# Create .env file
touch .env
```

Add your configuration to `.env`:
```bash
# Choose your AI provider (gemini, openai, claude)
AI_PROVIDER=gemini

# Add your API key
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### 5. Start the Server
```bash
npm start
```

### 6. Open in Browser
Visit: http://localhost:8080

---

## Universal AI Provider Setup

### Using Different AI Providers

MARM supports multiple AI providers. To switch providers:

1. **Update your `.env` file:**
```bash
# For OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_key

# For Claude
AI_PROVIDER=claude
ANTHROPIC_API_KEY=your_claude_key

# For Gemini (default)
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key
```

2. **Restart the server:**
```bash
npm start
```

### Provider-Specific Notes

#### Gemini (Default)
- **Model:** gemini-2.5-pro
- **Cost:** Free tier available
- **Best for:** General use, good performance

#### OpenAI (GPT-4)
- **Model:** gpt-4
- **Cost:** Pay-per-use
- **Best for:** Advanced reasoning, coding

#### Claude (Anthropic)
- **Model:** claude-3-sonnet-20240229
- **Cost:** Pay-per-use
- **Best for:** Writing, analysis

---

## Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### "API key not found" errors
1. Check your `.env` file exists
2. Verify API key is correct
3. Restart the server

#### "Port already in use" errors
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
PORT=3000 npm start
```

#### "CORS errors" (if accessing from different domain)
The server is configured for localhost only. For production deployment, additional CORS configuration is needed.

---

## File Structure

```
MARM-Systems/
├── webchat/
│   ├── src/
│   │   ├── chatbot/          # Core chatbot logic
│   │   ├── logic/            # MARM protocol logic
│   │   └── geminiHelper.js   # Default Gemini integration
│   ├── universalAIHelper.js  # Universal AI provider support
│   ├── config.js             # AI provider configuration
│   ├── package.json          # Dependencies
│   ├── .env                  # Your API keys (create this)
│   └── index.html            # Main interface
├── GitHub docs/              # Documentation
└── README.md                 # Project overview
```

---

## Development

### Making Changes
1. Edit files in `webchat/src/`
2. Server auto-restarts on changes
3. Refresh browser to see updates

### Adding New AI Providers
1. Edit `universalAIHelper.js`
2. Add new provider method
3. Update `config.js`
4. Test with new API key

---

## Support

- **Issues:** https://github.com/Lyellr88/MARM-Systems/issues
- **Documentation:** See `GitHub docs/` folder
- **Live Demo:** https://marm-systems-chatbot.onrender.com

---

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Lyellr88/MARM-Systems/blob/main/LICENSE) file for details. 

</details>
 
