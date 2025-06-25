import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export async function generateContent() {
  return {
    text: () => "Gemini API disabled. Using placeholder response."
  };
}

export async function fetchGeminiResponse(messages) {
  return {
    text: () => "Gemini API disabled. Fallback active from fetchGeminiResponse."
  };
}
