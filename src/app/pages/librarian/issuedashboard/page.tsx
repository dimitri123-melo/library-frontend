'use client';
import { useState, useEffect } from 'react';
import React from 'react'
import '../../../components/Nav.css';
import Link from 'next/link';
import axios from 'axios';
import Sidebar from '@/app/components/Sidebar';
import Swal from 'sweetalert2';
import {motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
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
    
        const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

    const [Issue, setIssue] = useState<Issue[]>([])
  
  const getAllIssue = () =>{
  axios.get("http://localhost:8080/api/issue").then((res) =>{
    setIssue(res.data);
  })
  }
  useEffect(() => {
    getAllIssue();
  }, []);

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

  // const getOneBook = () =>{
  //   axios.get(`http://localhost:8080/api/Issue/${id}`).then((res) =>{
  //     setIssue({
  //       id: res.data.id,
  //       name: res.data.name,
  //       author: res.data.author,
  //     })
  //   })
  // }
  // useEffect(() =>{
  //   getOneBook();
  // })

  const deleteIssue = (id: number) =>{
    axios.delete(`http://localhost:8080/api/issue/${id}`).then(() =>{
      setIssue(Issue.filter(Issues => Issues.id !== id))
                Swal.fire({
             title: 'Issue deleted successful!',
             text: 'You have successfully deleted a Issue.',
             icon: 'success',
             confirmButtonText: 'OK',
               confirmButtonColor:'darkblue'
               })
    }).catch((error) =>{
      console.log(error)
    })
  }

  // const updateBook = () =>{
  //      axios.put(`http://localhost:8080/api/Issue/${id}`)
  //                 Swal.fire({
  //                    title: 'Book updated successful!',
  //                    text: 'You have successfully updated a Issue.',
  //                    icon: 'success',
  //                    confirmButtonText: 'OK',
  //                      confirmButtonColor:'darkblue'
  //                      }).catch((error) =>{
  //                          console.log(error);
  //                      })
  // }

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
              <h1 style={{marginTop:30}} className='text-center text-3xl text-blue-950 font-bold'>The Issues Interface</h1>
              <br />
              <button><Link style={{textDecoration:'none', color:'black'}} href='/pages/librarian/issuedashboard/add'>Add</Link></button>
              <table className='table'>
                <thead>
                 <tr>
                     <th>Book</th>
                    <th>Author_Name</th>
                    <th>Member_Name</th>
                    <th>Action</th>
                 </tr>
                </thead>
                <tbody>
                   {Issue.map((b) =>(
                     <tr key={b.id} className='text-center'>
                        <td>{b.book}</td>
                        <td>{b.author}</td>
                        <td>{b.member}</td>
                        <td>
                            {/* <button style={{padding:5, width:'70px', backgroundColor:'var(--color-blue-950)', color:'white', marginTop:-12}}><Link style={{textDecoration:'none', color:'white'}} href='/pages/librarian/bookdashboard/edit'>update</Link></button> */}
                            <button  onClick={() => deleteIssue(b.id)} style={{padding:5, width:'70px', marginLeft:5, backgroundColor:' var(--color-red-800)', color:'white'}}>Delete</button>                   
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