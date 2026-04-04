import React, { useState,useEffect} from 'react'
import {dummyTrailers} from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircleshade from './BlurCircleshade'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  // console.log("Current URL:",currentTrailer.videoUrl);
    
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>
      
      <div className='relative mt-6 w-full flex justify-center'>
        <BlurCircleshade top='-100px' right='-100px'/>
          <iframe className='w-full max-w-[960px] aspect-video rounded-xl shadow-2xl'
  
  src={`https://www.youtube.com/embed/${currentTrailer.videoUrl.split('v=')[1]}`} 
  title="YouTube video player" 
  allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen
 
></iframe>
         </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-[960px] mx-auto'>
            {dummyTrailers.map((trailer,index)=>(
              <div key={index} className='relative cursor-pointer hover:scale-105 transition-transform duration-300' onClick={()=>setCurrentTrailer(trailer)}>
                <img src={trailer.image} alt="trailer" className='rounded-lg w-full aspect-video object-cover border-2 border-transparent hover:border-red-600'/>
                <PlayCircleIcon className= 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80' size={32}/>
              </div>
            ))}

          </div>
    </div>
  )
}

export default TrailersSection


// import React,{useState} from 'react'
// import {dummyTrailers} from'../assets/assets'
// import ReactPlayer from 'react-player'
// import BlurCircleshade from './BlurCircleshade'

// const TrailersSection = () => {
 
//   const [currentTrailer,setCurrentTrailer]= useState(dummyTrailers[0])
// return (
//     <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
//       <p className= 'text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>
//       <div className='relative mt-6'>
//         <BlurCircleshade top='-100px' right='-100px'/>
//         <ReactPlayer url={currentTrailer.videoUrl} controls={false} className="mx-auto max-w-full" width="960px" height="540px"/>
//       </div>
//     </div>
//   )
// }
// export default TrailersSection