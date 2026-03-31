# JalRakshak - Clean Water & Sanitation Platform 💧

A comprehensive web application empowering citizens to report water issues and helping authorities resolve them faster, contributing to **UN Sustainable Development Goal 6 (SDG 6)**.

## 🌍 Overview

JalRakshak is a community-driven platform that enables:
- **Citizens** to report water quality issues (dirty water, leakage, no supply)
- **Authorities** to track, prioritize, and resolve issues efficiently
- **Admins** to manage reports and monitor system-wide impact
- **Real-time collaboration** between communities and water management bodies

## 🚀 Features

### Core Functionalities
- ✅ **User Authentication** - Secure registration & login with JWT
- ✅ **Report Issues** - Create water issue reports with location & images
- ✅ **Real-time Map** - View all reported issues on an interactive Leaflet map
- ✅ **Track Progress** - Monitor report status (Pending → In Progress → Resolved)
- ✅ **Admin Dashboard** - Manage reports, update status, track statistics
- ✅ **User Profiles** - Personalized dashboards with user statistics
- ✅ **Image Upload** - Upload images using Cloudinary integration
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Technical Highlights
- Modern React 18+ with Framer Motion animations
- Responsive Tailwind CSS styling
- RESTful Node.js/Express backend
- MongoDB for data persistence
- JWT-based authentication
- Role-based access control (User, Admin)
- Geolocation and mapping capabilities

## 📁 Project Structure

```
SDG_6/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # Auth context & state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   └── services/      # API service calls
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Node.js backend
│   ├── controllers/       # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   ├── package.json
│   └── server.js
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Leaflet** - Maps
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Cloudinary** - Image storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Git
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tulsiram26/Cleanwater-Sanitation-.git
cd SDG_6
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/jalrakshak" >> .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "CLOUDINARY_CLOUD_NAME=your_cloud_name" >> .env
echo "CLOUDINARY_API_KEY=your_api_key" >> .env
echo "CLOUDINARY_API_SECRET=your_api_secret" >> .env

# Start server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

4. **Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Report Endpoints
- `POST /api/reports` - Create report (Protected)
- `GET /api/reports` - Get all reports
- `GET /api/reports/user/my-reports` - Get user's reports (Protected)
- `GET /api/reports/:id` - Get report details
- `PATCH /api/reports/:id` - Update report (Admin)
- `DELETE /api/reports/:id` - Delete report (Admin/Creator)

### User Endpoints
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user profile (Protected)
- `PATCH /api/users/:id` - Update user profile (Protected)
- `DELETE /api/users/:id` - Delete user (Admin)

## 👥 User Roles

- **Citizen/User** - Report water issues, view reports, track progress
- **Admin** - Manage all reports, update status, manage users

## 🌱 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is part of a capstone project for SDG 6 initiative.

## 🤝 Support

For questions or issues, please create an issue on GitHub.

## 🌍 SDG 6 - Clean Water & Sanitation

This project contributes to the United Nations Sustainable Development Goal 6 by:
- Improving water quality monitoring systems
- Reducing response time to water issues
- Increasing awareness about water access
- Empowering communities to take action

---

**Made with ❤️ for Clean Water & Sanitation**
