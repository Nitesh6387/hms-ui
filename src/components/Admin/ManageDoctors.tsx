"use client"
import Adminwrap from '@/HOC/Adminwrap';
import { BASEURL, fetchDoctorsData } from '@/Services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ManageDoctors = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.session);
  const [doctorData, setDoctorData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDoctorsData(user?.jwtToken)
      setDoctorData(result.data)
    }
    fetchData()

  }, [])
  return (
    <div>
      <div className="relative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">Manage Doctors</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              doctorData?.map((doctor: any, index: any) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {doctor?.name}
                  </th>
                  <td className="px-6 py-4">
                    {doctor?.email}
                  </td>
                  <td className="px-6 py-4">
                    {doctor?.contact}
                  </td>
                  <td className="px-6 py-4">
                    {doctor?.address}
                  </td>
                  <td className="px-6 py-4">
                    {/* {doctor?.profile} */}
                    {/* <Image
                      src={`${BASEURL}/static/${doctor?.profile}`}
                      alt="Doctor"
                      width={200}
                      height={200}
                      className="rounded-4xl shadow-lg"
                    /> */}
                    <img src={`${BASEURL}/static/${doctor?.profile}`} alt={`profile`} className='rounded-full w-10 h-10 object-cover' />
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

export default Adminwrap(ManageDoctors)