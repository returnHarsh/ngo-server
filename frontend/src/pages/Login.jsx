import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button} from '@chakra-ui/react';
import { Context } from '../context/Context';
import axios from 'axios';
import {
    Input,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import useToast from '../hooks/useToast';

function Login() {

    

    const{showSuccess , showError} = useToast();
    const { setUser } = useContext(Context);

    const [loginDetails, setLoaginDetails] = useState({
        email: "",
        password: "",
    })

    const [passwordErrors, setPasswordErrors] = useState({
        number: false,
        character: false,
        specialCharacter: false,
    })
    const [validated, setValidated] = useState(false);

    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const isPasswordValidated = !passwordErrors.number && !passwordErrors.character && !passwordErrors.specialCharacter;
        if (loginDetails.email?.length > 0 && isPasswordValidated && loginDetails.password?.length > 0) {
            setValidated(true);
        }
        else {
            setValidated(false);
        }

        console.log("inside useEffect");


    }, [loginDetails.email, loginDetails.password])


    function validatePassword(password) {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);

        if (!hasLowerCase && !hasUpperCase) {
            setPasswordErrors(prevState => ({ ...prevState, character: true }));
        } else {
            setPasswordErrors(prevState => ({ ...prevState, character: false }));
        }

        if (!hasNumber) {
            setPasswordErrors(prevState => ({ ...prevState, number: true }));
        } else {
            setPasswordErrors(prevState => ({ ...prevState, number: false }));
        }

        if (!hasSpecialChar) {
            setPasswordErrors(prevState => ({ ...prevState, specialCharacter: true }));
        } else {
            setPasswordErrors(prevState => ({ ...prevState, specialCharacter: false }));
        }

    }


    const handlePasswordChange = (e) => {

        setLoaginDetails({ ...loginDetails, password: e.target.value })
        validatePassword(e.target.value);

    }


    const handleLogin = async () => {

        try {
            setLoginLoading(true);
            const res = await axios({
                url: "http://localhost:8080/api/admin/login",
                method: "post",
                data: { email: loginDetails.email, password: loginDetails.password },
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials : true,
            })

            const data = res.data;

            if (data.error) {
                showError(data.error);
                console.log(data.error);
                return;
            }

            showSuccess(data.success);

            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);


            navigate("/admin");

        } catch (error) {
            return
        } finally {
            setLoginLoading(false);
            return
        }


    }


    const [showPassword, setShowPassword] = useState(false);

    const handleShowToggle = () => setShowPassword(!showPassword);



    return (
        <>

            <div className=" borde bg-[#EFF8FF] w-[100vw] h-[100vh] flex justify-center items-center">

                <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">

                    {/* heading section */}
                    <div> <h1 className="lg:text-[29px] text-[20px] mb-2 font-bold text-gray-700">Welcome Back</h1> </div>

                    {/* form container */}
                    <div className="bg-white shadow-md  w-[90%] sm:w-[90%]  md:w-[60%]  flex rounded-[40px]  p-3 " >


                        {/* left part for image */}
                        <div className="hidden sm:flex  flex-[45%] rounded-[40px] overflow-hidden  justify-center items-center  ">
                            <img className="max-h-[450px]" src="/images/login.jpg" alt="signup-image" />
                        </div>

                        {/* right part for form */}
                        <div className=" min-w-[300px] rounded-[40px] relative flex-[55%] flex gap-5   flex-col  items-center  p-5 ounded-[40px]">

                            <h1 className=" text-[18px]  lg:text-2xl text-gray-700 ">Login</h1>

                            <div className="flex  w-full   flex-col p-3 gap-4">

                                <div className="relative flex w-full justify-center items-center">
                                    <input value={loginDetails.email} onChange={(e) => setLoaginDetails({ ...loginDetails, email: e.target.value })} className=" w-full  p-3  bg-gray-50 outline-none focus:bg-white  rounded-md border shadow-md   border-gray-300 " type="email" placeholder="enter email" />
                                </div>

                                <div className="relative flex flex-col w-full justify-center  items-center py-2">

                                    <div className='flex w-full justify-center items-center'>
                                        <input value={loginDetails.password} type={`${showPassword ? 'text' : 'password'}`} onChange={(e) => handlePasswordChange(e)} className="p-3 w-full  bg-gray-50 outline-none focus:bg-white  rounded-md border shadow-md   border-gray-300" placeholder="enter password" />

                                        <button onClick={handleShowToggle} className='absolute right-[10px]  px-2 py-1 rounded-md' > {showPassword ? <IoMdEyeOff className='lg:text-[25px] text-[20px]' /> : <FaEye className='lg:text-[25px] text-[20px]' />} </button>
                                    </div>

                                    <div className='w-full flex'>
                                    <p className='text-blue-400 ml-auto'>  <Link  to={"/forgot/password"} className='underline text-[15px] lg:text-[17px]'> forgot password </Link> </p>
                                    </div>





                                    <div className='flex flex-wrap gap-[10px] items-start justify-start mr-auto '>
                                        {passwordErrors.character && <> <span className='text-red-500 text-[12px]'> ! Include the character </span> </>}
                                        {passwordErrors.number && <> <span className='text-red-500 text-[12px]'> ! Include the number </span> </>}
                                        {passwordErrors.specialCharacter && <> <span className='text-red-500 text-[12px] '> ! Include the special character </span> </>}
                                    </div>

                                </div>


                            </div>

                            <Button mt={"15px"} _hover={{ bg: "yellow.500" }} cursor={` ${validated ? "pointer" : "not-allowed"} `} isLoading={loginLoading} onClick={handleLogin} bg={"#f5d04c"} p={"5px"} w={"40%"} borderRadius={"10px"} color={"white"} > Login   </Button>

                            <p className='text-blue-400'> first time here ? <Link to={"/signup"} className='underline'> signup </Link> </p>

                        </div>


                    </div>


                </div>


            </div>

        </>
    )
}

export default Login
