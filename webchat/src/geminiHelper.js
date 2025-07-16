// Browser-compatible version - no dotenv needed
// You'll need to add your API key directly (we'll make this secure later)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateContent(messages) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
  
  // Convert messages to Gemini format - system role becomes model
  const geminiContents = messages.map(msg => ({
    role: (msg.role === 'bot' || msg.role === 'assistant' || msg.role === 'system') ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  const res = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: geminiContents
    })
  });
  
  if (!res.ok) {
    const errText = await res.text();
    console.error('Gemini API Error:', errText);
    return {
      text: () => `Error from Gemini API: ${res.status}`
    };
  }
  
  const data = await res.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini.';
  return {
    text: () => reply
  };
}
