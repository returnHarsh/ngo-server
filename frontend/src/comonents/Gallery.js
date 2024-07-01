import React, { useState } from 'react'
import UseStateHook from '../hooks/UseStateHook'

const Gallery = () => {

    const{data , dataLoading} = UseStateHook("http://localhost:8080/api/gallery");

  return (
    <div>
     {!dataLoading &&   <section className="ftco-gallery">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
    
    {data.galleryImages.map( (data , index)=>{
        return   <a
        key={index}
        href={`${data.img}`}
        className="gallery image-popup d-flex justify-content-center align-items-center img "
        style={{ backgroundImage: `url(${data.img})` , backgroundSize : "cover" , width : "100%" }}
      >
        <div className="icon d-flex justify-content-center align-items-center">
          <span className="icon-search" />
        </div>
      </a>
    } )}
      
    </div>
  </section>}
    </div>
  )
}

export default Gallery
