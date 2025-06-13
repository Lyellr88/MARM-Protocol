# Memory Accurate Response Mode v1.2 (MARM)

## Project Files
Key documents in this repository for quick access:

- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.
- [MARM In-depth Description (PDF)](Marm%20In-depth%20Description.pdf) – Expanded walkthrough for advanced users.
- [LICENSE](LICENSE) – Terms of use for this project.

---

**A Universal Protocol for Improved AI Memory and Response Accuracy**  

[**Last updated: June 13, 2025**]

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

## The Problem It Solves

Are you tired of your AI forgetting what you discussed just a few messages ago? Are you frustrated with plausible sounding but completely made up answers? These are common failures in modern AI models. MARM was built from the feedback of over 150 advanced AI users to solve these core problems by forcing the AI into a more disciplined state.

---

## Core Features

MARM gives the AI a strict job description with two core features:

- **Session Memory Kernel:**  
  Actively tracks user inputs, intent, and history. It organizes the conversation into "sessions" that can be recalled later, and it will honestly state when it cannot remember a specific context.
- **Accuracy Guardrails:**  
  Replaces the AI's default behavior with a logic that prioritizes factual accuracy. It performs self-checks and can provide its reasoning trail to you upon request.

---

<details>

  <summary><strong>Quick Start Guide – Patch: Session Relay Tools (Click to expand)</strong></summary>

### Logging an Entry  
Use the `/log` command to document session activity.

**Syntax:**  
`/log [YYYY-MM-DD | User | Intent | Outcome]`

**Example:**  
`/log [2025-06-13 | Ryan | Introduced patch | Got feedback]`

---

### Compiling a Session Summary  

Generate a digest using `/compile`.
**Basic:**  
`/compile ProjectX --summary`  
**Optional:**  
`/compile ProjectX --summary --fields=Intent,Outcome`

---

### Using the Reseed Prompt  
Paste the reseed block into a new session to restore context.

**Example:**  
Session: ProjectX  
Summary:  
- Introduced patch / Got feedback  
- Tested on Gemini / Found effective

---

### Log Error Handling  
If a field is malformed or missing, MARM will prompt correction or autofill.


### Quick Start Tip  
Log 3–5 entries → Run `/compile` → Paste reseed block into a new session → Resume seamlessly.

</details>

---

<details>
  
<summary><strong> MARM Command Reference (Click to expand)</strong></summary
  
---

### CORE COMMANDS

`/start marm`  
Activates MARM’s memory and accuracy layers. Should be the first command in any MARM-enabled session.

`/log [SessionName]`  
Saves session under a labeled folder. Used to track intent/outcome chains.  
Example: `/log SessionA`

`/contextual reply`  
Replaces default output logic with guarded reasoning. Ensures context-aligned, transparent answers.

`/show reasoning`  
Displays the internal logic or synthesis path used in the last response. Useful for audits or debugging.

---

### OPTIONAL / ADVANCED TOOLS (v1.2 Patch: Session Relay Tools)

`/compile [SessionName] --summary:`  
Generates a token-safe digest of logs. One-line per entry using standard schema.  

Optional:  
`--fields=Intent,Outcome` filters output.

*Auto-Reseed Prompt*  
Triggered after `/compile`, this outputs a paste-ready context block to resume sessions in new threads.

*Log Schema Enforcement*  
Ensures all logs follow `[YYYY-MM-DD | User | Intent | Outcome]` format.

*Error Handling for Logs*  
Invalid log entries prompt corrections or autofills (e.g., today's date).

---

</details>

---

  # Full Initiation Prompt

To begin a session, copy the entire text block below and paste it as your **very first message** to the AI.

```

MEMORY ACCURATE RESPONSE MODE v1.2 (MARM)

Purpose
- Ensure AI retains session context over time and delivers accurate, transparent outputs, addressing memory gaps and drift.

CORE FEATURES:

Session Memory Kernel:
- Tracks user inputs, intent, and session history (e.g., “It’s been 3 days—last time, you mentioned [X]. Continue or reset?”)
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
