'use client';
import React from 'react'
import Link from 'next/link';
import './Nav.css';
import { FaFacebook } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdAddIcCall } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { AiOutlineCopyright } from "react-icons/ai";
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const Footer = () => {
      const { ref, inView } = useInView({
                triggerOnce: true,
                threshold: 0.2,
              });
    
              const variants = {
                hidden:{opacity:0, x:-100},
                visible:{opacity:1, x:0}
              }
  return (
    <div>
                   <div>
    <div style={{ marginTop:0,}} className='footer flex-flex-wrap justify-center'>
                          <motion.div className='left-footer'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                          <h1 className='text-blue-950'>Lib</h1>
                          <p>Awesome grocery store website template</p>
                          <p> Address 5171 we camptel</p>
                          <p> Call +911-540-021-1243</p>
                          <p><MdAddIcCall className='inline' /> Email.son@gmail.com</p>
                          <p><FiClock className='inline' /> Hours 10:00-14:00 Mon-Sat</p>
                          </motion.div>

                            <motion.div className='right-footer'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                           <p>Company</p>
                           <p>About Us</p>
                           <p>Private Policy</p>
                           <p>Terms & Conditions</p>
                           <p>Contact Us</p>
                           <p>Support Center</p>
                           <p>Careers</p>
                           </motion.div>

                          <motion.div className='right-footer'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                          <h1>Account</h1>
                          <p>Sign in</p>
                          <p>View Cart</p>
                          <p>Track My Order</p>
                          <p>Help Ticket</p>
                          <p>Shopping Details</p>
                          <p>Compare products</p>
                          </motion.div>

                           <motion.div className='right-footer'
               variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                          <h1>Install App</h1>
                          <AiFillApple className='font-stretch-100% text-5xl px-1 py-1' />
                          <IoLogoGooglePlaystore className='font-stretch-100% text-4xl' style={{marginLeft:70, marginTop:-38}} />
                          <p>From App Store or Google Play</p>
                          <br />
                          <input style={{padding:5, border:'1px solid darkblue', borderRadius:5}} className=' text-center bg-blue-900 text-white' placeholder='Enter Email' />
                          </motion.div>
    </div>

        <div className='last'>
                          <motion.div className='left-last'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}}>
                            <p><AiOutlineCopyright className='inline' /> 2025 Lib- HTML Library Template, All right reserved.</p>
                          </motion.div>

                          <motion.div className='right-last'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                            <p className='text-2xl'><IoCall className='inline text-4xl text-blue-950' /> 1900-6666</p>
                          </motion.div>

                           <motion.div className='right-last'
               variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                            <p className='text-2xl'><IoCall className='inline text-4xl text-blue-950' /> 1900-8888</p>
                          </motion.div>
                            <motion.div className='right-last'
              variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5,delay: 0.5}} >
                            <p className='text-black' style={{color:'black'}}>Follow us on <FaFacebook className='inline text-black text-1xs' /> <AiFillTwitterCircle className='inline text-black text-1xs' /> <FaInstagramSquare className='inline text-black text-1xs' /></p>
                          </motion.div>
        </div>
                   </div>
    </div>
  )
}

export default Footer;