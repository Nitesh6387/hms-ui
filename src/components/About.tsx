"use client";

import Link from "next/link";

function About() {
    const features = [
        {
            title: "Our Mission",
            description: "To provide compassionate and high-quality medical care with cutting-edge technology and a patient-first approach.",
            bg: "bg-blue-50",
            border: "border-blue-200",
            icon: "ri-crosshair-line",
            iconColor: "text-blue-600",
        },
        {
            title: "Our Vision",
            description: "To be the leading healthcare institution recognized for excellence in patient care, research, and innovation.",
            bg: "bg-green-50",
            border: "border-green-200",
            icon: "ri-eye-line",
            iconColor: "text-green-600",
        },
        {
            title: "Why Choose Us?",
            description: "",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            icon: "ri-star-line",
            iconColor: "text-yellow-600",
            list: [
                "Experienced and specialized doctors",
                "Advanced medical technology",
                "24/7 emergency services",
                "Personalized patient care",
                "Affordable treatment options",
                "State-of-the-art infrastructure",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Hospital</h1>
                    <div className="w-20 h-1 bg-cyan-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Welcome to <strong>Global Health Center</strong>, where we are dedicated to providing world-class healthcare services.
                        Our team of expert doctors and medical professionals ensure that every patient receives top-notch medical attention and care.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { number: "15+", label: "Years Experience" },
                        { number: "500+", label: "Happy Patients" },
                        { number: "50+", label: "Expert Doctors" },
                        { number: "24/7", label: "Emergency Support" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                            <div className="text-3xl font-bold text-cyan-600">{stat.number}</div>
                            <p className="text-gray-600 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="space-y-6 mb-12">
                    {features.map((feature, index) => (
                        <div key={index} className={`${feature.bg} ${feature.border} border rounded-lg p-6`}>
                            <div className="flex items-start gap-4">
                                <div className={`text-3xl ${feature.iconColor} mt-1`}>
                                    <i className={feature.icon}></i>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h2>
                                    {feature.description && (
                                        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                                    )}
                                    {feature.list && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {feature.list.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-700">
                                                    <i className="ri-check-line text-green-500 font-bold"></i>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center bg-white rounded-lg shadow-md p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions? Feel free to contact us or book an appointment with our expert doctors.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-primary"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/doctors"
                            className="btn-secondary"
                        >
                            Find a Doctor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;