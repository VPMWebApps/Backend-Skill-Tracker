// server.js or index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = 5000; // Fixed port for easier debugging

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({ message: 'Server is running' });
});

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ msg: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
    try {
        console.log('Starting server...');
        console.log('Attempting to connect to MongoDB...');
        
        // Connect to MongoDB first
        await connectMongoDB();
        console.log('MongoDB connected successfully');
        
        // Then start the server
        app.listen(PORT, () => {
            console.log('=================================');
            console.log(`Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/api/auth/health`);
            console.log(`Frontend URL: http://localhost:5173`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

startServer();