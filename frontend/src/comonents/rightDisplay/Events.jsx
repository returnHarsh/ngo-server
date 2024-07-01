import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Button, Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import CreateEvent from './CreateEvent';
import { Box, Collapse, Text } from "@chakra-ui/react";
import { Context } from '../../context/Context';
import DeleteButton from './DeleteButton';
import { MdCancel, MdDelete } from "react-icons/md";
import useToast from "../../hooks/useToast";

const Events = () => {

  const{showSuccess , showError} = useToast();
  const{user} = useContext(Context);
  const token = user.token;
  const { setTotalEvents } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [collapseState, setCollapseState] = useState([]);
  const [deleteActivate, setDeleteActive] = useState(false);

  const handleToggle = (index) => {

    setCollapseState((prev) => {
      let newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    })
  }

  const handleDelete = async(e , event)=>{
    try{

      e.preventDefault();

      const res = await axios({
        url : `http://localhost:8080/api/event/${event._id}`,
        method : "delete",
        headers : {
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
        localStorage.setItem("totalEvents" , prev-1);
        return prev-1;
      });
      
      setEvents(prev=>{
        return prev.filter(item=> item._id != event._id);
      })

      showSuccess(data.success);

    }catch(err){
      showError(err.message);
      console.log(err.message);
      return;
    }
  }


  useEffect(() => {

    (async () => {
      try {
        setEventLoading(true);
        const res = await axios({
          url: "http://localhost:8080/api/events",
          method: "get",
        })

        const data = res.data;
        console.log(data);
        setEvents(data.events);

        setTotalEvents(data.events.length);
        localStorage.setItem("totalEvents", data.events.length);
        setCollapseState(prev => {
          return data.events.map(item => false);
        })

      } catch (err) {
        console.log(err.message);
      } finally {
        setEventLoading(false);
      }
    })()

  }, []);


  if (eventLoading) {
    return <Flex h={"50px"} justifyContent={"center"} alignItems={"center"} >
      <Spinner size={"xl"} />
    </Flex>
  }



  return (
    <div className=' scroller h-[100%] w-[100%] md:w-[80vw] box-border'>

      <div className='flex justify-end w-[100%] transition-all duration-500 mt-2'>
        {/* <Button transition={"all 0.5s ease-in-out"} _hover={{ bg: "red.400" }} ml={"auto"} bg={"red"} color={"white"} display={"flex"} gap={"5px"} justifyContent={"center"} alignItems={"center"} >  <Text display={{ base: "none", md: "inline" }} > Delete </Text>  <span> <MdDelete /> </span> </Button> */}
        <DeleteButton setDeleteActivate={setDeleteActive} />
      </div>

      <div className='w-[100%]  flex justify-center items-center mt-2'>
        <SimpleGrid boxSizing='border-box' p={"10px"} w={{ base: "70%", md: "60%", lg: "100%" }} minChildWidth={"250px"} spacing={"20px"}   >

          {events.map((event, index) => {
            return <div onClick={()=> setDeleteActive(prev => !prev )} className='bg-white  w-[100%] flex flex-col justify-center items-center lg:max-w-[400px] shadow-md'>

              <div className={` ${deleteActivate ? "inline" : "hidden"} w-[100%] flex transition-all duration-500`}>
                <MdCancel onClick={(e) => handleDelete(e, event)} cursor={"pointer"} size={"25px"} className='ml-auto transition-all duration-500  hover:text-red-500 ' />
              </div>

              {/* image part */}
              <div className='w-[100%] h-auto md:h-[200px] lg:h-[220px]  flex justify-center items-center '>
                <img className=' h-[100%] w-[100%] object-cover' src={event.img} alt={event.img}  />
              </div>

              {/* details part */}
              <div className=' relative -top-[20px] p-[20px]  flex-1 bg-white w-[95%]'>

                <div className='text-gray-400'>
                  <h1 className='lg:text-[25px]   text-[18px]'>{event.title}</h1>
                </div>

                <div className='flex gap-[8px] text-gray-600 '>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{event.eventDate.day}</span>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{event.eventDate.month}</span>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{event.eventDate.year}</span>
                </div>

                <div>
                  <span className='text-gray-500 font-[400] text-[12px] md:text-[15px] '>{event.startTime.timeValHour} : {event.startTime.timeValMinute}</span>
                  <span className='text-gray-500 font-[400] text-[12px] md:text-[15px] '>-</span>
                  <span className='text-gray-500 font-[400] text-[12px] md:text-[15px] '> {event.endTime.timeValHour} : {event.endTime.timeValMinute} </span>
                </div>

                <div className={` px-[15px] py-[8px] scroller overflow-scroll ${collapseState[index] ? "h-auto" : "max-h-[120px]"} `}>
                  <h1 className='text-gray-400 font-[500] text-md lg:text-xl' >{event.venue}</h1>


                  {/* collapse feature */}
                  <Collapse startingHeight={20} in={collapseState[index]} >
                    <p className='text-[14px] md:text-[16px]'> {event.desc} </p>
                  </Collapse>
                  <Button size="sm" onClick={() => handleToggle(index)} mt="1rem">
                    Show {collapseState[index] ? "Less" : "More"}
                  </Button>

                </div>


              </div>



            </div>
          })}

        </SimpleGrid>
      </div>
      <CreateEvent setTotalEvents={setTotalEvents} />
    </div>
  )
}

export default Events
