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


// Store user Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
    try{

        const {recentSearchedCity} = req.body;
        const user = req.user;
        if(user.recentSearchedCities < 3){
            user.recentSearchedCities.push(recentSearchedCity);
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
        }
        await user.save();
        return res.status(200).json({success: true, message: "User Data Updated Successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
}