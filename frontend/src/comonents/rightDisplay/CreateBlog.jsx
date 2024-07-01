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
import {Context} from "../../context/Context";
import useToast from "../../hooks/useToast";

const CreateBlog = ({blogs , setBlogs , setTotalBlogs}) => {

    const{showSuccess , showError} = useToast();
    const{user} = useContext(Context)
    const token = user.token;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const[blogUpload , setBlogUpload] = useState(false);
  
      const [selectedDate, setSelectedDate] = useState(new Date());
      const calendarRef = useRef();
      const imageRef = useRef();
      const[imageFile , setImageFile] = useState(null);
      const [eventDate, setEventDate] = useState({
          day: 0,
          month: 0,
          year: 0
      })
  
      const [eventDetail , setEventDetail] = useState({
          desc : "",
          day : Number,
        })
      
  
      const handleDateChange = (date) => {
          setEventDate({
              day: date.getDate(),
              month: date.getMonth() + 1,
              year: date.getFullYear(),
          })
          setSelectedDate(date);
      }
  
      const[previewImage , setPreviewImage] = useState(null);
      const descRef = useRef();
      const titleRef = useRef();
  
  
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
  
      const handleCreateEvent = async()=>{
          try{
              setBlogUpload(true);
              const formData = new FormData();
              formData.append("title" , titleRef.current.value);
              formData.append("file" , imageFile);
              formData.append("desc" , descRef.current.value);
              formData.append("day" , eventDate.day);
              formData.append("month" , eventDate.month);
              formData.append("year" , eventDate.year);
  
              const res = await axios({
                  url : "http://localhost:8080/api/blog/upload",
                  method : "post",
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                  data : formData,
              })
  
              const data = res.data;
              if(data.error){
                  console.log(data.error);
                  showError(data.error);
                  return;
              }

              showSuccess(data.success);

              setBlogs(prev=>{
                return [...prev , data.blog]
              });

              setTotalBlogs(prev=>{
                localStorage.setItem("totalBlogs" , prev+1);
                return prev+1;
              })

              

              console.log(data);
              onClose();

  
  
          }catch(err){
              console.log(err.message);
              showError(err.message);
          }finally{
              setBlogUpload(false);
          }
      }

  return (
    <div className='fixed bottom-[10px] right-[10px]'>
    <Button onClick={onOpen}  fontSize={{base : "12px" , md : "15px"}} padding={{base : "4px" , md : "10px"}} position={"absolute"} _hover={{ bg: "green.300" }} right={"10px"} bottom={"20px"} bg={"green.400"} color={"white"} px={"15px"} > Add Blog<span className="flex justify-center items-center scale-[1.5] m-[10px]" > <IoMdAddCircle className='text-[14px] md:text-[18px] text-white' />   </span> </Button>
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
                <Stack>

                    <Flex gap={"20px"}>
                        <Text> Event Date </Text>
                        {/* library for date picker */}
                        <DatePicker onChange={handleDateChange} ref={calendarRef} selected={selectedDate} className='bg-gray-100  hidden' />
                        <CiCalendarDate onClick={() => calendarRef.current.setOpen(true)} cursor={"pointer"} size={"25px"} />
                    </Flex>

                    <Flex gap={"10px"}>
                        <Input flex={0.5} value={eventDate.day} onChange={(e) => setEventDate({ ...eventDate, day: e.target.value })} placeholder='enter day' />

                        <InputGroup flex={1}>
                            <Input value={eventDate.month} onChange={(e) => setEventDate({ ...eventDate, month: e.target.value })} placeholder='enter month' />
                            <InputRightElement  pointerEvents="none">
                                <Button bg={"transparent"}> {monthConverter(eventDate.month)} </Button>
                            </InputRightElement>
                        </InputGroup>



                        <Input flex={0.5} value={eventDate.year} onChange={(e) => setEventDate({ ...eventDate, year: e.target.value })} placeholder='enter year' />
                    </Flex>
                </Stack>

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
                <Button isLoading={blogUpload} onClick={handleCreateEvent} bg={"green.400"} color={"white"} _hover={{bg : "green.300"}} > Create </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
</div>
  )
}

export default CreateBlog
