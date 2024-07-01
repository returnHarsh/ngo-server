import React, { useContext, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Text
  } from '@chakra-ui/react'
  import { CiImageOn } from "react-icons/ci";
  import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Context } from '../../context/Context';
import useToast from "../../hooks/useToast";


const GalleryUpload = ({setGalleryImages , galleryImages , setTotalGalleryImages}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const[image , setImage] = useState(null);
    const[imageFile , setImageFile] = useState(null);
    const imageRef = useRef();
    const[imageUploadLoading , setImageUploadLoading] = useState(false);
    const{user} = useContext(Context);
    const token = user.token;
    const{showSuccess , showError} = useToast();

    const handleImageChange = (e)=>{
        e.preventDefault();

        const file = e.target.files[0];
        setImageFile(file);
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
        if (file && validImageTypes.includes(file.type)) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            setImage(reader.result);
          };
    
          reader.readAsDataURL(file);
        } else {
          setImage(null);
        }
    }

    const handleImageUpload = async(e) =>{
        try{
            setImageUploadLoading(true);
            e.preventDefault();
            if (!image) return;
    
            const formData = new FormData();
            formData.append('file', imageFile);


            const res = await axios({
                url : "http://localhost:8080/api/gallery/upload",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                method : "post",
                data : formData
            })

            const data = res.data;

            if(data.error){
              showError(data.error);
              return;
            }
            setGalleryImages([...galleryImages , data.galleryImage])
            setTotalGalleryImages((prev)=>{
              localStorage.setItem("galleryImagesCount" , prev+1);
              return  prev+1;
            });

            showSuccess(data.success);
            
            onClose();
            setImage("");

        }catch(err){
            console.log(err.message);
            showError(err.message);
        }finally{
            setImageUploadLoading(false);
        }
    }


  return (
    <>

    <div className='fixed bottom-[20px] right-[20px]'>
    <Button bg={"green.400"} color={"white"} _hover={{bg : "green.500"}} fontSize={{base : "small" , md : "medium"}} display={"flex"} justifyContent={"center"} justifyItems={"center"} gap={"10px"} onClick={onOpen}> <span className=' hidden  text-white md:inline'>Upload Image</span>  <span> <FaCloudUploadAlt className='text-[20px] text-white md:text-[30px]' /> </span> </Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader> Upload image into Gallery </ModalHeader>
    <ModalCloseButton />

    <ModalBody display={"flex"} flexDirection={"column"} gap={"10px"}>
        <input onChange={handleImageChange} ref={imageRef} type="file" hidden />
        <CiImageOn cursor={"pointer"} onClick={()=> imageRef.current.click()} size={"20px"} />
        <img className={` ${image ? "" : "hidden"} `} src={image} alt="preview" />
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button isLoading={imageUploadLoading} onClick={handleImageUpload} variant='ghost'> Upload </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </div>
     
    </>
  )
}

export default GalleryUpload
