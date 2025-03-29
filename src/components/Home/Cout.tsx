"use client";
import React from "react";

const Cout = () => {
  return (
    <div className="mt-5 py-4 flex justify-center bg-gray-200">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">58K</div>
          <p className="text-lg text-gray-700">Happy People</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">700+</div>
          <p className="text-lg text-gray-700">Surgeries Completed</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">40+</div>
          <p className="text-lg text-gray-700">Expert Doctors</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-500">20+</div>
          <p className="text-lg text-gray-700">Worldwide Branches</p>
        </div>
      </div>
    </div>
  );
};

export default Cout;
