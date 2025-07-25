// summary.js - Session data compilation and summarization functions

import { ensureSession } from './session.js';
import { generateContent } from '../geminiHelper.js';

export async function compileSessionSummary(id, options = {}) {
  const s = ensureSession(id);
  if (!s) return 'No active session.';
  const tailPairs = options.tailPairs || 6;
  const fields = options.fields ? options.fields.split(',').map(f => f.trim().toLowerCase()) : null;
  const hist = s.history.slice(-(tailPairs * 2));
  const logs = s.logs || [];
  let filteredLogs = logs;
  if (fields && logs.length > 0) {
    filteredLogs = logs.map(log => {
      const parts = log.split(/[\|-]/);
      if (parts.length >= 3) {
        const logObj = {
          date: parts[0]?.trim(),
          summary: parts[1]?.trim(),
          result: parts[2]?.trim()
        };
        const filteredParts = [];
        if (fields.includes('date')) filteredParts.push(logObj.date);
        if (fields.includes('summary')) filteredParts.push(logObj.summary);
        if (fields.includes('result')) filteredParts.push(logObj.result);
        return filteredParts.join(' | ');
      }
      return log;
    });
  }
  let content = '';
  if (filteredLogs.length > 0) {
    content += `Log Entries:\n${filteredLogs.join('\n')}\n\n`;
  }
  const flat = hist.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  content += `Conversation:\n${flat}`;
  const prompt = [
    {
      role: 'system',
      content: `You are MARM Bot. Summarize the following session data.\n${fields ? `Focus on these fields: ${fields.join(', ')}` : 'Include all relevant information'}\nProvide a concise summary highlighting key points and any MARM protocol usage.`
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
