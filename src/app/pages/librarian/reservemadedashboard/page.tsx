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
import Sidebar from '@/app/components/Sidebar';
type ReserveMade = {
  id:number;
  name:string;
  author:string;
  reservedate:string;
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

  const [reserveMade, setreserveMade] = useState<ReserveMade[]>([])

  const getAllReserve = () =>{
    axios.get("http://localhost:8080/api/reservebook").then((res) =>{
        setreserveMade(res.data)
    })
  }

  useEffect(() =>{
    getAllReserve();
  },[])


  const deleteReserve = (id:number) =>{
    axios.delete(`http://localhost:8080/api/reservebook/${id}`).then(() =>{
      setreserveMade(reserveMade.filter(r => r.id !== id));
            Swal.fire({
                   title: 'Reserve deleted successful!',
                   text: 'You have successfully deleted this reserve.',
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

       <div className='justify-center'>
          <motion.div className='book'>

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
   <div className='overall-borrow flex flex-wrap justify-between'>
            <br />
            <motion.div style={{width:'calc(100% - 20px)'}} className='reserveMade'>
            <h1 style={{marginTop:50}} className='text-center text-3xl text-blue-950 font-bold'>The Reserves Made</h1>
            <br />
            <table className='table'>
                <thead>
                   <tr>
                     <th>Book_Name</th>
                    <th>Author</th>
                    <th>loan_Date</th>
                   </tr>
                </thead>
                <tbody>
                   {reserveMade.map((r) =>(
                    <tr className='text-center' key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.author}</td>
                        <td>{r.reservedate}</td>
                        <td>
                          <button style={{width:'calc(70% - 20px)', backgroundColor:'red', color:'white'}} className='bg-red-700' onClick={() => deleteReserve(r.id)}>Delete</button>
                        </td>
                    </tr>
                   ))}
                </tbody>
            </table>
 </motion.div>
        <br />
        </div>  
             </motion.div>
        </motion.div>
      </div>

    </div>
  )
}

export default page;