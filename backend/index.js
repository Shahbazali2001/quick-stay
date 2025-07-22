import express from "express";
import cors from "cors";
import connectDB from "./configs/dbConnect.js";
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// Load environment variables
dotenv.config();

// Initialize App
const app = express();

// Database Connection
try {
    await connectDB();
} catch (error) {
    console.error('Database connection failed:', error);
}

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// API Routes
app.use("/api/clerk", clerkWebhooks);

// Root Route
app.get("/", (req, res) => {
    res.json({ 
        message: "Hello from QuickStay",
        status: "Server running successfully on Vercel",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// API info route
app.get("/api", (req, res) => {
    res.json({
        message: "QuickStay API",
        version: "1.0.0",
        endpoints: {
            clerk_webhooks: "/api/clerk",
            health: "/health"
        }
    });
});

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error('Global Error Handler:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

// CRITICAL: Export default for Vercel (ES6 way)
export default app;
