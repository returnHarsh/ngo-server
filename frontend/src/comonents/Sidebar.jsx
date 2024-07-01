import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiGalleryFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { BiDonateBlood } from "react-icons/bi";
import './Sidebar.css'
import axios from 'axios';
import { Context } from '../context/Context';
import { CiLogout } from "react-icons/ci";
import useToast from "../hooks/useToast";

const Sidebar = () => {


    const{showSuccess , showError} = useToast();

    const{setUser} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const [pathname, setPathname] = useState({
        gallery: "/admin/gallery",
        blogs: "/admin/blogs",
        events: "/admin/events",
        cause: "/admin/cause"
    })

    useEffect(()=>{

        if(location.pathname == "/admin" || location.pathname == "/admin/"){
            navigate("gallery");
        }
        console.log("inside the use effect");
    },[pathname])

    

    const setActiveLink = (path) => {
        if (pathname[path] == location.pathname)
            return "text-white bg-green-500 shadow-xl";
        else return ""
    }

    const logoutHandler = async()=>{
        try{
            const res = await axios({
                url : "http://localhost:8080/api/admin/logout/",
                method : "post",
            })

            const data = res.data;
            if(data.error){
                showError(data.error);
                return;
            }

            showSuccess(data.success);

            localStorage.setItem("user" , null);
            setUser(null);
            
            
        }catch(err){
            console.log(err.message);
        }
    }



    return (
        <div className=' box-border bg-white shadow-md w-[100%] md:w-[20vw] flex justify-start items-start h-[7vh] md:h-[100%]'>

            <div className='w-[100%]  p-[10px] flex md:flex-col justify-center md:gap-4 gap-[10px] box-border'>

                <Link to={"gallery"} className='flex-1' >
                    <div className={`transition-all  w-[100%] duration-200 cursor-pointer active:scale-[0.95] flex justify-start items-center   rounded-md h-[35px] md:h-[60px] `} >

                        {setActiveLink("gallery") ? <>

                            <button className={` ${setActiveLink("gallery")}     px-[10px] md:p-0  w-full h-[35px] md:h-[45px] lg:h-[50px] rounded-md  text-[10px] md:text-[15px] lg:text-[18px] font-[500] flex justify-center items-center gap-[10%] relative  `}>

                                <span className='absolute  text-white  hidden md:flex left-[15%]  md:left-0 lg:left-[15%] md:relative lg:absolute '> <RiGalleryFill size={"20px"} /> 
                                </span>

                                <span className=' md:hidden  text-white   lg:flex  text-[12px] md:text-[15px]  lg:text-[18px]'>Gallery</span>
                                
                            </button>

                        </> :
                            <button class="border-[1px]  border-green-400  md:p-0 px-[10px] text-[10px] md:text-[15px] lg:text-[18px] w-full m-0 rounded-md hover:text-white   relative flex h-[35px] md:h-[45px] lg:h-[50px] text-green-500    items-center justify-center overflow-hidden bg-white    transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-500 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56 ">
                                <span className=' hover:text-white absolute left-[15%] lg:left-[15%] md:left-0 md:relative hidden md:flex '>
                                    <RiGalleryFill size={"20px"} />
                                </span>
                                <span class="hover:text-white md:hidden lg:flex relative z-10 font-[500] text-[10px] md:text-[15px] lg:text-[18px] flex w-[100%] justify-center items-center gap-[10%] ">   Gallery </span>
                            </button>
                        }



                    </div>
                </Link>

                <Link to={"events"} className='flex-1'>
                    <div className={`   transition-all duration-200 cursor-pointer active:scale-[0.95] flex justify-start items-center  rounded-md h-[35px] md:h-[60px] `}>

                        {setActiveLink("events") ? <>

                            <button className={` ${setActiveLink("events")}   px-[10px] md:p-0  w-full h-[35px] md:h-[45px] lg:h-[50px] rounded-md  text-[10px] md:text-[15px] lg:text-[18px] font-[500] flex justify-center items-center gap-[10%] relative  `}> <span className=' hidden md:flex absolute left-[15%]  md:left-0 lg:left-[15%] md:relative lg:absolute text-white'> <FaCalendarCheck size={"20px"} /> </span>    <span className='md:hidden lg:flex text-[12px] md:text-[15px] lg:text-[18px] text-white '>Events</span> </button>

                        </> :
                            <button class="border-[1px] border-green-500 md:p-0 px-[10px] text-[10px] md:text-[15px] lg:text-[18px] w-[100%]  rounded-md hover:text-white  relative flex h-[35px] md:h-[45px] lg:h-[50px] text-green-500   items-center justify-center overflow-hidden bg-white   transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-500 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56">

                                <span className='hover:text-white hidden md:flex absolute left-[15%] md:left-0 lg:left-[15%] md:relative '>
                                    <FaCalendarCheck className='hover:text-white' size={"20px"} />
                                </span>

                                <span class="hover:text-white md:hidden lg:flex relative z-10 font-[500] text-[10px] md:text-[15px] lg:text-[18px] flex w-[100%] justify-center items-center gap-[10%] ">    Events </span>
                            </button>
                        }

                    </div>
                </Link>

                <Link to={"blogs"} className='flex-1'>
                    <div className={` transition-all duration-200 cursor-pointer active:scale-[0.95] flex justify-start items-center  rounded-md h-[35px] md:h-[60px] `}>

                        {setActiveLink("blogs") ? <>

                            <button className={` ${setActiveLink("blogs")} px-[10px] md:p-0  w-full h-[35px] md:h-[45px] lg:h-[50px] rounded-md  text-[10px] md:text-[15px] lg:text-[18px] font-[500] flex justify-center items-center gap-[10%] relative text-white `}> <span className='text-white hidden md:flex absolute left-[15%]  md:left-0 lg:left-[15%] md:relative lg:absolute '> <TfiWrite size={"20px"} /> </span>    <span className='md:hidden lg:flex text-[12px] md:text-[15px] lg:text-[18px] text-white '>Blogs</span> </button>

                        </> : <>
                            <button class=" border-[1px] border-green-500 md:p-0 px-[10px] text-[10px] md:text-[15px] lg:text-[18px] w-[100%] m-0 rounded-md hover:text-white  relative flex h-[35px] md:h-[45px] lg:h-[50px] text-green-500   items-center justify-center overflow-hidden bg-white    transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-500 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56">

                                <span className=' hover:text-white hidden md:flex absolute left-[15%] lg:left-[15%] md:left-0 md:relative '>
                                    <TfiWrite className='hover:text-white' size={"20px"} />
                                </span>

                                <span class=" hover:text-white md:hidden lg:flex relative z-10 font-[500] text-[10px] md:text-[15px] lg:text-[18px] flex w-[100%] justify-center items-center gap-[20px] ">   Blogs </span>
                            </button>
                        </>}

                    </div>
                </Link>

                <Link to={"cause"} className='flex-1'>
                    <div className={` transition-all duration-200 cursor-pointer active:scale-[0.95] flex justify-start items-center rounded-md h-[35px] md:h-[60px] `}>

                        {setActiveLink("cause") ? <>

                            <button className={` ${setActiveLink("cause")} px-[10px] md:p-0  w-full h-[35px] md:h-[45px] lg:h-[50px] rounded-md  text-[10px] md:text-[15px] lg:text-[18px] font-[500] flex justify-center items-center gap-[10%] relative text-white  `}> <span className=' text-white hidden md:flex absolute left-[15%]  md:left-0 lg:left-[15%] md:relative lg:absolute '> <BiDonateBlood size={"20px"} /> </span>    <span className=' text-white md:hidden lg:flex text-[12px] md:text-[15px] lg:text-[18px] '> Cause </span> </button>

                        </> : <>
                            <button class="border-[1px] border-green-500 md:p-0 px-[10px] text-[10px] md:text-[15px] lg:text-[18px] w-[100%] m-0 rounded-md hover:text-white  relative flex h-[35px] md:h-[45px] lg:h-[50px] text-green-500   items-center justify-center overflow-hidden bg-white   transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-500 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56">

                                <span className=' hover:text-white hidden md:flex absolute left-[15%] lg:left-[15%] md:left-0 md:relative '>
                                    <BiDonateBlood size={"20px"} />
                                </span>

                                <span class=" hover:text-white relative md:hidden lg:flex z-10 font-[500] text-[10px] md:text-[15px] lg:text-[18px] flex w-[100%] justify-center items-center gap-[20px] ">   Cause </span>

                            </button>
                        </>}

                    </div>
                </Link>

                <Link to={"cause"} className='flex-1'>
                    <div onClick={logoutHandler} className={` transition-all duration-200 cursor-pointer active:scale-[0.95] flex justify-start items-center rounded-md h-[35px] md:h-[60px] `}>

                      
                            <button class="border-[1px] border-green-500 md:p-0 px-[10px] text-[10px] md:text-[15px] lg:text-[18px] w-[100%] m-0 rounded-md hover:text-white  relative flex h-[35px] md:h-[45px] lg:h-[50px] text-green-500   items-center justify-center overflow-hidden bg-white   transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-500 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56">

                                <span className=' hover:text-white hidden md:flex absolute left-[15%] lg:left-[15%] md:left-0 md:relative '>
                                    <CiLogout  size={"20px"} />
                                </span>

                                <span class=" hover:text-white relative md:hidden lg:flex z-10 font-[500] text-[10px] md:text-[15px] lg:text-[18px] flex w-[100%] justify-center items-center gap-[20px] ">   Logout </span>

                            </button>

                    </div>
                </Link>

            </div>

        </div>



    )
}

export default Sidebar
