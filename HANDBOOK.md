# MARM Handbook

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.  
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.  

---

## Platform Compatibility Note

MARM works across all major LLM platforms, including ChatGPT, Claude, Gemini, and Grok.

It does **not** depend on native memory features. Instead, it uses manual logging, structured prompts, and reseeding to maintain context. This ensures consistency regardless of platform behavior or update cycles.

As memory capabilities evolve, MARM remains stable by design-users always retain control.

---

## Short Introduction

MARM is a universal protocol designed to improve memory continuity and response accuracy during AI conversations.  
This handbook covers beginner guidance, command usage, and recovery strategies for when memory or accuracy begins to drift.

---

## What’s New in v1.2  
Session relay tools (/compile, reseeding, and schema enforcement) are now core features of MARM, no more separate patch.

---

# Part I: Getting Started (Beginner Focus)

<details>

## Session Memory Kernel – Setup

MARM uses a manual session kernel to simulate memory across chats. It doesn't rely on built-in memory systems. Instead, you give it just enough structure to stay aligned. You activate it with:

### **Command:** `/start marm`  
Activates MARM’s session memory kernel and accuracy guardrails.  
*Use this as the first message in any new session.*

> **Quick Start Example:**  
> ```
> /start marm  
> ```
> That’s it. This primes the AI to retain context, reduce drift, and answer with more internal logic.

> **FAQ Insight:**  
> *“Do I need to install anything first?”*  
> No. MARM is just a set of structured prompts. Everything works inside the chat window, no setup or extensions required.

---

## Logging a Session

You can help MARM track and resume your work by creating a session log.

### **Command:** `/log [SessionName]`  
Creates a session label (think of it like naming a folder).

> **Example:**  
> ```
> /log BrainstormX  
> ```

> **Beginner Tip:**  
> If you're starting a conversation on a topic like job hunting or planning a project, give it a simple name with `/log`.

---

### **Command:** `/log [YYYY-MM-DD | User | Intent | Outcome]`  
Adds a detailed line item to your session. This is optional but powerful.

> **Example:**  
> ```
> /log [2025-06-19 | Ryan | Drafted pitch | Got early feedback]  
> ```

> **When to Use:**  
> After a major step, a breakthrough, or a decision worth tracking across sessions.

> **FAQ Insight:**  
> *“What happens if I mess up the format?”*  
> MARM checks for errors. If your log is off, it’ll suggest a fix or auto-correct missing parts (like today’s date).

---

## Compiling Progress

If you’ve logged more than one thing, MARM can summarize it back to you.

### **Command:** `/compile [SessionName] --summary`

> **Example:**  
> ```
> /compile BrainstormX --summary  
> ```

You’ll get a one-line recap per log entry. You can also narrow the output:

> ```
> /compile BrainstormX --summary --fields=Intent,Outcome  
> ```

This keeps your memory tight when jumping between sessions.

> **FAQ Insight:**  
> *“Can I use these summaries in new chats?”*  
> Yes-MARM will also auto-generate a ‘reseed block’ after compiling. Paste it into a new session to reconnect context.

---

## Accuracy Guardrails

When you need higher factual precision or want to see how the AI formed its answer:

### **Command:** `/guarded reply`  
Replaces default response mode with accuracy logic.

> **Use this when:**  
> - The AI seems unsure  
> - You're in a critical phase  
> - You need a traceable, transparent answer

### **Command:** `/show reasoning`  
Reveals how the AI built its last answer.

> **Quick Start Example:**  
> ```
> /show reasoning  
> ```
> This is useful when something feels off or when documenting decision chains.

---

## Reseeding Context (After a Break)

When you return later or open a new chat, you can bring back your last session:

> **Quick Start Workflow:**  
> 1. Use `/compile [SessionName] --summary`  
> 2. Copy the generated reseed block  
> 3. Paste it as your *first message* in the new thread

That’s how MARM picks up right where you left off.

</details>

---

# Part II: Intermediate Usage

<details>

## What MARM Is Good For (Real-World Use Cases)

MARM isn't just a memory patch, it's a protocol for managing structured interaction with AI across time. Here are key ways it's used by intermediate users:

### Multi-Session Workflows
Track projects, tasks, or concepts across multiple conversations.

> **Example:**  
> Use `/log PortfolioBuild` to track everything related to your resume, job hunt, and AI-generated cover letters. Even if you space it out across days or weeks.

---

### Reduced Hallucination Mode
When factual accuracy is critical, MARM’s structure suppresses guesswork and forces clearer logic.

> **Example:**  
> Writing a business summary with `/guarded reply` and checking the logic with `/show reasoning` ensures the AI isn’t improvising.

---

### Topic Segmentation
Separate ideas or goals into labeled sessions so you don’t cross streams.

> **Example:**  
> Log `/log [2025-06-20 | Ryan | Shifted from Coin App to Prompt Testing]` to mark pivots in a long planning thread.

---

## What “Consistent User Input” Really Means

MARM works best when **you guide the structure clearly**. Here’s what that looks like:

### Recommended Patterns

- **Start clean**: Always begin with `/start marm`  
- **Label sessions**: early using `/log SessionName`  
- **Recap or reset**: after major topic shifts or long breaks  
- **Use full commands**: avoid vague shorthand or implied requests  
- **Avoid fragmented messages**: combine context into one block when possible

---

### Patterns That Hurt MARM

- Jumping topics with no signal (“So anyway-about that movie…”)  
- Assuming the AI recalls something without reseeding  
- Switching tone mid-thread (formal → casual → command)  
- Forgetting to use `/log` for outcome tracking

---

## Why MARM Uses Manual Steps (And Why That’s Good)

Some users ask: *“Why doesn’t MARM just do this stuff for me?”* The short answer: **guiderails, transparency, and portability.**

### Manual Steps = Shared Responsibility

MARM uses commands like `/log` and `/compile` to let you **actively shape what matters**. That means:

- **You decide what gets remembered**  
- **You control when summaries happen**  
- **You review the logic, not just the output**

It’s not about complexity, it’s about reliability. MARM is predictable **because** it avoids invisible automation.

---

> **Key Principle:**  
> MARM favors *deliberate context discipline* over assumed automation. That’s what makes it work across platforms, even when memory features vary or fail.

</details>

---

# Part III: Advanced Usage & Compatibility

<details>

## Session Relay Tools and Cross-Session Handoff

MARM includes advanced tools to bridge sessions, especially when working across different threads, tabs, or days.

### Command: `/compile [SessionName] --summary`

Outputs a clean, line-by-line summary of previous logs. Ideal for compressing session history before a reset or export.

Optional flag:  
`--fields=Intent,Outcome` filters output to key details only.

> Example:  
> ```
> /compile PromptFlow --summary --fields=Intent,Outcome  
> ```

This produces a token-safe recap of what happened and why.

---

### Auto-Reseed Prompt (System Output)

After compiling, MARM automatically generates a formatted context block. This can be copied and pasted into a new thread to resume progress.

There is no need for a separate command. This block is optimized to reduce token usage and realign AI responses with prior context.

---

### Schema Enforcement

All structured `/log` entries must follow this format:  
`[YYYY-MM-DD | User | Intent | Outcome]`

Invalid logs trigger correction prompts or auto-fill logic to preserve clean session data. This ensures compatibility with summary and reseed tools.

---

## Platform Behavior and Compatibility Differences

MARM is designed to run consistently across major LLMs, but the results may still vary depending on system capabilities and memory handling.

### Memory-enabled platforms (e.g., ChatGPT with memory on)

- May recall prior behavior implicitly
- Still benefit from explicit `/log` and `/compile` commands to reinforce structure

### Stateless platforms (e.g., Claude, some API calls)

- Fully dependent on user-applied structure
- Reseed blocks are especially critical for continuity

MARM remains effective regardless, because it requires no system-specific hooks. Its effectiveness comes from consistent user patterns.

---

## Extending MARM for Workflow Management

Advanced users may layer MARM into more complex systems:

- Journal-style daily logging for research projects  
- Multi-thread tracking using session names as project IDs  
- Paired use with AI agents where MARM governs the prompt structure

The protocol does not interfere with system prompts, plugins, or browser extensions. It wraps around them as a scaffolding layer to preserve logic and memory.

---

## Power-User Templates

Advanced workflows often reuse log formats, naming conventions, or reseed prompts. While MARM does not currently include templating logic, users can create personal templates for:

- Weekly planning  
- Decision logs  
- Testing sessions  
- Prompt architecture experiments

These templates can be stored outside MARM and called in via `/log` or `/compile`.

---

## Summary

Part III is about control at scale. By using MARM’s structural tools deliberately, you can build complex, multi-session workflows that remain accurate, traceable, and portable. Without needing native memory or external systems.

</details>

---

<details>
  
<summary><strong>Quick Reference Table (Click to Expand)</strong></summary>

| Feature                            | Command Example                             |   
|------------------------------------|---------------------------------------------|  
| Start MARM                         | `/start marm`                               |   
| Log a session (basic)              | `/log SessionA`                             |   
| Log a session (detailed)           | `/log [YYYY-MM-DD \| User \| Intent \| Outcome]`|  
| Compile summary                    | `/compile ProjectX --summary`               |     
| Compile with field filters         | `--fields=Intent,Outcome`                   |    
| Guarded reply                      | `/guarded reply`                            |  
| Show reasoning                     | `/show reasoning`                           |   
| Reseed context                     | *(auto after compile)*                      |  
| Session export & reuse             | *(reseeding from compile output)*           |  
| Platform behavior differences      | *(n/a)*                                     | 

</details>
