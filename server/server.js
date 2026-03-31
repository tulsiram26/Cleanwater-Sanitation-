require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to database
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║   🚀 JalRakshak Backend Server Started        ║
╠════════════════════════════════════════════════╣
║   Server: http://localhost:${PORT}${PORT === 5000 ? '               ' : '                '}║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(35)}║
║   Database: ${(process.env.MONGODB_URI || 'mongodb://localhost:27017/jalrakshak').slice(0, 34).padEnd(34)}║
╚════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
