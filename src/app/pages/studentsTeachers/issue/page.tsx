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
type Issue = {
  id:number;
  book:string;
  author:string;
  member:string;
}
const page = () => {

    const variants = {
                hidden:{opacity:0, x:-100},
                visible:{opacity:1, x:0}
              }
 const router = useRouter();

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

    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [IssueGiven, setIssueGiven] = useState<Issue[]>([])

  const getAllIssues = () =>{
    axios.get("http://localhost:8080/api/issue").then((res) =>{
        setIssueGiven(res.data)
    })
  }

  useEffect(() =>{
    getAllIssues();
  },[])

//   const deleteIssueGiven = (id:number) =>{
//     axios.delete(`http://localhost:8080/api/borrow{id}`).then(() =>{
//       setIssueGiven(IssueGiven.filter(l => l.id !== id))
//                     Swal.fire({
//                    title: 'Book deleted successful!',
//                    text: 'You have successfully deleted a book.',
//                    icon: 'success',
//                    confirmButtonText: 'OK',
//                      confirmButtonColor:'darkblue'
//                      })
//     }) .catch((error) =>{
//       console.log(error);
//     })
//   }

 
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
            <motion.div className='loanHistory'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1 style={{marginTop:50}} className='text-center text-3xl text-blue-950 font-bold'>The Issues Given</h1>
            <br />
            <table className='table'>
                <thead>
                   <tr>
                     <th>Book_Name</th>
                    <th>Author</th>
                    <th>Member_Name</th>
                   </tr>
                </thead>
                <tbody>
                   {IssueGiven.map((l) =>(
                    <tr style={{padding:10}} className='text-center' key={l.id}>
                        <td style={{padding:10}}>{l.book}</td>
                        <td style={{padding:10}}>{l.author}</td>
                        <td style={{padding:10}}>{l.member}</td>
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