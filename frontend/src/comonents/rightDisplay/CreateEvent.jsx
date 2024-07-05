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
import { IoIosCloseCircle } from "react-icons/io";
import { Context } from '../../context/Context';
import useToast from "../../hooks/useToast";


const CreateEvent = ({ setTotalEvents , setEvents }) => {

    const{showSuccess , showError} = useToast();
    const{user} = useContext(Context);
    const token = user.token;
    const { isOpen, onOpen, onClose } = useDisclosure();
  const[eventUpload , setEventUplaod] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const calendarRef = useRef();
    const imageRef = useRef();
    const[imageFile , setImageFile] = useState(null);
    const [eventDate, setEventDate] = useState({
        day: undefined,
        month: undefined,
        year: undefined
    })

    const [eventDetail , setEventDetail] = useState({
        title : "",
        desc : "",
        venue : "",
        day : Number,
      })
    
      const[startTime , setStartTime] = useState({
        timeValHour : undefined,
        timeValMinute : undefined,
      })
    
      const[endTime , setEndTime] = useState({
        timeValHour : undefined,
        timeValMinute : undefined,
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
    const venueRef = useRef();
    const startTimePeriodRef = useRef();
    const endTimePeriodRef = useRef();
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
            setEventUplaod(true);
            const formData = new FormData();
            formData.append("file" , imageFile);
            formData.append("title" , titleRef.current.value);
            formData.append("venue" , venueRef.current.value);
            formData.append("desc" , descRef.current.value);
            formData.append("day" , eventDate.day);
            formData.append("month" , eventDate.month);
            formData.append("year" , eventDate.year);
            formData.append("startTime" , JSON.stringify({...startTime , period : startTimePeriodRef.current.value})  );
            formData.append("endTime" , JSON.stringify({...endTime , period : endTimePeriodRef.current.value}) );

            const res = await axios({
                url : "http://localhost:8080/api/create/event",
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
            setTotalEvents(prev=>{
                localStorage.setItem("totalEvents" , prev+1);
                return prev+1;
            })

            showSuccess(data.success);

            setEvents(prev=>{
                return [...prev , data.event];
            })

            

            onClose();


        }catch(err){
            console.log(err.message);
            showError(err.message);
        }finally{
            setEventUplaod(false);
        }
    }


    return (
        <>

            <div className='fixed bottom-[10px] right-[10px]'>
                <Button fontSize={{base : "14px" , md : "18px"}} onClick={onOpen} position={"absolute"} _hover={{ bg: "green.300" }} right={"10px"} bottom={"20px"} bg={"green.400"} color={"white"} > Add Event <span className="flex justify-center items-center scale-[1.5] m-[10px] text-[14px] md:text-[18px]"> <IoMdAddCircle className='text-[14px] md:text-[18px] text-white ' /> </span> </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader> Upload image into Gallery </ModalHeader>
                        <ModalCloseButton  onClick={()=> onClose()} />

                        <ModalBody display={"flex"} flexDirection={"column"} gap={"10px"}>


                            <Flex alignItems={"center"} gap={"20px"}>
                                <Text color={"blue"} textDecor={"underline"}> Event title picture </Text>
                                <input ref={imageRef} onChange={handleImageChange} type="file" accept='image/*'  hidden />
                                <CiImageOn  onClick={()=> imageRef.current.click()}  cursor={"pointer"} size={"20px"} />
                            </Flex>

                            <Flex>
                            <Image src={previewImage} alt={previewImage} flex={"1"} />
                            </Flex>

                            <Flex flexDirection={"column"} gap={"10px"}>
                                    <Text> Event title </Text>
                                    <Input ref={titleRef} placeholder='enter event title' />
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


                            {/* event starting time */}
                            <Stack>
                                <Text> Starting time</Text>
                                <Flex gap={"20px"}>
                                    <Input value={startTime.timeValHour} onChange={(e)=> setStartTime({...startTime , timeValHour : e.target.value})} placeholder='hour' />
                                    <Input value={startTime.timeValMinute} onChange={(e)=> setStartTime({...startTime , timeValMinute : e.target.value})}  placeholder='minute' />
                                    <Select ref={startTimePeriodRef}>
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
                                    </Select>
                                </Flex>
                            </Stack>


                            {/* event ending time */}
                            <Stack>
                                <Text> Ending time</Text>
                                <Flex gap={"20px"}>
                                    <Input value={endTime.timeValHour} onChange={(e)=> setEndTime({...endTime , timeValHour : e.target.value})} placeholder='hour' />
                                    <Input value={endTime.timeValMinute} onChange={(e)=> setEndTime({...endTime , timeValMinute : e.target.value})} placeholder='minute' />
                                    <Select ref={endTimePeriodRef}>
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
                                    </Select>
                                </Flex>
                            </Stack>


                            {/* event venue */}
                            <Flex flexDirection={"column"} gap={"10px"}>
                                <Text> Venue </Text>
                                <Input ref={venueRef} placeholder='enter the Venue' />
                            </Flex>

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
                            <Button isLoading={eventUpload} onClick={handleCreateEvent} bg={"green.400"} color={"white"} _hover={{bg : "green.300"}} > Create </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>

        </>
    )
}

export default CreateEvent
