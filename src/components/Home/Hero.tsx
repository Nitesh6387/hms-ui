"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center md:py-24 my-16 px-6 md:px-16  ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="text-center md:text-left max-w-2xl ">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Providing high-quality healthcare services with the best medical experts.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/services"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition"
            >
              Book an Appointment
            </Link>
            <Link
              href="/about"
              className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Images/img3.jpg"
            alt="Doctor"
            width={500}
            height={500}
            className="rounded-4xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

