"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/slices/authSlice";
import { swalFire } from "@/Helpers/SwalFire";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const Dashboard = ({ children }) => {
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const session = useSelector((state: any) => state.auth.session)
    useEffect(() => {
        if (session == null) {
            router.push('/login')
        }
    })
    const adminMenus = [
        { name: "Dashboard", href: "/admin", icon: 'ri-dashboard-line' },
        { name: "Manage Doctors", href: "/admin/doctors", icon: 'ri-group-3-line' },
        { name: "Manage Patients", href: "/admin/patients", icon: 'ri-group-3-line' },
        { name: "Manage Appointments", href: "/admin/appointments", icon: 'ri-file-chart-line' },
        { name: "View Reports", href: "/admin/reports", icon: 'ri-file-chart-line' },
        { name: "Settings", href: "admin/settings", icon: 'ri-settings-line' },
        // { name: "Admin Panel", href: "/admin", icon: 'ri-user-shared-line' },
    ];
    const doctorMenus = [
        { name: "Dashboard", href: "/dashboard", icon: 'ri-dashboard-line' },
        { name: "My Patients", href: "dashboard/patients", icon: 'ri-group-3-line' },
        { name: "My Appointments", href: "dashboard/appointments", icon: 'ri-file-chart-line' },
        { name: "My Reports", href: "dashboard/reports", icon: 'ri-file-chart-line' },
        { name: "Settings", href: "/settings", icon: 'ri-settings-line' },
        { name: "My Profile", href: "/profile", icon: 'ri-user-line' }
    ]
    const userMenus = [
        { name: "Dashboard", href: "/dashboard", icon: 'ri-dashboard-line' },
        { name: "My Appointments", href: "dashboard/appointments", icon: 'ri-file-chart-line' },
        { name: "My Reports", href: "dashboard/reports", icon: 'ri-file-chart-line' },
        { name: "View Doctors", href: "dashboard/doctors", icon: 'ri-user-line' },
        { name: "Settings", href: "/settings", icon: 'ri-settings-line' },
        { name: "My Profile", href: "/profile", icon: 'ri-user-line' }
    ]

    let menus = []
    if (session?.userType === 'admin') {
        menus = adminMenus
    }
    else if (session?.userType === 'doctor') {
        menus = doctorMenus
    }
    else {
        menus = userMenus
    }

    const dispatch = useDispatch()
    const logoutUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(logout())
                swalFire('Auth', "Logout Success!", "success")
                router.push('/login')
            }
        });
    }

    { if (!session) { return (<h2 className="text-center">You have to Login First</h2>) } };

    return (
        <div className="flex h-screen">
            <div
                className={`fixed lg:relative top-0 left-0 w-64 lg:w-2/12 bg-gray-800 text-white py-6 px-4 flex flex-col h-screen z-10 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"
                    }`}
            >
                <h2 className="text-xl font-bold mb-6 capitalize">{session.userType} Panel</h2>

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
                        <i className="ri-menu-line"></i>
                    </button>

                    <p className="text-lg font-semibold">Welcome, {session.name}</p>

                    <button onClick={logoutUser} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-500">
                        Logout
                    </button>
                </div>

                <div className="flex-1 overflow-auto">{children}</div>


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

export default Dashboard;

