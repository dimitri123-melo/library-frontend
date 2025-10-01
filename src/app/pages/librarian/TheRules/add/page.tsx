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

type Rules = {
 title:string;
  one:string;
  two:string;
  three:string;
  four:string;
  five:string;
};

const page = () => {
 const router = useRouter();
      const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

    const [addRules, setaddRules] = useState<Rules>({
        title:"",
      one:"",
      two:"",
      three:"",
      four:"",
      five:"",
    })
    

  const handleSubmit = ()=>{
    if( !addRules.title ||!addRules.one || !addRules.two || !addRules.three){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to add the rules.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
    }
    else{
      axios.post("http://localhost:8080/api/rules", addRules).then((res) =>{
        setaddRules(res.data);
             Swal.fire({
      title: 'Rules added successful!',
      text: 'You have successfully added the Rules.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/pages/librarian/TheRules');
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
            <h1>State out the Rules</h1>
            <br />
            <br /> 
            <input type='text' value={addRules.title} placeholder='Title' onChange={(e) => setaddRules({...addRules, title: e.target.value})} />
          <br />
            <br />
          <input type='text' value={addRules.one} placeholder='Rule 1' onChange={(e) => setaddRules({...addRules, one: e.target.value})} />
          <br />
            <br />
          <input type='text' value={addRules.two} placeholder='Rule 2' onChange={(e) => setaddRules({...addRules, two:e.target.value})} />
          <br />
          <br />
            <input  type='text' value={addRules.three} placeholder='Rule 3' onChange={(e) => setaddRules({...addRules, three:e.target.value})} />
          <br />
            <br />
            <input type='text' value={addRules.four} placeholder='Rule 4' onChange={(e) => setaddRules({...addRules, four:e.target.value})} />
          <br />
            <br />
            <input type='text' value={addRules.five} placeholder='Rule 5' onChange={(e) => setaddRules({...addRules, five:e.target.value})} />
          <br />
            <br />
          <button style={{marginBottom:30}} onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button> </motion.div>
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