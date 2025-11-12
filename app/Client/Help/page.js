'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import { useSelector } from 'react-redux'
const faqs = [
 {
    question: "How do I book an appointment?",
    answer: "Go to the 'Services' page, choose a service, and click on 'Book Now'. Then select your preferred date and time.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, go to 'My Appointments' and click on the edit or cancel button next to your booking. Please note that rescheduling may depend on availability.",
  },
  {
    question: "How do I contact support?",
    answer: "You can email us at support@appoito.com or use the contact form under 'Contact Us'. We typically respond within 24 hours.",
  },
  {
    question: "Is my payment information safe?",
    answer: "Absolutely. We use encrypted payment gateways and never store your card details. Your security is our top priority.",
  },
  {
    question: "Do I need an account to book an appointment?",
    answer: "Yes. Creating an account helps us manage your bookings, send reminders, and let you view your appointment history easily.",
  },
  {
    question: "What if I forget my password?",
    answer: "On the login page, click 'Forgot Password' and follow the instructions to reset it via your registered email.",
  },
  {
    question: "Can I book multiple appointments at once?",
    answer: "Yes, you can add multiple services to your booking list before confirming your appointment.",
  },
  {
    question: "Will I receive a reminder before my appointment?",
    answer: "Yes, we send automated reminders via email or SMS a few hours before your scheduled appointment.",
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to your account settings and click 'Edit Profile' to update your name, phone number, or other details.",
  },
  {
    question: "Do you charge any cancellation fee?",
    answer: "Cancellation fees depend on the business policy. Some services may charge a small fee if cancelled within 24 hours of the appointment.",
  },
  {
    question: "Can I leave a review after my appointment?",
    answer: "Yes, after your appointment is completed, you’ll have the option to rate and review the service provider.",
  },
];
 

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);
    const darkModer = useSelector(state => state.darker.darkMode)
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen`}>
      <Navbar >
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className={`text-4xl font-semibold text-center mb-10 ${darkModer ? 'text-white' : 'text-black'}`}>Help & FAQs</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={` ${darkModer ? 'bg-[#1d2226]' : 'bg-[#f9f7f3]'} shadow-md rounded-2xl p-5 cursor-pointer transition-all duration-200`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-medium ${darkModer ? 'text-white' : 'text-black'}`}>{faq.question}</h3>
                {openIndex === index ? <ChevronUp className={`${darkModer ? 'text-white' : 'text-black'}`} /> : <ChevronDown className={`${darkModer ? 'text-blue-500' : 'text-black'}`}  />}
              </div>
              {openIndex === index && (
                <p className={`mt-3 ${darkModer ? 'text-white' : 'text-black'} leading-relaxed`}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      </Navbar>
       <footer className={`text-center text-md  py-4 ${darkModer ? 'bg-[#1d2226] text-white' : 'bg-[#f9f7f3] text-gray-600'}`}>
        © 2025 Appointo. All rights reserved.
      </footer>
    </div>
  );
}
