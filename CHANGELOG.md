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

## v1.2 – 2025-06-19

---

### Added
- **Session Continuity Tools:**  
  Core support for multi-session workflows, including:
  - `/compile` command to generate one-line-per-entry summaries  
  - Automatic reseed block generation for restoring context in new threads  
  - Log schema enforcement for structured logging: `[YYYY-MM-DD | User | Intent | Outcome]`  
  - Error handling for malformed log entries, including date autofill
- **/show reasoning command:**  
  Reveals the AI’s logic or decision path for its most recent response.
- **HANDBOOK.md:**  
  Full command reference and usage guide including beginner tips, advanced workflows, examples, and platform compatibility behavior.
- **Collapsible Command Reference:**  
  Added collapsible tables for command overviews.
- **Comprehensive FAQ.md:**  
  Topic-grouped questions covering naming, resuming, reseeding, command logic, platform compatibility, and manual usage philosophy.
- **Expanded Limitations section:**  
  Clarifies session boundaries, memory constraints, and intended use cases.
- **Slash-style command syntax standardization:**  
  All user-facing commands now follow consistent formatting:
  - `/start marm`  
  - `/log [SessionName]`  
  - `/guarded reply`  
  - `/show reasoning`  
  - `/compile [SessionName] --summary`
- **AI-narrated walkthrough:**  
  Embedded 15-minute audio guide explaining MARM’s core features and logic.
- **User Feedback section:**  
  Collapsible section in README.md with real-world highlights and screenshots.
- **Featured on Google badge:**  
  Added to README.md header to highlight visibility and adoption.
- **CONTRIBUTING.md and Recognition Framework:**  
  Added structure for listing contributors, testers, and discussion participants.
- **Multi-tier discussion structure:**  
  Created layered discussion entry points via GitHub Discussions and Contributing paths.

---

### Changed
- **Unified session tools as default protocol behavior**  
  Session tools such as `/compile`, reseed blocks, and log enforcement are now core—not optional.
- **README.md structure updates:**  
  - Moved Quick Start above Initiation Prompt for clarity  
  - Removed “Core Features” section to avoid duplication with HANDBOOK.md  
  - Clarified expected AI response in the Acknowledgment block
- **HANDBOOK.md structure updates:**  
  - Converted Part I, II, and III into collapsible sections  
  - Added “What’s New in v1.2” summary  
- **FAQ.md overhaul:**  
  - Grouped questions by category (Core Concepts, Sessions, Commands, Platform Support)  
  - Added new entries on logging frequency and manual command design  
  - Converted into collapsible sections for clarity  
- **Protocol one-liner updated:**  
  Reflects v1.2 as a fully unified, standalone framework for structured memory and accuracy

---

### Removed
- **Legacy modular/optional language:**  
  Removed all mentions of patches, modular tools, and separate add-on sections
- **Embedded command list and in-file How-To from README.md:**  
  Moved to HANDBOOK.md for maintainability and clarity
- **Internal anchor links and "Back to top" navigation:**  
  Removed due to GitHub’s behavior with collapsible content
- **Confidence flag/scoring feature:**  
  Removed from protocol outputs to reduce clutter and simplify expected AI response
