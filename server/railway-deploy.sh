#!/bin/bash

echo "🚂 Railway Deployment Script"
echo "📦 Installing dependencies..."

# Navigate to server directory
cd server

# Install dependencies
npm install

echo "✅ Dependencies installed"
echo "🚀 Starting server..."

# Start the server
npm start 