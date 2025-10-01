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
type RequestFeedback = {
  id:number;
  book_name:string;
  status:string;
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

    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [RequestFeedback, setRequestFeedback] = useState<RequestFeedback[]>([])

  const getAllRequestFeedback = () =>{
    axios.get("http://localhost:8080/api/renew").then((res) =>{
        setRequestFeedback(res.data)
    })
  }

  useEffect(() =>{
    getAllRequestFeedback();
  },[])

//    const deleteRequestFeedback = (id:number) =>{
//     axios.delete(`http://localhost:8080/api/borrow/${id}`).then(() =>{
//       setRequestFeedback(RequestFeedback.filter(loanH => loanH.id !== id));
//          Swal.fire({
//                    title: 'Loan deleted successful!',
//                    text: 'You have successfully deleted a Loan History.',
//                    icon: 'success',
//                    confirmButtonText: 'OK',
//                      confirmButtonColor:'darkblue'
//                      })
//     }).catch((error) =>{
//       console.log(error)
//     })
//    }

 
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
            <motion.div style={{ width:'calc(100% - 20px)'}} className='RequestFeedback'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1 style={{marginTop:50}} className='text-center text-3xl text-blue-950 font-bold'>The Request Feedback</h1>
            <br />
            <table className='table'>
                <thead>
                  <tr>
                      <th>Book_Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                   {RequestFeedback.map((l) =>(
                    <tr className='text-center' key={l.id}>
                        <td>{l.book_name}</td>
                        <td>{l.status}</td>
                    </tr>
                   ))}
                </tbody>
            </table>

 </motion.div>
        <br />
        </div>
       </div>
        </motion.div>
      </div>

    </div>
  )
}

export default page;