// GET /api/user

export const getUserData = async (req, res) => {
    try{
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        return res.status(200).json({role, recentSearchedCities, success: true, message: "User Data Fetched Successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};