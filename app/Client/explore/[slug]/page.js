'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
const ExploreMore = () => {
    const params = useParams()
    const [service, setservice] = useState([])
    useEffect(() => {

        const fetcher = async () => {
            try {
                const data = await fetch(`/api/spa/${params.slug}`)
                const res = await data.json()

                console.log(res?.getService[0])
                setservice(res?.getService[0])
            } catch (error) {
                console.log('Unable to find data')
            }

        }
        fetcher()

    }, [])
    return (
        <div>
            <section className='flex justify-between items-center px-10 py-5'>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span className='text-black font-mono font-extrabold md:text-4xl'>{service?.servName}</span>
                </h1>
                <span className="text-md text-white italic">
                    <span className='text-black'>Powered by</span> <span className="font-semibold text-orange-500">Appointo</span>
                </span>

            </section>
            <section className="text-center mt-20 mb-6">
                <h2 className="md:text-4xl text-2xl font-semibold mb-2">{service?.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto md:text-2xl font-mono mt-10 px-5">
                    {service?.desc}
                </p>
            </section>
            <section className='grid md:grid-cols-3 grid-cols-1 gap-10 md:px-30 mt-20 px-10'>
                {Array.isArray(service?.services) && service?.services.map((item) => {
                    return (
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out delay-200 overflow-hidden md:h-[450px] " key={item?.id}>
                            <img src={item.image} alt="" className='w-full h-56 object-cover'/> 

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                        {item.serviceName}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                    <div className="flex items-center justify-between mb-4 text-sm text-gray-700">
                                        <span className="font-medium">{item.location}</span>
                                        <span className="font-semibold text-blue-600">{item.price}</span>
                                    </div>
                                    <div className='text-center mt-8'>
                                    <Link href = {`/Client/info/${item?.id}`}><button className='bg-black p-2 text-white  cursor-pointer hover:underline'>{item?.button}</button></Link>
                                    </div>
                                </div>

                               
                            </div>
                        </div>
                    )
                })}

            </section>
            <footer className="w-full text-center text-md text-black py-8 bg-[#fffdf9] mt-20">
                © 2025 {service.servName}. All rights reserved.
            </footer>
            

        </div>
    )
}

export default ExploreMore
