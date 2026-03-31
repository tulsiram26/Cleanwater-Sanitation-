# 🚰 JalRakshak - Water Issue Reporting System Backend

A production-grade backend system for reporting and tracking water-related issues. Built with Node.js, Express.js, MongoDB, and follows strict MVC architecture.

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Security Features](#security-features)
- [Error Handling](#error-handling)

---

## ✨ Features

### 👤 Authentication System
- User registration with email validation
- Secure login with JWT authentication
- Password hashing using bcrypt (10 rounds)
- Role-based access control (User, Admin)
- Protected routes using JWT middleware

### 🚰 Water Issue Reporting
- Citizens can report water issues with:
  - Title, description, and issue type
  - Image upload (stored on Cloudinary)
  - GPS coordinates (latitude/longitude)
  - Optional location address
- Status tracking: Pending, In Progress, Resolved
- Priority levels: Low, Medium, High
- Issue types: Dirty Water, Leakage, No Supply
- Timestamps for created and updated records

### 🛠️ Admin Capabilities
- View all reports with advanced filtering
- Update report status and add comments
- Manage users (view, update, delete)
- View system statistics and dashboards
- Generate insights about reports and users

### 📷 Image Management
- Multer for server-side file handling
- Cloudinary integration for cloud storage
- Automatic image optimization
- Secure file validation (MIME types)
- Configurable file size limits

### 📊 Advanced Features
- Pagination for all list endpoints
- Filtering by status, issue type, and more
- Sorting options (latest, oldest, etc.)
- Aggregated statistics and dashboards
- Input validation using express-validator
- Centralized error handling
- CORS enabled for frontend integration

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **Input Validation**: express-validator
- **Development**: Nodemon (for hot reload)

---

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login)
│   ├── reportController.js   # Water issue report logic
│   └── userController.js     # User management logic
├── models/
│   ├── User.js               # User schema and methods
│   └── Report.js             # Water issue report schema
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   ├── reportRoutes.js       # Report endpoints
│   └── userRoutes.js         # User management endpoints
├── middleware/
│   ├── authMiddleware.js     # JWT verification and role authorization
│   ├── errorMiddleware.js    # Global error handler
│   └── uploadMiddleware.js   # Multer file upload configuration
├── services/
│   └── cloudinary.js         # Cloudinary upload/delete functions
├── utils/
│   └── generateToken.js      # JWT token generation utility
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── .env                      # Environment variables
├── package.json              # Project dependencies
└── README.md                 # Documentation
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or Atlas URI)
- Cloudinary account (for image storage)
- npm or yarn package manager

### Step 1: Clone or Navigate to Project

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- multer
- cloudinary
- dotenv
- cors
- express-validator
- nodemon (dev dependency)

---

## ⚙️ Environment Setup

### Step 1: Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard to get:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: Create `.env` File

The `.env` file is already provided with placeholders. Update it with actual values:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/jalrakshak
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jalrakshak

# JWT Secret (use a strong random string in production)
JWT_SECRET=your_super_secret_key_min_32_chars_recommended

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# File Upload Limit (in bytes, default 5MB)
MAX_FILE_SIZE=5242880
```

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
# macOS:
brew services start mongodb-community

# Linux (Ubuntu):
sudo systemctl start mongod

# Windows:
# Start MongoDB service from Services or run mongod.exe
```

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

---

## 🚀 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Expected Output

```
╔════════════════════════════════════════════════╗
║   🚀 JalRakshak Backend Server Started        ║
╠════════════════════════════════════════════════╣
║   Server: http://localhost:5000               ║
║   Environment: development                    ║
║   Database: mongodb://localhost:27017/jalrakshak║
╚════════════════════════════════════════════════╝
✓ MongoDB connected successfully
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "phone": "9876543210",
  "city": "Mumbai",
  "state": "Maharashtra"
}
```

**Response (201 Created)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "_id": "507f1f77...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { /* user object */ }
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

---

### Report Endpoints

#### 1. Create Report (Protected)
```http
POST /reports
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "No water supply in sector 5",
  "issueType": "no supply",
  "description": "No water supply since yesterday morning",
  "latitude": "19.0760",
  "longitude": "72.8777",
  "address": "Sector 5, Mumbai",
  "image": <file>
}
```

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Report created successfully",
  "report": {
    "_id": "507f1f77...",
    "title": "No water supply in sector 5",
    "issueType": "no supply",
    "status": "Pending",
    "location": {
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "image": "https://res.cloudinary.com/...",
    "createdBy": { /* user details */ },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. Get All Reports (Public)
```http
GET /reports?page=1&limit=10&status=Pending&sortBy=-createdAt
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Reports per page
- `status` (optional) - Filter: Pending, In Progress, Resolved
- `sortBy` (default: -createdAt) - Sort field

**Response (200 OK)**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "reports": [ /* array of reports */ ]
}
```

#### 3. Get My Reports (Protected)
```http
GET /reports/user/my-reports?page=1&limit=10
Authorization: Bearer {token}
```

#### 4. Get Report by ID (Public)
```http
GET /reports/{reportId}
```

#### 5. Update Report (Admin Only)
```http
PATCH /reports/{reportId}
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "High",
  "comment": "Repair team assigned"
}
```

#### 6. Delete Report (Creator or Admin)
```http
DELETE /reports/{reportId}
Authorization: Bearer {token}
```

#### 7. Get Report Statistics (Admin Only)
```http
GET /reports/stats/dashboard
Authorization: Bearer {adminToken}
```

---

### User Endpoints

#### 1. Get All Users (Admin Only)
```http
GET /users?page=1&limit=10&role=user
Authorization: Bearer {adminToken}
```

#### 2. Get User by ID (Protected)
```http
GET /users/{userId}
Authorization: Bearer {token}
```

#### 3. Update User Profile
```http
PATCH /users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "9876543211",
  "city": "Bangalore",
  "state": "Karnataka"
}
```

#### 4. Delete User (Admin Only)
```http
DELETE /users/{userId}
Authorization: Bearer {adminToken}
```

#### 5. Get User Statistics (Admin Only)
```http
GET /users/stats/dashboard
Authorization: Bearer {adminToken}
```

---

## 🗄️ Database Models

### User Schema

```javascript
{
  _id: ObjectId,
  name: String (required, max 50),
  email: String (required, unique, validated),
  password: String (required, hashed, hidden),
  phone: String (required, 10 digits),
  role: String (enum: 'user', 'admin', default: 'user'),
  location: {
    city: String,
    state: String
  },
  avatar: String (URL),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Report Schema

```javascript
{
  _id: ObjectId,
  title: String (required, max 100),
  issueType: String (enum: 'dirty water', 'leakage', 'no supply'),
  description: String (required, max 1000),
  image: String (Cloudinary URL),
  location: {
    latitude: Number (required, -90 to 90),
    longitude: Number (required, -180 to 180),
    address: String
  },
  status: String (enum: 'Pending', 'In Progress', 'Resolved', default: 'Pending'),
  priority: String (enum: 'Low', 'Medium', 'High', default: 'Medium'),
  createdBy: ObjectId (ref: User, required),
  lastUpdatedBy: ObjectId (ref: User),
  resolvedOn: Date,
  comments: [{
    userId: ObjectId (ref: User),
    comment: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

### 1. Password Security
- Passwords hashed using bcryptjs with 10 salt rounds
- Never stored or returned in API responses
- Validated with minimum 6 characters requirement

### 2. JWT Authentication
- Secure token-based authentication
- 7-day token expiration
- Token verified on protected routes
- Uses strong secret key (configurable via .env)

### 3. Role-Based Access Control
- Two roles: `user` and `admin`
- Admin-only routes protected with authorization middleware
- Users can only modify their own data
- Admins have full system access

### 4. Input Validation
- All inputs validated using express-validator
- Email format validation
- Phone number format validation (10 digits)
- Latitude/Longitude range validation
- File type and size validation

### 5. CORS Security
- Configured to allow only specific origins
- Can be customized for production

### 6. File Upload Security
- Multer validates file type (images only)
- File size limits enforced (5MB default, configurable)
- Temporary files deleted after Cloudinary upload

---

## ⚠️ Error Handling

The API implements comprehensive error handling with centralized middleware.

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": { /* detailed error info in development mode */ }
}
```

### Common HTTP Status Codes

- **200 OK** - Successful GET/PATCH request
- **201 Created** - Successful POST request
- **400 Bad Request** - Invalid input or validation error
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - User doesn't have permission
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## 🚀 Deployment Checklist

Before deploying to production:

1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   JWT_SECRET=<very_strong_random_string>
   MONGODB_URI=<production_mongodb_url>
   ```

2. **Enable HTTPS** - Use a reverse proxy (Nginx, HAProxy)

3. **Security Headers** - Add security middleware (helmet.js)

4. **Rate Limiting** - Implement rate limiting for API endpoints

5. **Logging** - Set up centralized logging

6. **Monitoring** - Monitor server health and errors

7. **Backup Database** - Enable MongoDB backups

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## 📧 Support & Contributions

For issues, suggestions, or contributions, please create an issue or pull request.

---

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

---

**Built with ❤️ for SDG 6: Clean Water and Sanitation**
