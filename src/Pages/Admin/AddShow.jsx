import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../Components/Loading'
import {CheckIcon, DeleteIcon, StarIcon} from 'lucide-react'
import Kconverter from '../../Components/Kconverter'
import {toast} from 'react-hot-toast'

function AddShow() {
  const currency=import.meta.env.VITE_CURRENCY
  const [nowPlaying,SetnowPlaying]=useState([])
  const [selectedMovie,SetselectedMovie]=useState(null)
  const [dateTimeSelection,setdateTimeSelection]=useState({})
  const [dateTimeInput,SetdateTimeInput]=useState("")
  const [showPrice,setShowPrice]=useState("")

  const fetchNowPlayingMovie=async()=>{
    SetnowPlaying(dummyShowsData)
  }

  const handleDateTimeAdd=()=>{
     if(!dateTimeInput) return
     const [date,time]=dateTimeInput.split("T");
     if(!date || !time) return

     setdateTimeSelection((prev)=>{
      const times=prev[date] || [];
      if(!times.includes(time)){
        return {...prev, [date]: [...times, time]};
      }
      return prev;
    })
  }

  const handleRemoveTime=(date,time)=>{
    setdateTimeSelection((prev)=>{
      const filteredTimes=prev[date].filter((t)=> t !== time);
      if(filteredTimes.length === 0){
        const {[date]: _, ...rest}=prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      }
    })
  }

  const addshows=()=>{
     if(selectedMovie){
        toast("Add show successfully.")
     }else{
       toast("Plz select movies")
     }
  }

  useEffect(()=>{
     fetchNowPlayingMovie()
  },[])

  //console.log(nowPlaying)

  return nowPlaying.length > 0 ?(
    <div>

     <h1 className='text-lg'>Add <span className='text-primary underline font-medium'>Shows</span></h1>
     <p className='mt-6 text-sm md:text-lg font-medium'>Now Playing Movies</p>
     
     <div className='overflow-x-auto pb-4'>
       <div className='group flex flex-wrap gap-4 mt-4 w-max'>
           {nowPlaying.map((movie)=>(
            <div key={movie.id} onClick={()=>SetselectedMovie(movie.id)} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}>
               <div className='relative rounded-lg overflow-hidden'>
                  <img src={movie.poster_path} alt="img" className='w-full object-cover brightness-90' />
                  <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                     <p className='flex items-center gap-1 text-gray-400'>
                         <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                         {movie.vote_average.toFixed(1)}
                     </p>
                     <p className='text-gray-300'>
                        {Kconverter(movie.vote_count)} votes
                     </p>
                  </div>
               </div>
               {selectedMovie === movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                   <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>
                </div>
               )}
               <p className='text-sm md:font-medium truncate'>{movie.title}</p>
               <p className='text-gray-400 text-xs md:text-sm'>{movie.release_date}</p>
            </div>
           ))}

       </div>
     </div>

     {/* show price input */}
       <div className='mt-8'>
         <label className='block text-sm font-medium mb-2'>
           Show Price
         </label>
         <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
           <p className='text-gray-400 text-sm'>{currency}</p>
           <input type="number" min={0} value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} placeholder='Enter show price' className='outline-none'/>
         </div>
       </div>

       {/* Date  & Time selection */}
       <div className='mt-6'>
          <label className='block text-sm font-medium mb-2'>Select Date and Time</label>
          <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
             <input type="datetime-local" value={dateTimeInput} onChange={(e)=>SetdateTimeInput(e.target.value)}
             className='outline-none rounded-md' />
             <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>
               Add Time
             </button>
          </div>
       </div>

       {/* Display selected Times */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className='mt-6'>
              <h2 className='mb-2'>Selected Date-Time</h2>
              <ul className='space-y-3'>
                 {Object.entries(dateTimeSelection).map(([date,times])=>(
                  <li key={date}>
                     <div className='font-medium'>{date}</div>
                     <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                       {times.map((time)=>(
                        <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
                           <span>{time}</span>
                           <DeleteIcon onClick={()=>handleRemoveTime(date,time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
                        </div>
                       ))}
                     </div>
                  </li>
                 ))}
              </ul>
          </div>
        )}

        <button onClick={addshows} className='bg-primary/80 text-white px-3 py-2 text-sm rounded mt-7 hover:bg-primary cursor-pointer'>Add Show</button>

    </div>
  ):<Loading/>
}

export default AddShow
