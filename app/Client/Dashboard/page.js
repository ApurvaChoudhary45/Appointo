'use client'
import React from 'react'

import { useState, useEffect } from 'react'
import {  CopyIcon } from "lucide-react";

import { usePathname } from 'next/navigation';
import {  useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'
import Link from 'next/link';
import Navbar from '@/Components/Navbar';

const Dashboard = () => {
  const router = useRouter()
  const darkModer = useSelector(state => state.darker.darkMode)
  const { user, isLoaded, isSignedIn } = useUser()
  
 const [clientData, setclientData] = useState([])
 const [userData, setuserData] = useState([])

 
  const recentActivity = [
    "John Doe booked an appointment at 3:00 PM",
    "Sara Paul canceled an appointment",
    "Ravi Kumar rescheduled his appointment",
  ]

 const copylink = async(link)=> {
   const baseUrl = window.location.origin; // dynamically gets correct domain
  const fullUrl = `${baseUrl}${link}`;
  await navigator.clipboard.writeText(fullUrl)
  alert('Linked copied to the clipboard.')
 }

 useEffect(() => {
  if(!isLoaded) return
  if( !isSignedIn){
    router.push('/')
  }
 }, [isSignedIn, router])

 
  useEffect(() => {
     if(!user || !isLoaded) return
    const getSlug = async()=>{
      let obj = {
        email : user?.primaryEmailAddress?.emailAddress
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
    if (!clientData?.slug) return; 
     const getUser = async()=>{
      let obj = {
        slug : clientData?.slug
      }
      
      
      const data = await fetch('/api/getuserdata', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(obj)
      })
      const res = await data.json()
      console.log(res?.getService)
      setuserData(res?.getService)
    }
    getUser()
  }, [clientData?.slug])

  
  return (
    <div>
      <Navbar>
        <main className={`flex-1 ${darkModer ? 'bg-black' : 'bg-[#f9f7f3]' }  p-6 overflow-y-auto min-h-screen`}>
          <section className='md:flex justify-around items-center'>
            <h1 className={`text-2xl md:text-3xl font-bold font-mono ${darkModer ? 'text-white' : 'text-black'}`}>
              👋 Welcome back, <span className="text-green-300">!</span>
            </h1>
            <div className={`p-6  ${darkModer ? 'bg-[#1d2226]' : 'bg-[#f9f7f3]'} rounded-lg shadow-md md:w-1/3 w-full`}>
              <h2 className={`md:text-lg font-semibold ${darkModer ? 'text-white' : 'text-black'}`}>Your Booking Link</h2>
              <div className='flex justify-between items-center'>
              <p className={`text-gray-700 mt-2 ${darkModer ? 'text-white' : 'text-black'} text-xs md:text-md`}>
               { `/Client/book/${clientData?.slug}`}
              </p>
              <CopyIcon className='w-4 h-4 hover:text-blue-400 cursor-pointer' onClick={()=>copylink(`/Client/book/${clientData?.slug}`)}/>
              </div>
              <span className={`text-xs ${darkModer ? 'text-white' : 'text-black'}`}>Note:-Share this link with your clients to receive bookings.</span>
              
            </div>
          </section>
           <div className={` p-8 mt-20 ${darkModer ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Page Title */}
      <h1 className={`md:text-3xl text-xl font-semibold mb-8 ${darkModer ? 'text-white' : 'text-black'} `}>Dashboard Overview</h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Upcoming Appointments */}
        <div className={`${darkModer ? 'bg-[#1d2226]' : 'bg-gray-50'} rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition`}>
          <h2 className={`md:text-lg font-semibold ${darkModer ? 'text-white' : 'text-text-gray-800 '}   mb-4`}>
            Upcoming Appointments
          </h2>

          {userData.length === 0 ? <p className={`${darkModer ? 'text-white' : 'text-black'}  md:text-md `}>No bookings yet!</p>: <div className="space-y-5">
            {Array.isArray(userData) && userData?.map((item) => (
              
             
              <div
                key={item?._id}
                className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div className="md:flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <span
                    className= 'text-xs px-2 py-1 rounded-full font-medium "bg-green-100 text-green-700'>
                      Confirmed
                  </span>
                  <span
                    className= 'text-xs px-2 py-1 rounded-full font-medium "bg-green-100 text-red-700 hover:underline cursor-pointer'>
                      Cancel
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Service:</span> {item.service}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {item.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {item.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Time:</span> {item.time}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Amount:</span> {item.price}
                </p>
              </div>
            ))}
          </div>}
        </div>

        {/* Revenue Overview */}
        <div className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'}  rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-center items-center hover:shadow-md transition`}>
          <h2 className={`md:text-lg font-semibold ${darkModer ? 'text-white' : 'text-gray-800'}  mb-3`}>
            Revenue Overview
          </h2>
          <p className={`md:text-4xl font-bold ${darkModer ? 'text-white' : 'text-gray-800'}`}>₹12,350</p>
          <p className={`text-sm ${darkModer ? 'text-white' : 'text-gray-800'} mt-1`}>This Month</p>
          
        </div>

        {/* Recent Activity */}
        <div className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition`}>
          <h2 className={`text-lg font-semibold ${darkModer ? 'text-white' : 'text-gry-800'}  mb-4`}>
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className={`${darkModer ? 'text-white' : 'text-gray-800'}  text-sm`}>{activity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
        </main>
        </Navbar>
         <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
      </div>

      

  
  )
}

export default Dashboard
