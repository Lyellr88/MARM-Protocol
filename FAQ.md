# FAQ

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

---

<details> 
<summary>🔹 Live Chatbot</summary>summary>  

### Q: How do I use the live MARM chatbot?</summary>

The live chatbot is available at https://marm-systems-chatbot.onrender.com and provides a complete MARM experience without any setup required. Simply:

1. Open the chatbot in your browser
2. Type `/start marm` to activate MARM
3. Use the command menu (bottom-left) for quick access to all features
4. Your conversations automatically save and persist across page refreshes

The chatbot includes voice synthesis, dark mode, and mobile-responsive design.

### Q: What are some tips for getting the most out of the MARM chatbot?

Here are some proven strategies for effective MARM usage:

- **Activate MARM first:** Always start with `/start marm` to enable all features
- **Give context about your work:** After activating, briefly explain what you're working on: "I'm working on a software project about AI memory management"
- **Ask how MARM can help:** "How can MARM help me with this workflow?" or "What MARM features would be most useful for this project?"
- **Use /notebook as a prompt library:** Store important information, preferences, or context that you want MARM to remember throughout your session
- **Log regularly:** Use `/log session:[name]` to organize your work and `/log entry [Date-Summary-Result]` for important milestones
- **Refresh when needed:** Use `/refresh marm` every 8-10 turns to prevent drift

### Q: How do I use the /notebook command as a prompt library?

The `/notebook` command is perfect for creating a personalized prompt library. Here are some effective use cases:

- **Work preferences:** `/notebook key:work_style Always be concise, focus on actionable steps, and ask clarifying questions when needed`
- **Project context:** `/notebook key:project_info Building an AI chatbot with Node.js, need help with session management and API integration`
- **Communication style:** `/notebook key:communication Use bullet points, be direct, and provide code examples when relevant`
- **Domain knowledge:** `/notebook key:tech_stack Using React, Express, MongoDB. Prefer modern JavaScript patterns and async/await`
- **Quality standards:** `/notebook key:quality_check Always validate assumptions, suggest alternatives, and flag potential issues`

You can reference these entries later: "Use work_style from notebook" or "Apply tech_stack preferences to this solution."

### Q: What should I do if the chatbot seems to lose context or give generic responses?

If MARM starts giving generic responses or seems to forget context:

1. **Use `/refresh marm`** to recenter the AI and reaffirm the protocol
2. **Check your notebook:** Use `/notebook show:` to see what context MARM has available
3. **Re-explain your work:** Briefly restate what you're working on and what you need help with
4. **Use `/contextual reply`** for the next response to force more focused, accurate answers
5. **Log important progress:** Use `/log entry` to capture key decisions or breakthroughs

Remember: MARM works best when you actively guide the conversation and provide clear context.
</details> 

---

<details> 
<summary> 🔹 Core Concepts</summary>

### Q: Why does MARM rely on manual steps and user-controlled commands?

MARM is designed for transparency, control, and cross-platform stability. Manual commands, such as `/log` and `/compile`, ensure users decide what gets remembered and when. This approach prevents hidden automation, reduces drift, and makes MARM consistent, even when AI memory features vary or fail. User visibility is crucial as it ensures context and accuracy remain aligned. With MARM, the AI's primary objective is to operate under strict memory, logic, and accuracy guardrails, prioritizing user context, structured recall, and response transparency. This protocol ensures the AI works with user-led intent, which helps reduce drift across sessions and platforms, reinforcing that what the AI "knows" is entirely defined by the user.

### Q: Does MARM claim to fix hallucinations or eliminate memory loss?

No. MARM is not a backend patch or a model-level override. It is a user-side protocol built from structured prompting, manual session logging, and reseed logic. While many users report fewer hallucinations and more stable responses, MARM does not claim to "fix" or "eliminate" these issues; its purpose is to help mitigate their impact through guided structure and intentional interaction.

### Q: What's new in MARM v1.5.0?

MARM v1.5.0 includes several major enhancements:

- **Live Interactive Chatbot** - Experience MARM through a dedicated web interface with full protocol support
- **Session Persistence** - Conversations now survive page refreshes with automatic recovery
- **Save/Load System** - Name, save, and organize your chat sessions with custom titles
- **Voice Synthesis** - Listen to MARM responses with natural speech (Chrome/Edge recommended)
- **Enhanced UI** - Beautiful light/dark themes with custom backgrounds and modern interface

Previous versions:
- **v1.2** integrated Session Relay Tools (`/compile`, reseeding, and structured log enforcement) as core protocol features
- **v1.3** introduced the Manual Knowledge Library (`/notebook`)
- **v1.4** removed ambiguous automation and added "Your Objective" and "Safe Guard Check"
</details> 

---

<details> 
<summary>🔹 Starting & Managing Sessions</summary>

### Q: How do I start a new session with MARM?

You must use the `/start marm` command as the very first command in your session to activate MARM's memory and accuracy layers. Upon activation, the AI should acknowledge with "MARM activated. Ready to log context.". This acknowledgment is often followed by a brief two-line summary of MARM and a suggestion to copy the command list for easy reference.

### Q: How do I name or rename a session?

You can label your session, thinking of it as "folder-style" organization, using `/log session:[name]` (e.g., `/log session:ProjectAlpha`). To rename an existing session, simply repeat the command with a new name.

### Q: What if I forget to log context or name a session?

MARM will continue using a default session name. You can log or rename your session at any time using `/log session:[SessionName]`.

### Q: How often or when should I log context using the /log command?

Use `/log` at the start of any new topic, project, or session. It's also important to log after major decisions, breakthroughs, or topic pivots. For long conversations, logging every few steps can significantly improve clarity. Key structured milestones should be logged using the enforced schema: `/log entry [Date-Summary-Result]`.
</details>

---
<details> 
<summary>🔹 Resuming & Reusing Sessions</summary>

### Q: How do I resume or continue a previous session?

Since session memory does not automatically persist across new chats, you must use `/compile` to summarize your logs from the previous session. Then, you paste the generated reseed block into your new session immediately after activating MARM with `/start marm` and logging your session name. Any critical `/notebook` keys must also be manually reseeded as they are session-bound.

### Q: What is a reseed block?

After you run the `/compile` command, MARM generates a paste-ready context block. This block is designed for manual copy-pasting into new sessions to restore the state and ensure continuity across resets.
</details> 

---
<details> 
<summary>🔹 Commands & Functionality</summary>

### Q: What does the /compile command do?

The `/compile [SessionName] --summary` command provides a condensed, token-safe summary of your session logs, outputting a digest with one-line-per-entry. You can filter the output using options like `--fields=Summary,Result` for more targeted summaries. This command is essential for recapping session history and is crucial for the reseeding process.

### Q: What if I mess up a /log entry?

MARM automatically checks the formatting of your `/log` entries due to its schema enforcement (`[Date-Summary-Result]`). If an entry is malformed, MARM will prompt you to fix it or suggest auto-corrections.

### Q: Can I see the reasoning behind a response?

Yes. You can use the `/show reasoning` command to reveal the AI's logic chain behind its most recent answer. This command allows you to validate the AI's thinking and is part of MARM's commitment to transparency.

### Q: What are the key manual user controls in MARM?

MARM emphasizes user-led control through several key manual commands:

- **Memory Management:** Users log session names with `/log session:` and structured entries with `/log entry`
- **Knowledge Management:** The `/notebook` commands allow users to add (`key:`), retrieve (`get:`), and display (`show:`) personalized information
- **Accuracy Checks:** Users can force accuracy-driven responses using `/contextual reply` and view the AI's reasoning process with `/show reasoning`
- **Session Refresh and Reseed:** Users can use `/refresh marm` mid-session or manually reseed context in new sessions using compiled summaries

### Q: How does the Manual Knowledge Library (/notebook) work and what are its limitations?

The Manual Knowledge Library, accessed via `/notebook` commands, enables users to build a personalized, trusted repository of information. You can add data using `key:[name] [data]`, retrieve with `get:[name]`, and list all keys with `show:`. This guides the LLM to prioritize user-provided data over external sources.

However, it has critical limitations:

- **Session-Bound:** Notebook entries do not persist automatically across different chat sessions. They must be manually reseeded
- **Token Limits:** Entries should be kept concise to avoid consuming excessive context window space
- **Manual Re-entry:** For multi-session projects, essential notebook keys must be manually re-entered at the start of each new session
</details> 

---
<details> 
<summary>🔹 Troubleshooting & Platform Support</summary

### Q: What should I do if the session gets too long or starts to lose context?

If you notice memory drift, you should:

1. Run `/refresh marm` to recenter the AI. It's best practice to use it every 8-10 conversation turns
2. Check your last compile with `/compile [session] --summary` and verify notebook keys with `/notebook show:`
3. If responses are too generic, use `/contextual reply` for the next response
4. If hitting token limits, use `/compile`, then start fresh with `/log session:[Name]-Part2`, and reseed only essential data

### Q: Does MARM work with all AI platforms?

Yes, MARM is platform-agnostic:

- **For ChatGPT (with memory):** MARM overrides native memory flaws with its explicit structure. Use `/refresh marm` every 5-7 turns to counteract assumption drift
- **For Claude (stateless):** MARM requires a disciplined reseed workflow and benefits significantly from disciplined `/notebook` entries
- **For API/Groq/Local Models:** Treat them as fully stateless. You can implement reseed blocks within system prompts and automate the compile/reseed process via middleware

### Q: What are MARM's core principles regarding AI behavior?

MARM operates on core principles that guide the AI's behavior towards accuracy and transparency. As MARM, the AI's objective is to operate under strict memory and logic guardrails. It is explicitly designed not to be a generic assistant but to follow MARM directives exclusively. This includes:

- **Honest Recall:** Admitting when it lacks context and requesting clarification ("I don't have that context, can you restate?")
- **Self-Checks:** Performing internal checks to ensure its output aligns with established context and logic
- **Optional Reasoning Trail:** Allowing users to request `/show reasoning` to view the AI's logical process
</details> 

---

> Curious where MARM is heading?  
> See the [ROADMAP.md](ROADMAP.md) to view upcoming features and goals.
