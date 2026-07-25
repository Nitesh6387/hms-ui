"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/common/Dashboard";
import Adminwrap from "@/HOC/Adminwrap";
import { fetchAppointmentdata, fetchDoctorsData, fetchPatientsData } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0891b2", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminReports = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, docRes, patRes] = await Promise.all([
          fetchAppointmentdata(token),
          fetchDoctorsData(token),
          fetchPatientsData(token),
        ]);
        setAppointments(appRes.data || []);
        setDoctors(docRes.data || []);
        setPatients(patRes.data || []);
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      }
    };
    fetchData();
  }, [token]);

  // Status distribution
  const statusCounts = appointments.reduce((acc: any, app: any) => {
    const status = app.apptbl_status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  // Monthly appointments
  const monthlyData = appointments.reduce((acc: any, app: any) => {
    if (app.apptbl_date) {
      const month = new Date(app.apptbl_date).toLocaleString("default", { month: "short", year: "2-digit" });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});

  const barData = Object.keys(monthlyData).map((key) => ({
    month: key,
    appointments: monthlyData[key],
  }));

  return (
    <Dashboard>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Doctors</p>
            <p className="text-3xl font-bold text-gray-900">{doctors.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Appointments by Month</h3>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">No data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Appointment Status Distribution</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">No data available</p>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Adminwrap(AdminReports);