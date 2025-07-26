import Room from "../models/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner : req.auth.userId});

        if(!hotel){
            return res.status(400).json({success: false, message: "Hotel Not Found"});
        }
       
    } catch (error) {
        
    }
};


// API to get all rooms
export const getRooms = async (req, res) => {
    try {
       
    } catch (error) {
        
    }
};



// API to get room for specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
       
    } catch (error) {
        
    }
};


// API to toggle availability of room
export const toggleRoomAvailability = async (req, res) => {
    try {
       
    } catch (error) {
        
    }
};