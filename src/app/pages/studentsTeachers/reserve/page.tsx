'use client';
import '../../../components/Nav.css';
import React from 'react'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SidebarStudentTeacher from '@/app/components/SidebarStudentTeacher';
interface data {
    name: string;
    author:string;
    date:string;
}
const page = () => {

    const variants = {
                hidden:{opacity:0, x:-100},
                visible:{opacity:1, x:0}
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

 const router = useRouter();

    const [addReserve, setaddReserve] = useState({
      name:"",
      author:"",
      reservedate:""
    })
    
    
      const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = ()=>{
    if(!addReserve.name || !addReserve.author || !addReserve.reservedate){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to reserve a book.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
    }
    else{
      axios.post("http://localhost:8080/api/reservebook", addReserve).then((res) =>{
        // setaddReserve({image:"", name:"", author:""});
        setaddReserve(res.data)
             Swal.fire({
      title: 'Book reserved successful!',
      text: 'You have successfully reserved this book.',
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
  }
  return (
    <div>

       <div className='justify-center'>
          <motion.div className='book'>

            <div className='left-book bg-blue-950'>
    <div className='logo'><span style={{fontSize:50,color:'orange', fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'white', fontWeight:'bold'}}>i</span><span style={{fontSize:35,color:'orange', fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'white', fontWeight:'bold'}}>rary</span></div>
      <SidebarStudentTeacher />
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
            <h1>Reserve a Book</h1>
            <br />
     <input type='text' value={addReserve.name} placeholder='Enter Book_Name' onChange={(e) => setaddReserve({...addReserve, name: e.target.value})} />
          <br />
            <br />
          <input type='text' value={addReserve.author} placeholder='Enter Author_Name' onChange={(e) => setaddReserve({...addReserve, author: e.target.value})} />
          <br />
            <br />
          <input type='date' value={addReserve.reservedate} placeholder='Enter Date' onChange={(e) => setaddReserve({...addReserve, reservedate:e.target.value})} />
          <br />
            <br />
          <button style={{marginBottom:30,  width:'calc(87% - 20px)', backgroundColor: 'var(--color-blue-900)'}} onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button> </motion.div>
        <br />
        <br />
        </div>

             </div>
        </motion.div>
      </div>

    </div>
  )
}

export default page;