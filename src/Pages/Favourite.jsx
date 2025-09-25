import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from '../Components/BlurCircle'
import Moviescard from '../Components/Moviescard'

function Favourite() {
  return (
     <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-35 pb-2'>
            <BlurCircle top='20px' right='-80px'/>
             <p className='text-gray-300 font-medium text-lg'>Favourites.</p>
        </div>

           {/* cards section*/}
        <div className='flex flex-wrap justify-center 2xl:justify-start gap-8 mt-8'>
            {dummyShowsData.map((movie)=>(
               <Moviescard key={movie.id} movie={movie}/>
            ))}
        </div>
      
      <div>
        <BlurCircle top='50rem' left='44px'/>
      </div>
           
    </div>
  )
}

export default Favourite
