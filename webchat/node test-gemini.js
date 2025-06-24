const API_KEY = "YOUR_GEMINI_API_KEY"; 
async function testGemini() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Explain how AI works in a few words"
              }
            ]
          }
        ]
      })
    }
  );
  const data = await response.json();
  console.log(data);
}

testGemini();
