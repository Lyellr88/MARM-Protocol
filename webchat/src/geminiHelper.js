// geminiHelper.js - Google Gemini AI API integration and request handling

// ===== CONNECTION OPTIMIZATION =====
let connectionWarmed = false;
let activeControllers = new Set();

async function warmConnection() {
  if (connectionWarmed) return;
  
  try {
    const controller = new AbortController();
    activeControllers.add(controller);
    
    setTimeout(() => {
      controller.abort();
      activeControllers.delete(controller);
    }, 2000);
    
    await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      method: 'HEAD',
      signal: controller.signal
    });
    connectionWarmed = true;
    activeControllers.delete(controller);
  } catch (e) {
    activeControllers.delete(controller);
  }
}

// Cleanup function for when user leaves page
export function cleanupConnections() {
  activeControllers.forEach(controller => {
    controller.abort();
  });
  activeControllers.clear();
  connectionWarmed = false;
}

// ===== UTILITY FUNCTIONS =====
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

// ===== MAIN API FUNCTION =====
export async function generateContent(messages) {
  if (!connectionWarmed) {
    warmConnection();
  }
  
  const url = '/api/gemini'; 
  const maxAttempts = 3;
  
  const geminiContents = messages.map(msg => ({
    role: (msg.role === 'bot' || msg.role === 'assistant' || msg.role === 'system') ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const requestBody = {
    contents: geminiContents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.8,
      maxOutputTokens: 8192,
      candidateCount: 1
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT", 
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"  
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  // ===== REQUEST RETRY LOOP =====
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      activeControllers.add(controller);
      
      const timeoutId = setTimeout(() => {
        controller.abort();
        activeControllers.delete(controller);
      }, 15000); // Reduced timeout to 15 seconds
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'MARM-Systems/1.4'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      activeControllers.delete(controller);
      
      if (!res.ok) {
        const errText = await res.text();
        console.error(`Gemini API Error (Attempt ${attempt}):`, res.status, errText);
        
        if (res.status === 401 || res.status === 403 || res.status === 400) {
          return {
            text: () => getErrorMessage(res.status, attempt, maxAttempts)
          };
        }
        
        if (attempt < maxAttempts) {
          const delayMs = Math.min(Math.pow(2, attempt - 1) * 500, 2000);
          await delay(delayMs);
          continue;
        }
        
        return {
          text: () => getErrorMessage(res.status, attempt, maxAttempts)
        };
      }
      
      const text = await res.text();
      if (!text) {
        console.error('Empty response from /api/gemini');
        return {
          text: () => '❌ Empty response from Gemini API. Please try again later.'
        };
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON from /api/gemini:', text);
        return {
          text: () => '❌ Invalid response from Gemini API. Please try again later.'
        };
      }
      
      // ===== RESPONSE VALIDATION =====
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
      activeControllers.delete(controller);
      
      if (error.name === 'AbortError') {
        if (attempt < maxAttempts) {
          const delayMs = Math.min(Math.pow(2, attempt - 1) * 500, 2000);
          await delay(delayMs);
          continue;
        }
        return {
          text: () => '⏱️ Request timed out. Please check your connection and try again.'
        };
      }
      
      if (attempt < maxAttempts) {
        const delayMs = Math.min(Math.pow(2, attempt - 1) * 500, 2000);
        await delay(delayMs);
        continue;
      }
      
      return {
        text: () => '🌐 Network error. Please check your internet connection and try again.'
      };
    }
  }
}
