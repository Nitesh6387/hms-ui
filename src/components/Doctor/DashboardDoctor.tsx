"use client";

import React, { useState } from "react";
import Link from "next/link";

const DashboardDoctor = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menus = [
        { name: "Dashboard", href: "/dashboard", icon: 'ri-dashboard-line' },
        { name: "Patients", href: "dashboard/patients", icon: 'ri-group-3-line' },
        { name: "Appointments", href: "dashboard/appointments", icon: 'ri-file-chart-line' },
        { name: "Reports", href: "dashboard/reports", icon: 'ri-file-chart-line' },
        { name: "Settings", href: "/settings", icon: 'ri-settings-line' },
    ];

    return (
        <div className="flex h-screen">
            <div
                className={`fixed lg:relative top-0 left-0 w-64 lg:w-2/12 bg-gray-800 text-white py-6 px-4 flex flex-col h-screen transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"
                    }`}
            >
                <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>

                <nav className="flex flex-col gap-2">
                    {menus?.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.href}
                            className="py-3 px-3 rounded-md hover:bg-blue-500 transition flex gap-2"
                        >
                            <i className={menu.icon}></i>{menu.name}
                        </Link>
                    ))}
                </nav>

                <button className="mt-auto py-3 px-3 rounded-md hover:bg-rose-400 transition">
                    Logout
                </button>
            </div>

            <div className="w-full lg:w-10/12 flex flex-col h-screen">

                <div className="h-[10vh] bg-white shadow-md flex items-center justify-between px-6">
                    <button
                        className="lg:hidden bg-gray-800 text-white px-4 py-2 rounded-md"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    <p className="text-lg font-semibold">Welcome, Nitesh Verma</p>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Profile
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6">{children}</div>


            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-25 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardDoctor;
