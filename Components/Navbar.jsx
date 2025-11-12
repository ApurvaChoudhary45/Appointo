'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, HelpCircle, ChevronDown, PowerCircleIcon, Menu, X } from "lucide-react";
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useSelector } from 'react-redux';

const Navbar = ({ children }) => {
  const darkModer = useSelector((state) => state.darker.darkMode);
  const pathName = usePathname();
  const { user, isLoaded } = useUser();
  const leftBar = ['Dashboard', 'Services', 'Bookings', 'Unique-Link', 'Settings'];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* ✅ Top Navbar */}
      <nav
        className={`${darkModer ? 'bg-[#1d2226]' : 'bg-[#fffdf9]'} flex justify-between items-center px-6 py-3 shadow-sm`}
      >
        <div className="flex items-center gap-4">
          {/* Hamburger (Visible on Mobile) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <X className={`${darkModer ? 'text-white' : 'text-black'} h-6 w-6`} />
            ) : (
              <Menu className={`${darkModer ? 'text-white' : 'text-black'} h-6 w-6`} />
            )}
          </button>

          {/* Logo */}
          <Link href="/">
            <h1 className="text-xl font-mono font-extrabold">
              <span className={`${darkModer ? 'text-blue-400' : 'text-orange-500'}`}>_</span>
              <span className={`${darkModer ? 'text-white' : 'text-black'}`}>Appointo</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-6 ">
          {/* Help */}
          <Link
            href="/Client/Help"
            className="text-gray-600 flex items-center gap-1 text-sm font-medium"
          >
            <HelpCircle className={`${darkModer ? 'text-white' : 'text-black'} h-4 w-4`} />
            <span className={`${darkModer ? 'text-blue-400' : 'text-black'} hover:text-gray-500`}>
              Help
            </span>
          </Link>

          {/* Upgrade button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition">
            Upgrade Plan
          </button>

          {/* User Info */}
          <div className="hidden md:flex items-center gap-1">
            <span
              className={`${darkModer ? 'text-white' : 'text-gray-800'} font-medium text-sm`}
            >
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </nav>
      <hr />

      {/* ✅ Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        <aside
          className={`hidden md:flex w-1/5 ${
            darkModer ? 'bg-[#1d2226]' : 'bg-[#fffdf9]'
          } border-r border-gray-200 p-6 flex-col justify-between`}
        >
          <div className="space-y-4">
            {leftBar.map((item, index) => {
              const path = `/Client/${item}`;
              const active = path === pathName;
              return (
                <div className="relative" key={index}>
                  <Link href={path}>
                    <button
                      className={`relative text-md font-sans font-bold hover:text-blue-400 cursor-pointer ${
                        darkModer ? 'text-blue-400' : 'text-black'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="active"
                          className={`absolute inset-0 ${
                            darkModer ? 'bg-white' : 'bg-orange-200'
                          } rounded-lg w-full`}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-30 p-2">{item}</span>
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>

            
          <div className="flex items-center gap-3 text-gray-700 bg-orange-400 w-1/2 p-2 rounded-2xl hover:bg-orange-300 ">
          
            <PowerCircleIcon className="hover:text-orange-400" />
            <SignOutButton redirectUrl="/" />
          </div>
        </aside>

        {/* Sidebar (mobile slide-in) */}
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className={`fixed top-0 left-0 z-50 h-full w-3/4 ${
            darkModer ? 'bg-[#1d2226]' : 'bg-white'
          } border-r border-gray-300 p-6 flex flex-col justify-between md:hidden`}
        >
          <div className="space-y-6 mt-15">
            {leftBar.map((item, index) => {
              const path = `/Client/${item}`;
              const active = path === pathName;
              return (
                <div className="relative" key={index}>
                  <Link href={path} onClick={() => setIsSidebarOpen(false)}>
                    <button
                      className={`relative text-md font-sans font-bold hover:text-blue-400 cursor-pointer ${
                        darkModer ? 'text-blue-400' : 'text-black'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="active"
                          className={`absolute inset-0 ${
                            darkModer ? 'bg-white' : 'bg-orange-200'
                          } rounded-lg w-full`}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-30 p-2">{item}</span>
                    </button>
                  </Link>
                  
                </div>
              );
            })}
            
          </div>
            <div className='absolute'><span className='text-sm font-bold'>Logged In as {user?.primaryEmailAddress?.emailAddress}</span></div>
          <div className="flex items-center gap-3 text-gray-700 bg-orange-400 w-3/4 p-2 rounded-2xl hover:bg-orange-300">
          
            <PowerCircleIcon className="hover:text-orange-400" />
            <SignOutButton redirectUrl="/" />
          </div>
        </motion.aside>

        {/* Backdrop (mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main
          className={`flex-1 overflow-y-auto ${
            darkModer ? `bg-[#131a22]` : 'bg-[#f9f9f9]'
          } p-8`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;
