import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateContent(messages) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const res = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: messages
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
