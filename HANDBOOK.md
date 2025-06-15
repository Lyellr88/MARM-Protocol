# Getting Started with MARM (**Beginners to Advanced Guide**)

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.

---

Short introduction:  
MARM is a protocol for advanced AI session memory, workflow management, and accuracy guardrails.  
This handbook includes all core commands, beginner guidance, and error handling tools

## Core Activation

*Note: MARM prioritizes manual control and transparency. Some steps are intentionally not automated to ensure accuracy and prevent drift.*

**/start marm**  
Activates MARM’s session memory kernel and accuracy guardrails.  
*Use this as the first command in any MARM-enabled session.*

> **Beginner Tip:**  
> Just type `/start marm` at the beginning of your conversation. It prepares the AI to track memory and be more accurate.

---

## Session Management

MARM automatically differentiates between a simple session label and a structured log based on whether the input starts with a `[` character.

**/log [SessionName]**  
Creates a session “folder” label to organize conversation history.  
*Example:*  
`/log SessionA`

> **Beginner Tip:**  
> Use this to name your conversation. For example, `/log Ideas` helps the AI remember what you're working on.

**/log [YYYY-MM-DD | User | Intent | Outcome]**  
Adds a structured log entry for detailed session tracking.  
*Example:*  
`/log [2025-06-13 | Ryan | Introduced patch | Got feedback]`

> **Beginner Tip:**  
> You can skip this if you're just starting out. Use it later when you want to track outcomes from each session.

> **Tip:**  
> The `/log` command is smart—use it to either start a new session folder (`/log SessionA`) or add a detailed entry (`/log [date | user | intent | outcome]`).  
> MARM will auto-detect and organize your input.

---

## Compiling & Summarizing

**/compile [SessionName] --summary**  
Generates a concise, token-safe summary of all logs in a session. Outputs one line per entry.

**Optional flags:**  
`--fields=Intent,Outcome` to limit output to specific fields.  
*Example:*  
`/compile ProjectX --summary --fields=Intent,Outcome`

> **Beginner Tip:**  
> If you've logged a few things, use this to create a short recap. It makes it easier to pick up where you left off.

**System Output: Auto-Reseed Prompt**  
After compiling, MARM generates a formatted context block you can paste into a new session to resume progress.  
*No manual command needed.*

> **Beginner Tip:**  
> After compiling, just copy and paste the summary block into your next chat. It will reconnect the AI with what you were doing.

---

## Accuracy Tools

**/guarded reply** (formerly `/contextual reply`)  
Replaces standard response behavior with a logic-guarded output. Adds reasoning and context validation.

> **Beginner Tip:**  
> Use this when the AI starts to feel off-topic or makes assumptions. It forces better logic.

**/show reasoning**  
Displays the logic chain or decision path used in the last response.  
*Useful for audits or debugging.*

> **Beginner Tip:**  
> Curious why the AI said something? Use this to see its reasoning and double-check accuracy.

---

## Error Handling and Schema Rules

**Log Format Enforcement**  
All structured logs must follow this format:  
`[YYYY-MM-DD | User | Intent | Outcome]`  
Invalid formats trigger correction prompts or autofill suggestions (e.g., current date if missing).

> **Beginner Tip:**  
> If you get a format warning, don't worry. MARM will usually guide you to fix it or fill in missing parts.

**Autofill and Correction Support**  
MARM detects incomplete or malformed log entries and will either prompt correction or apply default values to maintain clean summaries.

> **Beginner Tip:**  
> You don’t need to be perfect with formatting. MARM helps clean it up for you.

---

## Error Handling Examples

*Coming soon: real-world examples of invalid vs. corrected log entries.*

---

## Versioning Note

> **Compatibility:**  
> MARM v1.2+ only. For legacy versions, see [link to docs].

---

## Quick Reference Table

| Command & Example                                                                 | What It Does                                      | Notes                                              |
|-----------------------------------------------------------------------------------|---------------------------------------------------|----------------------------------------------------|
| `/start marm`                                                                     | Activates MARM’s session memory and guardrails    | Use at the start of every session                  |
| `/log SessionA`<br>`/log [2025-06-13 \| Ryan \| Introduced patch \| Got feedback]`| Creates a session label or adds a structured log  | Format auto-detected by MARM                       |
| `/compile ProjectX --summary`<br>`/compile ProjectX --summary --fields=Intent,Outcome` | Compiles and summarizes logs for a session        | Use `--fields` to filter summary output            |
| *(auto)*                                                                          | **Auto-Reseed Prompt**                            | After compiling, MARM generates a context block    |
| `/guarded reply`                                                                  | Enables logic-guarded, context-checked responses  | For higher accuracy replies                        |
| `/show reasoning`                                                                 | Displays the logic/decision chain for last reply  | Great for audits/debugging                         |
