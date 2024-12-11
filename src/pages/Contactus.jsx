import React from 'react'
import Navbar from '../components/Navbar'

const Contactus = () => {
  return (
    <div>
    <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
        <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
        <p className="text-lg mb-2">Email: contact@example.com</p>
        <p className="text-lg mb-2">Phone: +1 (555) 123-4567</p>
        <p className="text-lg mb-2">Address: 123 Main Street, City, Country</p>
      </div>
    </div>
  );
}

export default Contactus