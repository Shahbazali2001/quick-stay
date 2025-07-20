import React from 'react'
import { assets, cities } from "../assets/assets";

const HotelReg = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
        <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
            {/* Image */}
            <img src={assets.regImage} alt="" className='w-1/2 rounded-xl hidden md:block' />

            {/* Form */}
            <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>

                <img src={assets.closeIcon} alt="" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />

                <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

                {/* Hotel Name */}
                <div className='w-full mt-4'>
                  <label htmlFor="name" className='font-medium text-gray-500'>
                    Hotel Name
                  </label>
                  <input className='border border-gray-300 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' type="text" placeholder='Hotel Name' name="name" id="name" required />
                </div>
                {/* Phone Number */}
                <div className='w-full mt-4'>
                  <label htmlFor="contact" className='font-medium text-gray-500'>
                    Phone
                  </label>
                  <input className='border border-gray-300 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' type="text" placeholder='Phone' name="contact" id="contact" required />
                </div>
                {/* Address */}
                <div className='w-full mt-4'>
                  <label htmlFor="address" className='font-medium text-gray-500'>
                    Address
                  </label>
                  <input className='border border-gray-300 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' type="text" placeholder='Address' name="address" id="address" required />
                </div>
                {/* City Dropdown */}
                <div className='w-full mt-4 max-w-60 mr-auto'>
                  <label htmlFor="city" className='font-medium text-gray-500'>
                    City
                  </label>
                  <select className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' name="city" id="city" required>
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <button className='bg-indigo-600 hover:bg-indigo-600 text-white transition-all mr-auto py-2 px-6 rounded cursor-pointer mt-6'>
                  Register
                </button>
        
            </div>
        </form>
    </div>
  )
}

export default HotelReg