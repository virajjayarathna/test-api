const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is running successfully',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0'
  });
});

// Sample API endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    data: {
      success: true,
      timestamp: new Date().toISOString()
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;