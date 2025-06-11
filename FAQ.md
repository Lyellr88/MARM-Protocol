## FAQ

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [MARM In-depth Description (PDF)](Marm%20In-depth%20Description.pdf) – Expanded walkthrough for advanced users.  
- [LICENSE](LICENSE) – Terms of use for this project.


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
