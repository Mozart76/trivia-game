# MongoDB Atlas Setup Guide

## 🗄️ **MongoDB Atlas Integration**

This guide will help you set up MongoDB Atlas for the Trivia Game application.

## 📋 **Prerequisites**

1. **MongoDB Atlas Account**: Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Node.js**: Version 14 or higher
3. **npm**: For package management

## 🚀 **Setup Steps**

### **1. Create MongoDB Atlas Cluster**

1. **Sign in to MongoDB Atlas**
2. **Create a new project** (if you don't have one)
3. **Build a new cluster**:
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

### **2. Configure Database Access**

1. **Go to "Database Access"** in the left sidebar
2. **Click "Add New Database User"**
3. **Create a user**:
   - Username: `trivia_admin`
   - Password: Create a strong password
   - Role: "Atlas admin" (for development)
4. **Click "Add User"**

### **3. Configure Network Access**

1. **Go to "Network Access"** in the left sidebar
2. **Click "Add IP Address"**
3. **For development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. **Click "Confirm"**

### **4. Get Connection String**

1. **Go to "Database"** in the left sidebar
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**

### **5. Update Configuration**

1. **Open `server/config.env`**
2. **Replace the MongoDB URI**:
   ```
   MONGODB_URI=mongodb+srv://trivia_admin:your_password@your_cluster.mongodb.net/trivia_game?retryWrites=true&w=majority
   ```
3. **Update JWT_SECRET** with a strong secret key
4. **Save the file**

## 🔧 **Running the Application**

### **Start the Backend Server**

```bash
cd server
npm install
npm start
```

### **Start the Frontend**

```bash
# In a new terminal
npm start
```

## 📊 **Database Schema**

### **User Collection**
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  freeGames: Number (default: 1),
  paidCredits: Number (default: 0),
  createdAt: Date,
  lastLogin: Date
}
```

## 🔐 **API Endpoints**

### **Authentication**
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### **User Management**
- `PUT /api/users/credits` - Update user credits (protected)
- `POST /api/users/use-credit` - Use a credit (protected)
- `POST /api/users/add-credits` - Add paid credits (protected)

## 🛡️ **Security Features**

- **Password Hashing**: Using bcryptjs with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Mongoose schema validation
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data stored in .env

## 🧪 **Testing Credit Codes**

Use these test codes to add credits:
- `ABC123DEF456`
- `XYZ789GHI012`
- `MNO345PQR678`
- `STU901VWX234`
- `YZA567BCD890`

## 🔍 **Troubleshooting**

### **Connection Issues**
- Check your MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions

### **Authentication Issues**
- Verify JWT_SECRET is set
- Check token expiration (30 days)
- Ensure proper Authorization header format

### **Common Errors**
- `MongoNetworkError`: Check network access and connection string
- `ValidationError`: Check input data format
- `JWTError`: Verify JWT_SECRET and token format

## 📝 **Environment Variables**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

## 🚀 **Deployment**

### **Heroku**
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### **Vercel/Netlify**
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Set up backend separately (Heroku, Railway, etc.)

## 📞 **Support**

If you encounter issues:
1. Check MongoDB Atlas status
2. Verify all environment variables
3. Check server logs for detailed error messages
4. Ensure all dependencies are installed

---

**Happy Coding! 🎮** 