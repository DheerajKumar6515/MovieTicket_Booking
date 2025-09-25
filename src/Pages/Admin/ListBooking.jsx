import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../Components/Loading'
import BlurCircle from '../../Components/BlurCircle'
import IsoTimeFormate from '../../Components/IsoTimeFormate'

function ListBooking() {

  const [ListBooking,setListBooking]=useState([])
  const [loading,setloading]=useState(true)

   const getbookingdata=async()=>{
      setListBooking(dummyBookingData)
      setloading(false)
   }

   useEffect(()=>{
    getbookingdata()
   },[])
 
  // console.log(ListBooking)
  return !loading? (
      <div className='md:pl-5'>
      <h1 className='text-lg'>List <span className='text-primary underline font-medium'>Bookings</span></h1>

      <div className="max-w-4xl mt-6 overflow-x-auto rounded-md">
        <BlurCircle top="200px" left="500px"/>
        <table className="w-full">
          <thead className="text-left border-b border-primary/30">
            <tr className="text-xs md:text-sm text-gray-300 bg-primary/15">
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">User Name</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Movie Name</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Show Time</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Seats</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {ListBooking.map((shows,index)=>(
                <tr key={index} className="border-b border-primary/30 bg-primary/15 text-gray-300">
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{shows.user.name}</td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{shows.show.movie.title}</td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">
                  { new Date(shows.show.showDateTime).toISOString().split("T")[0]} {IsoTimeFormate(shows.show.showDateTime)}
                  </td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{shows.bookedSeats.map(seat=> seat).join(", ")}</td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{import.meta.env.VITE_CURRENCY}{shows.amount}</td>
               </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>
  ):<Loading/>
}

export default ListBooking
