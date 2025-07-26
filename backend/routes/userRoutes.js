import express from "express";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-searched-cities", protect, storeRecentSearchedCities);

export default userRouter;