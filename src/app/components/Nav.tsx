'use client';
import React from 'react'
import Link from 'next/link';
import './Nav.css';
import { easeOut, motion} from 'framer-motion';
import Image from 'next/image';
import Data from '../Data/Data';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MdLibraryBooks } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { FaHandshakeSimple } from "react-icons/fa6";
type Book = {
  id:number;
  name: string;
  author: string;
  imageBase64?: string; 
};

type Rules = {
    id:number;
    title:string;
    one:string;
    two:string;
    three:string;
    four:string;
    five:string;
}

const Nav = () => {
         const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.2,
          });

          const variants = {
            hidden:{opacity:0, x:-100},
            visible:{opacity:1, x:0}
          }

  const [AllRules, setAllRules] = useState<Rules[]>([])
  const getAllRules = () =>{
    axios.get<Rules[]>("http://localhost:8080/api/rules").then((res) =>{
        setAllRules(res.data)
    })
  }
  useEffect(() => {
    getAllRules();
  },[]);



  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    axios
      .get<Book[]>("http://localhost:8080/api/book")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      })
  }, []);


    
  return (
    <div>
     
      <div id='home' className='banner'>
             <div className='flex flex-wrap justify-center text-center'>
                <div className='Nav'>
            <div style={{marginLeft:110}} className='logo'><span className='text-blue-900' style={{fontSize:50, fontWeight:'bold'}}>L</span><span style={{fontSize:40,color:'black', fontWeight:'bold'}}>i</span><span className='text-blue-900' style={{fontSize:35, fontWeight:'bold'}}>b</span><span style={{fontSize:25, color:'black', fontWeight:'bold'}}>rary</span></div>
            <ul>
                <li><a href='#home'>Home</a></li>
                <li><a href='#store'>Store</a></li>
                <li><a href='#about'>About</a></li>
                <li><a href='#rule'>Rules</a></li>
                <li><a href='#faqs'>FAQs</a></li>
                <button><Link style={{textDecoration:'none'}} href='/pages/login'>Sign-In</Link></button>
            </ul>
             </div>
             </div>
   <br />
      <br />
             <motion.div className='content flex flex-wrap justify-center'>
              <motion.div className='left-content'
      variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:false, amount:0.5}}
      transition={{ duration: 0.5}}>
         <h1>Browse $ <br /> Select E-Books</h1>
         <p>find your ideal books. read and educate yourself so well to gain
          hand on experience on past, present and future life.
         </p>
         <br />
         <button>Read Now</button>
              </motion.div>
              <div className='right-content' style={{backgroundColor:'white'}}>
    <Image src='/images/nineteen.jpg' alt='item-one' width={300} height={300}  />
              </div>
             </motion.div>      
          </div>

    
          <motion.div className='ok flex flex-wrap justify-center text-center'
      variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:false, amount:0.5}}
      transition={{ duration: 0.5}} style={{backgroundColor:'white'}}>
            <div style={{boxShadow:'0 0 1px', gap:10}}  className='left-ok'>
             <MdLibraryBooks size={40} className='flex flex-wrap justify-center text-blue-900' style={{margin:'auto',}} />
              <h1>Car Delivery</h1>
                <p style={{marginBottom:10}}>find your ideal books</p>
            </div>
            <div style={{boxShadow:'0 0 1px', gap:10}}  className='right-ok'>
              <VscGitPullRequestGoToChanges size={40} className='flex flex-wrap justify-center text-blue-900'  style={{margin:'auto',}} /> 
              <h1>Security</h1>
            <p style={{marginBottom:10}}>find your ideal books </p>
            </div>
            <div  style={{boxShadow:'0 0 1px', gap:10}} className='right-ok'>
              <FaHandshakeSimple size={40} className='flex flex-wrap justify-center text-blue-900'  style={{margin:'auto',}} />
              <h1>Nice pickline</h1>
               <p style={{marginBottom:10}}>find your ideal books</p>
            </div>
          </motion.div>
       


   <div id='store' className='All'>
<br />

     <motion.div className='overall-cards'
      variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:true, amount:0.5}}
      transition={{ duration: 0.5}}>
      <h1 className='text-center text-xl font-bold'>Featured Books</h1>
        <div style={{gap:10, backgroundColor:'white', marginLeft:50, marginRight:50}} className='Cards grid grid-cols-4'>
       {Data.map((data) =>(
        <div style={{boxShadow:'0 0 1px', gap:10, marginTop:30, marginBottom:30}} className='justify-center' key={data.id}>
          <Image src={data.image} alt={data.name} width={200} height={300} />
          <p className='font-bold text-center'>{data.name}</p>
          <p className='text-center'>{data.written}</p>
          <button style={{marginBottom:30}} className='bg-blue-900 text-center flex flex-wrap justify-center'><Link href='/pages/login'>Borrow</Link></button>
        </div>
       ))}
       </div>
     </motion.div>

     <motion.div className='overall-cards' style={{marginTop:10}}
          variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:true, amount:0.5}}
      transition={{ duration: 0.5}}>
           <div className="Cards grid grid-cols-4 gap-4" style={{marginLeft:50, marginRight:50,}}>
        {books.map((book) => (
          <div key={book.id} className="shadow flex flex-col items-center" style={{boxShadow:'0 0 1px'}}>
            {book.imageBase64 && (
              <img
                src={`data:image/jpeg;base64,${book.imageBase64}`}
                alt={book.name}
                className="w-32 h-40 object-cover mb-2"
              />
            )}
          <p className='font-bold text-center'>{book.name}</p>
          <p className='text-center'>{book.author}</p>
            <button style={{marginBottom:30, padding:3, width:'calc(50% - 20px)', marginTop:10}} className='bg-blue-900 text-center flex flex-wrap justify-center text-white'><Link href='/pages/login'>Borrow</Link></button>
          </div>
        ))}
      </div>
     </motion.div>

      </div>


        <motion.div id='about' className='flex flex-wrap justify-center'
      variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:true, amount:0.5}}
      transition={{ duration: 0.5}}>
      <h1 style={{marginTop:80, fontSize:30}} className='text-center font-bold'>About Library</h1>
       <div style={{backgroundColor:'white', marginBottom:30}} className='about flex flex-wrap justify-center'>
            <div className='left-about'>
      <Image src='/images/ten.jpg' alt='item' width={300} height={300}/>
            </div>
            <div className='right-about'>
              <h1>Up to 90% Discount</h1>
  <p>At Gro, we believe grocery shopping should be more than just filling a basket — it should be about nourishing families, supporting local farmers, and making healthy living easy for everyone.
</p>
<button>Cool</button>
            </div>
        </div>
     </motion.div>

      <h1 id='rule' style={{marginTop:80, marginBottom:50}} className='text-center text-3xl font-bold'>The Rules and Regulations</h1>
     <motion.div className=''
        variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:true, amount:0.5}}
      transition={{ duration: 0.5}}>
                 <div className='rule grid grid-cols-2' style={{marginLeft:50, marginRight:50, gap:10}}>
                  {AllRules.map((r) => (
                    <div style={{padding:10, boxShadow:'0 0 2px', marginBottom:10}} key={r.id}>
                          <div style={{padding:5}}>
                            <p className='text-black font-bold text-xl'>{r.title}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p className='text-black'>1- {r.one}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>2- {r.two}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>3- {r.three}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>4- {r.four}</p>
                        </div>
                        <div style={{padding:5}}>
                            <p>5- {r.five}</p>
                        </div>
          </div>
                  ))}
                 </div>
     </motion.div>


        <div style={{marginBottom:150,}} id="faqs" className="faqs">
          <br />
          <br />
           <br />
            <br />
             <br />
             
 <motion.div className='flex flex-wrap justify-center'
       variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:false, amount:0.5}}
      transition={{ duration: 0.5}}>
       <details className='bg-blue-900'>
        <summary style={{fontSize:20}} className='bg-blue-900'>Can I reserve a book for future use ?</summary>
      <div className="content">
        <p>hello there</p>
      </div>
      </details>
     </motion.div>

      <motion.div className='flex flex-wrap justify-center'
        variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:false, amount:0.5}}
      transition={{ duration: 0.5}}>
        <details className='bg-blue-900'>
        <summary style={{fontSize:20}} >Can I renew a book after use ?</summary>
      <div className="content">
        <p>hello there</p>
      </div>
      </details>
      </motion.div>

        <motion.div className='flex flex-wrap justify-center'
          variants={variants}
      initial="hidden"
     whileInView= "visible"
     viewport={{once:false, amount:0.5}}
      transition={{ duration: 0.5}}>
      <details className='bg-blue-900'>
        <summary style={{fontSize:20}} >Can I request for a book ?</summary>
      <div className="content">
        <p>hello there</p>
      </div>
      </details>
        </motion.div>

      <br />
    </div>

 
          </div>
  )
}

export default Nav;