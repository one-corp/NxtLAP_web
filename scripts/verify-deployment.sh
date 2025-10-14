#!/bin/bash

# Deployment Verification Script
# Checks if structured data is present in deployed site

echo "🔍 Verifying Structured Data Deployment"
echo "========================================"
echo ""

# Check if URL is provided
if [ -z "$1" ]; then
    URL="https://www.nxtlap.com"
    echo "Using default URL: $URL"
else
    URL="$1"
    echo "Testing URL: $URL"
fi

echo ""
echo "1️⃣  Checking Homepage..."
echo "---"

# Fetch homepage and check for JSON-LD
HOMEPAGE_RESULT=$(curl -s "$URL" | grep -c "application/ld+json")

if [ "$HOMEPAGE_RESULT" -gt 0 ]; then
    echo "✅ Found $HOMEPAGE_RESULT JSON-LD script(s) on homepage"
    
    # Show the schemas found
    echo ""
    echo "Schemas detected:"
    curl -s "$URL" | grep -A 2 '"@type"' | grep '@type' | sed 's/.*"@type": "\(.*\)".*/  - \1/'
else
    echo "❌ No JSON-LD found on homepage"
fi

echo ""
echo "2️⃣  Checking Blog Post..."
echo "---"

# Fetch a blog post and check for JSON-LD
BLOG_URL="$URL/blogs/singapore-gp-2025"
BLOG_RESULT=$(curl -s "$BLOG_URL" | grep -c "application/ld+json")

if [ "$BLOG_RESULT" -gt 0 ]; then
    echo "✅ Found $BLOG_RESULT JSON-LD script(s) on blog post"
    
    # Show the schemas found
    echo ""
    echo "Schemas detected:"
    curl -s "$BLOG_URL" | grep -A 2 '"@type"' | grep '@type' | sed 's/.*"@type": "\(.*\)".*/  - \1/'
else
    echo "❌ No JSON-LD found on blog post"
fi

echo ""
echo "3️⃣  Next Steps"
echo "---"
echo "If JSON-LD is detected above, test with Google:"
echo "👉 https://search.google.com/test/rich-results"
echo ""
echo "Test these URLs:"
echo "  • Homepage: $URL"
echo "  • Blog Post: $BLOG_URL"
echo ""
echo "✨ Done!"
