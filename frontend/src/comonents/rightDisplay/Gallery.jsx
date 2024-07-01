import React, { useContext, useState } from 'react'
import GalleryUpload from './GalleryUpload'
import axios from 'axios';
import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { Context } from '../../context/Context';
import DeleteButton from "./DeleteButton";
import { MdCancel, MdDelete } from "react-icons/md";
import useToast from "../../hooks/useToast";

const Gallery = () => {

  const{showSuccess , showError} = useToast();

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImagesLoading, setGalleryImagesLoading] = useState(false);
  const [deleteActivate, setDeleteActivate] = useState(false);
  const { setTotalGalleryImages , user } = useContext(Context);

  const token = user.token;

  useState(() => {

    (async () => {
      try {
        setGalleryImagesLoading(true);
        const res = await axios({
          method: "get",
          url: "http://localhost:8080/api/gallery",
        })

        const data = res.data;
        setGalleryImages(data.galleryImages);
        setTotalGalleryImages(data.galleryImages.length);
        localStorage.setItem("galleryImagesCount", data.galleryImages.length);

      } catch (err) {
        console.log(err.message);
      } finally {
        setGalleryImagesLoading(false);
      }

    })()

  }, [])

  const handleGalleryImageDelete = async (image) => {
    try {
      const res = await axios({
        url: `http://localhost:8080/api/gallery/delete/${image._id}`,
        method: "delete",
        headers : {
          'Authorization': `Bearer ${token}`
        }
      })

      setGalleryImages(prev => {
        return prev.filter(img => img._id !== image._id)
      })

      const data = res.data;

      if(data.error){
        showError(data.error);
        return;
      }

      setTotalGalleryImages(prev => {
        localStorage.setItem("galleryImagesCount", prev - 1);
        return prev - 1
      });

      showSuccess(data.success);

    } catch (err) {
      console.log(err.message);
      showError(err.message);
    }
  }


  if (galleryImagesLoading) {
    return <Flex h={"50px"} justifyContent={"center"} alignItems={"center"} >
      <Spinner size={"xl"} />
    </Flex>
  }

  return (
    <div className=' scroller w-[100%] p-2 relative h-[100%] overflow-scroll'>

      {/* <Button _hover={{bg : "red.300"}} marginLeft={"auto"} bg={"red"} color={"white"} display={"flex"} gap={"10px"}  h={{base : "35px" , md : "40px"}} fontSize={{base : "12px" , md : "15px"}} onClick={()=> setDeleteActivate(!deleteActivate)} >  <Text display={{base : "none" , md : "inline"}}> Delete </Text>  <MdDelete/>  </Button> */}
      <div className='flex justify-center items-center  w-[100%]'>
        <DeleteButton setDeleteActivate={setDeleteActivate} deleteActivate={deleteActivate} />
      </div>

      <Flex flexWrap={"wrap"} gap={"20px"} justifyContent={"center"} alignItems={"center"} >
        {galleryImages.map((gallery, index) => {
          return <div key={index} className=' shadow-lg transition-all duration-500  flex-wrap lg:max-w-[350px] max-w-[300px] rounded-md mt-[20px] ' >

            <MdCancel onClick={() => handleGalleryImageDelete(gallery)} cursor={"pointer"} className={` ${deleteActivate ? "block" : "hidden"} ml-auto`} size={"25px"} />

            <div className='h-[100%] w-[100%]'>
              <img className='rounded-md' src={gallery.img} alt={gallery.img} />
            </div>

          </div>
        })}
      </Flex>



      <GalleryUpload setTotalGalleryImages={setTotalGalleryImages} setGalleryImages={setGalleryImages} galleryImages={galleryImages} />

    </div>
  )
}

export default Gallery
