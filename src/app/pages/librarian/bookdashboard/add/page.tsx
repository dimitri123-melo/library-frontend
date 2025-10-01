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
import Sidebar from '@/app/components/Sidebar';
// interface data {
//     image:string;
//     name: string;
//     author:string;
// }
// type Book = {
//   name: string;
//   author: string;
//   imageBase64?: string;
// };

const page = () => {
 const router = useRouter();
      const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // const handleSubmit = ()=>{
  //   if(!addBook.name || !addBook.author){
  //       Swal.fire({
  //    title: 'Error!',
  //     text: 'Fill in to add a book.',
  //     icon: 'error',
  //     confirmButtonText: 'OK',
  //     confirmButtonColor:'darkblue'
  //       })
  //   }
  //   else{
  //     axios.post("http://localhost:8080/api/book", addBook).then((res) =>{
  //       // setaddBook({image:"", name:"", author:""});
  //       setaddBook(res.data)
  //            Swal.fire({
  //     title: 'Book added successful!',
  //     text: 'You have successfully added a book.',
  //     icon: 'success',
  //     confirmButtonText: 'OK',
  //       confirmButtonColor:'darkblue'
  //       })
  //       router.push('/pages/librarian/bookdashboard');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  
  //   }
  // }


  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !author) {
       Swal.fire({
     title: 'Error!',
      text: 'Fill in to add a book.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor:'darkblue'
        })
      return;
    }
    else{

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("author", author);
      formData.append("image", file);

  const res = await axios.post("http://localhost:8080/api/book/upload", formData, 
    {headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setAuthor("");
      setFile(null);
      Swal.fire({
      title: 'Book added successful!',
      text: 'You have successfully added a book.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/pages/librarian/bookdashboard');
    } catch (err) {
      console.error("Error uploading book:", err);
    }
    }
  };



  
  
  return (

       <div className='justify-center'>
          <div className='book'>

            <div className='left-book bg-blue-950'>
    <div className='logo'><span style={{fontSize:50,color:'orange', fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'white', fontWeight:'bold'}}>i</span><span style={{fontSize:35,color:'orange', fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'white', fontWeight:'bold'}}>rary</span></div>
      <Sidebar />
         <div className='flex flex-wrap justify-center'>
             <button><Link style={{textDecoration:'none', color:'black'}}  href='/'>Logout</Link></button>
         </div>
            </div>

             <div className='right-book'>
   <div className='overall-borrow flex flex-wrap justify-center'>
            <br />
            <motion.div className='borrow'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Add a Book</h1>
            <br />
    
        <input type="text" placeholder="Book Name" value={name} onChange={(e) => setName(e.target.value)} />
         <br />
        <br />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
         <br />
        <br />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
         <br />
        <br />
        <button onClick={handleSubmit} className='text-white' type="submit">Add Book </button>
    
      <br />
        <br />
        </motion.div>       
             </div>
        </div>
      </div>


    </div>
  )
}

export default page;