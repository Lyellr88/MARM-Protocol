\echo "Building MARM Webchat..."

mkdir -p build
cp -r * build/ 2>/dev/null || true

cd build

if [ -n "$GEMINI_API_KEY" ]; then
  echo "Injecting API key..."
  sed -i "s/__GEMINI_API_KEY__/$GEMINI_API_KEY/g" src/geminiHelper.js
  echo "API key injected successfully"
else
  echo "Warning: GEMINI_API_KEY environment variable not set"
fi

cd ..
cp -r build/* .
rm -rf build

echo "Build complete! Ready for deployment."
