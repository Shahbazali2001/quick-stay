import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../configs/dbConnect.js";
import connectCloudinary from "../configs/cloudinary.js";

// Middleware Imports
import { clerkMiddleware } from '@clerk/express'


// Routes
import userRouter from "../routes/userRoutes.js";
import hotelRouter from "../routes/hotelRoutes.js";
import roomRouter from "../routes/roomRoutes.js";

// Controllers
import clerkWebhooks from "../controllers/clerkWebhooks.js";




const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connectDB();

// Cloudinary Connection
connectCloudinary();

// Middlewares Used
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());



//API to Listen Clerk WebHooks
app.use("/api/clerk", clerkWebhooks);


// User Routes
app.use("/api/user", userRouter);


// Hotel Routes
app.use("/api/hotels", hotelRouter);


// Room Routes
app.use("/api/rooms", roomRouter);





// Root Route (Optional)
app.get("/", (req, res) => {
    res.send("Hello from QuickStay");
});






export default app;