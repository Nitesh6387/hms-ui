"use client";
import Image from "next/image";
const BookingAppointment = () => {
  return (
    <div className="flex justify-center items-center py-16 gap-16 bg-gray-100 mt-5">
      <div className="hidden lg:block">
        <Image alt="login" width={500} height={500} src="/Images/appointment.svg" />
      </div>
      <section className="p-4 md:px-8 ">
        <div className="mx-auto min-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Book an Appointment
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Appointment Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Appointment Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Department</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500">
                <option>Select Department</option>
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
                <option>Pediatrics</option>
                <option>Piles Treatment</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold">Message (Optional)</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="Additional details (if any)"
              />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg text-lg font-semibold">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </section>
      
    </div>
  );
};

export default BookingAppointment;
