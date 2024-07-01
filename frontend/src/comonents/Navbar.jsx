import React, { useContext } from 'react'

import { Context } from '../context/Context'
import { Button } from '@chakra-ui/react'

const Navbar = () => {

    const{totalGalleryImages  , totalEvents , totalBlogs} = useContext(Context);
    console.log(totalBlogs);

  return (
    <div className=' transition-all duration-500 box-border ml-auto  rounded-sm shadow-xl w-[100%] p-2 flex justify-center items-center gap-[8px] lg:gap-[20px] bg-green-600 h-[15vh] md:h-[20vh] lg:h-[25vh]'>


        <div className='transition-all duration-500 flex-1  lg:h-[100px] flex md:justify-between  justify-center items-center rounded-md shadow-md bg-white py-[8px] px-[8px]  lg:p-[20px] cursor-pointer'>
            <h1 className='  transition-all duration-500 font-[400] xl:text-[20px] lg:text-[17px] md:text-[15px] text-[7px] sm:text-[10px] flex justify-center items-center gap-2 flex-wrap flex-col sm:flex-row' >  Total  Photo  <span className='lg:text-[25px] text-white bg-orange-500 flex justify-center items-center rounded-full p-[10px] text-[12px] h-[15px] w-[15px] lg:h-[35px] lg:w-[35px] font-[600]'> {totalGalleryImages} </span> </h1>
            <img className='hidden sm:inline transition-all duration-500 xl:w-[50px] lg:w-[40px] w-[20px] md:w-[30px]' src="/images/gallery.png" alt="gallery" />
        </div>

        <div className='  transition-all duration-500 flex-1  lg:h-[100px] flex md:justify-between  justify-center items-center rounded-md shadow-md bg-white py-[8px] px-[5px]  lg:p-[20px] cursor-pointer'>
            <h1 className=' transition-all duration-500 font-[400]   xl:text-[20px] lg:text-[17px] md:text-[15px] text-[7px] sm:text-[10px] flex justify-center items-center gap-2 flex-wrap  flex-col sm:flex-row' >Total Events  <span className='lg:text-[25px] text-white bg-blue-500 flex justify-center items-center rounded-full text-[12px]  h-[15px] w-[15px] lg:h-[35px] lg:w-[35px] font-[600]'> {totalEvents} </span>  </h1>
            <img className='hidden sm:inline  transition-all duration-500 xl:w-[50px] lg:w-[40px] w-[20px] md:w-[30px]'  src="/images/events.png" alt="events" />
        </div>

        <div className=' transition-all duration-500 flex-1 lg:h-[100px] flex md:justify-between  justify-center items-center rounded-md shadow-md bg-white py-[8px] px-[5px]  lg:p-[20px] cursor-pointer'>
            <h1 className=' transition-all duration-500 font-[400]  xl:text-[20px] lg:text-[17px] md:text-[15px] text-[7px] sm:text-[10px] flex justify-center items-center gap-2  flex-col sm:flex-row flex-wrap ' > Total Blogs <span className='lg:text-[25px] text-white bg-blue-500 flex justify-center items-center rounded-full text-[12px]  h-[15px] w-[15px] lg:h-[35px] lg:w-[35px] font-[600]'> {totalBlogs} </span>  </h1>
            <img className=' hidden sm:inline transition-all duration-500 xl:w-[50px] lg:w-[40px] w-[20px] md:w-[30px]'  src="/images/blog.png" alt="blogs" />
        </div>

        <div className=' transition-all duration-500 flex-1 lg:h-[100px] flex md:justify-between  justify-center items-center rounded-md shadow-md bg-white py-[8px] px-[5px]  lg:p-[20px] cursor-pointer'>
            <h1 className=' transition-all duration-500 font-[400]   xl:text-[20px] lg:text-[17px] md:text-[15px] text-[7px] sm:text-[10px]  flex-wrap flex-col sm:flex-row ' >Total Donors </h1>
            <img className='hidden sm:inline  transition-all duration-500 xl:w-[50px] lg:w-[40px] w-[20px] md:w-[30px]'  src="/images/donors.png" alt="donors" />
        </div>

    </div>
  )
}

export default Navbar
