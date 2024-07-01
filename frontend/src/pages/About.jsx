import React from 'react'
import BgImage from "../../public/images/bg_5.jpg";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>


            <div
                style={{ backgroundImage: `url(${BgImage})` }}
                className=" relative h-[100vh] w-[100vw] bg-no-repeat bg-cover flex justify-center items-center"
            >

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'black', // Hexadecimal color for a specific shade of green
                        opacity: 0.3 // Adjust opacity as needed
                    }}
                ></div>

                <div className='relative z-10 flex flex-col justify-center items-center gap-[10px]'>
                    <p className=' flex text-white justify-center items-center gap-[15px]'> <span className=' cursor-pointer border-b-[2px] border-b-yellow-300 '> Home </span>  <span className='border-b-[2px] border-b-yellow-700'> About </span>  </p>
                    <h1 className='text-white lg:text-[50px] font-[400]'>About</h1>
                </div>

            </div>

        </div>
    )
}

export default About
