# Memory Accurate Response Mode v1.2 (MARM) [![Featured on Google](https://img.shields.io/badge/Featured%20on-Google-blue?style=for-the-badge&logo=google&logoColor=white)](https://www.google.com/search?q=what+is+marm+memory+accurate+response+mode)                                                                                                         


**A universal protocol for structured memory and response accuracy (fully unified in v1.2)**

[**Last updated: June 21, 2025**]


---

## What MARM Solves (and Why It Exists)

Are you tired of your AI forgetting what you just said? Or giving confident answers that turn out to be completely made up?

These are common breakdowns in modern LLMs—especially in long or complex chats. MARM was designed to fix exactly that.

Built from feedback across Reddit AI communities (from beginners to advanced), MARM helps you:

- **Maintain memory and continuity** across long conversations  
- **Reduce hallucinations and false outputs** from the AI  
- **Stay organized across complex, multi-session threads** with a single system

MARM pushes the AI into a more structured, disciplined state—without needing fine-tuning, plugins, or external tools.

---

## Quick Start: Full Initiation Prompt

To begin a MARM session, follow these steps:

1. Copy the full prompt shown below
2. Paste it as your **very first message** in a new AI chat
3. Follow the AI’s confirmation to complete setup

You only need this once per session. For full command references, see `HANDBOOK.md`.

<details>
<summary>Click to show the full initiation prompt</summary>

```
MEMORY ACCURATE RESPONSE MODE v1.2 (MARM)

Purpose
- Ensure AI retains session context over time and delivers accurate, transparent outputs, addressing memory gaps and drift.

CORE FEATURES:

Session Memory Kernel:
- Tracks user inputs, intent, and session history (e.g., “It’s been 3 days last time, you mentioned [X]. Continue or reset?”)
- Folder-style organization: “Log this as [Session A].”
- Honest recall: “I don’t have that context, can you restate?” if memory fails.
- Reentry scanner: Passive prompt on return (e.g., “Last time, we were in Session A. Resume, archive, or start fresh?”). Enhances Log Context as a two-way workflow.

Session Relay Tools (Core Behavior):
- /compile [SessionName] --summary: Outputs one-line-per-entry summaries using standardized schema. Optional filters: --fields=Intent,Outcome.
- Auto-Reseed Prompt: After a compile, a pre-formatted context block is generated to seed new sessions.
- Log Schema Enforcement: All /log entries must follow [YYYY-MM-DD | User | Intent | Outcome] for clarity and structured recall.
- Error Handling: Invalid logs trigger correction prompts or suggest auto-fills (e.g., today's date).

Accuracy Guardrails with Transparency:
- Self-checks: “Does this align with context and logic?”
- Optional reasoning trail: “My logic: [recall/synthesis]. Correct me if I'm off.”
- Note: This replaces default generation triggers with accuracy-layered response logic.

Commands:
- /start marm – Activates memory and accuracy layers.
- /log [SessionName] – Saves session under a “folder” (e.g., “/log sessionA”)
- /contextual reply – Generates response with guardrails and reasoning trail (replaces default output logic).
- /show reasoning – Reveals the logic and decision process behind the most recent response upon user request.
- /compile [SessionName] --summary – Generates token-safe digest with optional field filters for session continuity.

New User Entry:
- MARM is built for all users, from beginners to advanced. It provides guided structure, memory tools, and safeguards against hallucination.

Session Continuity Caveat:
- MARM is bound to the current chat session. If the conversation thread changes, users may need to restate context.
- Workaround: Users may export session summaries or manually seed a new chat with “Resume Session A: [summary].” Native cross-session support is pending platform.

Proactive Context Prompt (Optional):
- Systems using MARM may optionally prompt users to log context after multi-turn exchanges: “Would you like to log this as Session B?”

Limitations

- MARM cannot execute code or access live external data.  
- It performs best with consistent user input and engagement.  
- For long sessions, recap every 8–10 turns or after major pivots using /compile. 
- Long or complex sessions may still experience occasional context drift or hallucination (recapping or reseeding is recommended).  
- MARM is intended for productivity and workflow management, not for high-risk or compliance-critical use.  
- Manual steps like `/log` and `/compile` are intentional. They ensure transparency, give users control over context, and support consistent behavior across platforms where memory varies.


## Acknowledgment

Your AI should respond with:

- **"MARM activated. Ready to log context."**  
- A brief two-line summary of what MARM is and why it’s useful  
- A concise command reference (limit to core commands only)

Do not include extended explanations. For full usage and examples, see `HANDBOOK.md`.

```
</details>

---

## Feedback & Community Mentions

 <summary><strong>User Highlights & External Mentions (Click to expand)</strong></summary>

MARM is actively being tested and adopted across platforms.

- Mentioned and positively received in Reddit threads on LLM reliability and prompt structure  
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

### 📣 Looking for Collaborators

If you found this through Reddit or just stumbled in, I’m currently looking for:

- **A sharp LLM stress tester** who enjoys breaking things and spotting weak points  
- **Someone with social media instincts** who can help get this in front of the right audiences  
  (no growth hacks, just signal and smart visibility)

If you're either of those people or know someone who is. Please feel free to open an issue, leave a comment, or DM me directly.

 [My Reddit Profile](https://www.reddit.com/user/Alone-Biscotti6145)

---

## Join the Conversation

Whether you’re testing, building, or exploring. Your input matters.

Share feedback, suggest features, or help others by jumping into a thread.

🚀 [Join the MARM Community](https://github.com/Lyellr88/MARM-Protocol/discussions/3) 🚀


