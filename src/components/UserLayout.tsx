"use client"
import { useState } from 'react';
import Link from 'next/link';

const UserLayout = ({ children }: any) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-4 bg-gray-800 text-white text-sm md:text-base">
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
                    <span className="cursor-pointer">support@admin.com</span>
                    <span className="cursor-pointer">Address: 15/65 Vikas Nagar LKO</span>
                </div>
                <div className="mt-2 md:mt-0">
                    <span className="cursor-pointer">Call Now: +91 9645821578</span>
                </div>
            </div>

            <nav className="bg-white text-black p-4 shadow-gray-800  shadow mb-1 sticky top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-cyan-600">
                            Global Health Center
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="hover:text-gray-400">
                            Home
                        </Link>
                        <Link href="/about" className="hover:text-gray-400">
                            About
                        </Link>
                        <Link href="/services" className="hover:text-gray-400">
                            Services
                        </Link>
                        <Link href="/login" className="hover:text-gray-400">
                            Login
                        </Link>
                        <Link href="/doctors" className="hover:text-gray-400">
                            Doctors
                        </Link>
                        <Link href="/contact" className="hover:text-gray-400">
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className=" focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-gray-800 text-white p-4 ${isMobileMenuOpen ? '' : 'hidden'}`}
                >
                    <Link href="/" className="block py-2">
                        Home
                    </Link>
                    <Link href="/about" className="block py-2">
                        About
                    </Link>
                    <Link href="/services" className="block py-2">
                        Services
                    </Link>
                    <Link href="/contact" className="block py-2">
                        Contact
                    </Link>
                </div>
            </nav>

            {children}

            <footer className="bg-gray-900 text-white py-10">
                <div className="container mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Hospital Info */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Global Health Center</h2>
                            <p className="text-gray-400">
                                Providing quality healthcare with advanced medical facilities.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-400 hover:text-white">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-gray-400 hover:text-white">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-400 hover:text-white">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                            <p className="text-gray-400">📍 15/65 Vikas Nagar LKO, UP</p>
                            <p className="text-gray-400">📞 +91 9645821578</p>
                            <p className="text-gray-400">✉ support@admin.com</p>
                        </div>
                    </div>

                    {/* Social Media & Copyright */}
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <i className="fa-brands fa-twitter"></i>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <i className="fa-brands fa-instagram"></i>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <i className="fa-brands fa-linkedin"></i>
                            </Link>
                        </div>
                        <p className="text-gray-400 text-sm mt-4 md:mt-0">
                            &copy; {new Date().getFullYear()} Global Health Center. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default UserLayout;
