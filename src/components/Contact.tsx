export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Contact Us</h1>
                <p className="text-gray-700 text-center mb-6">
                    Have any questions or need assistance? Feel free to reach out to us!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-blue-100 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-blue-900">Hospital Address</h2>
                        <p className="text-gray-700">15/65 Vikas Nagar Lucknow India</p>
                    </div>

                    <div className="p-4 bg-green-100 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-green-900">Contact Details</h2>
                        <p className="text-gray-700">Phone: + 91 9645821578</p>
                        <p className="text-gray-700">Email: support@admin.com</p>
                    </div>
                </div>

                {/* Static Contact Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Your Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Your Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Your Message</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
