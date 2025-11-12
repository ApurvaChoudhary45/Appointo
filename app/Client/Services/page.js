'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import { useEdgeStore } from "@/lib/edgestore";
import { useSelector, useDispatch } from 'react-redux'
const Services = () => {
  const darkModer = useSelector(state => state.darker.darkMode)
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const [clientData, setclientData] = useState([])
  const [userData, setuserData] = useState([])
  const [modal, setmodal] = useState(false)
  const [error1, seterror1] = useState('')
  const [isValid, setisValid] = useState(false)
  const [file, setfile] = useState(null)
  const { edgestore } = useEdgeStore();
  const [url, seturl] = useState('')

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
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

  const [profile, setProfile] = useState({
    name: '',
    location : '',
    price: '',
    description: ''
  })

  useEffect(() => {
    if (!clientData?.slug) return;
    const getUser = async () => {
      let obj = {
        slug: clientData?.slug
      }
      console.log(obj)

      const data = await fetch('/api/clientslug', {
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

  const isOpen = () => {
    setmodal(true)
  }

  const isClose = () => {
    setmodal(false)
  }
  const [errors, setErrors] = useState({
  name: "",
  price: "",
  location: ""
});

 const handleChange = (e) => {
  const { name, value } = e.target;
  setProfile({ ...profile, [name]: value });

  let errorMsg = "";
  let valid = true;

  if (name === "name" && (value.length < 3 || value.length > 10)) {
    errorMsg = "Must be between 3–10 characters";
    valid = false;
  }

  if (name === "price" && (isNaN(value) || value.length === 0)) {
    errorMsg = "Price must be a number";
    valid = false;
  }

  if (name === "location" && value.trim().length < 2) {
    errorMsg = "Enter a valid location";
    valid = false;
  }

  setErrors({ ...errors, [name]: errorMsg });
  setisValid(valid);
};

  const saveService = async () => {
    let uploadUrl = ''
    if (file) {
      const uploaded = await edgestore.publicFiles.upload({
        file
      })
      uploadUrl  = uploaded?.url
      console.log(uploadUrl)
      seturl(uploadUrl)
    }
    let obj = {
      serviceName : profile.name,
      location : profile.location,
      price : profile.price,
      description : profile.description,
      slug : clientData?.slug,
      image : url
    }
    const data = await fetch('/api/updatePost', {method : 'POST',
      headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(obj)
    })
    setmodal(false)
  }


  return (
    <div>
      <Navbar>
        <div className='flex justify-end items-center'>
          <button className='bg-blue-400 p-2 rounded-2xl flex font-mono gap-2' onClick={isOpen}><PlusIcon></PlusIcon> Add a service</button>
        </div>
        {modal && <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 z-50'>
          <div className={`${ darkModer ? 'bg-gray-900' : 'bg-white/90'} w-full max-w-2xl rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 relative transition-all duration-300 hover:scale-[1.01]`}>

            {/* Close Button */}
            <button
              onClick={isClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className={`text-2xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
              Fill the details
            </h2>

            {/* Form Fields */}
            <div className="space-y-6">

              {/* Full Name */}
              <div className="flex flex-col space-y-2">
                <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Service Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="Enter service name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-sm text-red-500 text-center">{errors.name}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="Enter your city"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
                {errors.location && <p className="text-sm text-red-500 text-center">{errors.location}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Description</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="Add description..."
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                />
                
              </div>

              <div className="flex flex-col space-y-2">
                <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Price</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="Enter your price"
                  name="price"
                  value={profile.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-sm text-red-500 text-center">{errors.price}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <input type="file" className='bg-orange-100 w-1/3' onChange={(e) => setfile(e.target.files[0])} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                disabled={!isValid}
                onClick={saveService}
                className={`px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-300 shadow-md ${isValid
                  ? "bg-blue-600 hover:bg-blue-500 active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
        }
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
          {Array.isArray(userData) && userData.map((item) => (
            <div
              key={item?._id}
              className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden`}
            >
              <img
                src={item.image}
                alt={item.serviceName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className={`text-xl font-semibold mb-2 ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                  {item.serviceName}
                </h3>
                <p className={` ${darkModer ? 'text-white' : 'text-gray-800'} text-sm mb-3`}>{item.description}</p>
                <div className={`flex items-center justify-between text-sm  ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                  <span>{item.location}</span>
                  <span className='font-semibold text-blue-500'>{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Navbar>

      <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
    </div>
  )
}

export default Services
