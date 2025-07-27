# 🚂 Railway Deployment Guide

## 🚨 **Fixing the Railway Deployment Issue**

The error you're seeing is because Railway is trying to build the entire project instead of just the backend server.

## 🔧 **Solution: Proper Railway Configuration**

### **Step 1: Railway Project Setup**

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Create a new project

2. **Connect GitHub Repository**
   - Choose "Deploy from GitHub repo"
   - Select your trivia game repository

3. **Configure Service**
   - **Service Name**: `trivia-backend`
   - **Root Directory**: `server` ⭐ **IMPORTANT**
   - **Framework**: Node.js

### **Step 2: Environment Variables**

Add these environment variables in Railway dashboard:

```
MONGODB_URI=mongodb+srv://mozartfc25:ZB9B9x4IoEmhj00t@cluster0.3grk9d5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=trivia_game_super_secret_jwt_key_2024_secure_and_strong_12345
PORT=5000
NODE_ENV=production
```

### **Step 3: Deploy**

1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Check logs for any errors**

## 🛠️ **Alternative: Manual Deployment**

If the above doesn't work, try this approach:

### **Option A: Deploy Only Server Directory**

1. **Create a new repository** with only the server files
2. **Copy these files** to the new repo:
   ```
   server/
   ├── server.js
   ├── package.json
   ├── config/
   ├── models/
   ├── routes/
   ├── middleware/
   └── config.env
   ```
3. **Deploy the new repository** to Railway

### **Option B: Use Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set JWT_SECRET="your_jwt_secret"
railway variables set PORT=5000

# Deploy
railway up
```

## 🔍 **Troubleshooting**

### **Common Issues & Solutions**

**1. "Could not find index.html"**
- ✅ **Solution**: Set root directory to `server`
- ✅ **Solution**: Use `.railwayignore` file

**2. "Module not found"**
- ✅ **Solution**: Check `server/package.json` dependencies
- ✅ **Solution**: Run `npm install` in server directory

**3. "Port already in use"**
- ✅ **Solution**: Use `process.env.PORT` in server.js
- ✅ **Solution**: Railway sets PORT automatically

**4. "MongoDB connection failed"**
- ✅ **Solution**: Check MongoDB Atlas network access
- ✅ **Solution**: Verify connection string

### **Debugging Steps**

1. **Check Railway Logs**
   - Go to your Railway project
   - Click on "Deployments"
   - View build and runtime logs

2. **Test Locally First**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Verify Environment Variables**
   - Check Railway dashboard
   - Ensure all variables are set correctly

## 📋 **Railway Configuration Files**

### **railway.json** (Already created)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/users/profile",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **.railwayignore** (Already created)
```
src/
public/
build/
node_modules/
package-lock.json
package.json
vercel.json
```

## 🎯 **Expected Result**

After successful deployment:

1. **Railway URL**: `https://your-app-name.railway.app`
2. **Health Check**: `https://your-app-name.railway.app/api/users/profile`
3. **API Endpoints**: All working correctly

## 🚀 **Next Steps After Railway Deployment**

1. **Test Backend API**
   ```bash
   curl https://your-app-name.railway.app/api/users/profile
   ```

2. **Deploy Frontend to Vercel**
   - Use the Railway URL as your API endpoint
   - Set `REACT_APP_API_URL=https://your-app-name.railway.app/api`

3. **Link Custom Domain**
   - Add domain in Railway settings
   - Update DNS records

## 📞 **Support**

If you still encounter issues:

1. **Check Railway Status**: [status.railway.app](https://status.railway.app)
2. **Railway Discord**: Join their community for help
3. **GitHub Issues**: Check for similar issues in Railway repo

---

**Happy Deploying! 🚂** 