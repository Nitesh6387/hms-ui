"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Userwrap from '@/HOC/Userwrap';
import { bookdoctorAppointment, fetchDepartmentdata, getdoctByDepartmentIDService } from '@/Services';
import { userSession } from '@/Helpers/userSession';
import { swalFire } from '@/Helpers/SwalFire';

const appointmentSchema = yup.object().shape({
    patientId: yup.string().required('PatientId is required'),
    departmentId: yup.string().required('Department is required'),
    doctorId: yup.string().required('Doctor is required'),
    disease: yup.string().required('Disease is required'),
    symptoms: yup.string().required('Symptoms are required'),
    payment: yup.number().typeError('Payment must be a number').required('Payment is required').min(0, 'Payment cannot be negative'),
    status: yup.string().oneOf(['pending', 'confirmed'], 'Invalid status').required('Status is required'),
    appointmentType: yup.string().oneOf(['general', 'emergency'], 'Invalid type').required('Appointment type is required'),
    date: yup.date().required('Date is required').typeError('Invalid date'),
    startTime: yup.string().required('StartTime is required'),
});

const Appointment = () => {
    const user = userSession()
    const token = user?.jwtToken;
    const [departmentData, setDepartmentData] = useState([])
    const [doctorData, setDoctorData] = useState([])
    const [slecteddepId, setSelectedDepartmentId] = useState(null)
    const fetchDepartmentData = async () => {
        const result = await fetchDepartmentdata(token)
        setDepartmentData(result.data)
    }
    const fetchDoctorByDeptId = async () => {
        const res = await getdoctByDepartmentIDService(slecteddepId, token)
        setDoctorData(res?.data)
    }

    useEffect(() => {
        if (slecteddepId) {
            fetchDoctorByDeptId()
        }
    }, [slecteddepId])
    useEffect(() => {
        fetchDepartmentData()
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(appointmentSchema),
    });

    const bookNewAppointment = async (data: any) => {
        const res = await bookdoctorAppointment(data, token)
        if (res.code == 201) {
            swalFire("Appointment", res.message, "success")
        }
        else {
            swalFire("Appointment", res.message, "error")
        }
    };

    const handleDepDropChange = (e: any) => {
        setSelectedDepartmentId(e?.target?.value)
    }

    return (
        <div className='p-4 bg-gray-100 min-h-full'>
            <form onSubmit={handleSubmit(bookNewAppointment)} className="max-w-2xl mx-auto p-6 bg-white rounded-sm shadow-md space-y-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Book an Appointment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Id</label>
                        <input
                            value={user?.id}
                            disabled
                            {...register("patientId")}
                            className="w-full p-2 border rounded text-gray-900 bg-gray-200"
                        >
                        </input>
                        <p className="text-red-500 text-sm mt-1">{errors.patientId?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select
                            {...register("departmentId")}
                            onChange={(e) => handleDepDropChange(e)}
                            className="w-full p-2 border rounded text-gray-900"
                        >
                            <option value="">Select Department</option>
                            {
                                departmentData?.map((dept: any, index: any) => (
                                    <option value={dept?.id} key={index} className='uppercase'>{dept?.name}</option>
                                ))
                            }
                        </select>
                        <p className="text-red-500 text-sm mt-1">{errors.departmentId?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                        <select
                            {...register("doctorId")}
                            className="w-full p-2 border rounded text-gray-900"
                        >
                            <option value="">Select Doctor</option>
                            {
                                doctorData?.map((dept: any, index: any) => (
                                    <option value={dept?.id} key={index} className='uppercase'>{dept?.name}</option>
                                ))
                            }
                        </select>
                        <p className="text-red-500 text-sm mt-1">{errors.doctorId?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
                        <input
                            type="text"
                            {...register('disease')}
                            placeholder='Enter Disease'
                            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.disease?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                        <input
                            type="text"
                            {...register('payment')}
                            placeholder='Payment..'
                            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.payment?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            {...register('status')}
                            className="w-full border rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                        <p className="text-red-500 text-sm mt-1">{errors.status?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            {...register('date')}
                            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.date?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <input
                            type="time"
                            {...register('startTime')}
                            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.startTime?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                        <select
                            {...register('appointmentType')}
                            className="w-full border rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="general">General</option>
                            <option value="emergency">Emergency</option>
                        </select>
                        <p className="text-red-500 text-sm mt-1">{errors.appointmentType?.message}</p>
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                        <textarea
                            {...register('symptoms')}
                            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.symptoms?.message}</p>
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 cursor-pointer rounded-sm shadow hover:bg-blue-700 transition"
                    >
                        Book Appointment
                    </button>
                </div>
            </form>
        </div>

    );
};

export default Userwrap(Appointment)
