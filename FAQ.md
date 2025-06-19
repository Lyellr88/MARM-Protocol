## FAQ

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
  
## FAQ

---

### 🔹 Core Concepts
<details>

**Q: Why does MARM rely on manual steps and user-controlled commands?**  
A: MARM is designed for **transparency**, **control**, and **cross-platform stability**. Manual commands like `/log` and `/compile` ensure users decide **what gets remembered and when**. This avoids hidden automation, reduces drift, and makes MARM consistent—even when AI memory features vary or fail.

**Q: Does MARM claim to fix hallucinations or eliminate memory loss?**  
A: No. MARM is **not a backend patch** or model-level override. It’s a **user-side protocol** built from structured prompting, manual session logging, and reseed logic. While many users report fewer hallucinations and more stable responses, MARM does **not claim to "fix" or "eliminate"** these issues—only to help **mitigate** their impact through guided structure and intentional interaction.

**Q: What’s new in MARM v1.2?**  
A: MARM v1.2 promotes session relay tools—`/compile`, **reseeding**, and **structured log enforcement**—as core protocol features. These tools are now standard for managing session continuity.
</details>

---

### 🔹 Starting & Managing Sessions
<details>

**Q: How do I start a new session with MARM?**  
A: Use the `/start marm` command to activate **memory and accuracy layers** for your session.

**Q: How do I name or rename a session?**  
A: Use `/log [SessionName]` (e.g., `/log SessionA`). To rename, just repeat the command with a new name.

**Q: What happens if I don’t name a session?**  
A: MARM will assign a **default session name** (e.g., “Session”) until you specify one.

**Q: What if I forget to log context or name a session?**  
A: MARM continues using the default session. You can log or rename at **any time** with `/log [SessionName]`.

**Q: How often or when should I log context using the `/log` command?**  
A: Use `/log` at the start of any **new topic, project, or session**. Log again after **major decisions**, **breakthroughs**, or pivots. For long threads, logging every few steps improves clarity and makes summaries more effective.
</details>

---

### 🔹 Resuming & Reusing Sessions
<details>

**Q: How do I resume or continue a previous session?**  
A: Because session memory doesn’t persist across chats, use `/compile` to summarize your logs. Then paste the **reseed block** into a new session alongside `/start marm` and `/log`.

**Q: What is a reseed prompt?**  
A: After running `/compile`, MARM generates a **paste-ready context block**. Use it to restore state in a new chat or LLM session.
</details>

---

### 🔹 Commands & Functionality
<details>
  
**Q: What does the `/compile` command do?**  
A: It creates a **one-line-per-entry digest** of your session logs. You can filter output using `--fields=Intent,Outcome`. This helps **recap session history** and supports reseeding.

**Q: What if I mess up a `/log` entry?**  
A: MARM automatically **checks formatting**. If a field is missing (like today’s date) or malformed, it will **prompt you to fix it** or auto-suggest corrections.

**Q: Can I see the reasoning behind a response?**  
A: Yes. Use `/show reasoning` to reveal the AI’s **logic chain** behind its most recent answer.
</details>
  
---

### 🔹 Troubleshooting & Platform Support
<details>
  
**Q: What should I do if the session gets too long or starts to lose context?**  
A: Use `/log` to checkpoint your current session, then `/compile` to create a **summary**. This keeps your place and reduces drift when continuing later.

**Q: Does MARM work with all AI platforms?**  
A: Yes. MARM is **platform-agnostic**. Advanced features like auto-save depend on the platform, but core tools like `/log` and `/compile` work consistently everywhere.
</details>
