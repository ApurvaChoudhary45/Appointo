"use client";
import React from "react";
import Link from "next/link";
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useState } from "react";
import { useAuth } from '@clerk/nextjs';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FirstTimeUserDashboard() {
    const { userId, isSignedIn } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    
 

    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')
    const [isValid, setisValid] = useState(false)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    useEffect(() => {
      if(!isLoaded) return
      if( !isSignedIn){
        router.push('/')
      }
     }, [isSignedIn, router])

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase().trim()
        setSlug(value)

        if (value.length < 3 || value.length > 30) {
            setError('Must be between 3–30 characters.')
            setisValid(false)
        }
        else if (!slugRegex.test(value)) {
            setError("Use only lowercase letters, numbers, and single hyphens.");
            setisValid(false);
        }
        else {
            setError("");
            setisValid(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            id: userId,
            name: user.username,
            email: user.primaryEmailAddress?.emailAddress,
            slug : slug
        }
        const data = await fetch('/api/generate-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(obj)
        })
        setSlug('')
        router.push('/Client/Dashboard')


    }

    return (
        <>
            <SignOutButton redirectUrl='/'><h1 className='text-2xl font-mono font-bold absolute px-5 py-5'><span className='text-orange-600'>_</span>Appointo</h1></SignOutButton>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Welcome to Appointo 🎉
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Create your unique booking link so clients can book you easily.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-700">
                            Your booking link
                        </label>
                        <div className="flex">

                            <input
                                type="text"
                                placeholder="your-name"
                                value={slug}
                                onChange={handleChange}
                                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    {error && (
                        <p style={{ color: "#f44336", fontSize: "0.9rem", marginTop: "6px" }}>
                            {error}
                        </p>
                    )}

                    {!error && slug && (
                        <p style={{ color: "gray", fontSize: "0.9rem", marginTop: "6px" }}>
                            Preview: <b>http://localhost:3000/book/{slug}</b>
                        </p>
                    )}

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition-colors" disabled={!isValid} onClick={handleSubmit}>
                        Generate Link
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        You can change this later in settings.
                    </p>
                </div>
            </div>
        </>
    );
}

