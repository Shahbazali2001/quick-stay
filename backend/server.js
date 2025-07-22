import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import "dotenv/config";


// Controllers
import clerkWebhooks from "./controllers/clerkWebhooks.js";

import connectDB from "./configs/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());



//API to Listen Clerk WebHooks
app.use("/api/clerk", clerkWebhooks)








// Root Route (Optional)
app.get("/", (req, res) => {
    res.send("Hello from QuickStay");
});






// Start Server
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});