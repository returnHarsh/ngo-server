import React, { useContext, useEffect, useRef, useState } from 'react'
import { Flex , Collapse , Button} from '@chakra-ui/react';
import DeleteButton from './DeleteButton';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import CreateCause from './CreateCause';
import { Context } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import useToast from "../../hooks/useToast";

const Causes = () => {

  const{showSuccess , showError} = useToast();
  const{user} = useContext(Context);
  const token = user.token;
  const{totalCauses , setTotalCauses} = useContext(Context);
  const[deleteActive , setDeleteActivate] = useState(false);
  const[causes , setCauses] = useState([]);

  useEffect(()=>{

    (async()=>{
      try{

        const res = await axios({
          url : "http://localhost:8080/api/cause",
          method : "get",
        })

        const data = res.data;
        if(data.error){
          console.log(data.error);
          return;
        }

        setCauses(data.causes);
        localStorage.setItem("totalCauses" , data.causes.length);

      }catch(err){
        console.log(err.message);
      }
    })()

  },[])

  // for collapse part
  const [collapseState, setCollapseState] = useState([]);

  const handleToggle = (index) => {

    setCollapseState((prev) => {
      let newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    })

  }

  console.log(deleteActive)

  const handleDelete = async(e,cause)=>{
    try{

      const res = await axios({
        url : `http://localhost:8080/api/cause/${cause._id}`,
        method : "delete",
        headers : {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = res.data;
      console.log(data);
      if(data.error){
        showError(data.error);
        console.log(data.error);
        return;
      }

      setCauses(prev=>{
        return prev.filter(p=> p._id != cause._id);
      })

      setTotalCauses(prev =>{
        localStorage.setItem("totalCauses" , prev-1);
        return prev-1;
      })

      showSuccess(data.success);

    }catch(err){
      console.log(err.message);
      showError(err.message);
      return;
    }
  }

  return (
  <>
 
      <div className=' scroller w-[100%] p-2 relative h-[100%] gap-[20px]  overflow-scroll '>


     {causes.length > 0 && <>
      {/* delete button */}
      <div className='flex justify-end w-[100%] transition-all duration-500'>
        {/* <Button onClick={() => setShowDelete(prev => !prev)} transition={"all 0.5s ease-in-out"} _hover={{ bg: "red.400" }} ml={"auto"} bg={"red"} color={"white"} display={"flex"} gap={"5px"} justifyContent={"center"} alignItems={"center"} >  <Text display={{ base: "none", md: "inline" }} > Delete </Text>  <span> <MdDelete /> </span> </Button> */}
        <DeleteButton setDeleteActivate={setDeleteActivate} />

      </div>


      <div className='flex justify-center transition-all duration-500'>
        <Flex transition="all 0.3s ease-in-out" w={{ base: "70%", md: "100%" }} mt={"20px"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"} alignItems={"center"} >
        {causes.map((blog, index) => {

return <div key={index} className='bg-white  transition-all duration-500 w-[100%] flex flex-col justify-center items-center max-w-[300px] shadow-md'>

  {/* delete icon */}
  <div className={` ${deleteActive ? "inline" : "hidden"} w-[100%] flex transition-all duration-500`}>
    <MdCancel onClick={(e) => handleDelete(e, blog)} cursor={"pointer"} size={"25px"} className='ml-auto transition-all duration-500  hover:text-red-500 ' />
  </div>


  {/* image part */}
  <div className=' transition-all duration-500  w-[100%]  flex justify-center items-center h-[150px] md:h-[190px] lg:max-h-[220px] object-fill'>
    <img className='h-[100%] w-[100%]' src={blog.img} alt={blog.img} />
  </div>

  {/* details part */}
  <div className='relative transition-all duration-500 -top-[20px] p-[12px]  flex-1 bg-white w-[95%]'>

    <div className='text-gray-400'>
      <h1 className='lg:text-[25px]   text-[18px]'>{blog.title}</h1>
    </div>



    <div className={` scroller overflow-scroll ${collapseState[index] ? "h-auto" : "max-h-[100px]"} `}>

      {/* collapse feature */}
      <Collapse startingHeight={20} in={collapseState[index]} >
        <p className='text-[14px] md:text-[16px]'> {blog.desc} </p>
      </Collapse>
      <Button size="sm" onClick={() => handleToggle(index)} mt="1rem">
        Show {collapseState[index] ? "Less" : "More"}
      </Button>

    </div>


  </div>



</div>

})}

        </Flex>
      </div>
     </>}

     <CreateCause causes={causes} setCauses={setCauses} setTotalCauses={setTotalCauses} />


    </div>
    
  </>
  )
}

export default Causes
