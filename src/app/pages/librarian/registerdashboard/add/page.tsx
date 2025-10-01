'use client';
import '../../../../components/Nav.css';
import React from 'react'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from '@/app/components/Sidebar';
interface data {
    name: string;
    email:string;
    member:string;
}
const page = () => {
 const router = useRouter();

    const [addMember, setaddMember] = useState({
      name:"",
      email:"",
      member:""
    })
    
    
      const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = ()=>{
    if(!addMember.name || !addMember.email || !addMember.member){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to signed up.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
    }
    else{
      axios.post("http://localhost:8080/api/member", addMember).then((res) =>{
        // setaddMember({image:"", name:"", author:""});
        setaddMember(res.data)
             Swal.fire({
      title: 'Member added successful!',
      text: 'You have successfully added a Member.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/pages/librarian/registerdashboard');
      })
      .catch((error) => {
        console.error(error);
      })
  
    }
  }

    const handleLogout = () => {
      Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,        
        confirmButtonText: "Yes",     
        cancelButtonText: "No",        
        reverseButtons: true,      
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        } 
        // else: user clicked "No" or closed the dialog → do nothing
      });
    };
  return (
    <div>

             <div className='justify-center'>
          <motion.div className='book'>

            <div className='left-book bg-blue-950'>
    <div className='logo'><span style={{fontSize:50,color:'orange', fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'white', fontWeight:'bold'}}>i</span><span style={{fontSize:35,color:'orange', fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'white', fontWeight:'bold'}}>rary</span></div>
     <Sidebar />
         <div className='flex flex-wrap justify-center'>
             <button onClick={handleLogout}>Logout</button>
         </div>
            </div>

             <div className='right-book'>
   <div className='overall-borrow flex flex-wrap justify-between'>
            <br />
            <motion.div className='borrow'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Add a Memeber</h1>
            <br />
          <input type='text' value={addMember.name} placeholder='Enter Name' onChange={(e) => setaddMember({...addMember, name: e.target.value})} />
          <br />
            <br />
             <input type='text' value={addMember.email} placeholder='Enter Email' onChange={(e) => setaddMember({...addMember, email: e.target.value})} />
          <br />
            <br />
          <input type='text' value={addMember.member} placeholder='Enter Member' onChange={(e) => setaddMember({...addMember, member:e.target.value})} />
          <br />
            <br />
          <button style={{marginBottom:30}} onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button> </motion.div>
        <br />
        <br />
        </div>       
             </div>
        </motion.div>
      </div>


          {/* <div className='overall-register bg-blue-900 flex flex-wrap justify-between'>
            <br />
            <motion.div className='register'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Add a Member</h1>
            <br />
          <input type='text' value={addMember.name} placeholder='Enter Name' onChange={(e) => setaddMember({...addMember, name: e.target.value})} />
          <br />
            <br />
             <input type='text' value={addMember.email} placeholder='Enter Email' onChange={(e) => setaddMember({...addMember, email: e.target.value})} />
          <br />
            <br />
          <input type='text' value={addMember.member} placeholder='Enter Member' onChange={(e) => setaddMember({...addMember, member:e.target.value})} />
          <br />
            <br />
          <button style={{marginBottom:30}} onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button> </motion.div>
        <br />
        <br />
        </div> */}
    </div>
  )
}

export default page;