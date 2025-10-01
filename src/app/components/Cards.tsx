'use client';
import React from 'react'
import Data from '../Data/Data';
import Data2 from '../Data/Data2';
import Image from 'next/image';
import './Nav.css';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const Cards = () => {
       const variants = {
                hidden:{opacity:0, x:-100},
                visible:{opacity:1, x:0}
              }
  return (
    <div>
     <motion.div className='overall-cards'
      variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5}}>
           <h1>Explore Featured Books</h1>
            <div className='Cards flex flex-wrap justify-center'>
                {Data.map((data) =>(
                  <div key={data.id}>
                    <Image src={data.image} alt={data.name} width={300} height={300} />
                    <p className='text-center text-xl text-blue-950 font-bold'>{data.name}</p>
                    <p className='text-center'>{data.written}</p>
                  </div>
                ))}
            </div>
        </motion.div>


          <motion.div style={{marginBottom:100, marginTop:30}} className='overall-cards'
      variants={variants}
              initial="hidden"
             whileInView= "visible"
             viewport={{once:true, amount:0.5}}
              transition={{ duration: 0.5}}>
            <div className='Cards flex flex-wrap justify-center'>
                {Data2.map((data2) =>(
                  <div key={data2.id}>
                    <Image src={data2.image} alt={data2.name} width={300} height={300} />
                    <p className='text-center text-xl text-blue-950 font-bold'>{data2.name}</p>
                    <p className='text-center'>{data2.written}</p>
                  </div>
                ))}
            </div>
        </motion.div>
     </div>
  )
}

export default Cards;