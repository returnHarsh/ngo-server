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
    Text,
    Flex,
    Select,
    Stack,
    Textarea,
    InputGroup,
    InputRightElement,
    Image
} from '@chakra-ui/react'
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { CiCalendarDate } from "react-icons/ci";
import { monthConverter } from "./dateConverter";
import { IoMdAddCircle } from "react-icons/io";
import { Context } from '../../context/Context';
import useToast from "../../hooks/useToast";




const CreateCause = ({causes , setCauses , setTotalCauses}) => {


    const{showSuccess , showError} = useToast();
    const{user} = useContext(Context);
    const token = user.token;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[causeUpload , setCauseUpload] = useState(false);
    const[previewImage , setPreviewImage] = useState(null);
    const[imageFile , setImageFile] = useState(null);

    const handleImageChange = (e)=>{
        e.preventDefault();

        const file = e.target.files[0];
        setImageFile(file);
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (file && validImageTypes.includes(file.type)) {
          const reader = new FileReader();

          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };

          reader.readAsDataURL(file);
        } else {
          setPreviewImage(null);
        }
    }

    const titleRef = useRef();
    const descRef = useRef();
  const imageRef = useRef();

  const handleCreateCause = async()=>{
    try{
        setCauseUpload(true);
        const formData = new FormData();
        formData.append("title" , titleRef.current.value);
        formData.append("desc" , descRef.current.value);
        formData.append("file" , imageFile);
        

        const res = await axios({
            url : "http://localhost:8080/api/create/cause",
            method : "post",
            data : formData,
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = res.data;
        if(data.error){
            showError(data.error);
            console.log(data.error);
            return;
        }

        showSuccess(data.success);

        setTotalCauses(prev=>{
            localStorage.setItem("totalCauses" , prev+1);
            return prev+1;
        })

        setCauses(prev=>{
            return [...prev , data.cause];
        })



        setPreviewImage(null);
        onClose();

    }catch(err){
        console.log(err.message);
        showError(err.message);
    }finally{
        setCauseUpload(false);
    }

  }




  return (
    <div className='fixed bottom-[10px] right-[10px]'>
    <Button onClick={onOpen}  fontSize={{base : "12px" , md : "15px"}} padding={{base : "4px" , md : "10px"}} position={"absolute"} _hover={{ bg: "green.300" }} right={"10px"} bottom={"20px"} bg={"green.400"} color={"white"} px={"15px"} > Create Cause <span className="flex text-white justify-center items-center scale-[1.5] m-[10px]" > <IoMdAddCircle className='text-[14px] text-white md:text-[18px]' />   </span> </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader> Create Blog </ModalHeader>
            <ModalCloseButton />

            <ModalBody display={"flex"} flexDirection={"column"} gap={"10px"}>


                <Flex alignItems={"center"} gap={"20px"}>
                    <Text color={"blue"} textDecor={"underline"}> Event title picture </Text>
                    <input ref={imageRef} onChange={handleImageChange} type="file" hidden />
                    <CiImageOn  onClick={()=> imageRef.current.click()}  cursor={"pointer"} size={"20px"} />
                </Flex>

                <Flex>
                <Image src={previewImage} alt={previewImage} />
                </Flex>

                <Flex flexDirection={"column"} gap={"10px"}>
                    <Text> Title </Text>
                    <Input placeholder='enter title' ref={titleRef} /> 
                </Flex>



                {/* event date */}

                {/* event desc */}
                <Flex flexDirection={"column"} gap={"10px"}>
                    <Text> Description about the event </Text>
                    <Textarea ref={descRef} placeholder='type your desc here' />
                </Flex>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button onClick={handleCreateCause} isLoading={causeUpload}  bg={"green.400"} color={"white"} _hover={{bg : "green.300"}} > Create </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
</div>
  )
}

export default CreateCause
