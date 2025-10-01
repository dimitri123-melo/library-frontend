'use client';
import '../../components/Nav.css';
import React from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    password:""
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
          Swal.fire({
      title: 'Login successful!',
      text: 'You have successfully signed In.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/');
    }
  }
  return (
   <div>
          <div className='overall-login bg-blue-900 flex flex-wrap justify-center'>
            <br />
            <motion.div className='login'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Sign In</h1>
            <br />
          
          <input type='email' value={login.email} placeholder='Enter Email' onChange={(e) => setlogin({...login, email:e.target.value})} />
          <br />
            <br />
            
          <input type='password' value={login.password} placeholder='Enter Password' onChange={(e) => setlogin({...login, password:e.target.value})} />
          <br />
          <br />
          <button onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button>
          <h2 style={{marginTop:20}} className='text-center'>Do not have an Account? <Link className='text-blue-500 font-bold' href='/pages/register'>Sign Up</Link></h2>
        </motion.div>
        <br />
          <br />
            <br />
        </div>
    </div>
  )
}

export default page;