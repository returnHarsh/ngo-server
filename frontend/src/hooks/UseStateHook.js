import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UseStateHook = (route) => {


    const[data , setData] = useState([])
    const[dataLoading , setDataLoading] = useState(true);

    useEffect(()=>{

        (async()=>{
            try{
                setDataLoading(true);
                const res = await axios({
                    method : "get",
                    url : route
                })

                const data = res.data
                setData(data);

            }catch(err){
                console.log(err.message);

            }finally{
                setDataLoading(false);
            }

        })()

    },[])

  return {data , dataLoading}

}

export default UseStateHook
