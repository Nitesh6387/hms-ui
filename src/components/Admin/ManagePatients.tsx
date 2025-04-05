"use client"
import Adminwrap from '@/HOC/Adminwrap';
import { BASEURL, fetchPatientsData } from '@/Services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ManagePatients = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.session);
  const [patientData, setpatientData] = useState([])
  useEffect(() => {
    // if (user == null) {
    //   router.push('/login')
    // };
    const fetchData = async () => {
      const result = await fetchPatientsData(user?.jwtToken)
      setpatientData(result.data)
    }
    fetchData()

  }, [])
  return (
    <div>
      <div className="relative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">Manage Patients</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
          <thead className="text-xs  text-white uppercase bg-gray-50 dark:bg-gray-700" >
            <tr>
              <th scope="col" className="px-6 py-3">
                Doctor name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Number
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
                  <td className="px-6 py-4">
                    <button className='bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-green-500 '>Edit</button>
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