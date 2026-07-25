"use client"
import { useEffect, useState } from "react";
import PatientAppChart from '@/components/Admin/PatientAppChart'
import Dashboard from '@/components/common/Dashboard'
import Adminwrap from '@/HOC/Adminwrap'
import { getDashboardStats } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import CountUp from 'react-countup';

function AdminDashboard() {
  const session = userSession();
  const token = session?.jwtToken;
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats(token);
        if (res.data) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    { label: "Total Doctors", value: stats.doctors, icon: "ri-user-star-line", color: "bg-blue-500" },
    { label: "Total Patients", value: stats.patients, icon: "ri-group-3-line", color: "bg-green-500" },
    { label: "Appointments", value: stats.appointments, icon: "ri-file-chart-line", color: "bg-purple-500" },
    { label: "Revenue", value: `$${stats.revenue}`, icon: "ri-money-dollar-circle-line", color: "bg-yellow-500", isCount: false },
  ];

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {card.isCount !== false ? (
                      <CountUp end={Number(card.value)} duration={2} separator="," />
                    ) : (
                      card.value
                    )}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                  <i className={`${card.icon} text-white text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <PatientAppChart />
      </div>
    </Dashboard>
  )
}

export default Adminwrap(AdminDashboard)