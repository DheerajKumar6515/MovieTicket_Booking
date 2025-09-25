import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from './BlurCircle'
import Moviescard from './Moviescard'


function FeatureSection() {
    const navigate=useNavigate()
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0' right='-80px'/>
             <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
             <button onClick={()=>navigate('/movies')} className='cursor-pointer group flex items-center gap-2 text-sm text-gray-300'>
                 View All 
                 <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>
             </button>
        </div>

           {/* cards section*/}
        <div className='flex flex-wrap justify-center 2xl:justify-start gap-8 mt-8'>
            {dummyShowsData.slice(0,6).map((movie)=>(
               <Moviescard key={movie.id} movie={movie}/>
            ))}
        </div>
      
         <div className='flex justify-center mt-20'>
            <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
         </div>
           
    </div>
  )
}

export default FeatureSection
