'use client';
import { useState, useEffect } from 'react';
import React from 'react'
import '../../components/Nav.css';
import Link from 'next/link';
import axios from 'axios';
import Footer from '@/app/components/Footer';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Sidebar from '@/app/components/Sidebar';
import { MdLightbulb } from "react-icons/md";
import { useRouter } from 'next/navigation';
const page = () => {

           const variants = {
                hidden:{opacity:0, x:-100},
                visible:{opacity:1, x:0}
              }
  return (
    <div>
      <div className='justify-center'>
          <motion.div  className='book'
             variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5}}>
            <div className='left-book bg-blue-950'>
    <div className='logo'><span style={{fontSize:50,color:'orange', fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'white', fontWeight:'bold'}}>i</span><span style={{fontSize:35,color:'orange', fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'white', fontWeight:'bold'}}>rary</span></div>
          
         <Sidebar />
         <div className='flex flex-wrap justify-center'>
             {/* <button><Link style={{textDecoration:'none', color:'black'}} href='/'>Logout</Link></button> */}
         </div>
            </div>
             <div className='right-book'>
                <h1 style={{marginTop:20, marginBottom:30}} className=' text-blue-950 text-3xl font-bold'>Librarian</h1>
             <div className='right-sub flex flex-wrap justify-center text-center text-xl'>
            <div  className='right1'>
            <a href='/pages/librarian/registerdashboard'>
             Register
            </a>
              </div>
               <div  className='right2'>
              <a href='/pages/librarian/bookdashboard'>
                Books</a>
              </div>
               <div  className='right3'>
                   <a href='/pages/librarian/renewdashboard'>
                      Renew
                   </a>
              </div>
             </div>

              {/* <div style={{marginTop:50}} className='right-sub flex flex-wrap justify-center text-center text-xl'>
            <div className='right1'>
                <a href='/pages/librarian/reservedashboard'>
                  Reserve
                </a>
              </div>
               <div className='right2'>
                <a href='/pages/librarian/requestdashboard'>
                Requests
                </a>
              </div>
               <div className='right3'>
               <a href='/pages/librarian/issuedashboard'>
                       Issue
               </a>
              </div>
             </div>


               <div style={{marginTop:50}} className='right-sub flex flex-wrap justify-center text-center text-xl'>
            <div className='right1'>
                <a href='/pages/librarian/reservemadedashboard'>
                  Reserves Made
                </a>
              </div>
               <div className='right2'>
                <a href='/pages/librarian/requestmadedashboard'>
                  Requests Made
                </a>
              </div>
               <div className='right3'>
                <a href='/pages/librarian/borrowmadedashboard'>
                 Borrows Made
                </a>
              </div>
             </div> */}
              
              
             </div>
        </motion.div>
      </div>

      
    </div>

  )
}

export default page;