#!/bin/bash
echo "Verifying build artifact readiness for deployment..."
if [ -d ".next" ]; then
    echo "✅ .next build directory exists. Ready for deployment."
else
    echo "❌ Build directory not found. Please run npm run build first."
fi
