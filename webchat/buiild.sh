#!/bin/bash
echo "Building MARM Webchat..."

# Create a temporary build directory
mkdir -p build
cp -r * build/ 2>/dev/null || true

# Navigate to build directory
cd build

# Replace the placeholder with actual API key in geminiHelper.js
if [ -n "$GEMINI_API_KEY" ]; then
  echo "Injecting API key..."
  sed -i "s/__GEMINI_API_KEY__/$GEMINI_API_KEY/g" src/geminiHelper.js
  echo "API key injected successfully"
else
  echo "Warning: GEMINI_API_KEY environment variable not set"
fi

# Move build contents to root for deployment
cd ..
cp -r build/* .
rm -rf build

echo "Build complete! Ready for deployment."
