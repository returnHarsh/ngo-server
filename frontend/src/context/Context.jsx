import { createContext, useState} from "react";


export const Context = createContext();

export const ContextProvider = ({children}) =>{

 
    const storedUser = localStorage.getItem("user");
    const[user , setUser] = useState( storedUser ?  JSON.parse(localStorage.getItem("user")) : null );
    const[totalEvents , setTotalEvents] = useState(JSON.parse(localStorage.getItem("totalEvents")));
    const[totalGalleryImages , setTotalGalleryImages] = useState( JSON.parse(localStorage.getItem("galleryImagesCount")) );
    const[totalBlogs , setTotalBlogs] = useState(JSON.parse(localStorage.getItem("totalBlogs")));
    const[totalCauses , setTotalCauses] = useState(JSON.parse(localStorage.getItem("totalCauses")));

    return <Context.Provider value={{ user , setUser , totalEvents , setTotalEvents , totalGalleryImages , setTotalGalleryImages , totalBlogs , setTotalBlogs , totalCauses , setTotalCauses}}>
        {children}
    </Context.Provider>
}