"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchAppointmentdata } from "@/Services";

const PatientAppChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSelector((state: any) => state.auth.session);
  const token = session?.jwtToken;

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }
        const result = await fetchAppointmentdata(token);
        // The API returns: { code, message, success, error, data: [...] }
        if (result && result.data && Array.isArray(result.data)) {
          const appointments = result.data;
          // Group by date (YYYY-MM-DD)
          const grouped = appointments.reduce((acc: any, app: any) => {
            const date = app.apptbl_date
              ? new Date(app.apptbl_date).toISOString().slice(0, 10)
              : null;
            if (date) {
              acc[date] = (acc[date] || 0) + 1;
            }
            return acc;
          }, {});
          // Convert to array for chart
          const sortedDates = Object.keys(grouped).sort();
          const chartData = sortedDates.map((date) => ({
            date,
            patients: grouped[date],
          }));
          setData(chartData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointment data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full h-96 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full h-96 flex items-center justify-center text-gray-500">
        No appointment data available
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-96">
      <h2 className="text-xl font-semibold mb-4">Patient Appointments</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="patients"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientAppChart;