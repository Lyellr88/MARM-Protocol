// server.js - Express backend to proxy Gemini API requests securely
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable not set.');
  process.exit(1);
}

app.use(express.json());

// Serve static files (your webchat frontend) BEFORE API routes
app.use(express.static(path.join(__dirname, '../../'))); // Serve from webchat root

// Proxy endpoint for Gemini API
app.post('/api/gemini', async (req, res) => {
  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=' + GEMINI_API_KEY;
    console.log('Proxying request to Gemini API:', url);
    console.log('Request body:', JSON.stringify(req.body));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'MARM-Systems/1.4'
      },
      body: JSON.stringify(req.body)
    });
    const text = await response.text();
    console.log('Gemini API response status:', response.status);
    console.log('Gemini API response body:', text);
    let data;
    try {
      data = JSON.parse(text);
      // Always send a valid JSON response, even if Gemini returns an error
      res.status(response.status).json(data);
    } catch (e) {
      // If Gemini returns non-JSON (e.g. HTML error), send a JSON error
      console.error('Failed to parse Gemini API response as JSON:', text);
      res.status(502).json({ error: 'Invalid JSON from Gemini API', raw: text });
    }
  } catch (error) {
    console.error('Gemini proxy error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Global error handler to always return JSON
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Unhandled server error', details: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MARM Webchat server running on port ${PORT}`);
});
