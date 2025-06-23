# Changelog

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.

---

## MARM Protocol – v1.3 Change Log  
All notable updates between **June 9–23, 2025** are documented below. Entries are grouped by date using collapsible dropdowns for clarity.

---

<details>
<summary> June 9–13: Initial Protocol Unification (v1.2 Launch)</summary>

### Added
- `/compile` command to generate one-line-per-entry summaries  
- Automatic reseed block generation for restoring context in new threads  
- Log schema enforcement for structured logging: `[YYYY-MM-DD | User | Intent | Outcome]`  
- Error handling for malformed log entries, including date autofill  
- `/show reasoning` command to reveal the AI’s logic path  
- Manual Steps Justification section added to `HANDBOOK.md`  
- Consolidated Examples section showing real use cases for all major commands  
- Clarified optional system prompt behavior (not built-in; manual only)  
- New session management guidance: recap every 8–10 turns using `/compile`  

### Changed
- Unified session tools into default protocol behavior  
- README restructured for clarity:
  - Quick Start moved above initiation  
  - Core Features moved to `HANDBOOK.md`  
  - Acknowledgment behavior clarified  
- Protocol one-liner updated to reflect unified design

### Removed
- Legacy modular language and optional tool references  
- Confidence flag/scoring feature from all protocol outputs  
- All mentions of auto-save or speculative memory behavior  

</details>

---

<details>
<summary> June 14–17: Documentation Expansion and Restructuring</summary>

### Added
- `HANDBOOK.md`: full command reference and usage guide  
- Collapsible section formatting for all major handbook parts (Beginner, Advanced, Examples, Quick Reference)  
- “Why Manual Steps Matter” rationale  
- Expanded Limitations section  
- Slash-style command formatting standard:
  - `/start marm`  
  - `/log [SessionName]`  
  - `/guarded reply`  
  - `/show reasoning`  
  - `/compile [SessionName] --summary`  

### Changed
- FAQ.md grouped and rewritten by category: Core Concepts, Sessions, Commands, Platform Support  
- README clarified and reorganized to align with handbook  
- Handbook structured into Beginner / Intermediate / Advanced use tiers  
- Emphasis on manual workflows and session recap cadence  

### Removed
- Embedded command list from README  
- “Back to top” anchors (due to GitHub collapsible quirks)  

</details>

---

<details>
<summary> June 18–20: Externalization and Visibility Focus</summary>

### Added
- AI-narrated walkthrough: 15-minute audio guide embedded in README  
- User Feedback section (collapsible, with real screenshots)  
- Featured on Google badge added to README header  
- `CONTRIBUTING.md` and Recognition Framework  
- Multi-tier GitHub Discussions and onboarding entry points  

### Changed
- README focus shifted to narrative onboarding:
  - “What → Why → How → Proof” sequence  
  - Replaced “Use Cases” with community-backed examples  
  - Light marketing layer added (clear, not exaggerated)  

</details>

---

<details>
<summary> June 21: README Cleanup & Structure Pass</summary>

### Changed
- Cleaned up main README for new-user clarity  
- Reordered sections: **What MARM is → Why it helps → How to use it**  
- Merged “Problem” and “Use Cases” into one purpose-driven section  
- Moved Contact, Credits, and auxiliary content to `CONTRIBUTING.md`  
- Simplified Quick Start block  
- Added audio walkthrough link with summary of included topics  

</details>

---

<details>
<summary>June 23: MARM v1.3 Protocol Expansion</summary>

### Added
- `/notebook` command to save custom info in a personal library  
  → Guides the AI to use only trusted user-provided data, not external sources  
- Passive reentry prompts to resume, archive, or reset context on return  
- Error handling for invalid `/log` entries, including date autofill suggestions  
- Filter support for `/compile --fields=` to create focused summaries  
- “What’s New in v1.3” section added to `HANDBOOK.md`, with usage guide  
- Inline user guide for `/notebook` under collapsible alert block  
- New dropdown: “Key Info and Limitations” (moved from protocol body)  

### Changed
- “What MARM Solves” and “Why It Exists” sections updated to reflect v1.3 behavior  
- Activation response now includes summary and Quick Start command list  
- Examples revised for clarity and real-world use  
- AI now defaults to prioritizing `/notebook` entries over trained assumptions  

### Removed
- Key info and limitations from static protocol body (now placed in dropdown)  
- Redundant phrasing in command definitions and legacy guardrail notes  

</details>
