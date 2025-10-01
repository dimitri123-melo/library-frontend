'use client';
import '../../components/Nav.css';
import React from 'react'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
interface data {
    name: string;
    email:string;
    password:string;
    cpassword:string;
    role: string;
}
const page = () => {
 const router = useRouter();

    const [Register, setRegister] = useState({
      name:"",
      email:"",
      password:"",
      cpassword:"",
      role: ""
    })
    
    
      const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = ()=>{
    if(!Register.name || !Register.email || !Register.password || !Register.cpassword){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to signed up.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
    }
    else if(Register.password != Register.cpassword){
           Swal.fire({
     title: 'Error!',
      text: 'Passwords not matched.',
      icon: 'error',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
    }
    else{
       if(Register.role == 'Student' || Register.role == 'Teacher'){
         axios.post("http://localhost:8080/api/register", Register).then((res) =>{
        // setRegister({name:"", email:"", password:"", cpassword:"", role:""});
        setRegister(res.data);
             Swal.fire({
      title: 'Registration successful!',
      text: 'You have successfully signed up.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/pages/studentsTeachers');
      })
      .catch((error) => {
        console.error(error);
      })
       }

       else if(Register.role == 'Librarian'){
         axios.post("http://localhost:8080/api/register", Register).then((res) =>{
        // setRegister({name:"", email:"", password:"", cpassword:"", role:""});
        setRegister(res.data);
             Swal.fire({
      title: 'Registration successful!',
      text: 'You have successfully signed up.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/pages/librarian');
      })
      .catch((error) => {
        console.error(error);
      })
       }
  
    }
  }
  return (
    <div>
          <div className='overall-register bg-blue-900 flex flex-wrap justify-between'>
            <br />
            <motion.div className='register'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Sign Up</h1>
            <br />
          
          <input type='text' value={Register.name} placeholder='Enter name' onChange={(e) => setRegister({...Register, name: e.target.value})} />
          <br />
            <br />
          <input type='email' value={Register.email} placeholder='Enter Email' onChange={(e) => setRegister({...Register, email:e.target.value})} />
          <br />
            <br />
          <input type='password' value={Register.password} placeholder='Enter Password' onChange={(e) => setRegister({...Register, password:e.target.value})} />
          <br />
            <br />
          <input type='password' value={Register.cpassword} placeholder='Confirmed_Password' onChange={(e) => setRegister({...Register, cpassword:e.target.value})} />
          <br />
            <br />
            <p className='text-center '>Who are you ?</p>
          <select value={Register.role} onChange={(e) => setRegister({...Register, role:e.target.value})}>
            <option disabled>Who are you ?</option>
            <option value='Student'>Student</option>
            <option value='Teacher'>Teacher</option>
            <option value='Librarian'>Librarian</option>
          </select>
          <br />
          <br />
          <button onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button>
          <h2 style={{marginTop:15}} className='text-center'>Already have an Account? <Link className='text-blue-500 font-bold' href='/pages/login'>Sign In</Link></h2>
        </motion.div>
        <br />
        </div>
    </div>
  )
}

export default page;