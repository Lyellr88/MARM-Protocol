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
- **Google Gemini API Key** (free tier available)

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

### 3. Get Your Gemini API Key

**MARM is built specifically for Google Gemini AI Pro 2.5 Free Tier**

1. **Visit:** https://aistudio.google.com/apikey
2. **Create a new API key**
3. **Copy the key**

#### 💡 Billing Information
- **Free tier is identical to paid:** - only difference is Google collects your data, good for testing or less sensitive data
- **No billing setup required:** - unless you want to disable data usage for improving Google's products
- **Paid plans available:** for higher usage if needed later

### 4. Configure Environment

Create a `.env` file in the `webchat` directory:
```bash
# Create .env file
touch .env
```

Add your Gemini API key to `.env`:
```bash
# Add your Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the Server
```bash
npm start
```

### 6. Open in Browser
Visit: http://localhost:8080

---

## About Gemini AI

### Why Gemini?

MARM is optimized specifically for Google's Gemini AI because:

- **🆓 Generous free tier:** 60 requests per minute
- **🧠 Excellent reasoning:** Perfect for MARM's memory and analysis features
- **⚡ Fast responses:** Quick processing for real-time conversations
- **🔒 Reliable:** Google's enterprise-grade infrastructure

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
 
