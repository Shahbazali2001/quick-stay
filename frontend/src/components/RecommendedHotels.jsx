import {useState, useEffect} from "react";
import HotelCard from "./HotelCard";
// import { roomsDummyData } from "../assets/assets";
import Title from "./Title";
import {useAppContext} from "../context/useAppContext.jsx";


const RecommendedHotels = () => {
  const title = "Recommended Hotels";
  const subTitle = "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences";
  const font = "font-playfair";


  const {rooms, searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);
  

  return recommended.length > 0 && (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-50 py-20">
        <Title title={title} subTitle={subTitle} font={font} />
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-15">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* <button
      onClick={}
       className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer">
        View All Hotels
      </button> */}
    </div>
  );
};

export default RecommendedHotels;
