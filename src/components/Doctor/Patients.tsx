"use client";
import React, { useEffect, useState } from "react";
import Doctorwrap from "@/HOC/Doctorwrap";
import { useSelector } from "react-redux";
import { getAppointmentsByDoctorId } from "@/Services";

const Patients = () => {
  const user = useSelector((state: any) => state.auth.session);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await getAppointmentsByDoctorId(user.id, user?.jwtToken);
        // Extract unique patients from appointments
        const uniquePatients = result.data.reduce((acc: any, curr: any) => {
          if (!acc.some((p: any) => p.patient_id === curr.patient_id)) {
            acc.push({
              id: curr.patient_id,
              name: curr.patient_name,
              email: curr.patient_email,
              // add more fields as needed
            });
          }
          return acc;
        }, []);
        setPatients(uniquePatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">My Patients</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {patient.name}
                </th>
                <td className="px-6 py-4">{patient.email}</td>
                <td className="px-6 py-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View History
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

export default Doctorwrap(Patients);