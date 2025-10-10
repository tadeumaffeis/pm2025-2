const app = require('./app');
const { connectMySQL, connectMongoDB } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectMySQL();
    await connectMongoDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();