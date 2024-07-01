import React, { useContext, useState } from 'react'
import { Button, Flex, Spinner, Collapse, Text } from '@chakra-ui/react'
import axios from 'axios'
import CreateBlog from './CreateBlog';
import { MdCancel, MdDelete } from "react-icons/md";
import { Context } from '../../context/Context';
import DeleteButton from './DeleteButton';
import useToast from "../../hooks/useToast";

const Blogs = () => {


  const{showSuccess , showError} = useToast();
  const{user} = useContext(Context);
  const token = user.token;
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const { setTotalBlogs } = useContext(Context);
  const [showDelete, setShowDelete] = useState(false);

  useState(() => {
    (async () => {
      try {

        setBlogLoading(true);

        const res = await axios({
          url: "http://localhost:8080/api/blogs",
          method: "get",
        })

        const data = res.data;
        console.log(data.blogs)
        setBlogs(data.blogs);
        setTotalBlogs(data.blogs.length);
        localStorage.setItem("totalBlogs", data.blogs.length);


      } catch (err) {
        console.log(err.message);
      } finally {
        setBlogLoading(false);
      }

    })()

  }, [])

  const handleDelete = async (e, blog) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: `http://localhost:8080/api/blog/${blog._id}`,
        method: "delete",
        headers : {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = res.data;
      if (data.error) {
        showError(data.error);
        console.log(data.error);
        return;
      }

      showSuccess(data.success);
      console.log(data);
      setBlogs(prev => {
        return prev.filter(item => item._id !== blog._id);
      })

      setTotalBlogs(prev => {
        localStorage.setItem("totalBlogs", prev - 1);
        return prev - 1;
      })

      setCollapseState(prev => {
        return data.events.map(item => false);
      })



    } catch (err) {
      console.log(err.message);
    }

  }


  // for collapse part
  const [collapseState, setCollapseState] = useState([]);

  const handleToggle = (index) => {

    setCollapseState((prev) => {
      let newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    })

  }

  if (blogLoading) {
    return <Flex h={"50px"} justifyContent={"center"} alignItems={"center"} >
      <Spinner size={"xl"} />
    </Flex>
  }

  return (
    <div className=' scroller w-[100%] p-2 relative h-[100%] gap-[20px]  overflow-scroll '>


      {/* delete button */}
      <div className='flex justify-end w-[100%] transition-all duration-500'>
        {/* <Button onClick={() => setShowDelete(prev => !prev)} transition={"all 0.5s ease-in-out"} _hover={{ bg: "red.400" }} ml={"auto"} bg={"red"} color={"white"} display={"flex"} gap={"5px"} justifyContent={"center"} alignItems={"center"} >  <Text display={{ base: "none", md: "inline" }} > Delete </Text>  <span> <MdDelete /> </span> </Button> */}

        <DeleteButton setDeleteActivate={setShowDelete} />

      </div>


      <div className='flex justify-center transition-all duration-500'>
        <Flex transition="all 0.3s ease-in-out" w={{ base: "70%", md: "100%" }} mt={"20px"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"} alignItems={"center"} >
          {blogs.map((blog, index) => {

            return <div key={index} className='bg-white  transition-all duration-500 w-[100%] flex flex-col justify-center items-center max-w-[300px] shadow-md'>

              {/* delete icon */}
              <div className={` ${showDelete ? "inline" : "hidden"} w-[100%] flex transition-all duration-500`}>
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

                <div className='flex gap-[8px] text-gray-600 '>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{blog.date.day}</span>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{blog.date.month}</span>
                  <span className='text-gray-600 text-[12px] lg:text-[15px] ' >{blog.date.year}</span>
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

      <CreateBlog blogs={blogs} setBlogs={setBlogs} setTotalBlogs={setTotalBlogs} />

    </div>
  )
}

export default Blogs
