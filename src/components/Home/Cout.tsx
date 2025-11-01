"use client";
import React from "react";
import CountUp from 'react-countup';

const Cout = () => {
  return (
    <div className="my-5 py-8 flex justify-center bg-gray-100">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500"><CountUp end={1000} delay={2} duration={8} enableScrollSpy={true} />+
          </div>
          <p className="text-lg text-gray-700">Happy People</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">
            <CountUp end={500} delay={2} duration={8} enableScrollSpy={true} />+
          </div>
          <p className="text-lg text-gray-700">Surgeries Completed</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">
            <CountUp end={25} delay={2} duration={8} enableScrollSpy={true} />+
          </div>
          <p className="text-lg text-gray-700">Expert Doctors</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">
            <CountUp end={12} delay={2} duration={8} enableScrollSpy={true} />+
          </div>
          <p className="text-lg text-gray-700">Worldwide Branches</p>
        </div>
      </div>
    </div>
  );
};

export default Cout;
