import React from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const PaginationFooter = ({ page , setPage , data}) => {

  const incrementPage = ()=>{
    setPage(prev=>{
      if(prev == Math.ceil(data?.length/6) ) return prev;
      else return prev+1;
    })

  }

  const decrementPage = ()=>{
    setPage(prev=>{
      if(prev == 1) return prev;
      else return prev-1;
    })
    
  }

  return (
    <div className='bg-white'>
        <div className='w-[100%] border border-black flex justify-center items-center gap-2 h-[80px] '>
      <span onClick={decrementPage} className='rounded-md cursor-pointer p-2 bg-gray-800 text-white'> <FaAngleLeft/> </span>

      <div className='flex  gap-[15px] h-[40px] justify-center items-center'>
        { [...Array(Math.ceil(data.length/6)) ].map((p,i) => <> <span onClick={()=>setPage(i+1)} key={i}  className={` ${page == i+1 ? "bg-gray-400 text-white" : ""} rounded-full transition-all h-[30px] w-[30px] flex justify-center items-center duration-500 p-[10px] cursor-pointer hover:bg-gray-700 hover:text-white `} > {i+1} </span> </>) }
      </div>

      <span  onClick={incrementPage}  className='rounded-md cursor-pointer p-2 bg-gray-800 text-white '> <FaChevronRight/> </span>
    </div>
    </div>
  )
}

export default PaginationFooter
