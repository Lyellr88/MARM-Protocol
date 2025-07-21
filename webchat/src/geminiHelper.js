// Browser-compatible version - no dotenv needed
const GEMINI_API_KEY = 'API_KEY'; 

// Helper function for delays between retries
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to get user-friendly error messages
function getErrorMessage(status, attempt, maxAttempts) {
  const isRetrying = attempt < maxAttempts;
  const retryText = isRetrying ? ` (Attempt ${attempt}/${maxAttempts}, retrying...)` : '';
  
  switch (status) {
    case 429:
      return `🚫 Rate limit reached${retryText}`;
    case 500:
    case 502:
    case 503:
    case 504:
      return `🌐 Gemini servers are busy${retryText}`;
    case 401:
    case 403:
      return `🔑 API authentication issue. Please check your API key.`;
    case 400:
      return `⚠️ Invalid request format. Please try a different message.`;
    default:
      return `❌ Connection issue${retryText}`;
  }
}

export async function generateContent(messages) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
  const maxAttempts = 3;
  
  // Convert messages to Gemini format - system role becomes model
  const geminiContents = messages.map(msg => ({
    role: (msg.role === 'bot' || msg.role === 'assistant' || msg.role === 'system') ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const res = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: geminiContents
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        const errText = await res.text();
        console.error(`Gemini API Error (Attempt ${attempt}):`, res.status, errText);
        
        // Don't retry on authentication or bad request errors
        if (res.status === 401 || res.status === 403 || res.status === 400) {
          return {
            text: () => getErrorMessage(res.status, attempt, maxAttempts)
          };
        }
        
        // If this isn't the last attempt, wait and retry
        if (attempt < maxAttempts) {
          const delayMs = Math.pow(2, attempt - 1) * 1000; // Exponential backoff: 1s, 2s, 4s
          await delay(delayMs);
          continue;
        }
        
        // Last attempt failed
        return {
          text: () => getErrorMessage(res.status, attempt, maxAttempts)
        };
      }
      
      const data = await res.json();
      
      // Handle empty or blocked responses
      if (!data.candidates || data.candidates.length === 0) {
        return {
          text: () => '🚫 Response was blocked or empty. Please try rephrasing your message.'
        };
      }
      
      const reply = data.candidates[0]?.content?.parts?.[0]?.text;
      
      if (!reply || reply.trim() === '') {
        return {
          text: () => '🤔 Received an empty response. Please try asking your question differently.'
        };
      }
      
      return {
        text: () => reply
      };
      
    } catch (error) {
      console.error(`Request error (Attempt ${attempt}):`, error);
      
      // Handle timeout errors
      if (error.name === 'AbortError') {
        if (attempt < maxAttempts) {
          const delayMs = Math.pow(2, attempt - 1) * 1000;
          await delay(delayMs);
          continue;
        }
        return {
          text: () => '⏱️ Request timed out. Please check your connection and try again.'
        };
      }
      
      // Handle network errors
      if (attempt < maxAttempts) {
        const delayMs = Math.pow(2, attempt - 1) * 1000;
        await delay(delayMs);
        continue;
      }
      
      return {
        text: () => '🌐 Network error. Please check your internet connection and try again.'
      };
    }
  }
}
