# Contributing to MARM

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.  

Thank you for your interest in contributing to the Memory Accurate Response Mode (MARM) Protocol. Whether you're here to test, give feedback, suggest improvements, or help evolve the framework, you're part of making something more stable and transparent in LLM interactions.

---

## How to Contribute

### Test the Protocol
Run MARM through your own workflows using `/log`, `/compile`, and reseed blocks.  
Report any drift, breakdowns, or UX issues. Especially across different LLMs like ChatGPT, Gemini, Claude, or Perplexity.

### Suggest Enhancements
If you’ve identified friction points, architectural gaps, or ways to simplify the prompt layer, open a GitHub issue (or DM directly if we're already connected).

### Improve Documentation
You can submit typo fixes, restructure guides, or help clarify edge-case behaviors.

### Developer Support (Optional)
If you have Python, JSON, or LLM toolchain experience and want to help convert MARM into a working tool or plugin, reach out. I'm looking to move from protocol to product in future phases.

---

## Current Contributors

The following users directly shaped the protocol through feedback, ideas, or early support:

### Reddit: [u/CalamityThorazine](https://www.reddit.com/user/CalamityThorazine) & [u/Crazy_Crayfish_](https://www.reddit.com/user/Crazy_Crayfish_) - June 9, 2025
Encouraged the move from temporary hosting (e.g., Google Drive) to GitHub, improving accessibility and trust. Their early interest helped validate public release and shaped the decision to publish the protocol in a permanent, versioned repository.

### Reddit: [u/ophydian210](https://www.reddit.com/user/ophydian210) - June 10, 2025 
Provided early-stage critique and refinement feedback on memory simulation, session labeling, and user experience logic. Influenced the removal of the confidence scoring system, the creation of the `/show reasoning` command, and improvements to session lifecycle documentation.

### Reddit: [u/deminimis_opsec](https://www.reddit.com/user/deminimis_opsec)– June 10, 2025 
Provided critical technical feedback on MARM’s limitations within non-API chat environments. Helped clarify the distinction between frontend prompt-layer protocols and backend memory architectures. Their input reinforced the importance of transparency around session scope, non-persistent memory, and the lack of backend execution in typical LLM interfaces.

### Reddit: [u/angry_cactus](https://www.reddit.com/user/angry_cactus) – June 11, 2025
Tested MARM across models and validated its performance in Gemini Pro. Provided feedback on LLM pseudo-memory behaviors, reply weighting, and the trade-offs between short-form prompts and structured memory. Their observations reinforced the session-based design choice and influenced future patch direction focused on continuity fail safes and compression-aware prompting.


### Reddit: [u/MykoJai168](https://www.reddit.com/user/MykoJai168) - June 12, 2025
Sparked the architectural concept behind MARM’s “Session Relay Tools” patch by proposing a layered, context-managed memory model. Offered collaboration, stress-testing interest, and early insight into multi-agent recall, which helped validate MARM’s patch direction. Credited for contributing to the prompt-layer vision and user-side continuity design.

---

If you’d like to be credited for your feedback or testing, reach out via GitHub, Reddit, or [Fiverr contact link in README](README.md).
