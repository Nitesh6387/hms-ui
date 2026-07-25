"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/common/Dashboard";
import Doctorwrap from "@/HOC/Doctorwrap";
import { getAppointmentsByDoctorId } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DoctorReports = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAppointmentsByDoctorId(session?.id, token);
        setAppointments(res.data || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    fetchData();
  }, [session, token]);

  const statusCounts = appointments.reduce((acc: any, app: any) => {
    const status = app.apptbl_status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(statusCounts).map((key) => ({
    status: key,
    count: statusCounts[key],
  }));

  return (
    <Dashboard>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">{statusCounts["Completed"] || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{(statusCounts["In-progress"] || 0) + (statusCounts["Confirmed"] || 0)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Appointment Status</h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0891b2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-10">No data available</p>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Doctorwrap(DoctorReports);