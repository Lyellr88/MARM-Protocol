// marmLogic.js  • mini‑brain v0.3 (2025‑06‑25)
// --------------------------------------------------
// 1.  Loads static Markdown docs once per page‑load.
// 2.  Maintains per‑session memory (history, logs, notebook, lastReasoning).
// 3.  Saves / restores sessions via localStorage (browser‑only persistence).
// 4.  Provides helpers expected by chatbot.js.
// 5.  Adds automatic doc‑search + optional Google fallback trigger.
// 6.  Adds compile‑summary that calls the Gemini API helper.
// --------------------------------------------------

/***********************  SIMPLE TYPES  ***************************
   sessions = {
     sessionId : {
        history : [{ role, content, ts }],
        logs    : ["YYYY-MM-DD | User | Intent | Outcome"],
        notebook: {},
        lastReasoning: ''
     }
   }
   
*******************************************************************/

const DOC_BASE_PATH = '/webchat/data/';
const DOC_NAMES     = ['handbook','faq','readme','roadmap','description'];

let docsCache   = null;                  // loaded markdown files
let sessions    = {};                    // in‑memory store (keyed by id)
const LS_KEY    = 'marm-sessions-v1';

// ---------------------------------------------------------------------------
//  Markdown Loader  +  Sentence-Pool Builder  (finalized)
// ---------------------------------------------------------------------------

let docsCache   = null;            // null → not loaded yet
export const docSnippets = {};     // { readme:[…], faq:[…], … }  exported for composeMarmWelcome

const DOC_NAMES      = ['readme', 'description', 'faq', 'handbook']; // adjust if you add files
const DOC_BASE_PATH  = '/webchat/data/';  // path where the .md files are served

export async function loadDocs() {
  // if cache already filled, return it
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

        // ---- build sentence pool (skip very short lines & markdown headings) ----
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

  // atomically publish the new caches
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
  await loadDocs();
  ensureSession(id);
  persistSessions();
  return 'MARM session activated. Docs loaded.';
}

export function updateSessionHistory(id, userText, botText) {
  const s = ensureSession(id);
  s.history.push({ role:'user', content:userText, ts: Date.now() });
  s.history.push({ role:'bot',  content:botText,  ts: Date.now() });
  s.lastReasoning = '';
  persistSessions();
}

export function logSession(id, logLine) {
  // expects pre‑formatted line  "YYYY-MM-DD | User | Intent | Outcome"
  const s = ensureSession(id);
  s.logs.push(logLine);
  persistSessions();
  return `Logged: ${logLine}`;
}

export function getSessionContext(id) {
  const s = sessions[id];
  if (!s) return '';
  // concat last 10 turns for quick context
  const tail = s.history.slice(-20).map(m=>`${m.role}: ${m.content}`).join('\n');
  return tail;
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
//  Lightweight search in docs
// ---------------------------------------------------------------------------
export function searchDocs(query) {
  if (!docsCache) return '';
  const q = query.toLowerCase();
  for (const key in docsCache) {
    const line = docsCache[key].split('\n').find(l=>l.toLowerCase().includes(q));
    if (line) return `Found in ${key}.md → ${line.trim()}`;
  }
  return '';
}

// Simple heuristic to decide auto‑search
export function shouldAutoSearch(userInput) {
  const q = userInput.toLowerCase();
  // trigger if question words + '?'  OR begins with "define" / "what is" etc.
  const keyword = /(what|who|how|when|why)\b.*\?/i.test(userInput) ||
                  /^\s*(define|describe|explain|give me)\b/i.test(q);
  return keyword;
}

// ---------------------------------------------------------------------------
//  Compile summary via Gemini (placeholder prompt)
// ---------------------------------------------------------------------------
import { fetchGeminiResponse } from './geminiHelper.js'; // tiny helper in same folder

export async function compileSessionSummary(id, tailPairs=6) {
  const s = sessions[id];
  if (!s) return 'No active session.';
  const hist = s.history.slice(-(tailPairs*2));
  const flat = hist.map(m=>`${m.role.toUpperCase()}: ${m.content}`).join('\n');

  const prompt = [
    { role:'system', content: 'Summarise the following chat in 5 concise bullet points.' },
    { role:'user',   content: flat }
  ];

  try {
    const summary = await fetchGeminiResponse(prompt);
    return summary;
  } catch (err) {
    console.error('[MARM] summary error', err);
    return 'Summary unavailable (Gemini error).';
  }
}

// ---------------------------------------------------------------------------
//  Notebook CRUD (simple key/value)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// NOTEBOOK  - simple key/value store per session
// ---------------------------------------------------------------------------
// Syntax accepted by chatbot.js command handler (already in wrapper):
//   /notebook add key:value         → store a value
//   /notebook get key               → retrieve a value
//   /notebook list                  → show all keys
//
// The wrapper passes {action, key, value} so we only handle logic here.
export function manageUserNotebook(id, action, key='', value='') {
  const s = ensureSession(id);
  switch (action) {
    case 'add': {
      if (!key || !value) return 'Usage: /notebook add key:value';
      s.notebook[key] = value;
      persist();
      return `Stored \"${key}\" → \"${value}\"`;
    }
    case 'get': {
      if (!key) return 'Usage: /notebook get key';
      return s.notebook[key] ? `\"${key}\": ${s.notebook[key]}` : `No entry for \"${key}\"`;
    }
    case 'list': {
      const keys = Object.keys(s.notebook);
      return keys.length ? 'Notebook keys: ' + keys.join(', ') : 'Notebook is empty.';
    }
    default:
      return 'Notebook actions: add, get, list';
  }
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

// helper for chatbot.js convenience
export function getMostRecentBotResponseLogic(id) {
  const s = sessions[id];
  return s?.lastReasoning || '';
}
