## FAQ

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.

---

**Q: How do I start a new session with MARM?**  
A: Use the `/start marm` command to activate memory and accuracy layers for your session.

**Q: How do I name or rename a session?**  
A: Save your session with `/log [SessionName]` (e.g., `/log SessionA`). If you want to rename, just use the command again with a new name.

**Q: What happens if I don’t name a session?**  
A: If you don’t specify a name, MARM will use a default session name (e.g., “Session”).

**Q: How do I resume or continue a previous session?**  
A: Since session memory doesn’t persist across chats, you’ll need to manually export a summary and paste it into a new session using `/start marm` and `/log [SessionName]`.

**Q: Can I see the reasoning behind a response?**  
A: Yes! Use the `/show reasoning` command after any response to reveal the logic and decision process behind it.

**Q: What if I forget to log context or name a session?**  
A: MARM will continue using the default session until you specify otherwise. You can log or rename at any time with `/log [SessionName]`.

**Q: Does MARM work with all AI platforms?**  
A: MARM’s core features are platform-agnostic, but advanced features like auto-save or persistent memory may depend on the capabilities of the underlying AI tool.

**Q: What should I do if the session gets too long or starts to lose context?**  
A: Summarize your session and use `/log [SessionName]` to save your place. For best results, recap or reseed context in long or complex conversations.

---

## Patch Update Questions (v1.2 – Session Relay Tools)

Q: What does the v1.2 patch actually add?  
A: The patch introduces optional tools for managing long-form sessions, including the /compile command, automatic reseed prompts, schema enforcement for logs, and basic error correction for malformed entries.

**Q: Do I need to use the patch to run MARM?**  
A: No. The patch is fully modular. MARM functions as intended without it. The patch simply enhances continuity and recall across session resets or token limits.

**Q: What does /compile actually do?**  
A: It summarizes your /log entries into a one-line-per-entry digest. You can optionally filter by field (e.g., --fields=Intent,Outcome). It’s ideal for reseeding sessions or exporting history.

**Q: What is the reseed prompt?88  
A: After running /compile, MARM generates a paste-ready context block. You can drop this into a new chat or LLM thread to restore state quickly.

**Q: What happens if I mess up a /log entry?**  
A: MARM checks for format issues automatically. If it detects missing or malformed fields, it will prompt you to revise or suggest auto-filled values (like today’s date).


