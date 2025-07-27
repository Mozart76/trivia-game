# 🚨 Railway Deployment Fix

## **The Problem:**
Railway says "Could not find root directory: server" even though the server directory exists.

## **The Solution:**

### **Option 1: Manual Directory Selection (Recommended)**

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Create a new project

2. **Connect GitHub Repository**
   - Choose "Deploy from GitHub repo"
   - Select your trivia game repository

3. **⚠️ CRITICAL STEP - Set Root Directory:**
   - In the deployment settings, look for **"Root Directory"**
   - Set it to: `server` (not `/server` or `./server`)
   - This tells Railway to only deploy the `server` folder

4. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://mozartfc25:ZB9B9x4IoEmhj00t@cluster0.3grk9d5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=trivia_game_super_secret_jwt_key_2024_secure_and_strong_12345
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy**

### **Option 2: Create Separate Repository**

If Option 1 doesn't work:

1. **Create a new GitHub repository** called `trivia-backend`
2. **Copy only server files:**
   ```bash
   # Create new repo and copy files
   mkdir trivia-backend
   cd trivia-backend
   cp -r ../gamezi/server/* .
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin https://github.com/yourusername/trivia-backend.git
   git push -u origin main
   ```
3. **Deploy the new repository** to Railway

### **Option 3: Use Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize in server directory
cd server
railway init

# Set variables
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set JWT_SECRET="your_jwt_secret"
railway variables set PORT=5000

# Deploy
railway up
```

## **Files I've Created:**

✅ `server/railway.json` - Railway config in server directory
✅ `server/Procfile` - Process file for Railway
✅ `railway.toml` - Alternative Railway config
✅ `.railwayignore` - Excludes frontend files

## **Expected Result:**

After successful deployment:
- **Railway URL**: `https://your-app-name.railway.app`
- **Health Check**: Visit the URL to see if it's working
- **API Test**: `https://your-app-name.railway.app/api/users/profile`

## **If Still Failing:**

1. **Check Railway Logs** - Look for specific error messages
2. **Verify Directory Structure** - Ensure server folder has all files
3. **Try Option 2** - Create separate backend repository

---

**Try Option 1 first - setting the root directory to `server` in Railway dashboard!** 🎯 