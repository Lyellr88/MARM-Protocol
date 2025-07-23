# MARM Systems Chatbot

Welcome to your MARM Protocol-powered chatbot project!  
This repo is scaffolded for rapid deployment on GitHub Pages and includes all protocol docs, command guides, and help resources.

## Quick Start

### Coming Soon

---

## Directory Index

```
webchat/
├── data/
│   ├── marmreadme.md         # MARM Protocol v1.4 documentation
│   ├── description.md        # Protocol overview + audio walkthrough link
│   ├── faq.md                # Frequently asked questions
│   ├── handbook.md           # User guide and command reference
│   └── roadmap.md            # Development roadmap and future plans
├── src/
│   ├── geminiHelper.js       # Gemini API integration with error handling
│   ├── chatbot/
│   │  ├── chatbot.js         # Main entry point/barrel export module for chatbot functions
│   │   ├── commands.js       # Command handling (/start, /log, /compile, etc.)
│   │   ├── core.js           # Main orchestration and state management
│   │   ├── state.js          # [inferred from imports]
│   │   ├── ui.js             # UI rendering, message handling, voice controls
│   │   └── voice.js          # Voice synthesis and speech functionality initialization
│   └── logic/
│       ├── constants.js
│       ├── docs.js           # Documentation loading and search functionality
│       ├── marmLogic.js      # [inferred from imports]
│       ├── notebook.js       # User notebook management - add/get/show key-value entries with validation
│       ├── session.js        # [inferred from imports]
│       ├── summary.js        # Session compilation and summary generation
│       └── utils.js          # Utility functions (validation, debounce, etc.)
└── style/
│   ├── animation.css         # Animation effects and transitions
│   ├── base.css              # Core styling and CSS variables
│   ├── chat.css              # Chat interface and message styling
│   ├── command-menu.css      # Command menu and autocomplete styling│
│   ├── components.css        # Reusable UI component styles
│   ├── dark-mode.css         # Dark theme implementation│
│   └── main.css              # Main stylesheet imports and overrides
└── index.html                # Main MARM chatbot web app
```

---

## Listen: Audio Walkthrough

[🎧 Listen to the 5-minute MARM Walkthrough (MP3)](media/media_MARM_Audio_Walkthrough.mp3)

---

## Reference Documentation

- [HANDBOOK](HANDBOOK.md) (user guide)
- [FAQ](FAQ.md)
- [DESCRIPTION](DESCRIPTION.md)

---

## License

See [LICENSE](LICENSE).
