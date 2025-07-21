import {useState} from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title title="Room Listings" align="left" font="outfit" subTitle="Manage and list your hotel rooms with ease. Add details, photos, and availability, and let users book your rooms effortlessly." />
      <p className='text-gray-500 mt-8'>All Rooms</p>
      
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                    <th className='py-3 px-4 text-gray-800 font-medium '>Price / Night</th>
                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
                  </tr>  
                </thead>

                <tbody className='text-sm'>
                  {rooms.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200'>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.roomType}</td>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>{item.amenities.join(', ')}</td>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>${item.pricePerNight}</td>
                      <td className='py-3 px-4  border-t border-gray-300  flex'>
                        {/* <button className={`py-1 px-3 text-xs rounded-full mx-auto w-20 ${booking.isPaid ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}>
                          {booking.isPaid ? 'Completed' : 'Pending'}
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>




    </div>
  )
}

export default ListRoom