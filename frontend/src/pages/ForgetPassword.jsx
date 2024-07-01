import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, Input} from '@chakra-ui/react';
import { Context } from '../context/Context';
import axios from "axios";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import useToast from "../hooks/useToast";

const ForgetPassword = () => {

    const{showSuccess , showError} = useToast();
    const[email , setEmail] = useState("");
    const passRef = useRef();
    const confirmPassRef = useRef();
    const navigate = useNavigate();

    const handlePasswordChange = async()=>{
        try{

            if(passRef.current.value !== confirmPassRef.current.value){
                console.log("password didn't match")
                return;
            }

            const res = await axios({
                url : "http://localhost:8080/api/admin/forgot/password",
                method : "post",
                data : {email , password : passRef.current.value}
            })

            const data = res.data;

            if(data.error){
                showError(data.error);
                console.log(data.error);
                return;
            }

            showSuccess(data.success);

            console.log(data);
            navigate("/login");

            
        }catch(err){
            console.log(err.message);
        }
    }

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleShowToggle1 = () => setShowPassword1(!showPassword1);
    const handleShowToggle2 = () => setShowPassword2(!showPassword2);
   
  return (
    <div className=" borde bg-[#EFF8FF] w-[100vw] h-[100vh] flex justify-center items-center">

    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">

{/* heading section */}
    <div> <h1 className="text-[29px] mb-2 font-bold text-gray-700"> Forgot your password? </h1> </div>

    {/* form container */}
    <div className="bg-white shadow-md  w-[90%] sm:w-[90%]  md:w-[60%]  flex rounded-[40px]  p-3" >


        {/* left part for image */}
        <div className="  flex-[45%] rounded-[40px] overflow-hidden flex justify-center items-center  ">
            <img className="max-h-[450px]" src="/images/login.jpg" alt="signup-image" />
        </div>

        {/* right part for form */}
        <div className="  rounded-[40px] relative flex-[55%] flex gap-5   flex-col  items-center  p-5 ounded-[40px]">

            <h1 className=" text-2xl text-gray-700 "> Change Password </h1>

            <div className="flex  w-full  flex-col p-3 gap-4">
                <div className=" min-w-[250px] flex flex-col gap-2 justify-center items-center ">

                    <Flex flexDirection={"column"} gap={"15px"} w={"80%"} justifyContent={"center"} alignItems={"center"} >


                    <Input width={"100%"} value={email} onChange={(e)=> setEmail(e.target.value)}   type="text"  placeholder='enter admin email' padding={"22px"}/>

                        <div className=' w-full flex justify-center items-center relative'  >
                        <Input ref={passRef} type={showPassword1 ? 'text' : 'password'}  placeholder='enter new password' padding={"22px"}  className='w-full'/>
                    <button onClick={handleShowToggle1}  className='absolute right-[10px]  px-2 py-1 rounded-md' > {showPassword1 ? <IoMdEyeOff size={"25px"} /> : <FaEye size={"25px"} /> } </button>
                        </div>

                    
                    <div className='w-full flex justify-center items-center relative  '>
                    <Input ref={confirmPassRef} type={showPassword2 ? 'text' : 'password'}  placeholder='confirm new password' padding={"22px"} className='w-full' />
                    <button onClick={handleShowToggle2}  className='absolute right-[10px]  px-2 py-1 rounded-md' > {showPassword2 ? <IoMdEyeOff size={"25px"} /> : <FaEye size={"25px"} /> } </button>
                    </div>
                    </Flex>
                    
                </div>


              
            </div>

            <Button  onClick={handlePasswordChange} _hover={{bg:"yellow.500"}}   bg={"#f5d04c"} p={"5px"} w={"40%"} borderRadius={"10px"} color={"white"} > Change    </Button>
            <p className='text-blue-400'> back to login <Link to={"/login"} className='underline'> login </Link> </p>


        </div>


    </div>


    </div>


</div>
  )
}

export default ForgetPassword
