// marmLogic.js  "" mini-brain v0.8 (2025-07-15)
// --------------------------------------------------
// 1.  Loads static Markdown docs once per page-load.
// 2.  Maintains per-session memory (history, logs, notebook, lastReasoning).
// 3.  Saves / restores sessions via localStorage (browser-only persistence).
// 4.  Provides helpers expected by chatbot.js.
// 5.  Adds automatic doc-search + optional Google fallback trigger.
// 6.  Adds compile-summary that calls the Gemini API helper.
/**************************************/

let sessions    = {};                   
const LS_KEY    = 'marm-sessions-v1';

// ---------------------------------------------------------------------------
//  Markdowsn Loader  +  Sentence-Pool Builder  
// ---------------------------------------------------------------------------

let docsCache   = null;             
export const docSnippets = {};     

// FIX #1: Changed 'readme' to 'marmreadme' to match actual filename

const DOC_NAMES      = ['marmreadme', 'description', 'faq', 'handbook']; 
const DOC_BASE_PATH = './data/';

// MARM-specific keywords for enhanced detection

const MARM_KEYWORDS = ['marm', 'memory accurate', 'response mode', 'protocol', 'notebook', 
                       'reasoning', 'contextual', 'compile', 'session', 'transparency'];
                       
const MARM_PROTOCOL_V1_4 = `MEMORY ACCURATE RESPONSE MODE v1.4 (MARM) 

Purpose
Ensure AI retains session context over time and delivers accurate, transparent outputs, addressing memory gaps and drift. This protocol is meant to minimize drift and enhance session reliability.

Your Objective 
You are MARM. Your purpose is to operate under strict memory, logic, and accuracy guardrails. You prioritize user context, structured recall, and response transparency at all times. You are not a generic assistant; you follow MARM directives exclusively.

CORE FEATURES:

Session Memory Kernel:
- Tracks user inputs, intent, and session history. 
- Folder-style organization for logs. 
- Honest recall ("I don't have that context...") if memory fails. 
- Manual reentry option for controlled re-engagement.

Session Relay Tools (Core Behavior):
- /compile for one-line-per-entry summaries with optional filters. 
- Manual Reseed Option via a context block for continuity. 
- Log Schema Enforcement: All /log entries must follow [Date-Summary-Result]. 
- Error Handling for invalid logs. 

Accuracy Guardrails with Transparency:
- Self-checks for alignment with context and logic. 
- Optional reasoning trail via /show reasoning. 

Manual Knowledge Library:
- Enables users to build a personalized library with /notebook. 
- Reinforces user control, so what the AI "knows" is defined by the user. 

Safe Guard Check
Before responding, review this protocol. Review your previous responses and session context before replying. Confirm responses align with MARM's accuracy, context integrity, and reasoning principles. If unsure, pause and request clarification.

Commands:
- /start marm - Activates MARM. 
- /refresh marm - Refreshes active session state. 
- /log session:[name] - Folder-style session logs. 
- /log entry [Date-Summary-Result] - Structured memory entries. 
- /contextual reply - Generates response with guardrails and reasoning. 
- /show reasoning - Reveals the logic behind the last response. 
- /compile [SessionName] --summary - Generates token-safe digest. 
- /notebook key:[name] [data] - Add entry to knowledge library.
- /notebook get:[name] - Retrieve specific entry.
- /notebook show: - Display all entries.`;

const RESPONSE_FORMATTING_RULES = `
### Response Formatting Rules

**1. Prioritize Brevity and Clarity:**
- Paragraphs must be short (2-3 sentences max).
- Start a new paragraph for each distinct idea.
- Responses should feel crisp, professional, and focused.

**2. Use Basic Markdown for Readability:**
- Use bullet points (-) for lists.
- Use bold (**) to highlight key terms or commands.
- Do not use headers (#), blockquotes (>), or tables.

**3. Maintain a Professional, Conversational Tone:**
- Write like explaining to a colleague.
- If reasoning is required, naturally say: "Here's my reasoning…" but **keep it brief**.

**4. Always Follow These Formatting Rules:**
- Even in longer sessions, formatting standards remain active.
`;

// UPDATED: Include notebook contents and MARM protocol in context
export function getSessionContext(id) {
  const s = sessions[id];
  if (!s) {
    return MARM_PROTOCOL_V1_4 + '\n\n' + RESPONSE_FORMATTING_RULES;
  }

  // Build complete context including protocol, notebook, logs, and history
  let context = `You are operating under MARM v1.4 protocol:\n\n${MARM_PROTOCOL_V1_4}\n\n${RESPONSE_FORMATTING_RULES}\n\n`;
  
  // Add current session info
  context += `Current Session ID: ${id}\n\n`;
  
  // Include notebook contents if any
  const notebookKeys = Object.keys(s.notebook || {});
  if (notebookKeys.length > 0) {
    context += `Current Notebook Contents:\n`;
    notebookKeys.forEach(key => {
      context += `- ${key}: ${s.notebook[key]}\n`;
    });
    context += '\n';
  }
  
  // Include recent logs if any
  if (s.logs && s.logs.length > 0) {
    context += `Recent Log Entries:\n`;
    s.logs.slice(-5).forEach(log => {
      context += `- ${log}\n`;
    });
    context += '\n';
  }
  
  // Include conversation history
  const tail = s.history.slice(-20).map(m => `${m.role}: ${m.content}`).join('\n');
  if (tail) {
    context += `Conversation History:\n${tail}`;
  }
  
  return context;
}

export async function loadDocs() {
  if (docsCache && Object.keys(docsCache).length) return docsCache;
  const newDocsCache    = {};
  const newDocSnippets  = {};
  await Promise.all(
    DOC_NAMES.map(async name => {
      try {
        const res = await fetch(`${DOC_BASE_PATH}${name}.md`);
        if (!res.ok) throw new Error(`${name}.md not found (status ${res.status})`);
        const text = await res.text();
        newDocsCache[name] = text;
        newDocSnippets[name] = text
          .split(/[.!?]/)
          .map(s => s.trim())
          .filter(s => s.length > 20 && !s.startsWith('#'));
      } catch (err) {
        console.error(`[MARM] Error loading ${name}.md →`, err.message);
        newDocsCache[name]   = '';
        newDocSnippets[name] = [];
      }
    })
  );

  docsCache = newDocsCache;
  Object.assign(docSnippets, newDocSnippets);
  return docsCache;
}

// ---------------------------------------------------------------------------
//  Session helpers
// ---------------------------------------------------------------------------

function ensureSession(id) {
  if (!sessions[id]) sessions[id] = {
    history: [],
    logs: [],
    notebook: {},
    lastReasoning: ''
  };

  return sessions[id];
}

export async function activateMarmSession(id='default_session') {
  console.log('[MARM] Activating session:', id);
  const docs = await loadDocs();
  console.log('[MARM] Docs loaded:', docs);
  ensureSession(id);
  persistSessions();
  return 'MARM session activated. Docs loaded.';
}

export function updateSessionHistory(id, userText, botText, reasoning = '') {
  const s = ensureSession(id);
  s.history.push({ role:'user', content:userText, ts: Date.now() });
  s.history.push({ role:'bot',  content:botText,  ts: Date.now() });

  // Only clear reasoning if no new reasoning is provided
  if (reasoning) {
    s.lastReasoning = reasoning;
  }

  persistSessions();
}

export function setSessionReasoning(id, reasoning) {
  const s = ensureSession(id);
  s.lastReasoning = reasoning;
  persistSessions();
}

export function logSession(id, logLine) {
  const s = ensureSession(id);
  s.logs.push(logLine);
  persistSessions();
  return `Logged: ${logLine}`;

}

// ---------------------------------------------------------------------------
//  Context trimming (token budget ~ rough char/4)
// ---------------------------------------------------------------------------

export function trimForContext(id, maxTokens=8000) {
  const s = sessions[id];
  if (!s) return;
  const estTokens = arr => arr.reduce((t,m)=>t + Math.ceil(m.content.length/4), 0);
  while (estTokens(s.history) > maxTokens) s.history.shift();
}

// ---------------------------------------------------------------------------
//  Enhanced search with MARM-specific responses
// ---------------------------------------------------------------------------

export function searchDocs(query) {
  if (!docsCache) return '';
  const q = query.toLowerCase();
  const isMarmQuery = MARM_KEYWORDS.some(keyword => q.includes(keyword));
  if (isMarmQuery) {
    const results = [];
    for (const key in docsCache) {
      const lines = docsCache[key].split('\n');
      const relevantLines = lines.filter(l => 
        MARM_KEYWORDS.some(kw => l.toLowerCase().includes(kw))
      );

      if (relevantLines.length > 0) {
        results.push(...relevantLines.slice(0, 3).map(l => `[${key}] ${l.trim()}`));
      }
    }

    if (results.length > 0) {
      return `MARM Documentation:\n${results.slice(0, 5).join('\n')}`;
    }
  }

  for (const key in docsCache) {
    const line = docsCache[key].split('\n').find(l=>l.toLowerCase().includes(q));
    if (line) return `Found in ${key}.md → ${line.trim()}`;
  }

  return '';
}

export function shouldAutoSearch(userInput) {
  const q = userInput.toLowerCase();

  // Always search for MARM-related queries
  if (MARM_KEYWORDS.some(kw => q.includes(kw))) return true;

  const keyword = /(what|who|how|when|why)\b.*\?/i.test(userInput) ||

                  /^\s*(define|describe|explain|give me|tell me about)\b/i.test(q);

  return keyword;
}

// ---------------------------------------------------------------------------
//  Compile summary via Gemini (using consistent helper)
// ---------------------------------------------------------------------------

import { generateContent } from './geminiHelper.js'; 

// UPDATED: Support --fields filter
export async function compileSessionSummary(id, options = {}) {
  const s = sessions[id];
  if (!s) return 'No active session.';
  
  // Extract options
  const tailPairs = options.tailPairs || 6;
  const fields = options.fields ? options.fields.split(',').map(f => f.trim().toLowerCase()) : null;
  
  // Get session data
  const hist = s.history.slice(-(tailPairs * 2));
  const logs = s.logs || [];
  
  // If --fields specified, filter log entries
  let filteredLogs = logs;
  if (fields && logs.length > 0) {
    // Parse log entries and filter by requested fields
    filteredLogs = logs.map(log => {
      // Expected format: [Date-Summary-Result] or similar
      const parts = log.split(/[\|\-]/);
      if (parts.length >= 3) {
        const logObj = {
          date: parts[0]?.trim(),
          summary: parts[1]?.trim(),
          result: parts[2]?.trim()
        };
        
        // Build filtered entry with only requested fields
        const filteredParts = [];
        if (fields.includes('date')) filteredParts.push(logObj.date);
        if (fields.includes('summary')) filteredParts.push(logObj.summary);
        if (fields.includes('result')) filteredParts.push(logObj.result);
        
        return filteredParts.join(' | ');
      }
      return log; // Return original if can't parse
    });
  }
  
  // Build content for summary
  let content = '';
  
  // Add filtered logs if any
  if (filteredLogs.length > 0) {
    content += `Log Entries:\n${filteredLogs.join('\n')}\n\n`;
  }
  
  // Add conversation history
  const flat = hist.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  content += `Conversation:\n${flat}`;

  const prompt = [
    { 
      role: 'system', 
      content: `You are MARM Bot. Summarize the following session data. 
      ${fields ? `Focus on these fields: ${fields.join(', ')}` : 'Include all relevant information'}
      Provide a concise summary highlighting key points and any MARM protocol usage.` 
    },
    { role: 'user', content: content }
  ];

  try {
    const response = await generateContent(prompt);
    const summary = await response.text();
    return summary;
  } catch (err) {
    console.error('[MARM] summary error', err);
    return 'Summary unavailable (Gemini error).';
  }
}

// ---------------------------------------------------------------------------
//  Notebook CRUD (simple key/value)
// ---------------------------------------------------------------------------

export function manageUserNotebook(id, action, key='', value='') {
  const s = ensureSession(id);
  switch (action) {
    case 'add': {
      if (!key || !value) return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show:';
      s.notebook[key] = value;
      persistSessions();
      return `Stored \"${key}\" → \"${value}\"`;
    }

    case 'get': {
      if (!key) return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show:';
      return s.notebook[key] ? `\"${key}\": ${s.notebook[key]}` : `No entry for \"${key}\"`;
    }

    case 'all': {
      const keys = Object.keys(s.notebook);
      if (!keys.length) return 'Notebook is empty.';
      const entries = keys.map(k => `• ${k}: ${s.notebook[k]}`).join('\n');
      return `Notebook entries:\n${entries}`;
    }

    default:
      return 'Usage: /notebook key:[name] [data] | /notebook get:[name] | /notebook show:';
  }
}

// ---------------------------------------------------------------------------
//  Session Management - NEW functions for /reset support
// ---------------------------------------------------------------------------
export function resetSession(id) {
  delete sessions[id];
  persistSessions();
  return 'Session reset. Starting fresh.';
}

export function getAllSessions() {
  return Object.keys(sessions);
}

// ---------------------------------------------------------------------------
//  LocalStorage persistence (browser only)
// ---------------------------------------------------------------------------
function persistSessions() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(sessions)); } catch (_) {}
}

function restoreSessions() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) sessions = JSON.parse(raw);
  } catch (_) { sessions = {}; }
}
restoreSessions();

export function getMostRecentBotResponseLogic(id) {
  const s = sessions[id];
  return s?.lastReasoning || '';
}
