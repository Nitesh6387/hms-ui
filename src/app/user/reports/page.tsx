"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/common/Dashboard";
import Userwrap from "@/HOC/Userwrap";
import { fetchAppointmentByPatientId } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UserReports = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAppointmentByPatientId(session?.id, token);
        setAppointments(res.data || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    fetchData();
  }, [session, token]);

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
        <h2 className="text-3xl font-bold text-gray-900">My Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Status: {appointments.filter((a: any) => a.apptbl_status === "Completed").length} Completed</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.filter((a: any) => a.apptbl_status === "In-progress" || a.apptbl_status === "Confirmed").length} Active</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Appointment History</h3>
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
            <p className="text-gray-400 text-center py-10">No appointment data available</p>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Userwrap(UserReports);