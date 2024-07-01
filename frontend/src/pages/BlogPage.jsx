import React from 'react'
import Footer from '../comonents/footer'
import Nav from '../comonents/Nav'
import Blog from "../comonents/Blogs";

const BlogPage = () => {
  return (
    <div>
        <Nav/>

        <section className="bg-success">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1 className="text-[80px]"> Blogs </h1>
              <p className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4">
              <img src="assets/img/about-hero.svg" alt="About Hero" />
            </div>
          </div>
        </div>
      </section>

      <div className='bg-white'>
      <Blog/>
      </div>


        <Footer/>
    </div>
  )
}

export default BlogPage
