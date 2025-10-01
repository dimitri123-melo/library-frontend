'use client';
import { useState, useEffect } from 'react';
import React from 'react'
import '../../../components/Nav.css';
import Link from 'next/link';
import axios from 'axios';
import Sidebar from '@/app/components/Sidebar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion';
type Rules = {
  id:number;
  title:string;
  one:string;
  two:string;
  three:string;
  four:string;
  five:string;
}
const page = () => {


    const variants = {
                  hidden:{opacity:0, x:-100},
                  visible:{opacity:1, x:0}
                }

   const router = useRouter();
  
      const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

      const [AllRules, setAllRules] = useState<Rules[]>([])
  const getAllRules = () =>{
    axios.get("http://localhost:8080/api/rules").then((res) =>{
        setAllRules(res.data)
    })
  }
  useEffect(() => {
    getAllRules();
  },[]);

  const deleteRule = (id:number) =>{
    axios.delete(`http://localhost:8080/api/rules/${id}`).then((res) =>{
        setAllRules(AllRules.filter(rule => rule.id !== id))
                      Swal.fire({
                     title: 'Rule deleted successful!',
                     text: 'You have successfully deleted a rule.',
                     icon: 'success',
                     confirmButtonText: 'OK',
                       confirmButtonColor:'darkblue'
                       })
    }).catch((error) =>{
        console.log(error)
    })
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
      <div>
        
          <div className='book'>
            <div className='left-book bg-blue-950'>
    <div className='logo'><span style={{fontSize:50,color:'orange', fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'white', fontWeight:'bold'}}>i</span><span style={{fontSize:35,color:'orange', fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'white', fontWeight:'bold'}}>rary</span></div>
          
         <Sidebar />
         <div className='flex flex-wrap justify-center'>
             <button onClick={handleLogout}>Logout</button>
         </div>
            </div>
            
             <motion.div className='right-book'
              ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}>
              <h1 style={{marginTop:30}} className='text-center text-3xl text-blue-950 font-bold'>The Rules and Regulations</h1>
              <br />
              <button><Link style={{textDecoration:'none', color:'black'}} href='/pages/librarian/TheRules/add'>Add</Link></button>

                 <div>
                  {AllRules.map((r) => (
                    <div style={{padding:10, backgroundColor:'white'}} key={r.id}>
                          <div style={{padding:5}}>
                            <p className='text-black font-bold text-xl'>{r.title}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p className='text-black'>1- {r.one}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>2- {r.two}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>3- {r.three}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>4- {r.four}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>5- {r.five}</p>
                        </div>
                        <button onClick={() => deleteRule(r.id)}>delete</button>
                    </div>
                  ))}
                 </div>
             </motion.div>
        </div>
      </div>
    </div>
  )
}

export default page;