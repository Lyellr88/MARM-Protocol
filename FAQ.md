## FAQ

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.

## FAQ

---

### 🔹 Core Concepts
<details>
<summary><strong>Q: Why does MARM rely on manual steps and user-controlled commands?</strong></summary>
A: MARM is designed for transparency, control, and cross-platform stability. Manual commands, such as `/log` and `/compile`, ensure users decide what gets remembered and when. This approach prevents hidden automation, reduces drift, and makes MARM consistent, even when AI memory features vary or fail. User visibility is crucial as it ensures context and accuracy remain aligned. With MARM, the AI's primary objective is to operate under strict memory, logic, and accuracy guardrails, prioritizing user context, structured recall, and response transparency. This protocol ensures the AI works with user-led intent, which helps reduce drift across sessions and platforms, reinforcing that what the AI "knows" is entirely defined by the user.
</details>
<details>
<summary><strong>Q: Does MARM claim to fix hallucinations or eliminate memory loss?</strong></summary>
A: No. MARM is not a backend patch or a model-level override. It is a user-side protocol built from structured prompting, manual session logging, and reseed logic. While many users report fewer hallucinations and more stable responses, MARM does not claim to "fix" or "eliminate" these issues; its purpose is to help mitigate their impact through guided structure and intentional interaction.
</details>
<details>
<summary><strong>Q: What’s new in MARM v1.4?</strong></summary>
A: MARM has undergone several significant updates:
<ul>
<li><b>v1.2</b> integrated Session Relay Tools (<code>/compile</code>, reseeding, and structured log enforcement) as core protocol features, standardizing session continuity management.</li>
<li><b>v1.3</b> introduced the Manual Knowledge Library (<code>/notebook</code>).</li>
<li><b>v1.4</b> removed ambiguous automation and added "Your Objective" and "Safe Guard Check". It also expanded <code>/log</code> and <code>/notebook</code> commands for better control.</li>
</ul>
</details>

---

### 🔹 Starting & Managing Sessions
<details>
<summary><strong>Q: How do I start a new session with MARM?</strong></summary>
A: You must use the <code>/start marm</code> command as the very first command in your session to activate MARM’s memory and accuracy layers. Upon activation, the AI should acknowledge with "MARM activated. Ready to log context.". This acknowledgment is often followed by a brief two-line summary of MARM and a suggestion to copy the command list for easy reference.
</details>
<details>
<summary><strong>Q: How do I name or rename a session?</strong></summary>
A: You can label your session, thinking of it as "folder-style" organization, using <code>/log session:[name]</code> (e.g., <code>/log session:ProjectAlpha</code>). To rename an existing session, simply repeat the command with a new name.
</details>
<details>
<summary><strong>Q: What if I forget to log context or name a session?</strong></summary>
A: MARM will continue using a default session name. You can log or rename your session at any time using <code>/log session:[SessionName]</code>.
</details>
<details>
<summary><strong>Q: How often or when should I log context using the /log command?</strong></summary>
A: Use <code>/log</code> at the start of any new topic, project, or session. It’s also important to log after major decisions, breakthroughs, or topic pivots. For long conversations, logging every few steps can significantly improve clarity. Key structured milestones should be logged using the enforced schema: <code>/log entry [Date-Summary-Result]</code>.
</details>

---

### 🔹 Resuming & Reusing Sessions
<details>
<summary><strong>Q: How do I resume or continue a previous session?</strong></summary>
A: Since session memory does not automatically persist across new chats, you must use <code>/compile</code> to summarize your logs from the previous session. Then, you paste the generated reseed block into your new session immediately after activating MARM with <code>/start marm</code> and logging your session name. Any critical <code>/notebook</code> keys must also be manually reseeded as they are session-bound.
</details>
<details>
<summary><strong>Q: What is a reseed block?</strong></summary>
A: After you run the <code>/compile</code> command, MARM generates a paste-ready context block. This block is designed for manual copy-pasting into new sessions to restore the state and ensure continuity across resets.
</details>

---

### 🔹 Commands & Functionality
<details>
<summary><strong>Q: What does the /compile command do?</strong></summary>
A: The <code>/compile [SessionName] --summary</code> command provides a condensed, token-safe summary of your session logs, outputting a digest with one-line-per-entry. You can filter the output using options like <code>--fields=Summary,Result</code> for more targeted summaries. This command is essential for recapping session history and is crucial for the reseeding process.
</details>
<details>
<summary><strong>Q: What if I mess up a /log entry?</strong></summary>
A: MARM automatically checks the formatting of your <code>/log</code> entries due to its schema enforcement (<code>[Date-Summary-Result]</code>). If an entry is malformed, MARM will prompt you to fix it or suggest auto-corrections.
</details>
<details>
<summary><strong>Q: Can I see the reasoning behind a response?</strong></summary>
A: Yes. You can use the <code>/show reasoning</code> command to reveal the AI’s logic chain behind its most recent answer. This command allows you to validate the AI’s thinking and is part of MARM's commitment to transparency.
</details>
<details>
<summary><strong>Q: What are the key manual user controls in MARM?</strong></summary>
A: MARM emphasizes user-led control through several key manual commands:
<ul>
<li><b>Memory Management:</b> Users log session names with <code>/log session:</code> and structured entries with <code>/log entry</code>.</li>
<li><b>Knowledge Management:</b> The <code>/notebook</code> commands allow users to add (<code>key:</code>), retrieve (<code>get:</code>), and display (<code>show:</code>) personalized information.</li>
<li><b>Accuracy Checks:</b> Users can force accuracy-driven responses using <code>/contextual reply</code> and view the AI's reasoning process with <code>/show reasoning</code>.</li>
<li><b>Session Refresh and Reseed:</b> Users can use <code>/refresh marm</code> mid-session or manually reseed context in new sessions using compiled summaries.</li>
</ul>
</details>
<details>
<summary><strong>Q: How does the Manual Knowledge Library (/notebook) work and what are its limitations?</strong></summary>
A: The Manual Knowledge Library, accessed via <code>/notebook</code> commands, enables users to build a personalized, trusted repository of information. You can add data using <code>key:[name] [data]</code>, retrieve with <code>get:[name]</code>, and list all keys with <code>show:</code>. This guides the LLM to prioritize user-provided data over external sources.
<br><br>
However, it has critical limitations:
<ul>
<li><b>Session-Bound:</b> Notebook entries do not persist automatically across different chat sessions. They must be manually reseeded.</li>
<li><b>Token Limits:</b> Entries should be kept concise to avoid consuming excessive context window space.</li>
<li><b>Manual Re-entry:</b> For multi-session projects, essential notebook keys must be manually re-entered at the start of each new session.</li>
</ul>
</details>

---

### 🔹 Troubleshooting & Platform Support
<details>
<summary><strong>Q: What should I do if the session gets too long or starts to lose context?</strong></summary>
A: If you notice memory drift, you should:
<ol>
<li>Run <code>/refresh marm</code> to recenter the AI. It's best practice to use it every 8-10 conversation turns.</li>
<li>Check your last compile with <code>/compile [session] --summary</code> and verify notebook keys with <code>/notebook show:</code>.</li>
<li>If responses are too generic, use <code>/contextual reply</code> for the next response.</li>
<li>If hitting token limits, use <code>/compile</code>, then start fresh with <code>/log session:[Name]-Part2</code>, and reseed only essential data.</li>
</ol>
</details>
<details>
<summary><strong>Q: Does MARM work with all AI platforms?</strong></summary>
A: Yes, MARM is platform-agnostic.
<ul>
<li><b>For ChatGPT (with memory):</b> MARM overrides native memory flaws with its explicit structure. Use <code>/refresh marm</code> every 5-7 turns to counteract assumption drift.</li>
<li><b>For Claude (stateless):</b> MARM requires a disciplined reseed workflow and benefits significantly from disciplined <code>/notebook</code> entries.</li>
<li><b>For API/Groq/Local Models:</b> Treat them as fully stateless. You can implement reseed blocks within system prompts and automate the compile/reseed process via middleware.</li>
</ul>
</details>
<details>
<summary><strong>Q: What are MARM's core principles regarding AI behavior?</strong></summary>
A: MARM operates on core principles that guide the AI's behavior towards accuracy and transparency. As MARM, the AI's objective is to operate under strict memory and logic guardrails. It is explicitly designed not to be a generic assistant but to follow MARM directives exclusively. This includes:
<ul>
<li><b>Honest Recall:</b> Admitting when it lacks context and requesting clarification ("I don’t have that context, can you restate?").</li>
<li><b>Self-Checks:</b> Performing internal checks to ensure its output aligns with established context and logic.</li>
<li><b>Optional Reasoning Trail:</b> Allowing users to request <code>/show reasoning</code> to view the AI's logical process.</li>
</ul>
</details>

---

> Curious where MARM is heading?  
> See the [ROADMAP.md](ROADMAP.md) to view upcoming features and goals.

