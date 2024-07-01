
import './App.css';
import Nav from './comonents/Nav';
import Footer from './comonents/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sigup from './comonents/singup';
import Front from './comonents/Front';
import About from './comonents/about';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import Education from './pages/Education';
import Health from './pages/Health';
import Skills from './pages/Skills';
import Nutrition from './pages/Nutrition';
import { useContext } from 'react';
import {Context} from "./context/Context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import ForgetPassword from "./pages/ForgetPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const{user} = useContext(Context);

  return (

      <>
      <Routes>

<Route path='/' element={<Front />} ></Route>
<Route path='/about' element={<About />} ></Route>
<Route path='/blog' element={<BlogPage />} ></Route>
<Route path='/contact' element={<ContactPage />} ></Route>
<Route path='/event' element={<EventsPage />} ></Route>
<Route path='/education' element={<Education />} ></Route>
<Route path='/skills' element={<Skills />} ></Route>
<Route path='/health' element={<Health />} ></Route>
<Route path='/nutrition' element={<Nutrition />} ></Route>

{/* login routes */}
<Route path="/admin/*" element={user ? <MainPage /> : <Login />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/forgot/password" element={<ForgetPassword />} />

</Routes>

<ToastContainer/>
      </>

  );
}

export default App;
