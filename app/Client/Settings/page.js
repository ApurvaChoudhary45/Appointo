'use client'
import { useState, useEffect } from 'react'
import { Camera, Bell, Lock, Trash2, Settings2 } from 'lucide-react'
import Navbar from '@/Components/Navbar'
import { useUser } from '@clerk/nextjs';
import { number } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from "@/lib/edgestore";
import { useSelector, useDispatch } from 'react-redux'
import { isDark } from '@/Redux/Dark/dark';
export default function SettingsPage() {
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const [clientData, setclientData] = useState([])
  const [modal, setmodal] = useState(false)
  const [error, seterror] = useState('')
  const [error1, seterror1] = useState('')
  const [extra, setextra] = useState(false)
  const [isValid, setisValid] = useState(false)
  const [file, setfile] = useState(null)
  const [photo, setphoto] = useState(false)
  const [url, seturl] = useState('')
  const { edgestore } = useEdgeStore();
  const [preview, setpreview] = useState(null)
  const darkModer = useSelector(state => state.darker.darkMode)
  const dispatch = useDispatch()
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
      console.log(obj)

      const data = await fetch('/api/getSlug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the content type
        },
        body: JSON.stringify(obj)
      })
      const res = await data.json()
      setclientData(res?.getSlug[0])

    }
    getSlug()
  }, [isLoaded, user])

  const isOpen = () => {
    setmodal(true)
  }
  const isClose = (e) => {
    setmodal(false)

  }
  const isExtra = () => {
    setextra(true)
  }

  const notExtra = () => {
    setextra(false)
  }

  const isPhoto = () => {
    setphoto(true)
  }
  const notPhoto = () => {
    setphoto(false)

  }
  
  const [profile, setProfile] = useState({
    name: clientData?.name,
    phone: clientData?.phone,
  })

  const [business, setBusiness] = useState({
    businessname: clientData?.businessname,
    address: clientData?.address,
    description: clientData?.description,
  })

  


  const [preferences, setPreferences] = useState({
    darkMode: false,
  })
  useEffect(() => {
  if (clientData && Object.keys(clientData).length > 0) {
    setProfile({
      name: clientData.name || "",
      phone: clientData.phone || "",
    });
    setBusiness({
      businessname: clientData.businessname || "",
      address: clientData.address || "",
      description: clientData.description || "",
    });
  }
}, [clientData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    // Reset flags initially
    let valid = true;

    if (name === "name") {
      // 🧠 Add parentheses to group conditions correctly
      if (value.length < 3 || value.length > 30) {
        seterror("Must be between 3–30 characters");
        valid = false;
      } else {
        seterror("");
      }
    }

    if (name === "phone") {
      // 🧠 Validate length and digits properly
      if (value.length !== 10 || isNaN(value)) {
        seterror1("Should be 10 digits and contain only numbers");
        valid = false;
      } else {
        seterror1("");
      }
    }

    setisValid(valid);
  };

  const onextrachange = (e) => {
    const { name, value } = e.target

    setBusiness({ ...business, [name]: value })
    let valid = true
    if (name === 'businessname') {
      if (value.length < 3 || value.length > 10) {
        seterror("Must be between 3–10 characters");
        valid = false;
      } else {
        seterror("");
      }
    }

    setisValid(true)

  }

  const updateInfo = async () => {
    let uploadUrl = url
    if (file) {
      const uploaded = await edgestore.publicFiles.upload({
        file
      })
      uploadUrl = uploaded?.url
      console.log(uploadUrl)
      seturl(uploadUrl)
    }
    try {
       const obj = {
      _id: clientData?._id,
      name: profile.name || clientData.name,
      phone: profile.phone || clientData.phone,
      businessname: business.businessname || clientData.businessname,
      address: business.address || clientData.address,
      description: business.description || clientData.description,
      image: uploadUrl || clientData.image,
    };
      const data = await fetch('/api/updateclientInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Set the content type
        },
        body: JSON.stringify(obj)
      })
    } catch (error) {
      console.log(error)
    }
    isClose(false)
    notExtra(false)
    setphoto(false)
  }

  const handlepreview = (e) => {
    const file = e.target.files[0]
    setfile(file)
  }
  return (
    <div>
      <Navbar>
        <div className={`min-h-screen ${darkModer ? 'bg-[black]' : 'bg-gray-50'} py-10 px-6 md:px-16`}>
          {/* Page Header */}
          <div className='flex justify-between md:px-15 items-center'>
            <div className="max-w-4xl mb-10">
              <h1 className={`text-3xl font-semibold ${darkModer ? 'text-white' : 'text-gray-700'}`}><Settings2 />Settings </h1>
              <p className="text-gray-500 mt-1">
                Manage your profile, business information, and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center  space-y-2">
              {/* Avatar Circle with SVG */}
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100">
{clientData?.image ?(<img
                      src={clientData?.image}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />) : (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
                      />
                    </svg>) }
               
              </div>

              {/* Upload Label */}
              <label className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={isPhoto}>
                <span className='text-center'>Change Photo</span>

              </label>
            </div>

          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            {/* Profile Section */}
            <section className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow p-6 md:p-8 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <Camera className="text-blue-500" />
                <h2 className={`text-xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'}`}>Profile Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Full Name</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.name}</p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Email Address</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.email}</p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Phone Number</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.phone}</p>
                </div>
              </div>

              <div className="text-right mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={isOpen}>
                  Edit
                </button>
              </div>
            </section>

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
                  ✨ Update Profile
                </h2>

                {/* Form Fields */}
                <div className="space-y-6">

                  {/* Full Name */}
                  <div className="flex flex-col space-y-2">
                    <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Full Name</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100  shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200`}
                      placeholder="Enter your name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-2">
                    <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Phone Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:border-gray-700  shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                    {error1 && <p className="text-sm text-red-500 text-center">{error1}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    disabled={!isValid}
                    onClick={updateInfo}
                    className={`px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-300 shadow-md ${isValid
                      ? "bg-blue-600 hover:bg-blue-500 active:scale-95"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            }

            {photo && <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 z-50'>
              <div className={`${ darkModer ? 'bg-gray-900' : 'bg-white/90'} w-full max-w-2xl rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 relative transition-all duration-300 hover:scale-[1.01]`}>

                {/* Close Button */}
                <button
                  onClick={notPhoto}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors text-xl"
                >
                  ✕
                </button>

                {/* Header */}
                <h2 className={`text-2xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
                  <Camera className="text-blue-500" /> Edit profile photo
                </h2>
                <div className='flex justify-center items-center flex-col gap-5'>
                  <div className="w-50 h-50 rounded- border-2 border-gray-300 flex items-center justify-center bg-gray-100 flex-col gap-4">
                    {preview ? (<img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full rounded- object-cover"
                    />) : (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
                      />
                    </svg>)}
                    <label className="text-sm text-blue-600 cursor-pointer hover:underline">
                      Change Photo
                      <input type="file" className="hidden" onChange={handlepreview} />
                    </label>

                  </div>
                  
                  <button className='bg-blue-400 p-2 rounded-xl' onClick={updateInfo}>Upload Photo</button>
                </div>




              </div>
            </div>
            }

            {extra && <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 z-50'>

              <div className={`${ darkModer ? 'bg-gray-900' : 'bg-white/90'} w-full max-w-2xl rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 relative transition-all duration-300 hover:scale-[1.01]`}>

                {/* Close Button */}
                <button
                  onClick={notExtra}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors text-xl"
                >
                  ✕
                </button>

                {/* Header */}
                <h2 className={`text-2xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
                  🏢 Update Business Info
                </h2>

                {/* Form Fields */}
                <div className="space-y-6">

                  {/* Business Name */}
                  <div className="flex flex-col space-y-2">
                    <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      placeholder="Enter your business name"
                      name="businessname"
                      value={business.businessName}
                      onChange={onextrachange}
                    />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col space-y-2">
                    <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      placeholder="Enter your address"
                      name="address"
                      value={business.address}
                      onChange={onextrachange}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col space-y-2">
                    <label className={`text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none min-h-[100px]"
                      placeholder="Enter your business description"
                      name="description"
                      value={business.description}
                      onChange={onextrachange}
                    />
                  </div>
                </div>

                {/* Update Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    disabled={!isValid}
                    onClick={updateInfo}
                    className={`px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-300 shadow-md ${isValid
                      ? "bg-blue-600 hover:bg-blue-500 active:scale-95"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            }

            {/* Business Section */}
            <section className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow p-6 md:p-8 border border-gray-100`}>
              <h2 className={`text-xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'} mb-6`}>🏢 Business Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Business Name</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.businessname}</p>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Address</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.address}</p>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkModer ? 'text-white' : 'text-gray-800'}`}>Description</label>
                  <p className='text-blue-500 md:text-xl'>{clientData?.description}</p>
                </div>
              </div>

              <div className="text-right mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={isExtra}>
                  Edit Business Info
                </button>
              </div>
            </section>

            {/* Notification Section */}
            <section className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow p-6 md:p-8 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-yellow-500" />
                <h2 className={`text-xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'}`}>Notifications</h2>
              </div>

              <div className="space-y-4 flex justify-between items-center">
                <span className={`mt-2 ${darkModer ? 'text-white' : 'text-gray-800'}` }>
                  Dark Mode
                </span>
                 <label className="relative w-14 h-8 rounded-2xl  cursor-pointer" >
                        {/* Hidden checkbox */}
                        <input type="checkbox" className="sr-only peer" onClick={()=>dispatch(isDark())}  />

                        {/* Slider background */}
                        <div className={`w-14 h-8 bg-transparent rounded-full ${darkModer ? 'border-2 border-white' : 'border-1'} peer-checked:bg-transparent transition duration-300 `}></div>

                        {/* Toggle circle */}
                        <div className="absolute left-1 top-1  w-6 h-6 rounded-full transition-all duration-300 peer-checked:translate-x-6">{darkModer ? '🌙' : '🌞'}</div>
                    </label>
              </div>
            </section>

            {/* Security Section */}
            <section className={`${darkModer ? 'bg-[#1d2226]' : 'bg-white'} rounded-2xl shadow p-6 md:p-8 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-red-500" />
                <h2 className={`text-xl font-semibold ${darkModer ? 'text-white' : 'text-gray-800'}`}>Account & Security</h2>
              </div>

              <div className="space-y-3">
                <button className={`px-5 py-2 border border-gray-300 rounded-lg  transition ${darkModer ? 'text-white hover:bg-black' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Change Password
                </button>



                <button className="px-5 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </button>
              </div>
            </section>
          </div>
        </div>
        
      </Navbar>
      <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
    </div>
  )
}
