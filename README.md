# MARM: Memory Accurate Response Mode [![Featured on Google](https://img.shields.io/badge/Featured%20on-Google-blue?style=flat-square&logo=google&logoColor=white)](https://www.google.com/search?q=what+is+marm+memory+accurate+response+mode)   

**AI forgetting your project mid‑chat? MARM fixes that.**

![Stars](https://img.shields.io/github/stars/Lyellr88/MARM-Protocol?style=flat-square) ![Forks](https://img.shields.io/github/forks/Lyellr88/MARM-Protocol?style=flat-square)

[**Last updated: August 5th, 2025**]

---

### Overview

MARM is a protocol for AI reliability. It gives you control over memory and logic by letting you log sessions, store your own notes, and compile summaries. The result: fewer hallucinations, transparent reasoning, and conversations that stay on track.  
**Steer the AI instead of chasing it.**

> For copy-and-paste prompt users and full technical details, see [`PROTOCOL.md`](./PROTOCOL.md)

---

### 🛑 Read Before You Start

* Start MARM in a **new session** for best results  
* MARM **does not persist** across threads  
* To resume long sessions, use `/compile` and reseed manually  
* Commands are **manual by design** to ensure transparency and user control  

---

### Built For Research + Real Use

MARM is both a power-user tool and a research scaffold:

#### AI Safety & Reasoning Research
- Study systematic reasoning in language models  
- Analyze memory persistence across sessions  
- Measure hallucination reduction with structured prompts  

#### Business Intelligence
- Maintain context across long analytical threads  
- Build organizational knowledge into sessions  
- Reinforce consistent decision-making frameworks  

#### Educational & Training Use
- Teach critical thinking via structured interaction  
- Build personalized learning repositories  
- Guide model reasoning with user-curated facts  

**Also built for:**
- Prompt engineers stress-testing LLMs  
- Multi-session AI power users  
- Writers/system builders tired of re-explaining logic  

**Not built for:**  
Small talk • Throwaway chats • Passive use  

---

### Why MARM?

Modern LLMs often lose context or fabricate information. MARM introduces a session memory kernel, structured logs, and a user-controlled knowledge library. Anchoring the AI to *your* logic and data.  
It’s more than a chatbot wrapper. it’s a methodology for accountable AI.

---

### Key Features

#### Core Protocol
- **Session memory kernel** – Tracks user intent and prompts clarification  
- **Structured logs** – Use `/log` and `/compile` to build summaries  
- **Personal library** – Use `/notebook` to guide model outputs with your notes  
- **Accuracy guardrails** – Optional logic checks to reduce false outputs  

#### User Experience
- **Save and revisit chat sessions** - Name and organize your conversations  
- **Start new chats instantly** - Fresh conversations with one click  
- **Built-in token counter** - Track your LLM usage  
- **Dark mode and custom backgrounds** - Easy on the eyes for long sessions  
- **Command menu for advanced control** - Quick access to all MARM features  
- **Notebook for persistent user knowledge** - Store your own notes and project data  
- **Session persistence** - Your chat stays active even if you refresh or close the page  
- **Voice synthesis** - Listen to MARM responses (Chrome/Edge recommended)  
- **Real-time MARM protocol** - All commands work exactly as documented  
- **No setup required** - Just open and start chatting  
- **Professional error handling** - Clear feedback when things go wrong  

---

### Command Overview

#### Session Commands
- `/start marm` → Activate protocol  
- `/refresh marm` → Reaffirm/reset context  

#### Core Commands
- `/log` → Start structured session logging  
- `/notebook` → Store key data  
- `/compile` → Summarize and reseed sessions  

#### Advanced Tools
- `/contextual reply` → Request context-aware response  
- `/show reasoning` → Reveal logic trail of last answer  

#### Quick Start

```text
/start marm  
/log entry [Date - Summary - Result]  
/compile SessionName --summary
```

Need a walkthrough or troubleshooting help? The [`HANDBOOK.md`](./HANDBOOK.md) covers all aspects of using MARM.

---

### 🚀 Try MARM Live

**Experience MARM v1.5.0 in action!** Save sessions, change themes, hear responses.

#### Launch MARM Chatbot → <a href="https://marm-systems-chatbot.onrender.com">
  <img src="https://img.shields.io/badge/🤖_Live_Demo-Try_MARM_Now_On_Render-4285F4?style=for-the-badge" width="280">
</a>

<div>
   
<img src="media/marm-chatbot1.png" width="320"/>   
<img src="media/marm-chatbot2.png" width="320"/>   
<img src="media/marm-chatbot3.png" width="320"/>   

</div>

---

### Install Locally

```bash
git clone https://github.com/Lyellr88/MARM-Systems.git
cd MARM-Systems/webchat
npm install
# Add your API keys to .env
npm start
```

Detailed setup: [`SETUP.md`](./SETUP.md)

---

### Contributing

I'm looking for contributors interested in:

* **AI reasoning research** – Improve systematic thinking protocols
* **Framework development** – Enhance memory/accuracy layers
* **Evaluation metrics** – Score reasoning quality and reliability
* **pplication research** – Explore new use cases and workflows

#### Get Involved

1. Try the [demo](https://marm-systems-chatbot.onrender.com) and share feedback
2. Open [issues](https://github.com/Lyellr88/MARM-Systems/issues) for bugs or features
3. Join GitHub discussions about AI reliability

---
 
### Feedback & Community Mentions

MARM is actively being tested and adopted across platforms.

- Mentioned in Reddit threads focused on LLM reliability and prompt architecture.
- Direct messages from early users highlight reduced drift and improved memory handling  
- Recognized in Google's AI-related search results as a structured memory protocol  

**Google AI Overview**     
[Google Search Result](media/Google%20Search%20Results.jpg)      

**Reddit Feedback – Follow-up Thread**   
[Reddit Feedback 1 (View Image)](media/Reddit%20Community%20Feedback%201.jpg)      

**Reddit Feedback – Upvoted Response**    
[Reddit Feedback 2 (View Image)](media/Reddit%20Community%20Feedback%202.jpg)      

*Additional feedback and screenshots will be added as adoption grows.*

---

### Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.
- [SETUP.md](SETUP.md) - Local download setup guide.
- [PROTOCOL.md](PROTOCOL.md) - Quick Start, Copy and Paste Protocol, and Limitations.
