"use client";
import { swalFire } from "@/Helpers/SwalFire";
import { userSession } from "@/Helpers/userSession";
import Userwrap from "@/HOC/Userwrap";
import {
  cancelAppointment,
  deleteAppointmentById,
  fetchAppointmentByPatientId,
} from "@/Services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyAppointments = () => {
  const router = useRouter();
  const user = userSession();
  const token = user?.jwtToken;
  const [appointmentData, setAppointmentData] = useState([]);

  const fetchData = async () => {
    const result = await fetchAppointmentByPatientId(user?.id, token);
    if (result?.data) {
      setAppointmentData(result.data);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    const confirm = await swalFire(
      "Are you sure?",
      "You won't be able to recover this appointment.",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const response = await deleteAppointmentById(appointmentId, token);
      if (response?.success) {
        fetchData();
        swalFire("Delete Appointment", "Appointment deleted successfully", "success");
      } else {
        swalFire("Delete Appointment", "Failed to delete appointment", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      swalFire("Error", "Something went wrong", "error");
    }
  };

  const handleCancel = async (id: string) => {
    const confirm = await swalFire(
      "Are you sure?",
      "You want to cancel this appointment?",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const res = await cancelAppointment(id, token);
      if (res.code === 200) {
        swalFire("Cancelled", res.message, "success");
        fetchData();
      } else {
        swalFire("Error", res.message, "error");
      }
    } catch (error) {
      swalFire("Error", "Network error", "error");
    }
  };

  const handleReschedule = (id: string) => {
    router.push(`/patient/appointment/reschedule/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-4 space-y-8 bg-gray-100">
      <div className="overflow-autorelative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">
          My Appointments
        </h2>
        <table className="w-full text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Name
              </th>
              <th scope="col" className="px-6 py-3">
                Doctor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department Name
              </th>
              <th scope="col" className="px-6 py-3">
                App. Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointmentData?.map((app: any, index: number) => (
              <tr
                key={index}
                className="border-b bg-gray-800 border-gray-500"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="capitalize px-6 py-4">{app.patient_name}</td>
                <td className="px-6 py-4">{app.doctor_name}</td>
                <td className="px-6 py-4">{app.department_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(app.apptbl_date).toISOString().slice(0, 10)}
                </td>
                <td className="px-6 py-4">{app.apptbl_startTime}</td>
                <td className="px-6 py-4 capitalize">{app.apptbl_status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 cursor-pointer px-4 rounded-md py-2 text-white hover:bg-blue-700 me-1.5"
                    onClick={() => handleReschedule(app.apptbl_id)}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(app.apptbl_id)}
                    className="bg-yellow-500 cursor-pointer px-4 rounded-md py-2 text-white hover:bg-yellow-600 me-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(app.apptbl_id)}
                    className="bg-red-600 cursor-pointer px-4 rounded-md py-2 text-white hover:bg-red-500"
                  >
                    Remove
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

export default Userwrap(MyAppointments);