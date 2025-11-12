'use client'
import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Simplify scheduling. Amplify productivity.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Appointo takes the pain out of managing appointments by automating
          bookings, payments, and reminders — so you can focus on growing your
          business.
        </p>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">1. Create your account</h3>
            <p className="text-gray-600">
              Set up your business and customize your booking page in minutes.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">2. Add your services</h3>
            <p className="text-gray-600">
              List what you offer with pricing and time duration for each
              service.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">3. Share your link</h3>
            <p className="text-gray-600">
              Let your clients book and pay instantly — no signup needed.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-blue-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-3xl">💳</span>
            <h3 className="text-lg font-semibold mt-3 mb-2">Integrated Payments</h3>
            <p className="text-gray-600">Accept secure payments with Stripe.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-3xl">🕒</span>
            <h3 className="text-lg font-semibold mt-3 mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">
              Manage time slots and avoid double bookings effortlessly.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-3xl">📅</span>
            <h3 className="text-lg font-semibold mt-3 mb-2">Calendar Sync</h3>
            <p className="text-gray-600">
              Sync with Google Calendar and stay organized.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-3xl">⚙️</span>
            <h3 className="text-lg font-semibold mt-3 mb-2">Fully Customizable</h3>
            <p className="text-gray-600">
              Tailor your booking page to match your brand style.
            </p>
          </div>
        </div>
      </section>

      {/* Why Appointo */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Appointo?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Unlike complex booking tools, Appointo is built for simplicity. Whether
          you are a freelancer, coach, or salon owner, it helps you manage your
          time, clients, and payments — all in one dashboard.
        </p>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your bookings?</h2>
        <p className="text-lg mb-8">
          Start your free trial and experience the future of scheduling today.
        </p>
        <Link
          href="/Client/Signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
        >
          Start Free
        </Link>
      </section>
    </div>
  )
}

export default page
