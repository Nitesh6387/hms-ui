const InfoSection = () => {
  return (
    <section className="relative bg-gray-100 px-6 md:px-16 py-16">
      {/* Info Boxes (Now Positioned Above Hero Section) */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:-mt-32 z-10 relative">

        {/* Online Appointment */}
        <div
          className="bg-gray-800 p-6 rounded-lg border shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Online Appointment</h2>
          <p className="mb-4">
            Schedule an appointment with our expert doctors at your convenience.
          </p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition">
            Book Now
          </button>
        </div>

        {/* Hospital Working Days & Hours */}
        <div
          className="bg-gray-800 p-6 rounded-lg border  shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Working Hours</h2>
          <p className="mb-2"><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</p>
          <p className="mb-2"><strong>Saturday:</strong> 9:00 AM - 5:00 PM</p>
          <p><strong>Sunday:</strong> Closed</p>
        </div>

        {/* Emergency Cases */}
        <div
          className="bg-gray-800 p-6 rounded-lg border  shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Emergency Cases</h2>
          <p className="mb-4">
            In case of emergency, call our 24/7 support line for immediate assistance.
          </p>
          <p className="text-xl font-bold text-cyan-600">+91 9645821578</p>
        </div>

      </div>

      {/* Hero-Like Section (Now Below Info Boxes) */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10 ">

        {/* Left Side: Two Stacked Images */}
        <div className="flex flex-col gap-6">
          <img
            src="/Images/img1.jpg"
            alt="Hospital Image 1"
            className="w-full h-64 object-cover rounded-lg shadow-lg "
          />
          <img
            src="/Images/img6.jpg"
            alt="Hospital Image 2"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We Care About Your Health
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Our hospital is equipped with modern facilities and expert medical professionals.
            We prioritize patient care, ensuring quality treatment and a comfortable experience.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you need an emergency service, a regular check-up, or specialist consultation,
            we are here to serve you with the best medical support.
          </p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition">
            Learn More
          </button>
        </div>

      </div>

    </section>
  );
};

export default InfoSection;