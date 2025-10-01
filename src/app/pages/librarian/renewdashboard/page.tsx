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
import {motion} from 'framer-motion'
type renew = {
  id:number;
  book_name:string;
  status:string;
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

    const [renew, setrenew] = useState<renew[]>([])
  
  const getAllRenew = () =>{
  axios.get("http://localhost:8080/api/renew").then((res) =>{
    setrenew(res.data);
  })
  }
  useEffect(() => {
    getAllRenew();
  }, []);

      const deleteRenew = (id:number) =>{
   axios.delete(`http://localhost:8080/api/renew/${id}`).then(() =>{
    setrenew(renew.filter(renews => renews.id !== id))
              Swal.fire({
          title: 'Renewal deleted successful!',
          text: 'You have successfully deleted a Renewal.',
          icon: 'success',
          confirmButtonText: 'OK',
            confirmButtonColor:'darkblue'
            })
   }).catch((error) =>{
    console.log(error);
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
              <h1 style={{marginTop:30}} className='text-center text-3xl text-blue-950 font-bold'>The Request Interface</h1>
              <br />
              <button><Link style={{textDecoration:'none', color:'black'}} href='/pages/librarian/renewdashboard/add'>Add</Link></button>
              <table className='table'>
                <thead>
                 <tr>
                    <th>Book_Name</th>
                    <th>Status</th>
                    <th>Action</th>
                 </tr>
                </thead>
                <tbody>
                 {renew.map((r) =>(
                  <tr key={r.id}>
                    <td className='text-center'>{r.book_name}</td>
                    <td className='text-center'>{r.status}</td>
                    <td className='text-center'>
                      {/* <button style={{padding:5, width:'70px', backgroundColor:'var(--color-blue-950)', color:'white', marginTop:-12}}>update</button> */}
                      <button onClick={() => deleteRenew(r.id)}  style={{padding:5, width:'70px', marginLeft:5, backgroundColor:' var(--color-red-800)', color:'white'}}>Delete</button> 
                    </td>
                  </tr>
                 ))}
                </tbody>
              </table>
             </motion.div>
        </div>
      </div>
    </div>
  )
}

export default page;