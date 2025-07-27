# 🚀 Deployment Guide - Trivia Game

## 📋 **Deployment Strategy**

This guide will help you deploy your Trivia Game to free hosting services and link it to your domain.

## 🎯 **Recommended Setup**

### **Frontend (React App)**: Vercel
### **Backend (Node.js)**: Railway
### **Database**: MongoDB Atlas (Already configured)

---

## 🔧 **Step 1: Prepare Your Project**

### **1.1 Build the Frontend**
```bash
npm run build
```

### **1.2 Update API URL**
Create a `.env.production` file in the root directory:
```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## 🚀 **Step 2: Deploy Backend to Railway**

### **2.1 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### **2.2 Deploy Backend**
1. **Connect GitHub Repository**
2. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://mozartfc25:ZB9B9x4IoEmhj00t@cluster0.3grk9d5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=trivia_game_super_secret_jwt_key_2024_secure_and_strong_12345
   PORT=5000
   ```
3. **Set Root Directory**: `server`
4. **Deploy**

### **2.3 Get Backend URL**
- Railway will provide a URL like: `https://your-app-name.railway.app`
- Copy this URL for the frontend configuration

---

## 🌐 **Step 3: Deploy Frontend to Vercel**

### **3.1 Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

### **3.2 Configure Vercel**
1. **Framework Preset**: Create React App
2. **Root Directory**: `./` (root of project)
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Install Command**: `npm install`

### **3.3 Add Environment Variables**
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

### **3.4 Deploy**
Click "Deploy" and wait for build to complete.

---

## 🔗 **Step 4: Link Custom Domain**

### **4.1 Vercel Domain Setup**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `trivia.yourdomain.com`)
4. Vercel will provide DNS records to add

### **4.2 Railway Domain Setup**
1. Go to your Railway project dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `api.yourdomain.com`)
4. Railway will provide DNS records

### **4.3 DNS Configuration**
Add these records to your domain provider:

**For Vercel (Frontend)**:
```
Type: CNAME
Name: trivia (or subdomain of choice)
Value: cname.vercel-dns.com
```

**For Railway (Backend)**:
```
Type: CNAME
Name: api (or subdomain of choice)
Value: your-railway-app.railway.app
```

### **4.4 Update API URL**
After setting up domains, update your frontend environment:
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## 🛠️ **Alternative Hosting Options**

### **Frontend Alternatives**
- **Netlify**: Similar to Vercel, great for static sites
- **GitHub Pages**: Free but limited features
- **Firebase Hosting**: Google's hosting service

### **Backend Alternatives**
- **Render**: Free tier with sleep mode
- **Heroku**: Free tier discontinued, but good paid option
- **DigitalOcean App Platform**: $5/month but very reliable

---

## 📊 **Free Tier Limits**

### **Vercel**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates

### **Railway**
- ✅ $5 credit monthly
- ✅ Sleep mode after inactivity
- ✅ Custom domains
- ✅ SSL certificates

### **MongoDB Atlas**
- ✅ 512MB storage
- ✅ Shared clusters
- ✅ Basic monitoring

---

## 🔍 **Testing Your Deployment**

### **1. Test Backend**
```bash
curl https://your-backend-url.railway.app/api/users/profile
```

### **2. Test Frontend**
- Visit your Vercel URL
- Try registering a new user
- Test login functionality
- Verify credit system works

### **3. Test Custom Domain**
- Visit your custom domain
- Ensure all features work
- Check SSL certificates

---

## 🚨 **Important Notes**

### **Security**
- ✅ Environment variables are secure
- ✅ JWT tokens are properly configured
- ✅ MongoDB connection is encrypted
- ✅ CORS is configured for production

### **Performance**
- ✅ Frontend is optimized with build
- ✅ Backend uses proper caching
- ✅ Database queries are optimized
- ✅ CDN is enabled on Vercel

### **Monitoring**
- Set up monitoring for:
  - Server uptime
  - Database performance
  - Error tracking
  - User analytics

---

## 🆘 **Troubleshooting**

### **Common Issues**

**1. CORS Errors**
- Check backend CORS configuration
- Verify API URL is correct

**2. Database Connection**
- Check MongoDB Atlas network access
- Verify connection string

**3. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed

**4. Domain Issues**
- Wait for DNS propagation (up to 48 hours)
- Check DNS records are correct
- Verify SSL certificates

---

## 📞 **Support**

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check hosting provider status pages

---

**Happy Deploying! 🚀** 