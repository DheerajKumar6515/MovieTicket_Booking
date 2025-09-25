import {useNavigate, useParams} from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import BlurCircle from '../Components/BlurCircle'
import TimeFormate from '../Components/TimeFormate'
import Choosedate from '../Components/Choosedate'
import Moviescard from '../Components/Moviescard'
import Loading from '../Components/Loading'

function MoviesDetails() {
   const navigate=useNavigate()
   const {id}=useParams()
   const [moviedata,setMoviedata]=useState(null)
   
    //console.log(moviedata);
   
   const fetchdata=()=>{
      const movies=dummyShowsData.find((show)=> show._id === id);
      if(movies){
        setMoviedata({
        movies,
        dateTime:dummyDateTimeData
      })
      }
      
   }

   useEffect(()=>{
    fetchdata()
   },[id])
   
  return moviedata ? (
    <div className='pt-40 px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
       
       <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:items-start xl:justify-start'>
          <div className='h-104 max-w-70 rounded-xl overflow-hidden'>
              <img src={moviedata.movies.backdrop_path} alt="posterImg"  className='w-full h-full bg-cover object-center object-cover'/>
          </div>
          <div className='px-2 md:w-96 '>
           <BlurCircle  top='100px' left='100px'/>
            
              <p className='uppercase text-primary font-medium text-sm pt-4'>{moviedata.movies.original_language}</p>
              <h1 className='capitalize font-semibold text-5xl pt-1'>{moviedata.movies.title}</h1>
              <p className='flex gap-1.5 text-sm items-center py-5'> <StarIcon className='w-4 h-4 text-primary fill-primary'/> {moviedata.movies.vote_average.toFixed(1)} User Rating </p>
              <p className='text-xs text-gray-300 pb-3 leading-4'>
                {moviedata.movies.overview}
              </p>

              <p className='text-[13px] font-light'>{TimeFormate(moviedata.movies.runtime)} • {moviedata.movies.genres.slice(0,2).map(genre=> genre.name).join(" | ")} • {new Date(moviedata.movies.release_date).getDate()} {new Date(moviedata.movies.release_date).toLocaleDateString("en-US",{month:"short"})}, {new Date(moviedata.movies.release_date).getFullYear()}</p>

              <div className='flex items-center gap-3 pt-5'>
                 <button className='flex gap-1 text-xs font-medium bg-gray-800 w-36 py-3 px-[25px] rounded-md hover:bg-gray-700 cursor-pointer'> <PlayCircleIcon strokeWidth={1.6} className='w-4 h-4'/> Watch Trailer</button>
                 <a href='#dateSelect' className='text-xs bg-primary hover:bg-primary-dull w-32 py-[11px] px-[20px] rounded-md cursor-pointer text-center'>Buy Tickets</a>
                 <p className='bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer'> <HeartIcon strokeWidth={1.2} className='w-4 h-4'/> </p>
              </div>
          </div>
       </div>

       <div className='w-full mt-20'>
          <p className='text-lg font-medium'>Your Favourite Cast</p>
          <div className='grid grid-cols-4 md:grid-cols-8 gap-2 items-center justify-start pt-2 md:pt-4 2xl:w-[52rem]'>
             {moviedata.movies.casts.slice(0,8).map((cast)=>(
              <div key={cast.name} className='flex flex-col items-center justify-center text-center'>
                 <img className=' md:w-20 md:h-20 aspect-square object-cover rounded-full' src={cast.profile_path} alt="profileimg" />
                  <p className='text-xs pt-2'>{cast.name}</p>
              </div>
             ))}
          </div>
       </div>

       {/* choose date */}
       <Choosedate datetime={moviedata.dateTime} id={id}/>

       <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
       <div className='flex flex-wrap justify-center xl:justify-start gap-8'>
          {dummyShowsData.slice(0,4).map((movie,indx)=>(
            <Moviescard key={indx} movie={movie}/>
          ))}
       </div>
       <div className='flex justify-center mt-20'>
          <button onClick={()=>{navigate("/movies");scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
       </div>

    </div>
  ): <div>
       <Loading/>
     </div>
}

export default MoviesDetails
