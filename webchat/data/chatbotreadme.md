# MARM Protocol Chatbot Scaffold

Welcome to your MARM Protocol-powered chatbot project!  
This repo is scaffolded for rapid deployment on GitHub Pages and includes all protocol docs, command guides, and help resources.

---

## Quick Start

1. **Clone or download this repo.**
2. Open `index.html` in your browser, or push to GitHub and enable GitHub Pages.
3. Use the chatbot interface—try `/start marm`, `/log`, `/notebook`, etc.
4. Access help and user guides via the help button.

---

## Project Structure

```

├── index.html                # Main web app
├── src/
│   ├── chatbot.js            # Chat logic: command parsing, session, tone
│   ├── ui.js                 # UI rendering/events
│   └── config.js             # Command/tone/session settings
├── data/
│   ├── SYSTEM_DIAGNOSTIC.md  # Master protocol
│   ├── HANDBOOK.md           # User guide
│   ├── FAQ.md                # FAQ
│   ├── DESCRIPTION.md        # Protocol overview (+ audio link)
│   └── decision-tree.md      # (Optional: logic tree/notes)
├── media/
│   └── media_MARM_Audio_Walkthrough.mp3 # Audio walkthrough
├── style.css                 # Minimalist CSS
├── README.md                 # This file
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
