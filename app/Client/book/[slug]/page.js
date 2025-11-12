'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
const ClientService = () => {
    const [salon, setsalon] = useState([])
    const params = useParams()
    useEffect(() => {

        const fetcher = async () => {
            try {
                const data = await fetch(`/api/service/${params.slug}`)
                const res = await data.json()
                setsalon(res?.getService[0])
                console.log(res)
            } catch (error) {
                console.log('Unable to find data')
            }

        }
        fetcher()

    }, [])

    return (
        <div className="min-h-screen relative">
            <video
                src={salon.Img1}
                className="absolute inset-0 w-full md:h-[65vh] h-[40vh] object-cover blur-xs"
                autoPlay
                muted
                loop
                playsInline
            >

                Your browser does not support the video tag.
            </video>
            <div className="w-full flex justify-between items-center  relative z-50 md:px-30 py-10 px-5">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span className='text-white font-mono font-extrabold md:text-4xl'>{salon.ServiceName}</span>
          </h1>
          <span className="text-md text-white italic">
            Powered by <span className="font-semibold text-orange-500">Appointo</span>
          </span>
        </div>
        <section className='relative z-50 flex justify-center items-center flex-col md:px-40 py-10 px-5'>
            <h2 className='md:text-4xl font-mono font-bold text-white'>{salon.Description}</h2>
            <p className="text-white md:mt-18 mt-8 italic text-center text-xl">
          {salon.TagLine}
        </p>
        </section>
        <section className='relative z-50 md:flex justify-around items-center px-5 md:mt-50 mt-10 flex flex-col md:flex-row gap-5'>
            <h2 className='md:text-4xl text-3xl font-mono font-bold '>Our Services</h2>
            <img src={salon.Img2} alt="noimg" className='md:w-[25%] rounded-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer'/>
            <img src={salon.Img3} alt="noimg" className='md:w-[25%] rounded-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer'/>
            <img src={salon.Img4} alt="noimg" className='md:w-[25%] rounded-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer'/>
        </section>
        <section className='relative z-50 flex justify-center items-center px-10 md:mt-30 mt-10 flex-col gap-20'>
            <Link href={`/Client/explore/${salon.Slug}`}><button className='md:text-2xl rounded-2xl p-3 bg-orange-400 font-mono font-extrabold cursor-pointer hover:underline'>Explore All Services</button></Link>
            <p className='md:text-4xl font-mono font-bold md:mt-5 text-xl'>{salon.Description}</p>
            <button className='bg-gray-100 p-3 md:text-xl rounded-2xl hover:scale-105 cursor-pointer'>Book an Appointment! <span className='text-orange-400'>Now</span></button>
             
           
        </section>
        <footer className="w-full text-center text-md text-black py-8 bg-[#fffdf9] mt-20">
          © 2025 {salon.ServiceName}. All rights reserved.
        </footer>

        </div>
    )
}

export default ClientService
