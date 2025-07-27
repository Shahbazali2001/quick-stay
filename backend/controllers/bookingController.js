import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// Function to check availability of room

export const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.errorq(error.message);
  }
};

// API to check availability of room
// POST /api/booking/check-availability
export const checkRoomAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    return res.status(200).json({
      isAvailable,
      success: true,
      message: "Availability Checked Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to create new Booking
// POST api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    // check if room is available
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Room is not available" });
    }

    //  Get total price for room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;
    // Calculate total price based on Nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice = totalPrice * diffNights;

    const booking = await Booking.create({
      user,
      hotel: roomData.hotel._id,
      room,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests: +guests,
    });

    return res.status(201).json({
      booking,
      success: true,
      message: "Booking Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      bookings,
      success: true,
      message: "Bookings Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel Not Found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    //Total Bookings
    const totalBookings = bookings.length;

    //Total Revenue
    let totalRevenue = 0;
    for (let i = 0; i < bookings.length; i++) {
      totalRevenue += bookings[i].totalPrice;
    }
    return res.status(200).json({
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings,
      },
      success: true,
      message: "Bookings Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
