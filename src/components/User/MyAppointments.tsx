"use client"
import { swalFire } from '@/Helpers/SwalFire'
import { userSession } from '@/Helpers/userSession'
import Userwrap from '@/HOC/Userwrap'
import { deleteAppointmentById, fetchAppointmentByPatientId, fetchAppointmentdata } from '@/Services'
import React, { useEffect, useState } from 'react'

const MyAppointments = () => {
  const user = userSession()
  const token = user?.jwtToken
  const [appointmentData, setAppointmentData] = useState([])

  const fetchData = async () => {
    const result = await fetchAppointmentByPatientId(user?.id, token);
    if (result?.data) {
      setAppointmentData(result.data);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await deleteAppointmentById(appointmentId, token);
      if (response?.success) {
        fetchData(); // Refresh list
        swalFire("Delete Appointment", "Appointment deleted successfully", "success");
      } else {
        swalFire("Delete Appointment", "Failed to delete appointment", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };



  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen p-4 space-y-8 bg-gray-100">
      <div className='overflow-autorelative overflow-x-auto p-4'>
        <h2 className="text-center mb-4 text-4xl font-bold">Manage Appointments</h2>
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              appointmentData?.map((app: any, index: number) => (
                <tr key={index} className=" border-b bg-gray-800  border-gray-500">
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>
                  <td className="capitalize px-6 py-4">
                    {app.patient_name}
                  </td>
                  <td className="px-6 py-4">
                    {app.doctor_name}
                  </td>
                  <td className="px-6 py-4">
                    {app.department_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(app.apptbl_date).toISOString().slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    {app.apptbl_startTime}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {app.apptbl_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className='bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-blue-700 me-1.5'>Edit</button>
                    <button onClick={() => handleDelete(app.apptbl_id)} className='bg-red-600 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-red-500'>Remove</button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Userwrap(MyAppointments)