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

---

<details>
<summary> June 9th–13th: Initial Protocol Unification (v1.2 Launch)</summary>

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
<summary> June 14th–17th: Documentation Expansion and Restructuring</summary>

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
<summary> June 18th–20th: Externalization and Visibility Focus</summary>

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
<summary> June 21st: README Cleanup & Structure Pass</summary>

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
<summary>June 23rd: Protocol Expansion (v1.3 Launch)</summary>

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

---

<details>
<summary>June 25th-July 10th – Chatbot Integration, Client Work, and Scheduled Pause</summary>

### Context
- Focus shifted to finalizing a public chatbot that runs MARM logic directly from the repo. This feature will allow users to interact with MARM in real time and explore its functionality hands-on.
- Took a scheduled 5-day break for the July 4th holiday.
- Completed a consulting engagement re-engineering a deliverability protocol for a client, which temporarily paused MARM-specific development.

### Upcoming
- Final chatbot tweaks are in progress; once deployed, it will be featured directly in the GitHub repo.
- MARM refinements will resume, including minor protocol adjustments and test-driven formatting updates.
</details>

---

<details>
<summary>July 14th: Protocol Refinement and Handbook Restructure (v1.4 Launch)</summary>

### Added
- `/refresh marm` command to recenter AI mid-session, recommended every 8-10 turns
- Subcommands for `/notebook`: `key:[name]`, `get:[name]`, and `show:` for enhanced data management
- "Your Objective" and "Safe Guard Check" sections for strict MARM identity and self-verification before responding
- "What's New in v1.4 (Upgrading from v1.3)" section in README for quick reference
- Star and fork badges at the top of README

### Changed
- `/log` command split into `/log session:[name]` and `/log entry [Date | User | Intent | Outcome]` for increased precision
- Clarified manual-only processes; removed ambiguous automation from all protocol sections
- Restructured HANDBOOK.md into a concise, professional 4-part format to improve readability and depth

### Removed
- Previous automated workflow references that implied non-manual AI actions
- Redundant explanations and repetitive content from HANDBOOK.md to streamline user experience
</details>

---

<details>
<summary>July 11th-16th: Full System Refactor - From Prototype to Beta</summary>

### Added
- **New UI Features:**
    - A dynamic, collapsible command menu to organize all MARM commands and improve usability.
    - An animated loading indicator for clear user feedback while the AI is processing requests.
    - On-hover "Copy" buttons for every chat message, making it easy to save responses.
    - Full dark mode support for all new UI components.
- **Enhanced Logic and Context:**
    - Full support for all MARM v1.4 commands, including the new `/start` and `/refresh` commands.
    - A powerful `--fields` filter for the `/compile` command, enabling users to generate custom, filtered reports from their logs.
    - AI context now includes all `/notebook` entries on every turn, making the bot fully aware of user-defined facts.
    - Keyword-aware document searching to provide more accurate answers for MARM-related queries.

### Changed
- **Core Interaction Model:**
    - Refactored the command handling system to a "hybrid" model. Most commands now trigger an AI-generated, natural language acknowledgment instead of a static text reply.
    - Updated the message display function to use `marked.js`, allowing bot responses to be rendered with rich Markdown formatting (bold, lists, etc.).
- **Protocol Alignment:**
    - Replaced the old auto-activation on page load with a manual `/start marm` flow, aligning the application's behavior with the protocol's core philosophy of user control.
    - Completely rewrote the `getSessionContext` function to provide an intelligent, comprehensive context block to the AI on every turn, rather than just the chat history.
- **Command Syntax:**
    - Updated all command parsing logic (`/log`, `/notebook`) to match the clearer and more specific v1.4 syntax.

### Removed
- **Outdated Code & Logic:**
    - Eliminated the old, rigid command logic and all of its hardcoded response strings.
    - Removed the automatic MARM activation flow.
    - Made the legacy `config.js` file completely obsolete, as its contents were integrated or replaced.
</details>
