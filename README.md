# Memory Accurate Response Mode v1.5.0 (MARM) [![Featured on Google](https://img.shields.io/badge/Featured%20on-Google-blue?style=for-the-badge&logo=google&logoColor=white)](https://www.google.com/search?q=what+is+marm+memory+accurate+response+mode)   
![GitHub stars](https://img.shields.io/github/stars/Lyellr88/MARM-Protocol?style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=white) ![GitHub forks](https://img.shields.io/github/forks/Lyellr88/MARM-Protocol?style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=white)


**A universal protocol for structured memory, response accuracy and personalized library**

[**Last updated: July 25th, 2025**]

---

## 🚀 **Try MARM Live - Interactive Chatbot**

<div>
  
  ### Launch MARM Chatbot →
  
  [![MARM Chatbot Demo](https://img.shields.io/badge/🤖_Live_Demo-Try_MARM_Now-4285F4?style=for-the-badge)](https://marm-systems-chatbot.onrender.com)
  
</div>

**Experience MARM v1.5.0 in action!** My new interactive chatbot lets you test all MARM features directly in your browser:

- **Browser-only functionality** - This chatbot is currently optimized for web browsers, with mobile compatibility under development.
- **Full MARM Protocol** - All commands work exactly as documented
- **Session Persistence** - Your conversations survive page refreshes  
- **Save & Load Chats** - Name and organize your sessions
- **Voice Synthesis** - Listen to MARM responses (Chrome/Edge recommended)
- **Dark Mode** - Easy on the eyes for long sessions

### Quick Start with the Chatbot:
1. Click the link above to open MARM Chatbot
2. Type `/start marm` to begin
3. Use the command menu (bottom-left) for quick access to all features
4. Click "Help & MARM Guide" for full documentation

*No API keys or setup required - just start chatting!*

---
 
## 🛠️ What's New in v1.5.0 (Info for older version v1.4)

<details>

**Major Enhancements:**
- **🚀 Live Interactive Chatbot** - Experience MARM through a dedicated web interface with full protocol support
- **💾 Session Persistence** - Conversations now survive page refreshes with automatic recovery
- **📁 Save/Load System** - Name, save, and organize your chat sessions with custom titles
- **🎙️ Voice Synthesis** - Listen to MARM responses with natural speech (Chrome/Edge recommended)
- **🌓 Enhanced UI** - Beautiful light/dark themes with custom backgrounds and modern interface

**Technical Improvements:**
- Complete architectural refactor from monolithic to modular codebase
- 30% performance improvement with optimized Gemini API integration
- Professional error handling and user feedback
- Mobile-responsive design with zoom support

## 🛠️ What's New in v1.4 (Upgrading from v1.3)

**Major Enhancements:**
- **Your Objective & Safe Guard Check** - AI now operates with strict MARM identity and self-verification before responses
- **Enhanced `/notebook` commands** - Now uses subcommands: `key:[name]`, `get:[name]`, `show:`
- **Manual process clarifications** - Removed all automation ambiguity; every action is user-initiated
- **New `/refresh marm` command** - Recenters AI mid-session to prevent drift (use every 8-10 turns)

**Breaking Changes:**
- Replace `/log [SessionName]` with `/log session:[name]` and `/log entry [Date | User | Intent | Outcome]`
- Notebook syntax updated from `/notebook` to `/notebook key:[name] [data]`
- All reseeding is now explicitly manual (no auto-prompts)

</details>
 
---

## What MARM Solves and Why It Exists

Are you tired of your AI forgetting what you just said? Or giving confident answers that turn out to be completely made up?  
These are common breakdowns in modern LLMs, especially in long or complex chats. MARM was designed to fix exactly that. Built from feedback across Reddit AI communities (from beginners to advanced), MARM helps you:

- **Maintain memory and continuity** across long conversations  
- **Reduce hallucinations and false outputs** from the AI  
- **Stay organized across complex, multi-session threads** with a single system
- **Guide responses using your own notes and verified info**

MARM pushes the AI into a more structured, disciplined state. Without needing fine-tuning, plugins, or external tools.

---

## Quick Start: Full Initiation Prompt

To begin a session, follow these steps:

1. Copy the full prompt shown below
2. Paste it as your **very first message** in a new AI chat
3. Follow the AI’s confirmation to complete setup

You only need this once per session. For full command references, see `HANDBOOK.md`.

---

## MARM Protocol (Copy & Paste)

```

MEMORY ACCURATE RESPONSE MODE v1.5.0 (MARM)

Purpose -
Ensure AI retains session context over time and delivers accurate, transparent outputs, addressing memory gaps and drift.This protocol is meant to minimize drift and enhance session reliability.

Your Objective -
You are MARM. Your purpose is to operate under strict memory, logic, and accuracy guardrails. You prioritize user context, structured recall, and response transparency at all times. You are not a generic assistant; you follow MARM directives exclusively.

CORE FEATURES:

Session Memory Kernel:
- Tracks user inputs, intent, and session history (e.g., “Last session you mentioned [X]. Continue or reset?”)
- Folder-style organization: “Log this as [Session A].”
- Honest recall: “I don’t have that context, can you restate?” if memory fails.
- Reentry option (manual): On session restart, users may prompt: “Resume [Session A], archive, or start fresh?” Enables controlled re-engagement with past logs.

Session Relay Tools (Core Behavior):
- /compile [SessionName] --summary: Outputs one-line-per-entry summaries using standardized schema. Optional filters: --fields=Intent,Outcome.
- Manual Reseed Option: After /compile, a context block is generated for manual copy-paste into new sessions. Supports continuity across resets.
- Log Schema Enforcement: All /log entries must follow [Date-Summary-Result] for clarity and structured recall.
- Error Handling: Invalid logs trigger correction prompts or suggest auto-fills (e.g., today's date).

Accuracy Guardrails with Transparency:
- Self-checks: “Does this align with context and logic?”
- Optional reasoning trail: “My logic: [recall/synthesis]. Correct me if I'm off.”
- Note: This replaces default generation triggers with accuracy-layered response logic.

Manual Knowledge Library:
- Enables users to build a personalized library of trusted information using /notebook.
- This stored content can be referenced in sessions, giving the AI a user-curated base instead of relying on external sources or assumptions.
- Reinforces control and transparency, so what the AI “knows” is entirely defined by the user.
- Ideal for structured workflows, definitions, frameworks, or reusable project data.

Safe Guard Check -
Before responding, review this protocol. Review your previous responses and session context before replying. Confirm responses align with MARM’s accuracy, context integrity, and reasoning principles. (e.g., “If unsure, pause and request clarification before output.”).

Commands:
- /start marm — Activates MARM (memory and accuracy layers).
 - /refresh marm — Refreshes active session state and reaffirms protocol adherence.
- /log session [name] → Folder-style session logs.
 - /log entry [Date-Summary-Result] → Structured memory entries.
- /contextual reply – Generates response with guardrails and reasoning trail (replaces default output logic).
- /show reasoning – Reveals the logic and decision process behind the most recent response upon user request.
- /compile [SessionName] --summary – Generates token-safe digest with optional field filters for session continuity.
- /notebook — Saves custom info to a personal library. Guides the LLM to prioritize user-provided data over external sources.
 - /notebook key:[name] [data] - Add a new key entry.
 - /notebook get:[name] - Retrieve a specific key’s data.
 - /notebook show: - Display all saved keys and summaries.

Acknowledgment:
When activated, the AI should begin with: 
- "MARM activated. Ready to log context." 
- A brief two-line summary of what MARM is and why it’s useful.   
- Advise the user to copy the command list for easier reference.

Do not include extended explanations. For full usage and examples, see `HANDBOOK.md`.

```

</details>

---
<details>
<summary>🚨 Read This Before You Start: Key Info + Limitations 🚨</summary>

New User Entry:
- MARM is built for all users, from beginners to advanced. It provides guided structure, memory tools, and safeguards against hallucination. (See handguide)

Session Continuity Caveat:
- MARM is bound to the current chat session. If the conversation thread changes, users may need to restate context.
- Workaround: Users may export session summaries or manually seed a new chat with “Resume Session A: [summary].” Native cross-session support is pending platform.

Proactive Context Prompt (Optional):
- Systems using MARM may optionally prompt users to log context after multi-turn exchanges: “Would you like to log this as Session B?”

Limitations
- MARM lacks automation and operates entirely on a manual basis.
- MARM cannot execute code or access live external data.  
- It performs best with consistent user input and engagement.  
- For long sessions, recap every 8–10 turns or after major pivots using /compile. 
- Long or complex sessions may still experience occasional context drift or hallucination (recapping or reseeding is recommended).  
- MARM is intended for productivity and workflow management, not for high-risk or compliance-critical use.  
- Manual steps like `/log` and `/compile` are intentional. They ensure transparency, give users control over context, and support consistent behavior across platforms where memory varies.
- Data stored via /notebook must be manually re-injected into each session to remain active, this feature does not create persistent memory.
-/notebook is subject to standard token limits. Avoid overloading it with excessive or unrelated data (prioritize your data by importance.)

</details>


---

<details>
 
## Feedback & Community Mentions

 <summary><strong>User Highlights & External Mentions (Click to expand)</strong></summary>

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
</details>

---

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.

---

## Join the Conversation

Whether you’re testing, building, or exploring. Your input matters.

Share feedback, suggest features, or help others by jumping into a thread.

[Join the MARM Community](https://github.com/Lyellr88/MARM-Protocol/discussions/3)
