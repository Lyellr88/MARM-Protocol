// geminiHelper.js — stub version

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
