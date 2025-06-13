# Changelog

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [MARM In-depth Description (PDF)](Marm%20In-depth%20Description.pdf) – Expanded walkthrough for advanced users.  
- [LICENSE](LICENSE) – Terms of use for this project.

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
- **Comprehensive FAQ section:**  
  Covers session lifecycle, naming, resuming, reasoning, platform compatibility, and best practices.
- **Expanded Limitations section:**  
  Clarifies session boundaries, platform dependencies, intended use cases, user responsibilities, and transparency priorities.
- **Standardized slash-style command syntax:**  
  All commands now use slash-style syntax for clarity and ease of use:
  - `/start marm`
  - `/log [SessionName]`
  - `/contextual reply`
  - `/show reasoning`
  - `/compile [SessionName] --summary`
- **Clickable contact links:**  
  Updated contact information with clickable links for Reddit and Fiverr profiles.
- **CONTRIBUTING.md:**  
  Placeholder for community/tester recognition via dedicated contributor section.

---

### Changed
- **Command descriptions and documentation:**  
  Updated to reflect new slash-command syntax.
- **README and protocol documentation:**  
  Overhauled for better clarity, consistency, and modular visibility (e.g., collapsible HTG, patch separation).
- **Protocol formatting:**  
  Adjusted line spacing, hierarchy, and section dividers for improved readability.

---

### Removed
- **Confidence flag/scoring feature:**  
  Removed from the protocol and documentation to reduce clutter and improve focus.

---

*For a full history of changes, see the [commit log]*
