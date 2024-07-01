import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Gallery from "./Gallery"
import Blogs from "./Blogs"
import Events from "./Events";
import Causes from "./Causes";

const RightContent = () => {
    return (
        <div className='w-[100%] h-[calc(100vh-22vh)]  md:h-[100%]  p-2'>

            <Routes>
                <Route path='gallery' element={<Gallery />} />
                <Route path='events' element={<Events/>} />
                <Route path='blogs' element={<Blogs/>} />
                <Route path='cause' element={<Causes />} />
                {/* <Route path='/admin/donors' /> */}
            </Routes>

        </div>
    )
}

export default RightContent
