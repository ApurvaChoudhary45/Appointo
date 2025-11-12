'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
const Services = () => {
  const darkModer = useSelector(state => state.darker.darkMode)
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const [clientData, setclientData] = useState([])
  const [userData, setuserData] = useState([])

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
    if (!clientData?.slug) return;
    const getUser = async () => {
      let obj = {
        slug: clientData?.slug
      }
      console.log(obj)

      const data = await fetch('/api/getuserdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the content type
        },
        body: JSON.stringify(obj)
      })
      const res = await data.json()
      console.log(res)
      setuserData(res?.getService)
    }
    getUser()
  }, [clientData?.slug])

  const cancelEmail = async () => {
    let obj = {
      email : userData[0]?.email,
      name : userData[0]?.name,
      service : userData[0]?.service,
      _id : userData[0]?._id
    }
    const data = await fetch('/api/cancelEmail', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // Set the content type
      },
      body: JSON.stringify(obj)
    })
     
  }

  return (
    <div >
      <Navbar>
        {userData.length === 0 ? <p className={`text-center text-xl ${darkModer ? 'text-white' : 'text-black'} `}>No bookings yet!</p> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.isArray(userData) && userData.map((item) => (
            <div
              key={item?._id}
              className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden`}
            >

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.service}
                </h3>

                <p className="text-gray-600 text-sm mb-3">{item.name}</p>
                <p className="text-gray-600 text-sm mb-3">{item.date}</p>
                <div className="flex items-center justify-between text-sm text-gray-700">

                  <span>{item.time}</span>
                  <span>{item.phone}</span>
                  <span className="font-semibold text-blue-600">{item.price}</span>
                </div>
                <div className="flex items-center justify-end mt-5">

                  <span
                    className='text-xs px-2 py-1 rounded-full font-medium "bg-green-100 text-green-700'>
                    Confirmed
                  </span>
                  <span
                    className='text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-red-700 hover:underline cursor-pointer' onClick={cancelEmail}>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>}


      </Navbar>
      <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
    </div>
  )
}

export default Services
