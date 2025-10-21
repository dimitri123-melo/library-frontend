'use client';
import '../../components/Nav.css';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { MdEmail, MdLock } from "react-icons/md";

interface data {
    name: string;
    email:string;
    password:string;
    cpassword:string;
}
const page = () => {
  const router = useRouter();

        const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

  const [login, setlogin] = useState({
    email:"",
    password:"",
    role:""
  })


  const handleSubmit = ()=>{
    if(!login.email || !login.password){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to signed up.',
      icon: 'error',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
    }
    else{
     axios.get("http://localhost:8080/api/register").then((res) => {
  const users = res.data;
  const user = users.find(
    (u: any) => u.email === login.email && u.password === login.password
  );

  if (user) {
    if(user.role === ""){
        Swal.fire({ title: "Login successful!", icon: "success" });
      router.push("/pages/studentsTeachers");
    }
   else if (user.role === "Teacher") {
      Swal.fire({ title: "Login successful!", icon: "success" });
      router.push("/pages/studentsTeachers");
    } else if (user.role === "Librarian") {
      Swal.fire({ title: "Login successful!", icon: "success" });
      router.push("/pages/librarian");
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "Invalid email or password.",
      icon: "error",
      confirmButtonColor: "darkblue",
    });
  }
});

   
    }
  }
  return (
   <div>
          <div className='overall-login  flex flex-wrap justify-center'>
            <br />
            <motion.div className='login'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Sign In</h1>
            <br />
        <div className='relative'>
              <MdEmail className="absolute left-10 top-6 -translate-y-1/2 text-gray-500" size={20} />
          <input type='email' value={login.email} placeholder='Enter Email' onChange={(e) => setlogin({...login, email:e.target.value})} />
        </div> 
         <br />
         <div className='relative'>
           <MdLock  className="absolute left-10 top-6 -translate-y-1/2 text-gray-500" size={20} />
          <input type='password' value={login.password} placeholder='Enter Password' onChange={(e) => setlogin({...login, password:e.target.value})} />
         </div> <br />
          <button onClick={handleSubmit} className='bg-blue-900 text-white' style={{marginBottom:30}}>Submit</button>
         <br />
        </motion.div>
        <br />
<br />
        </div>
    </div>
  )
}

export default page;











