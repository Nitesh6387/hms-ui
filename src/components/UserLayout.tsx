"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const UserLayout = ({ children }: any) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Doctors', href: '/doctors' },
        { name: 'Contact', href: '/contact' },
        { name: 'Login', href: '/login' },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-3 bg-gray-800 text-white text-sm md:text-base">
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
                    <span className="cursor-pointer hover:text-cyan-400 transition">
                        <i className="ri-mail-line mr-1"></i>supporthms@admin.com
                    </span>
                    <span className="cursor-pointer hover:text-cyan-400 transition">
                        <i className="ri-map-pin-line mr-1"></i>15/65 Ram Nagar, Raebareli, Uttar Pradesh, India
                    </span>
                </div>
                <div className="mt-2 md:mt-0">
                    <span className="cursor-pointer hover:text-cyan-400 transition">
                        <i className="ri-phone-line mr-1"></i>+91 6354553821
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white text-black shadow-md sticky top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
                                <Image
                                    src="/Images/clogo.jpg"
                                    alt="Global Health Center"
                                    width={45}
                                    height={45}
                                    className="rounded-full"
                                />
                                <span className="hidden sm:inline">Global Health Center</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                                        pathname === link.href
                                            ? 'bg-cyan-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                                aria-label="Toggle Menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-white border-t shadow-lg transition-all duration-300 ${
                        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    pathname === link.href
                                        ? 'bg-cyan-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Hospital Info */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Global Health Center</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Providing quality healthcare with advanced medical facilities and expert doctors dedicated to your well-being.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                            <ul className="space-y-2">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'About Us', href: '/about' },
                                    { name: 'Services', href: '/services' },
                                    { name: 'Doctors', href: '/doctors' },
                                    { name: 'Contact', href: '/contact' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition flex items-center gap-2"
                                        >
                                            <i className="ri-arrow-right-s-line text-cyan-400"></i>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                            <div className="space-y-3">
                                <p className="text-gray-400 flex items-center gap-3">
                                    <i className="ri-map-pin-line text-cyan-400 text-lg"></i>
                                    15/65 Ram Nagar, Raebareli, Uttar Pradesh, India
                                </p>
                                <p className="text-gray-400 flex items-center gap-3">
                                    <i className="ri-phone-line text-cyan-400 text-lg"></i>
                                    +91 6354553821
                                </p>
                                <p className="text-gray-400 flex items-center gap-3">
                                    <i className="ri-mail-line text-cyan-400 text-lg"></i>
                                    supporthms@admin.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media & Copyright */}
                    <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <Link
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition"
                                >
                                    <i className={`ri-${social}-fill`}></i>
                                </Link>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Global Health Center. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default UserLayout;