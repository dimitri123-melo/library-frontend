'use client';
import { useState, useEffect } from 'react';
import React from 'react'
import '../../../components/Nav.css';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion'
type Register = {
  id:number;
  name:string;
  email:string;
  password:string;
  cpassword:string;
  role:string
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

    const [member, setmember] = useState<Register[]>([])
  
  const getAllMembers = () =>{
  axios.get("http://localhost:8080/api/register").then((res) =>{
    setmember(res.data);
  })
  }
  useEffect(() => {
    getAllMembers();
  }, []);


  const deleteMember = (id:number) =>{
    axios.delete(`http://localhost:8080/api/register/${id}`).then(() =>{
      setmember(member.filter(members => members.id !== id))
             Swal.fire({
            title: 'Member deleted successful!',
            text: 'You have successfully deleted a Member.',
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
              <h1 style={{marginTop:30}} className='text-center text-3xl text-blue-950 font-bold'>The Registration Interface</h1>
              <br />
              {/* <button><Link style={{textDecoration:'none', color:'black'}} href='/pages/librarian/registerdashboard/add'>Add</Link></button> */}
              <table className='table'>
                <thead>
                 <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Action</th>
                 </tr>
                </thead>
                <tbody>
                 {member.map((m) =>(
                  <tr className='text-center' key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.password}</td>
                    <td>{m.role}</td>
                    <td>
                      {/* <button style={{padding:5, width:'70px', backgroundColor:'var(--color-blue-950)', color:'white', marginTop:-12}}>update</button> */}
                      <button onClick={() => deleteMember(m.id)} style={{padding:5, width:'70px', marginLeft:5, backgroundColor:' var(--color-red-800)', color:'white'}}>Delete</button> 
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