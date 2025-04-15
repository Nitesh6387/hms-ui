"use client"
import { userSession } from '@/Helpers/userSession'
import Adminwrap from '@/HOC/Adminwrap'
import { fetchAppointmentdata } from '@/Services'
import React, { useEffect, useState } from 'react'

const ManageAppointments = () => {
    const user = userSession()
    const token = user?.jwtToken
    const [appointmentData, setAppointmentData] = useState([])

    const fetchData = async () => {
        const result = await fetchAppointmentdata(token)
        setAppointmentData(result.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(appointmentData);

    return (
        <div className="min-h-screen p-4 space-y-8 bg-gray-100">
            <div className='overflow-autorelative overflow-x-auto p-4'>
                <table className="w-full text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PatientId
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DoctorId
                            </th>
                            <th scope="col" className="px-6 py-3">
                            DepartmentId
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            startTime
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointmentData?.map((app: any, index: any) => (
                                <tr key={index} className=" border-b bg-gray-800  border-gray-500">
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className='uppercase'>
                                        {app?.patientId}
                                    </th>
                                    <td scope="row">
                                        {app?.doctorId}
                                    </td>
                                    <td scope="row" >
                                        {app?.departmentId}
                                    </td>
                                    <td scope="row">
                                        {app?.date}
                                    </td>
                                    <td scope="row">
                                        {app?.startTime}
                                    </td>
                                    <td>
                                        {/* <button className='px-4 py-2 bg-red-700 text-white rounded-sm cursor-pointer hover:bg-red-500 me-1'>Delete</button> */}
                                        <button className='bg-green-700 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-green-500 '>Edit</button>
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

export default Adminwrap(ManageAppointments)