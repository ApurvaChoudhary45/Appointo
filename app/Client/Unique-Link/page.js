'use client'
import Navbar from '@/Components/Navbar'
import React from 'react'
import { useState, useEffect } from 'react'
import { CopyIcon, ArrowUpRight, Edit2Icon } from "lucide-react";
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Spinner from '@/Components/Spinner';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'
const UniqueLink = () => {
    const router = useRouter()
    const { user, isLoaded, isSignedIn } = useUser()
    const [clientData, setclientData] = useState([])
    const [modal, setmodal] = useState(false)
    const [slug, setslug] = useState('')
    const [loading, setloading] = useState(false)
    const darkModer = useSelector(state => state.darker.darkMode)

    useEffect(() => {
      if(!isLoaded) return
      if( !isSignedIn){
        router.push('/')
      }
     }, [isSignedIn, router])
   
    useEffect(() => {
        if (!user || !isLoaded) return
        const getSlug = async () => {
            let obj = {
                email: user?.primaryEmailAddress?.emailAddress
            }
            console.log(obj)

            const data = await fetch('/api/getSlug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(obj)
            })
            const res = await data.json()
            console.log(res)
            setclientData(res?.getSlug[0])

        }
        getSlug()
    }, [isLoaded, user])

    useEffect(() => {
        if(!clientData.slug) return
        setslug(clientData?.slug)
    }, [clientData?.slug])


    const copylink = async (link) => {
         const baseUrl = window.location.origin; // dynamically gets correct domain
  const fullUrl = `${baseUrl}${link}`;
        await navigator.clipboard.writeText(fullUrl)
        alert('Linked copied to the clipboard.')
    }

    const isOpen = () => {
        setmodal(true)
    }

    const onClose = ()=>{
        setmodal(false)
    }

    const updateSlug = async()=>{
        setloading(true)
        let obj = {
            slug : clientData?.slug,
            newslug : slug
        }
        const send = await fetch('/api/updateAll', {method : 'PUT',
             headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
        })
        setloading(false)
        setmodal(false)

    }
    
   
    return (
        <div>
            {loading ? <Spinner/> :  <Navbar>
                <div className={`p-6 ${darkModer ? 'bg-[#1d2226]' : 'bg-[#f9f7f3]'} rounded-lg shadow-md md:w-1/3 `}>
                    <h2 className={` ${darkModer ? 'text-white' : 'text-gray-800'} text-lg font-semibold`}>Your Booking Link</h2>
                    <div className='flex justify-between items-center'>
                        <p className={` mt-2  ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                            {`/Client/book/${clientData?.slug}`}
                        </p>
                        <CopyIcon className='w-4 h-4 hover:text-blue-400 cursor-pointer' onClick={() => copylink(`/Client/book/${clientData?.slug}`)} />
                    </div>
                    <span className={`text-xs ${darkModer ? 'text-white' : 'text-gray-800'}`}>Note:-Share this link with your clients to receive bookings.</span>

                </div>
                {modal && <div className='fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30'>
                    <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative'>
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 "
                        >
                            ✕
                        </button>
                        <div className='flex justify-center items-center flex-col gap-5'>
                            <input type="text" placeholder='Your unique link' className='text-center p-2 w-3/4 text-xl' value={slug} onChange={(e)=>setslug(e.target.value)} />
                        <button className='p-2 bg-blue-400 rounded-lg' onClick={updateSlug}>Submit</button>
                        </div>
                        
                    </div>
                </div>}
                <div className={`p-6 ${darkModer ? 'bg-[#1d2226]' : 'bg-[#f9f7f3]'} rounded-lg shadow-md w-full mt-10`}>
                    <h2 className={`text-lg font-semibold ${darkModer ? 'text-white' : 'text-black'}`}>Current Link</h2>
                    <div className='md:flex justify-between items-center'>
                        <p className={`${darkModer ? 'text-white' : 'text-gray-700'} mt-2`}>
                            {`/Client/book/${clientData?.slug}`}
                        </p>
                        <div className='flex justify-end gap-5'>
                            <CopyIcon className='w-4 h-4 hover:text-blue-400 cursor-pointer' onClick={() => copylink(`/Client/book/${clientData?.slug}`)} />
                            <Link href={`/Client/book/${clientData?.slug}`} target="_blank" rel="noreferrer"><ArrowUpRight className='w-4 h-4 hover:text-blue-400 cursor-pointer' /></Link>
                            <Edit2Icon className='w-4 h-4 hover:text-blue-400 cursor-pointer' onClick={isOpen} />
                        </div>

                    </div>
                    <span>Last Updated on: </span>
                    

                </div>
                <div className='mt-10'>
                    <span className='mt-20 text-sm text-blue-500'>**Changing your link will automatically update it for all new clients.**</span>
                </div>
                
                

            </Navbar>}
           <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
        </div>
        
    )
}

export default UniqueLink
