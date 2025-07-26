import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../configs/dbConnect.js";

// Middleware Imports
import { clerkMiddleware } from '@clerk/express'


// Routes
import userRouter from "../routes/userRoutes.js";
import hotelRouter from "../routes/hotelRoutes.js";

// Controllers
import clerkWebhooks from "../controllers/clerkWebhooks.js";



const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connectDB();

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






// Root Route (Optional)
app.get("/", (req, res) => {
    res.send("Hello from QuickStay");
});






export default app;