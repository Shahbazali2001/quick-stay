import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Check if User Already Register
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Register" });
    }

    await Hotel.create({ name, address, contact, owner, city });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
    return res
      .status(200)
      .json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
