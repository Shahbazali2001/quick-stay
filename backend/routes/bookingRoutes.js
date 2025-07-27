import express from "express";
import { createBooking, checkRoomAvailabilityAPI, getUserBookings, getHotelBookings } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkRoomAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);


export default bookingRouter;