'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation';
import {  SignIn } from '@clerk/nextjs'
const ClientSignUp = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [conPass, setConPass] = useState('')
    const router = useRouter()


    
    return (
        <div>
            <Link href='/'><h1 className='text-2xl font-mono font-bold absolute px-5 py-5'><span className='text-orange-600'>_</span>Appointo</h1></Link>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Left: Welcome / Branding */}
                    <aside className="hidden md:flex flex-col justify-center items-start p-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                        <h1 className="text-2xl font-extrabold mb-2 font-mono">Automate bookings, schedules, and payments — all in one platform.</h1>
                        <p className="text-sm opacity-90 mb-6">

                            Empower your business to save time, stay organized, and grow faster with effortless client scheduling.
                        </p>

                        <div className="w-full">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="inline-block w-2 h-2 bg-white rounded-full mt-2/3" />
                                    <span>Create and share your custom booking link in seconds</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="inline-block w-2 h-2 bg-white rounded-full mt-2/3" />
                                    <span>Manage clients, meetings, and payments from one dashboard</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="inline-block w-2 h-2 bg-white rounde   d-full mt-2/3" />
                                    <span>Integrate with Google Calendar, Zoom, and Stripe — no code required</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-auto text-xs opacity-90">
                            <span>Do not have an account create one today?</span>
                            <div className="mt-2 inline-flex items-center gap-2">
                                <Link href='/Client/SignUp'><button className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm">
                                    Sign Up
                                </button></Link>

                                <Link href='/Extras/LearnMore'><button className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                                    Learn more
                                </button></Link>
                            </div>
                        </div>
                    </aside>

                    {/* Right: Forms */}
                    <main className="md:px-10 ">
                        <div className="max-w-md md:mx-auto ">
                            {/* Toggle / Tabs (visual only) */}
                            
                            <SignIn routing="hash" redirectUrl="/Client/Dashboard" />

                           
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ClientSignUp
