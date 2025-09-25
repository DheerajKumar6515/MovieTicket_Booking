import { StarIcon } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import TimeFormate from './TimeFormate';

function Moviescard({movie}) {
    const navigate=useNavigate()
  return (
    <div className='flex flex-col bg-[#7080902b] w-66  p-3 rounded-xl hover:-translate-y-1 transition duration-300 '>

        <img onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}} src={movie.backdrop_path} alt="" className='w-full h-52 rounded-lg object-cover object-right-bottom cursor-pointer' />
          
        <h3 className='font-semibold mt-2 truncate '>{movie.title}</h3>

        <p className='text-sm mt-2 tracking-wider text-gray-400'>{new Date(movie.release_date).getFullYear()} - {movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} - {TimeFormate(movie.runtime)} </p>

        <div className='flex items-center justify-between pt-6'>
            <button onClick={()=>{navigate(`/movies/${movie._id}`);scrollTo(0,0)}} className='bg-primary hover:bg-primary-dull text-xs transition cursor-pointer py-2 px-4 rounded-full tracking-wide'>Buy Ticket</button>
            <p className='flex items-center gap-2 text-sm'><StarIcon className='w-4 h-4 text-primary fill-primary'/> {movie.vote_average.toFixed(1)}</p>
        </div>

    </div>
  )
}

export default Moviescard
