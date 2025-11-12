'use client'
import React from 'react'
import Footer from './Footer'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs';

const Landing = () => {
    const user = useUser()
    console.log(user)
    
  return (
    <main className=" bg-[#fffdf9] text-gray-800 relative z-50">
      {/* Navbar */}
      <h1 className='text-2xl font-mono font-bold absolute px-5 py-5'><span className='text-orange-600'>_</span>Appointo</h1>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-2s4 px-6 py-30">
        <h2 className="md:text-5xl text-3xl font-bold mb-6 font-mono text-shadow-2xl">
          Manage your appointments.<br /> Get paid instantly.
        </h2>
        <p className="md:text-lg text-md text-gray-600 max-w-2xl mb-10">
          Appointo helps service providers accept bookings, manage schedules, and collect payments — all in one place.
        </p>
        <div className='flex justify-center items-center gap-2'>
        <Link href='/Client/Login'><button className="bg-indigo-600 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-indigo-700 transition">
          Log In
        </button></Link>
        <Link href='/Client/SignUp'><button className="bg-indigo-600 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-indigo-700 transition">
          Sign Up
        </button></Link>
        </div>


      </section>

       {/* Payment Section */}
      <section id="payments" className=" text-center bg-[#fffdf9] mx-10">
        <h3 className="text-3xl font-semibold mb-6">What is Appointo?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-mono ">
          Appointo is an online appointment scheduling platform that helps businesses manage bookings, meetings, and services seamlessly. It allows customers to book time slots based on real-time availability while automating confirmations and reminders. Businesses can customize their booking pages, sync calendars, and integrate with tools like Google Meet or Zoom. It’s designed to simplify time management and improve client engagement for service-based companies
        </p>
       
      </section>

      {/* How it Works */}
      <section id="how" className="py-4 text-center bg-[#fffdf9]">
        <div className="grid md:grid-cols-3 gap-10 px-10 max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl hover:shadow-md transition">
            <div className="text-indigo-600 text-4xl mb-4">👤</div>
            <h4 className="text-xl font-semibold mb-2">1. Create your account</h4>
            <p className="text-gray-600 font-mono">Sign up as a service provider and personalize your profile.</p>
          </div>
          <div className="p-8 rounded-2xl hover:shadow-md transition">
            <div className="text-indigo-600 text-4xl mb-4">🔗</div>
            <h4 className="text-xl font-semibold mb-2">2. Get your booking link</h4>
            <p className="text-gray-600 font-mono">Share your unique link like appointo.com/book/johns-salon.</p>
          </div>
          <div className="p-8 rounded-2xl hover:shadow-md transition">
            <div className="text-indigo-600 text-4xl mb-4">💰</div>
            <h4 className="text-xl font-semibold mb-2">3. Start collecting payments</h4>
            <p className="text-gray-600 font-mono">Your clients can book and pay instantly via Stripe.</p>
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section id="clients" className="py-8 text-center bg-[#fffdf9] mx-10">
        <h3 className="text-3xl font-semibold mb-12">For Your Clients</h3>
        <div className="max-w-3xl mx-auto text-gray-600 md:text-lg font-mono">
          <p className="mb-6">
            Your clients can easily pick a date, pay securely, and receive instant confirmation — no emails or calls required.
          </p>
          <p>
            Give your clients a smooth booking experience that feels effortless and professional.
          </p>
        </div>
      </section>

     

      {/* Footer */}
      <Footer/>
    </main>
  )
}

export default Landing
