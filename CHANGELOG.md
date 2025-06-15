# Changelog

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.  
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.  

All notable changes to the MARM Protocol will be documented in this file.

---

## v1.2 – 2025-06-13

---

### Added
- **Patch: Session Relay Tools:**  
  Includes `/compile` command, automatic reseed prompts, schema enforcement for logs, and basic error correction.
- **Quick Start Guide (Patch Tools):**  
  Drop-down HTG covering logging, compiling, reseeding, and error handling for long-form sessions.
- **/show reasoning command:**  
  Allows users to request logic and decision trail on demand.
- **Command Reference (Collapsible):**  
  New section lists core and advanced commands with brief descriptions.
- **HANDBOOK.md:**  
  Unified command guide and how-to reference with beginner tips, advanced usage, and system behaviors. Replaces the need for separate command list and how-to files.
- **Comprehensive FAQ section:**  
  Covers session lifecycle, naming, resuming, reasoning, platform compatibility, and best practices.
- **Expanded Limitations section:**  
  Clarifies session boundaries, platform dependencies, intended use cases, user responsibilities, and transparency priorities.
- **Standardized slash-style command syntax:**  
  All commands now use slash-style syntax for clarity and ease of use:
  - `/start marm`
  - `/log [SessionName]`
  - `/guarded reply`
  - `/show reasoning`
  - `/compile [SessionName] --summary`
- **Clickable contact links:**  
  Updated contact information with clickable links for Reddit and Fiverr profiles.
- **CONTRIBUTING.md:**  
  Placeholder for community/tester recognition via dedicated contributor section.
- **User Feedback section:**  
  Collapsible section added to `README.md` showing real-world use cases and screenshots of MARM in practice.
- **Featured on Google badge:**  
  Added to `README.md` header to highlight external visibility and recognition.

---

### Changed
- **Command descriptions and documentation:**  
  Updated to reflect new slash-command syntax.
- **README.md:**  
  Removed in-file command list and How-To Guide. Redirects users to the dedicated `HANDBOOK.md` for unified reference.
- **Protocol formatting:**  
  Adjusted line spacing, hierarchy, and section dividers for improved readability.

---

### Removed
- **Confidence flag/scoring feature:**  
  Removed from the protocol and documentation to reduce clutter and improve focus.
- **Embedded command list and HTG from README.md:**  
  Consolidated into `HANDBOOK.md` for better usability and maintenance.

---

*For a full history of changes, see the [commit log]*
