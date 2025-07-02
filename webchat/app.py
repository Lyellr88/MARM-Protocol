from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
print("API Key:", API_KEY)

# Set up Gemini model
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

# Create Flask app
app = Flask(__name__, template_folder="templates")
CORS(app)

# Serve test.html on root route
@app.route("/")
def home():
    return render_template("test.html")

# Gemini API route
@app.route("/api/gemini", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    prompt = data.get("prompt", "")
    print("API called with prompt:", prompt)
    try:
        response = model.generate_content(prompt)
        print("Raw response:", response)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Gemini error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)