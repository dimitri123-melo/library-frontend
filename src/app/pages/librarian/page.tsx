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
import { GiArchiveRegister } from 'react-icons/gi';
import { MdLibraryBooks } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
type Book = {
  id:number;
  name:string;
  price:string;
  description:string;
}
const data = [
  { name: "Books", quantity: 50 },
  { name: "Renew", quantity: 30 },
  { name: "Request", quantity: 20 },
  { name: "Reserve", quantity: 10 },
  { name: "Issues", quantity: 30},
  { name: "Borrow Made", quantity:25},
  { name: "Reserves Made", quantity:15},
  { name: "Renew Made", quantity:20},
  { name: "Registers", quantity:32},
]

const COLORS = ["#32CD32", "#FFD700", "#FF8C00", "#00CED1"]
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
            </div>
            </div>
             <div className='right-book'>
                <h1 style={{marginTop:20, marginBottom:30}} className=' text-blue-950 text-3xl font-bold'>Librarian</h1>
             <div className='right-sub flex flex-wrap justify-center text-center text-xl'>
            <div  className='right1'>
            <a style={{fontSize:14}} href='/pages/librarian/registerdashboard'>
            <GiArchiveRegister size={20} className='inline' />
             Register
            </a>
              </div>
               <div  className='right2'>
              <a style={{fontSize:14}}  href='/pages/librarian/bookdashboard'>
              <MdLibraryBooks size={20} className='inline' />
                Books</a>
              </div>
               <div  className='right3'>
                   <a style={{fontSize:14}} href='/pages/librarian/renewdashboard'>
                   <MdLightMode size={20} className='inline' />
                      Renew
                   </a>
              </div>
             </div>

                 <div style={{marginTop:70}} className=" rounded-2xl w-full max-w-5xl mx-auto">
                   <div className="bg-white p-4 rounded-xl ">
                     <h2 className="text-center font-semibold text-gray-700 mb-4">
                       Inventory Quantity
                     </h2>
                     <div className="w-full h-64">
                       <ResponsiveContainer>
                         <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="name" />
                           <YAxis />
                           <Tooltip />
                           <Legend />
                           <Bar dataKey="quantity" fill="var(--color-blue-900)" barSize={50} radius={[10, 10, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                     </div>
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