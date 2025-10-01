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
interface data {
    image:string;
    name: string;
    author:string;
}
const page = (id:number) => {
 const router = useRouter();

    const [editBook, seteditBook] = useState({
        id: id,
    image:"",
      name:"",
      author:"",
    })
    
    
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });


 const getallBooks = () =>{
         axios.get(`http://localhost:8080/api/book${id}`).then((res) =>{
            seteditBook(res.data)
        });
       }
        useEffect(() =>{
        getallBooks()
        },[])


  const updateBook = ()=>{
    if(!editBook.name || !editBook.author){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to signed up.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
    }
    else{
        axios.put(`http://localhost:8080/api/book${id}`)
                  Swal.fire({
              title: 'Book updated successful!',
              text: 'You have successfully updated a book.',
              icon: 'success',
              confirmButtonText: 'OK',
                confirmButtonColor:'darkblue'
                }).catch((error) =>{
                    console.log(error);
                })
        router.push("/pages/librarian/bookdashboard")
      
 } }


  return (
    <div>
          <div className='overall-register bg-blue-900 flex flex-wrap justify-between'>
            <br />
            <motion.div className='register'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Update this Book</h1>
            <br />
          <input type='file' value={editBook.image} placeholder='Enter BookImage' onChange={(e) => seteditBook({...editBook, image: e.target.value})} />
          <br />
            <br /> 
          <input type='text' value={editBook.name} placeholder='Enter Name' onChange={(e) => seteditBook({...editBook, name: e.target.value})} />
          <br />
            <br />
          <input type='text' value={editBook.author} placeholder='Enter Author' onChange={(e) => seteditBook({...editBook, author:e.target.value})} />
          <br />
            <br />
          <button style={{marginBottom:30}} onClick={updateBook} className='bg-blue-900 text-white'>Submit</button> </motion.div>
        <br />
        <br />
        </div>
    </div>
  )
}

export default page;