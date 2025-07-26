import express from "express";
import { getUserData } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);

export default userRouter;