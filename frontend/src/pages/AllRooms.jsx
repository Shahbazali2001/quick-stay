import React from 'react'
import Title from '../components/Title'
import { roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router'



const AllRooms = () => {
    const navigate = useNavigate();

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* Rooms */}
        <div>
            <div>
                <Title title="Hotel Rooms" subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories." font="font-playfair" align={"left"} />
            </div>
        
        {roomsDummyData.map((room)=>(
            <div>
                <img className='max-h-65 md:w-1/2 rounded-xl shadow-xl shadow-lg object-cover cursor-pointer' onClick={() =>{ navigate(`/rooms/${room._id}`); window.scrollTo(0, 0)}} src={room.images[0]} alt="hotel-img" title='View Room Details' />
            </div>

        ))}
        

        </div>
        {/* Filters */}
        <div>

        </div>
    </div>
  )
}

export default AllRooms