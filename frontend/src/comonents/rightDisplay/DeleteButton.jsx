import React from 'react'
import { MdCancel, MdDelete } from "react-icons/md";

const DeleteButton = ({setDeleteActivate , deleteActivate}) => {
  return (
       <button  onClick={()=> setDeleteActivate( prev=> !prev )} class=" active:scale-[0.85] ml-auto text-[10px] md:text-[15px]  lg:text-[18px] w-[25%] md:w-[15%] m-0 rounded-md hover:text-white  relative flex h-[35px] lg:h-[50px] text-red-500   items-center justify-center overflow-hidden bg-white  border-[1px] border-red-400  transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-56">
        <span class=" text-black hover:text-white relative z-10 font-[500] text-[10px] md:text-[15px] flex gap-2 justify-center items-center"> Delete <span> <MdDelete size={"20px"}/> </span> </span>
      </button>
  )
}

export default DeleteButton
