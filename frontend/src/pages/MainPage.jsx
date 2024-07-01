import React from 'react';
import Navbar from "../comonents/Navbar";
import Sidebar from "../comonents/Sidebar";
import {Routes , Route} from "react-router-dom";
import RightContent from "../comonents/rightDisplay/RightContent";

const MainPage = () => {
  return (
    <div className='w-[100vw]  h-[100vh] bg-gray-100 box-border p-0 m-0'>
      <Navbar />
      <div className='  flex flex-col md:flex-row w-[100vw] h-[calc(100vh-15vh)] lg:h-[calc(100vh-25vh)]  md:h-[calc(100vh-20vh)]'>
        <Sidebar />
        <RightContent />
      </div>

    </div>
  )
}

export default MainPage
