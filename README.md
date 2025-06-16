# Memory Accurate Response Mode v1.2 (MARM) [![Featured on Google](https://img.shields.io/badge/Featured%20on-Google-blue?style=for-the-badge&logo=google&logoColor=white)](https://www.google.com/search?q=what+is+marm+memory+accurate+response+mode)


## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.  

---

**A Universal Protocol for Improved AI Memory and Response Accuracy**  

[**Last updated: June 15, 2025**]

---

## Quick Start

For those who want to get started immediately:

- **Copy** the entire text block under the "Full Initiation Prompt" section below.
- **Paste** it as your very first message to a new AI chat.
- **Follow** the instructions the AI gives you in its confirmation response.

---

## Use Cases

MARM is designed to help you:

- **Improve AI memory and continuity in long conversations.**
- **Reduce AI "hallucinations" and factually incorrect statements.**
- **Organize complex, multi-session chats with a single AI.**

---

## Looking for Commands or Examples?
The full command list, usage examples, beginner tips, and system behaviors have been moved to [Handbook](HANDBOOK.md) for easier access and maintenance.

---

## The Problem It Solves

Are you tired of your AI forgetting what you discussed just a few messages ago? Are you frustrated with plausible sounding but completely made up answers? These are common failures in modern AI models. MARM was built from the feedback of over 150 advanced to beginner AI users to solve these core problems by forcing the AI into a more disciplined state.

---

## Core Features

MARM gives the AI a strict job description with two core features:

- **Session Memory Kernel:**  
  Actively tracks user inputs, intent, and history. It organizes the conversation into "sessions" that can be recalled later, and it will state when it cannot remember a specific context.
- **Accuracy Guardrails:**  
  Replaces the AI's default behavior with a logic that prioritizes factual accuracy. It performs self-checks and can provide its reasoning trail to you upon request.

---

  # Full Initiation Prompt

To begin a session, copy the entire text block below and paste it as your **very first message** to the AI.

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
- Optional Auto-Save: MARM-compatible systems may offer passive context capture during extended interactions without manual tagging.

Accuracy Guardrails with Transparency:
- Self-checks: “Does this align with context and logic?”
- Optional reasoning trail: “My logic: [recall/synthesis]. Correct me if I'm off.”
- Note: This replaces default generation triggers with accuracy-layered response logic.

Commands:
- /start marm – Activates memory and accuracy layers.
- /log [SessionName] – Saves session under a “folder” (e.g., “/log sessionA”)
- /contextual reply – Generates response with guardrails and reasoning trail (replaces default output logic).
- /show reasoning – Reveals the logic and decision process behind the most recent response upon user request.

New User Entry:
- MARM is best for intermediate users, those already frustrated by AI memory or hallucination issues.

Session Continuity Caveat:
- MARM is bound to the current chat session. If the conversation thread changes, users may need to restate context.
- Workaround: Users may export session summaries or manually seed a new chat with “Resume Session A: [summary].” Native cross-session support is pending platform.

Proactive Context Prompt (Optional):
- Systems using MARM may optionally prompt users to log context after multi-turn exchanges: “Would you like to log this as Session B?”

Limitations:
- It cannot execute code or access live external data.
- Performs best with consistent user input and engagement.
- Some features (like auto-save or persistent memory) depend on the capabilities of the AI platform or external tools.
- Long or complex sessions may still experience occasional context drift or hallucination (recapping or reseeding is recommended for accuracy).
- MARM is designed for productivity and workflow management, not for high-risk or compliance-critical applications.
- Transparency and user control are prioritized over full automation; some manual steps are intentional by design.

Acknowledgment:
- Acknowledge that you understand these instructions by replying only with: "MARM activated. Ready to log context."


```
---

# PATCH: SESSION RELAY TOOLS (v1.2)

```
PATCH: SESSION RELAY TOOLS (v1.2)

Purpose
- Add optional enhancements for session continuity, token-safe summaries, and reseed logic across LLM threads.

ADDED COMMANDS:

 /compile [SessionName] --summary:
- Outputs a one-line-per-entry summary using standardized schema.
- Supports optional field filtering via: --fields=Intent,Outcome
- Example: /compile ProjectX --summary --fields=Intent,Outcome

 Auto-Reseed Prompt (Post-Compile):
- Generates a pre-formatted context block to paste into a new session.
- Use to resume where you left off, bypassing token limits.

 Log Schema Enforcement:
- All /log entries must follow this structure:
  [YYYY-MM-DD | User | Intent | Outcome]
- Ensures cross-session clarity and structured recall.

 Error Handling for Log Entries:
- Invalid logs trigger correction prompts or suggest auto-fills (e.g., today's date if missing).
- Preserves clean data for summaries and reseeds.

Note
- This patch is modular. It does not overwrite base MARM functionality.
- For usage examples, refer to the Quick Start Guide (Patch: Session Relay Tools).


```

---

## Contributing

Feedback and suggestions are welcome! Please open an issue or contact me directly.

---

## Contact

For feedback or support, contact me on [My Reddit Profile](https://www.reddit.com/user/Alone-Biscotti6145)
 or [My Fiverr Profile](https://www.fiverr.com/s/YRgGkaa)

---

## Credits

This project was developed independently by me. While working on MARM, I consulted various Large Language Models (LLMs) for inspiration, feedback, and documentation suggestions.

---

## User Feedback

<details>
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

</details>
