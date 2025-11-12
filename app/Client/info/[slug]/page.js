'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DayPicker } from "react-day-picker";
import { useRouter } from 'next/navigation';
const InfoPage = () => {
    const params = useParams()
    const router = useRouter()
    const [details, setdetails] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [salon, setsalon] = useState([])
    const [info, setinfo] = useState({
        name: '',
        email: '',
        phone: '',

    })
    useEffect(() => {

        const fetcher = async () => {
            try {
                const data = await fetch(`/api/confirm/${params.slug}`)
                const res = await data.json()
                console.log(res)
                setdetails(res?.getService)
            } catch (error) {
                console.log('Unable to find data')
            }

        }
        fetcher()
        

    }, [])

    
    const sendBookingConfirmation = async (details) => {
        let bookingData = {
            service: details?.serviceName,
            name: info.name,
            email: info.email,
            phone: info.phone,
            date: new Date(selectedDate).toDateString(),
            time: readabletime,
            slug : details?.slug,
            price : details?.price

        }
        const data = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        })

        const res = await data.json()

        router.push(`/Client/confirmation/${details?.slug}`)

    }

    const handleChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }

    const price = details?.price.slice(1,)
    console.log(price)
    const readabletime = new Date(`1970-01-01T${selectedTime}`).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });



    return (
        <div>
            <section className='flex justify-between items-center md:px-10 py-5 px-5'>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span className='text-black font-mono font-extrabold md:text-4xl'>{details?.slug === 'salonspa' ? 'Salon Spa' : details?.slug === 'fitlife' ? 'Fitlife' : 'FreelancerHub'}</span>
                </h1>
                <span className="text-md text-white italic">
                    <span className='text-black'>Powered by</span> <span className="font-semibold text-orange-500">Appointo</span>
                </span>

            </section>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
                {/* Title */}
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Complete Your Booking
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Service Summary */}
                    <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>

                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <img
                                src={details?.image}
                                alt="Service"
                                className="rounded-lg w-full h-48 object-cover mb-3"
                            />
                            <h4 className="text-lg font-medium">{details?.serviceName}</h4>
                            <p className="text-gray-600 text-sm">{details?.location}</p>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Service Price:</span>
                            <span className="font-semibold text-blue-600">{details?.price}</span>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Tax:</span>
                            <span className="font-semibold text-blue-600">₹100</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-3">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="font-bold text-green-600">₹{parseInt(price) + 100}</span>
                        </div>
                    </div>

                    {/* Right: Booking Form */}
                    <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Your Details</h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name='name'
                                    value={info.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name='email'
                                    value={info.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name='phone'
                                    value={info.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Select Time
                                </label>
                                <input
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <span className='text-xs text-red-500'>**Review all the details before confirming**</span>

                            <button
                                type="button"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 mt-3" onClick={() => sendBookingConfirmation(details)}
                            >
                                Click to confirm booking!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPage
