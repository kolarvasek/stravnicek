import React from "react";
import Navbar from "../components/Navbar";

const Aboutus = () => {
  return (
    <>
    <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black pt-16">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-2 text-center max-w-md">
          We are a team of passionate individuals committed to delivering
          high-quality services and innovative solutions. Our mission is to
          inspire creativity, productivity, and collaboration with a strong focus
          on community values and innovation.
        </p>
        <p className="text-lg mb-2 text-center max-w-md">
          Founded in 2020, our goal has always been to deliver user-friendly
          solutions and ensure a seamless experience for all our users.
        </p>
        <p className="text-lg mb-2 text-center max-w-md">
          We value transparency, innovation, and commitment, and are dedicated to
          making a difference through thoughtful design and development.
        </p>
      </div>
    </>
  );
};

export default Aboutus;
