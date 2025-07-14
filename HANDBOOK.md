# MARM Handbook v1.4

## Project Files

- [README.md](README.md) – Core introduction and quick start for using MARM.  
- [FAQ.md](FAQ.md) – Answers to common questions about how and why to use MARM.  
- [CHANGELOG.md](CHANGELOG.md) – Tracks updates, edits, and refinements to the protocol.  
- [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines and collaborator credits.  
- [DESCRIPTION.md](DESCRIPTION.md) – Protocol purpose and vision overview.  
- [LICENSE](LICENSE) – Terms of use for this project.
- [HANDBOOK.md](HANDBOOK.md) – Full guide to MARM usage, including commands, examples, and beginner to advanced tips.
- [ROADMAP.md](ROADMAP.md) – Planned features, upcoming enhancements, and related protocols under development.

## Short Introduction

MARM is a universal protocol designed to improve memory continuity and response accuracy during AI conversations. This handbook covers beginner guidance, command usage, and recovery strategies for when memory or accuracy begins to drift.

## What's New
<details>
<summary>View MARM version updates</summary>

### v1.2
- Session Relay Tools (`/compile`, reseeding, schema enforcement) integrated.

### v1.3
- Manual Knowledge Library (`/notebook`) introduced.

### v1.4 
- Removed ambiguous automation.
- Added "Your Objective" and "Safe Guard Check."
- Expanded `/log` and `/notebook` commands for better control.

</details>

## Part I: Core Principles

### What is MARM?
MEMORY ACCURATE RESPONSE MODE (MARM) ensures accurate AI interactions by maintaining context through structured, user-directed controls. It prevents memory drift, improving AI transparency and reliability.

### Why Manual Steps Matter
Manual logging, knowledge entry, and accuracy checks prevent silent drift. User visibility ensures context and accuracy remain aligned.

**User Controls:**
- **Memory:** `/log session:`, `/log entry`.
- **Knowledge:** `/notebook` commands.
- **Accuracy:** `/contextual reply`, `/show reasoning`.

This approach ensures the AI works with **user-led intent**, reducing drift across sessions and platforms.

## Part II: Quick Start Walkthrough

### Step 1: Start & Label Session
/start marm
/log session:ProjectAlpha

### Step 2: Log Milestones Throughout Work
/log entry [2025-07-14 | Ryan | Set project scope | Phase 1 started]
/log entry [2025-07-14 | Ryan | Completed wireframes | Ready for review]

### Step 3: Handle Topic Shifts
When switching focus mid-session:
/log entry [2025-07-14 | Ryan | Pivoted to API design | Frontend work paused]
/refresh marm

### Step 4: Compile Progress
/compile ProjectAlpha --summary

Output example:
[2025-07-14 | Ryan | Set project scope | Phase 1 started]
[2025-07-14 | Ryan | Completed wireframes | Ready for review]
[2025-07-14 | Ryan | Pivoted to API design | Frontend work paused]

### Step 5: Reseed Context (New Session)
After compile, copy reseed block:
/start marm
/log session:ProjectAlpha
[paste reseed block]
/notebook key:project_tone Professional, technical documentation style

## Part III: Command Reference

### Session Management
- **`/start marm`**: Activates memory & accuracy layers. Must be first command.
- **`/refresh marm`**: Recenters AI mid-session if drift occurs. Use after 8-10 turns or topic pivots.

### Logging
- **`/log session:[name]`**: Labels session ("folders"). Think of it as project naming.
- **`/log entry [Date | User | Intent | Outcome]`**: Logs structured milestones. Schema is enforced.

### Accuracy & Reasoning
- **`/contextual reply`**: Forces accuracy-driven responses with self-checks.
- **`/show reasoning`**: Displays AI's reasoning trail for validation.

### Compiling & Reseeding
- **`/compile [SessionName] --summary`**: Provides condensed log summary.
- **Filter options:** `--fields=Intent,Outcome` for targeted summaries.
- **Schema Enforcement**: Invalid logs trigger correction prompts.

### Manual Knowledge Library (`/notebook`)
- **`key:[name] [data]`**: Add trusted user-defined info.
- **`get:[name]`**: Retrieve stored data.
- **`show:`** Lists all stored keys.

**Critical Notebook Behaviors:**
- Entries are **session-bound** - they don't persist across chats
- Must be manually reseeded each new session
- Token limits apply - keep entries concise
- Ideal for: project guidelines, tone rules, technical specs, workflow definitions

## Part IV: Beyond the Basics

### Real-World Use Cases

#### Multi-Session Projects
Track complex projects across days/weeks:
Day 1:
/log session:AppRedesign
/log entry [2025-07-14 | Ryan | Defined MVP features | 5 core features identified]
/notebook key:mvp_features Login, Dashboard, Settings, API, Reports
/compile AppRedesign --summary
Day 2 (new chat):
/start marm
/log session:AppRedesign
[paste Day 1 reseed block]
/notebook key:mvp_features Login, Dashboard, Settings, API, Reports
/log entry [2025-07-15 | Ryan | Started login flow | OAuth2 selected]

#### Reduced Hallucination Mode
For critical accuracy (legal docs, technical specs):
/contextual reply
"Draft a privacy policy section on data retention"
/show reasoning

Review reasoning trail before accepting output.

#### Complex Topic Management
Handle multi-threaded conversations:
/log session:ClientProject
/log entry [2025-07-14 | Ryan | Discussed frontend requirements | React chosen]
/notebook key:tech_stack React, Node.js, PostgreSQL
[20 messages later, topic shifts]
/log entry [2025-07-14 | Ryan | Switched to budget planning | Need cost estimates]
/refresh marm
/compile ClientProject --summary --fields=Intent

### Session Drift Management

<details>
  
#### When to Refresh/Reseed
- Every **8-10 conversation turns**
- After **any major topic pivot**
- When AI responses feel **generic or unfocused**
- Before **critical decisions or outputs**

#### Drift Recovery Process
Detect drift (generic responses, lost context)
/refresh marm
/compile [Session] --summary
Review last 3-5 entries
/contextual reply for next response

#### Preventive Maintenance
Every 10 turns:
/compile SessionName --summary
/refresh marm
/notebook show:  [verify key data intact]

</details>

### Manual Knowledge Library Deep Dive

<details>
  
#### Token Management Strategy
Bad (token heavy):
/notebook key:project_details This is a comprehensive project involving multiple stakeholders including...
Good (token efficient):
/notebook key:project_type B2B SaaS platform
/notebook key:stakeholders PM:John, Dev:Sarah, Design:Mike
/notebook key:deadline 2025-08-30

#### Multi-Key Strategies
Organize related info:
/notebook key:api_base https://api.example.com/v2
/notebook key:api_auth Bearer token in header
/notebook key:api_ratelimit 100 req/min

#### Session-Bound Behavior
Notebook entries **vanish** on new chat. Always reseed critical keys:
Essential reseed template:
/start marm
/log session:[Name]
[paste compile block]
/notebook key:tone [saved tone preference]
/notebook key:context [saved project context]

</details>

### Platform Compatibility Strategies

<details>
  
#### ChatGPT (Memory-Enabled)
- Native memory often **drifts** or **conflates sessions**
- MARM overrides with explicit structure
- Use `/compile` even with memory on
- `/refresh marm` counters GPT's assumption tendencies

#### Claude (Stateless)
- **Zero memory** between sessions
- Requires disciplined reseed workflow
- Benefits most from `/notebook` entries
- Use verbose session names for clarity

#### API/Groq/Local Models
- Treat as fully stateless
- Implement reseed blocks in system prompts
- Can automate compile/reseed via middleware
- Token limits vary - adjust notebook usage

#### Platform-Specific Tips
ChatGPT: /refresh marm every 5-7 turns (fights assumption drift)
Claude: Full reseed required, use detailed session labels
Groq: Keep notebook entries minimal (smaller context)
API: Can inject MARM protocol into system message

</details>

### Power-User Templates & Customization

<details>
  
#### Project Management Template
/start marm
/log session:Sprint24
/notebook key:sprint_goal Implement user authentication
/notebook key:team Frontend:2, Backend:3, QA:1
/log entry [Date | PM | Sprint planning complete | 21 story points]

#### Daily Standup Logger
/log session:DailyStandups
/log entry [2025-07-14 | Ryan | Yesterday: API design | Today: Implementation]
/compile DailyStandups --summary --fields=User,Outcome

#### Code Review Workflow
/log session:PR-4521-Review
/notebook key:pr_link https://github.com/org/repo/pull/4521
/log entry [2025-07-14 | Ryan | Initial review | 3 blockers found]
/notebook key:blockers SQL injection risk, Missing tests, No error handling

#### Multi-LLM Integration Pattern
Use MARM logs as context bridges:
GPT-4 Session:
/compile ProjectX --summary > export.txt
Claude Session:
/start marm
[paste export.txt]
Continue seamlessly...

#### Automation Hooks (n8n/Zapier)
Trigger: /compile command
Action: Auto-save to Notion/Google Docs
Result: Persistent external memory

</details>

### Advanced Session Patterns

<details>
  
#### Session Chaining
Link related sessions:
/log session:Research-Phase1
[work]
/compile Research-Phase1 --summary
New session:
/log session:Research-Phase2
/log entry [2025-07-15 | Ryan | Continued from Phase1 | See previous compile]

#### Parallel Sessions
Track multiple threads:
Tab 1: /log session:ClientA-Frontend
Tab 2: /log session:ClientA-Backend
Tab 3: /log session:ClientA-Integration
Merge later:
/compile ClientA-Frontend --summary
/compile ClientA-Backend --summary
[manually merge relevant entries]

</details>

## Quick Reference Table
<details>
<summary>Expand Quick Reference Table</summary>

| Feature                  | Command Example                                | Best Practice |
|--------------------------|------------------------------------------------|---------------|
| Start MARM               | `/start marm`                                  | Always first command |
| Refresh MARM             | `/refresh marm`                                | Every 8-10 turns |
| Log Session              | `/log session:ProjectX`                        | Use descriptive names |
| Log Entry                | `/log entry [Date | User | Intent | Outcome]` | Log key decisions only |
| Compile Summary          | `/compile ProjectX --summary`                  | Before session end |
| Compile Filtered         | `/compile ProjectX --summary --fields=Intent,Outcome` | For focused reviews |
| Accuracy Reply Mode      | `/contextual reply`                            | For critical outputs |
| Show Reasoning           | `/show reasoning`                              | Verify logic paths |
| Reseed (Manual)          | Paste compile block into new session           | Include notebook keys |
| Notebook Add             | `/notebook key:style Professional`             | Keep concise |
| Notebook Retrieve        | `/notebook get:style`                          | Verify after reseed |
| Notebook Show All        | `/notebook show:`                              | Check token usage |

</details>

## Troubleshooting Guide
<details>
<summary>Common Issues & Solutions</summary>

### "AI seems to have forgotten context"
- Run `/refresh marm`
- Check last compile with `/compile [session] --summary`
- Verify notebook keys with `/notebook show:`

### "Responses are too generic"
- Use `/contextual reply` for next response
- Add specific context to notebook
- Log recent decision with `/log entry`

### "Session too long, hitting limits"
- `/compile [session] --summary`
- Start fresh with `/log session:[Name]-Part2`
- Reseed only essential notebook keys

### "Platform memory conflicting with MARM"
- Explicitly use `/refresh marm`
- Ignore platform suggestions
- Trust MARM structure over native memory

</details>
