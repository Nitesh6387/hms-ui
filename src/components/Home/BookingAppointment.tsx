"use client";

const BookingAppointment = () => {
  return (
    <section className=" py-16 px-6 md:px-16 bg-gray-200 mt-5">
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
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
  );
};

export default BookingAppointment;
