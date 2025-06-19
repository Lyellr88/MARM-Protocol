# MARM Roadmap

## Core Focus (Now – v1.2.x)
- Refine documentation based on user feedback
- Add more real-world usage examples and templates
- Improve navigation for first-time users (e.g., FAQ polish, Handbook anchors)
- Monitor adoption patterns for API-tier users vs casual interfaces

## Planned (v1.3 – Long-Term Additions)
- Add `cheatsheet.md` for minimal startup users
- Explore cross-thread reseed format for long-term continuity
- Test modular overlays (MARM + journaling or agents)
- Evaluate markdown export or log file generation options

## Community + Feedback
- Open call for integration feedback from dev teams
- Add "Used With MARM" showcase for variations/adaptations
- Contributor recognition improvements

---
## Related Projects (In Development)

### Repetition Echo Protocol (REP) v2  
*Practical loop-guard for multi-LLM and AI chat systems*

**Purpose:**  
Reduce redundant AI repetition (“echoes”) in conversation while preserving user intent, clarity, and override control. REP is designed to minimize noise, not access—offering guided summaries and optional repeat triggers rather than hard suppression.

**Core Features:**  
- Dynamic 3–5 turn context window to detect overlap  
- Semantic + keyword matching for flexible suppression  
- Micro-summaries with user-driven branching (recap, expand, move on)  
- Override phrase detection with paraphrase or verbatim support  
- Multi-LLM shared suppression memory (for agent chains)  
- Optional voice UI enhancements and natural phrasing  
- Transparent suppression logging with traceable event IDs

**Example Behavior:**  
> “We just talked about [topic]. Want a quick recap, a deeper dive, or move to something new?”

**Why It Matters:**  
Helps AI systems stay context-aware, efficient, and user-guided—especially during long, repetitive conversations or assistant workflows. REP v2 builds on real-world pain points in LLM use by offering a repeatable suppression protocol with flexible deployment.

