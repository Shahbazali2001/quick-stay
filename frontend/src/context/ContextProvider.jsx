import  AppContext  from "./AppContext.jsx";
import axiosInstance from "../utils/axiosInstance.js"; 
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const AppProvider = ({ children }) => {


  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);



  // Fetch User Function
  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if(user){
      fetchUser();
    } 
  }, [user]);










  const values = {
    axiosInstance,
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities, 
    setSearchedCities
  };

  return( 
  <AppContext.Provider value={values}>{children}</AppContext.Provider>
  ) 
};
