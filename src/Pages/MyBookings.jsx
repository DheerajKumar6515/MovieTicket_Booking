import { dummyBookingData } from '../assets/assets'
import BlurCircle from '../Components/BlurCircle'
import TimeFormate from '../Components/TimeFormate'
import IsoTimeFormate from '../Components/IsoTimeFormate'
import { useEffect, useState } from 'react'

function MyBookings() {
  const [bookingData,SetbookingData]=useState([])
  
  useEffect(()=>{
    SetbookingData(dummyBookingData)
  },[])
  return (
    <div className=' mt-24 md:mt-32 px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      <h1 className='text-lg font-medium pb-4 md:pb-8'>My Bookings</h1>

        {bookingData.map((item,idx)=>(
            <div key={idx} className='flex flex-col mb-3'>

            <div className=' flex flex-col md:flex-row justify-between border border-primary/20 bg-primary/7 rounded-lg'>
            
           
           <div className='md:w-72 md:h-36 p-2'>
            <img className='w-full h-full object-cover rounded-lg' src={item.show.movie.backdrop_path} alt="img" />
            </div>

           <div className='flex flex-col md:flex-row items-start  md:items-center justify-between w-full px-3 pb-2 md:px-1 md:py-4 '>     <BlurCircle top='100px'/>        
                  <div className='w-1/2 h-full flex flex-col justify-between'>
                     <div>
                     <p className='text-sm md:text-base font-medium md:font-semibold tracking-light'>{item.show.movie.title}</p>
                     <p className='text-xs text-gray-400'>{TimeFormate(item.show.movie.runtime)}</p>
                     </div>
                     <div>
                       <p className='text-xs text-gray-400'>{new Date(item.show.movie.release_date).getDate()}th {new Date(item.show.movie.release_date).toLocaleDateString('en-US',{month:"short"})} {new Date(item.show.movie.release_date).getFullYear()} • {IsoTimeFormate(item.show.showDateTime)}</p>
                     </div>
                  </div>

                  <div className='w-1/2 h-full flex flex-col justify-between md:items-end pr-[17px]'>
              <div><h1 className='text-sm md:text-lg font-medium md:font-semibold tracking-light'>{import.meta.env.VITE_CURRENCY}{item.amount} {!item.isPaid && <button className='text-xs bg-primary px-4 py-1.5 rounded-full font-medium cursor-pointer mb-1 hover:bg-primary-dull'>Pay Now</button>}
              </h1></div>
              <div className='flex flex-col md:gap-1 md:items-end'>
                <p className='text-xs text-gray-400'>Total Tickets: <span className='text-white font-medium'>{item.bookedSeats.length}</span></p>
                <p className='text-xs text-gray-400'>Seat Number: <span className='text-white font-medium'>{item.bookedSeats.map(seat => seat).join(", ")}</span></p>
              </div>
                  </div>
            </div>

            </div>

        </div>
        ))}
         
    </div>
  )
}

export default MyBookings
