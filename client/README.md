# 🚰 JalRakshak - Frontend Application

A modern, responsive web application for reporting and tracking water-related issues. Built with React, Vite, Tailwind CSS, and Framer Motion.

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Features Overview](#features-overview)
- [Component Documentation](#component-documentation)

---

## ✨ Features

### 🌟 Core Features

- **User Authentication**: Secure register/login with JWT
- **Issue Reporting**: Report water issues with images and GPS coordinates
- **Dashboard**: View all reported issues with filtering and search
- **Map View**: Visualize issues on an interactive map using Leaflet
- **Admin Panel**: Manage and update issue status
- **Real-time Updates**: Smooth animations and instant feedback
- **Responsive Design**: Works seamlessly on mobile and desktop

### 🎨 UI/UX Highlights

- Modern glassmorphism design
- Smooth Framer Motion animations
- Gradient color schemes (water-themed)
- Responsive grid layouts
- Intuitive navigation
- Toast notifications
- Loading states

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 10.16
- **HTTP Client**: Axios 1.6
- **Routing**: React Router DOM 6.20
- **Maps**: Leaflet 1.9.4 + React Leaflet 4.2
- **Notifications**: React Hot Toast 2.4
- **Dev Tools**: Node.js, npm

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar with auth
│   │   ├── Footer.jsx         # Footer component
│   │   ├── ReportCard.jsx     # Card component for reports
│   │   ├── MapView.jsx        # Leaflet map component
│   │   ├── Loader.jsx         # Loading spinner
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with hero
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── ReportIssue.jsx    # Form to create report
│   │   ├── Dashboard.jsx      # View all reports
│   │   ├── AdminPanel.jsx     # Admin management
│   │   └── NotFound.jsx       # 404 page
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx     # Main layout wrapper
│   │
│   ├── services/
│   │   └── api.js             # Axios API configuration
│   │
│   ├── context/
│   │   └── AuthContext.jsx    # Auth context provider
│   │
│   ├── hooks/
│   │   └── useAuth.js         # Custom auth hook
│   │
│   ├── App.jsx                # Main router setup
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles
│   └── index.html             # HTML template
│
├── public/                    # Static assets
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Project dependencies
├── .env                      # Environment variables
└── .gitignore               # Git ignore rules
```

---

## 📦 Installation

### Prerequisites

- Node.js (v16.x or higher)
- npm (included with Node.js)
- Backend server running on `http://localhost:5000`

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react, react-dom, react-router-dom
- axios for API calls
- framer-motion for animations
- leaflet, react-leaflet for maps
- tailwindcss for styling
- react-hot-toast for notifications
- vite and build tools

### Step 3: Configure Environment

Create or update `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

This will:
- Start Vite dev server on `http://localhost:3000`
- Enable hot module reloading
- Open browser automatically
- Watch for file changes

### Build for Production

```bash
npm run build
```

Output files will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📄 Environment Variables

### `.env` File

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#0EA5E9` 
- **Cyan/Secondary**: `#06B6D4`
- **Dark**: `#0F172A`
- **Light**: `#F8FAFC`
- **Status Colors**:
  - Pending: `#FCD34D` (Yellow)
  - In Progress: `#60A5FA` (Blue)
  - Resolved: `#34D399` (Green)

### Typography

- **Headings**: Bold weights (700-900)
- **Body**: Regular (400) and Semibold (600)
- **Font**: Segoe UI, system fonts

### Components

- **Buttons**: Gradient backgrounds, hover scale animations
- **Cards**: Rounded corners (rounded-2xl), soft shadows
- **Forms**: Minimal style with focus rings
- **Navigation**: Fixed navbar with glassmorphism effect

---

## 📡 API Integration

### Axios Configuration

The API client is configured in `src/services/api.js`:

- **Base URL**: From `VITE_API_URL` environment variable
- **Interceptors**: Auto attach JWT token to requests
- **Error Handling**: Automatic redirect to login on 401

### Token Management

- Token stored in `localStorage` with key `token`
- User data stored in `localStorage` with key `user`
- Auto-attached to all requests via interceptor

---

## 🔐 Authentication Flow

1. **Register**: User submits form → Backend creates account → Token received → Auto login
2. **Login**: User submits credentials → Backend validates → Token received → Redirect to dashboard
3. **Protected Routes**: Check token → If valid, show page → If invalid, redirect to login
4. **Logout**: Clear token and user data → Redirect to home

---

## 📝 Form Validation

### Register Form

- Name: Required, string
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Phone: Required, 10 digits
- City: Required, string
- State: Required, string

### Report Form

- Title: Required, max 100 characters
- Issue Type: Required, one of: dirty water, leakage, no supply
- Description: Required, max 1000 characters
- Latitude: Required, -90 to 90
- Longitude: Required, -180 to 180
- Image: Optional, max 5MB

---

## 🎬 Animations

### Using Framer Motion

All animations are configured via Framer Motion:

```javascript
// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Scale on hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Common Animations

- Fade in/out
- Slide up/down/left/right
- Scale on hover/tap
- Stagger children
- Rotate animations

---

## 🗺️ Map Features

### Leaflet Map Integration

- **Interactive markers** for each report
- **Color-coded** by status (Red: Pending, Blue: In Progress, Green: Resolved)
- **Popup information** on marker click
- **Auto-center** map based on reports
- **Responsive** layout

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile Optimizations

- Stacked layouts
- Touch-friendly buttons
- Hamburger menu for navigation
- Optimized forms

---

## 🔧 Configuration Files

### vite.config.js

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
```

### tailwind.config.js

- Extends default theme with custom colors
- Custom animations (fadeIn, slideUp)
- Shadow utilities

### postcss.config.js

- Tailwind CSS plugin
- Autoprefixer for browser compatibility

---

## 🧪 Testing API Calls

### Example: Testing Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210",
    "city": "Mumbai",
    "state": "Maharashtra"
  }'
```

---

## 🚀 Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
# Update package.json with homepage
npm run build
npm run deploy
```

---

## 🐛 Troubleshooting

### Problem: API calls not working

**Solution**: 
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors

### Problem: Map not showing

**Solution**:
- Ensure Leaflet CSS is properly imported
- Check for browser console errors
- Verify reports have valid latitude/longitude

### Problem: Animations not smooth

**Solution**:
- Check browser performance settings
- Reduce motion if needed
- Check hardware acceleration is enabled

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [React Router Documentation](https://reactrouter.com)
- [Leaflet Documentation](https://leafletjs.com)
- [Axios Documentation](https://axios-http.com)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a pull request

---

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

---

**Built with ❤️ for SDG 6: Clean Water and Sanitation**
