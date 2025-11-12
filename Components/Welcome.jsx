'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Landing from './Landing'
const Welcome = () => {
   const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    <motion.div
      initial={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        translateX: '-50%',
        translateY: '-50%',
        scale: 3,
        opacity: 1,
      }}
      animate={{
        top: isLoaded ? '20px' : '50%',
        left: isLoaded ? '20px' : '50%',
        translateX: isLoaded ? '0%' : '-50%',
        translateY: isLoaded ? '0%' : '-50%',
        scale: isLoaded ? 1 : 3,
        opacity: isLoaded ? 1 : 1,
      }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{
        zIndex: 50,
        position: 'fixed',
        
      }}
    >
      <h1 className='text-2xl font-mono font-bold'><span className='text-orange-600'>_</span>Appointo</h1>
    </motion.div>
   
   <motion.div initial={{opacity : 0}} animate={{opacity : isLoaded ? 1 : 0}} transition={{delay : 1, duration : 1}} style={{zIndex : 10}}>
      <Landing/>
   </motion.div>
    </div>

  )
}

export default Welcome
