import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel Not Found" });
    }
    //    upload images to cloudinary
    const uploadedImages = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    });

    const images = await Promise.all(uploadedImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    return res
      .status(200)
      .json({ success: true, message: "Room Created Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ rooms, success: true, message: "Rooms Fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get room for specific hotel owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    return res
      .status(200)
      .json({ rooms, success: true, message: "Rooms Fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to toggle availability of room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(400)
        .json({ success: false, message: "Room Not Found" });
    }
    room.isAvailable = !room.isAvailable;
    await room.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Room Availability Toggled Successfully",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
