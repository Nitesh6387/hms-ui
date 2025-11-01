"use client"
import Adminwrap from '@/HOC/Adminwrap';
import { deletePatient, fetchPatientsData } from '@/Services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { userSession } from '@/Helpers/userSession';
import { swalFire } from '@/Helpers/SwalFire';

const ManagePatients = () => {
  const router = useRouter()
  const session = userSession()
  const [patientData, setpatientData] = useState([])
  const token = session?.jwtToken
  const fetchData = async () => {
    const result = await fetchPatientsData(token)
    setpatientData(result.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const removeUser = async (id: any) => {
    swalFire(
      "Are you sure?",
      "You won't be able to revert this!",
      "warning"
    ).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const res = await deletePatient(token, id);
          if (res.success) {
            swalFire("Deleted", res?.message, "success");
            fetchData();
          } else {
            swalFire("Error", res?.message || "Something went wrong while deleting.", "error");
          }
        } catch (error) {
          swalFire("Error", "Network or server error occurred.", "error");
        }
      }
    });
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className="relative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">Manage Patients</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
          <thead className="text-xs  text-white uppercase bg-gray-50 dark:bg-gray-700" >
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              patientData?.map((patient: any, index: any) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                    {patient?.name}
                  </th>
                  <td className="px-6 py-4">
                    {patient?.email}
                  </td>
                  <td className="px-6 py-4">
                    {patient?.contact}
                  </td>
                  <td className="px-6 py-4">
                    {patient?.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className='bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-blue-700 me-1.5'>Edit</button>
                    <button onClick={() => removeUser(patient?.id)} className='bg-red-600 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-red-500 '>Remove</button>
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

export default Adminwrap(ManagePatients)
// export default ManagePatients