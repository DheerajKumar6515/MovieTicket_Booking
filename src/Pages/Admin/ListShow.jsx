import { useEffect, useState } from "react"
import { dummyShowsData } from "../../assets/assets"
import Loading from '../../Components/Loading'
import BlurCircle from '../../Components/BlurCircle'
import IsoTimeFormate from "../../Components/IsoTimeFormate"

function ListShow() {

  const [show, setShow] = useState([])
  const [loading, setloading] = useState(true)

  const getAllshow = async () => {
    try {
      setShow([
        {
            "_id": "68352363e96d99513e4221a4",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-06-30T02:30:00.000Z",
            "showPrice": 59,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        }
      ])
      setloading(false)
    } catch (er) {
      console.log(er);
    }
  }
  
  useEffect(()=>{
    getAllshow()
  },[])

  return !loading ? (
    <div className='md:pl-5'>
      <h1 className='text-lg'>List <span className='text-primary underline font-medium'>Shows</span></h1>

      <div className="max-w-4xl mt-6 overflow-x-auto rounded-md">
        <BlurCircle top="100px" left="300px"/>
        <table className="w-full">
          <thead className="text-left">
            <tr className="text-xs md:text-sm text-gray-300 bg-primary/40">
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Movie Name</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Show Time</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Total Booking</th>
              <th className="px-1 py-1 md:px-4 md:py-2 font-medium">Earning</th>
            </tr>
          </thead>
          <tbody>
            {show.map((shows,index)=>(
                <tr key={index} className="border-b border-primary/30 bg-primary/15 text-gray-300">
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{shows.movie.title}</td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">
                  { new Date(shows.showDateTime).toISOString().split("T")[0]} {IsoTimeFormate(shows.showDateTime)}
                  </td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{Object.keys(shows.occupiedSeats).length}</td>
                <td className="px-1 py-1 text-xs md:px-4 md:py-2 md:text-sm">{import.meta.env.VITE_CURRENCY}{Object.keys(shows.occupiedSeats).length * shows.showPrice}</td>
               </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>
  ): <Loading/>
}

export default ListShow
