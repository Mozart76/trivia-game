#!/bin/bash

echo "🚀 Starting Trivia Game Deployment..."

# Build the React app
echo "📦 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Deploy backend to Railway:"
    echo "   - Go to railway.app"
    echo "   - Connect your GitHub repo"
    echo "   - Set root directory to 'server'"
    echo "   - Add environment variables"
    echo ""
    echo "2. Deploy frontend to Vercel:"
    echo "   - Go to vercel.com"
    echo "   - Import your GitHub repo"
    echo "   - Configure build settings"
    echo "   - Add REACT_APP_API_URL environment variable"
    echo ""
    echo "3. Link custom domain:"
    echo "   - Add DNS records for your domain"
    echo "   - Configure subdomains in Vercel and Railway"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 