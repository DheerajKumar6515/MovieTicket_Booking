import { useEffect, useState } from "react"
import { dummyDashboardData } from "../../assets/assets"
import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon, UsersIcon } from "lucide-react"
import Loading from "../../Components/Loading"
import BlurCircle from "../../Components/BlurCircle"
import TimeFormate from "../../Components/TimeFormate"
import IsoTimeFormate from "../../Components/IsoTimeFormate"

function Dashboard() {
  const [dashboardData, SetdashboardData] = useState({
    totalBooking: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  })
  const [loading, SetLoading] = useState(true)

  const dashboardCard = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: "Total Revenue", value: dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
  ]

  const fetchData = async () => {
    SetdashboardData(dummyDashboardData);
    SetLoading(false)
  }
 
  function days(date){

    switch (date) {
      case 1:
        return "Mon"
        break;
      case 2:
        return "Tue"
        break;
      case 3:
        return "Wed"
        break;
      case 4:
        return "Thr"
        break;
      case 5:
        return "Fri"
        break;
      case 6:
        return "Sat"
        break;
      case 7:
        return "Sun"
        break;
          
      default:
        break;
    }      

  }

  useEffect(() => {
    fetchData()
  }, [])


  return !loading ? (
    <div className='pl-5'>
      <h1 className='text-xl'>Admin <span className='text-primary underline'>Dashboard</span></h1>

      <div className="mt-6 flex flex-wrap gap-4">
        <BlurCircle top="60px" left="100px" />
        {dashboardCard.map((item, indx) => (
          <div key={indx} className="flex items-center justify-between px-4 py-3 rounded-lg max-w-50 w-full bg-primary/10 border border-primary/50">
            <div>
              <p className="text-sm">
                {item.title}
              </p>
              <p className="text-xl mt-1 font-medium">{item.value}</p>
            </div>
            <item.icon className="w-6 h-6" />
          </div>
        ))}

      </div>

      <div className="mt-10">
        <h1 className=" text-lg font-medium">Active Movies</h1>
        <div className="flex flex-wrap gap-4 mt-5">
          {dashboardData.activeShows.map((item) => (
            <div key={item.movie._id} className='flex flex-col bg-[#7080902b] w-66 p-3 rounded-xl hover:-translate-y-1 transition duration-300 '>

              <img src={item.movie.backdrop_path} alt="" className='w-full h-52 rounded-lg object-cover object-right-bottom cursor-pointer' />

              <h3 className='font-semibold mt-2 truncate '>{item.movie.title}</h3>

              <p className='text-sm mt-2 tracking-wider text-gray-400'>{new Date(item.movie.release_date).getFullYear()} - {item.movie.genres.slice(0, 2).map(genre => genre.name).join(" | ")} - {TimeFormate(item.movie.runtime)} </p>

              <div className='flex items-center justify-between pt-6'>
                <p className="font-medium text-lg">{import.meta.env.VITE_CURRENCY}{item.showPrice}</p>
                <p className='flex items-center gap-2 text-sm'><StarIcon className='w-4 h-4 text-primary fill-primary' /> {item.movie.vote_average.toFixed(1)}</p>
              </div>
              <p className="flex items-center text-xs pt-1 text-gray-400">
                {days(new Date(item.showDateTime).getDay())}, {new Date(item.showDateTime).toLocaleDateString("en-US",{month:"short"})} {new Date(item.showDateTime).getDate()} at {IsoTimeFormate(item.showDateTime)}
                </p>

            </div>
          ))}
        </div>
      </div>


    </div>
  ) : <Loading />
}

export default Dashboard
