"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/slices/authSlice";
import { swalFire } from "@/Helpers/SwalFire";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

const Dashboard = ({ children }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const session = useSelector((state: any) => state.auth.session);

    useEffect(() => {
        if (session == null) {
            router.push('/login');
        }
    }, [session, router]);

    const adminMenus = [
        { name: "Dashboard", href: "/admin", icon: "ri-dashboard-line" },
        { name: "Manage Doctors", href: "/admin/doctors", icon: "ri-user-star-line" },
        { name: "Manage Patients", href: "/admin/patients", icon: "ri-group-3-line" },
        { name: "Manage Appointments", href: "/admin/appointments", icon: "ri-file-chart-line" },
        { name: "Manage Departments", href: "/admin/departments", icon: "ri-building-line" },
        { name: "Reports", href: "/admin/reports", icon: "ri-bar-chart-line" },
        { name: "Settings", href: "/admin/settings", icon: "ri-settings-line" },
    ];

    const doctorMenus = [
        { name: "Appointments", href: "/doctor/appointments", icon: "ri-file-chart-line" },
        { name: "My Patients", href: "/doctor/patients", icon: "ri-group-3-line" },
        { name: "Reports", href: "/doctor/reports", icon: "ri-bar-chart-line" },
        { name: "Settings", href: "/doctor/settings", icon: "ri-settings-line" },
        { name: "My Profile", href: "/doctor/profile", icon: "ri-user-line" },
    ];

    const userMenus = [
        { name: "My Appointments", href: "/user/appointments", icon: "ri-file-chart-line" },
        { name: "Book Appointment", href: "/user/bookappointment", icon: "ri-calendar-check-line" },
        { name: "Reports", href: "/user/reports", icon: "ri-bar-chart-line" },
        { name: "Settings", href: "/user/settings", icon: "ri-settings-line" },
        { name: "My Profile", href: "/user/profile", icon: "ri-user-line" },
    ];

    let menus: { name: string; href: string; icon: string }[] = [];
    let panelName = "";
    if (session?.userType === 'admin') {
        menus = adminMenus;
        panelName = "Admin Panel";
    } else if (session?.userType === 'doctor') {
        menus = doctorMenus;
        panelName = "Doctor Panel";
    } else {
        menus = userMenus;
        panelName = "Patient Panel";
    }

    const dispatch = useDispatch();

    const logoutUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0891b2",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(logout());
                swalFire('Auth', "Logout Successful!", "success");
                router.push('/login');
            }
        });
    };

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <i className="ri-lock-line text-6xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-700">Please Login First</h2>
                    <button onClick={() => router.push('/login')} className="btn-primary mt-4">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative top-0 left-0 w-64 bg-gray-900 text-white flex flex-col h-screen z-30 transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                {/* Sidebar Header */}
                <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-bold capitalize text-cyan-400">{panelName}</h2>
                    <p className="text-sm text-gray-400 mt-1">Welcome, {session.name}</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {menus?.map((menu, index) => {
                        const isActive = pathname === menu.href;
                        return (
                            <Link
                                key={index}
                                href={menu.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-cyan-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                <i className={`${menu.icon} text-lg`}></i>
                                <span className="text-sm font-medium">{menu.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-gray-700">
                    <button
                        onClick={logoutUser}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                        <i className="ri-logout-box-r-line text-lg"></i>
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
                    <button
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        <i className="ri-menu-line text-xl"></i>
                    </button>

                    <div className="hidden lg:flex items-center gap-2">
                        <i className="ri-hospital-line text-cyan-600 text-xl"></i>
                        <span className="text-sm text-gray-500">Global Health Center</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900 capitalize">{session.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{session.userType}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                            {session.name?.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={logoutUser}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            <i className="ri-logout-box-r-line"></i>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;