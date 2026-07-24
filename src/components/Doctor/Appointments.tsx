"use client";
import React, { useEffect, useState } from "react";
import Doctorwrap from "@/HOC/Doctorwrap";
import { useSelector } from "react-redux";
import {
  getDoctorAppointments,
  updateDoctorAppointmentStatus,
} from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";

const Appointments = () => {
  const user = useSelector((state: any) => state.auth.session);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const result = await getDoctorAppointments(user?.jwtToken);
      setAppointments(result.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await updateDoctorAppointmentStatus(id, newStatus, user?.jwtToken);
      if (res.code === 200) {
        swalFire("Status Updated", res.message, "success");
        fetchAppointments();
      } else {
        swalFire("Error", res.message, "error");
      }
    } catch (error) {
      swalFire("Error", "Network error", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">My Appointments</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.
              </th>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {app.patient_name}
                </th>
                <td className="px-6 py-4">{app.department_name}</td>
                <td className="px-6 py-4">
                  {new Date(app.apptbl_date).toISOString().slice(0, 10)}
                </td>
                <td className="px-6 py-4">{app.apptbl_startTime}</td>
                <td className="px-6 py-4">
                  <select
                    value={app.apptbl_status}
                    onChange={(e) => handleStatusChange(app.apptbl_id, e.target.value)}
                    className="bg-gray-700 text-white rounded px-2 py-1"
                  >
                    <option value="In-progress">In-progress</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctorwrap(Appointments);