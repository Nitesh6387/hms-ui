"use client";

import Link from "next/link";

function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">About Our Hospital</h1>
                <p className="text-gray-700 text-lg text-center">
                    Welcome to our state-of-the-art hospital, where we are dedicated to providing world-class healthcare services.
                    Our team of expert doctors and medical professionals ensure that every patient receives top-notch medical attention and care.
                </p>

                <div className="mt-6 space-y-4">
                    <div className="p-4 bg-blue-100 rounded-lg">
                        <h2 className="text-2xl font-semibold text-blue-900">Our Mission</h2>
                        <p className="text-gray-700">
                            To provide compassionate and high-quality medical care with cutting-edge technology and a patient-first approach.
                        </p>
                    </div>

                    <div className="p-4 bg-green-100 rounded-lg">
                        <h2 className="text-2xl font-semibold text-green-900">Our Vision</h2>
                        <p className="text-gray-700">
                            To be the leading healthcare institution recognized for excellence in patient care, research, and innovation.
                        </p>
                    </div>

                    <div className="p-4 bg-yellow-100 rounded-lg">
                        <h2 className="text-2xl font-semibold text-yellow-900">Why Choose Us?</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Experienced and specialized doctors</li>
                            <li>Advanced medical technology</li>
                            <li>24/7 emergency services</li>
                            <li>Personalized patient care</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">Have questions? Feel free to  <Link href='/contact' className="text-blue-500 font-semibold">contact us</Link>.</p>
                </div>
            </div>
        </div>
    );
}

export default About