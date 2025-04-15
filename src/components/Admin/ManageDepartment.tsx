"use client"
import { swalFire } from '@/Helpers/SwalFire'
import { userSession } from '@/Helpers/userSession'
import Adminwrap from '@/HOC/Adminwrap'
import { adminAddDepartment, deleteDepartmentData, fetchDepartmentdata } from '@/Services'
import React, { useEffect, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from 'sweetalert2'


const schema = yup.object().shape({
    name: yup.string().required().min(3).max(35),
});

const ManageDepartment = () => {
    const router = useRouter()
    const user = userSession()
    const token = user?.jwtToken
    const [departmentData, setDepartmentData] = useState([])
    const [showEditForm, setShowEditForm] = useState(false);
    const handleClose = () => setShowEditForm(false);
    const handleShow = () => setShowEditForm(true);

    const { register, reset, setValue, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    const fetchData = async () => {
        const result = await fetchDepartmentdata(token)
        setDepartmentData(result.data)
    }
    useEffect(() => {
        fetchData()
        if (showEditForm) {
            setValue("name", "dshfhj") //i have to use dynamic
        }
    }, [showEditForm])

    const handleAddDepartment = async (data: any) => {
        try {
            const res = await adminAddDepartment(data, user?.jwtToken)
            if (res.code == 201) {
                swalFire("Department", res?.message, "success")
                fetchData()
                reset()
            } else if (res?.code == 401) {
                router.push('/login')
            }
            else {
                swalFire("Department", res?.message, "error")
            }
        } catch (error: any) {
            console.log("Eror", error.message);

        }
    }
    const handleEditDepartment = async (data: any) => {
        console.log(data);
        swalFire("Department", "Success", "success")
        setShowEditForm(false)
    }

    const handleDelteDept = async (id: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const res = await deleteDepartmentData(id, token)
                if (res.code == 200) {
                    swalFire("Department", res?.message, "success")
                    fetchData()
                }
                else if (res?.code == 401) {
                    router.push('/login')
                }
                else {
                    swalFire("Department", res?.message, "error")
                }
            }
        });


    }
    return (
        <>
            {
                !showEditForm ?
                    <div className="min-h-screen p-4 space-y-8 bg-gray-100">
                        <h2 className="text-center mb-4 text-4xl font-bold">Manage Department</h2>
                        <div className='mt-5'>
                            <form
                                onSubmit={handleSubmit(handleAddDepartment)}
                                className='flex justify-center gap-2'
                            >
                                <label className=''>
                                    <input
                                        {...register("name")}
                                        className='md:w-[30vw] p-2 border rounded bg-gray-100 text-gray-900'
                                        type="text"
                                        placeholder="Enter Department Name.."
                                        aria-label="Add"
                                    />
                                    {errors.name && <p className="text-rose-400 italic">{errors.name.message}</p>}
                                </label>
                                <button type="submit" className='md:px-12 px-4 py-2 border bg-gray-700 text-white rounded-sm hover:bg-blue-600 cursor-pointer h-fit'>
                                    Add
                                </button>{" "}

                            </form>
                        </div>
                        <div>
                            <table className="w-full text-center text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Sr.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Dept name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        departmentData?.map((dept: any, index: any) => (
                                            <tr key={index} className=" border-b bg-gray-800  border-gray-500">
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>
                                                <th scope="row" className='uppercase'>
                                                    {dept?.name}
                                                </th>
                                                <td>
                                                    <button onClick={() => handleDelteDept(dept.id)} className='px-4 py-2 bg-red-700 text-white rounded-sm cursor-pointer hover:bg-red-500 me-1'>Delete</button>
                                                    <button onClick={handleShow} className='bg-green-700 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-green-500 '>Edit</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="min-h-full p-4 space-y-8 bg-gray-100 flex justify-center items-center">
                        <div className='mt-5 md:w-7/12 mx-auto space-y-8 bg-white p-8 shadow-md rounded-md'>
                            <h2 className='text-center text-2xl font-semibold'>Edit Department Name</h2>
                            <form
                                onSubmit={handleSubmit(handleEditDepartment)}
                                className='flex justify-center gap-2'
                            >
                                <label className=''>
                                    <input
                                        {...register("name")}
                                        className='md:w-[30vw] p-2 border rounded bg-gray-100 text-gray-900'
                                        type="text"
                                        placeholder="Enter Department Name.."
                                        aria-label="Add"
                                    />
                                    {errors.name && <p className="text-rose-400 italic">{errors.name.message}</p>}
                                </label>
                                <button type={showEditForm ? 'submit' : 'button'} className='px-12 py-2 border bg-green-700 text-white rounded-sm hover:bg-green-600 cursor-pointer h-fit'>
                                    Save
                                </button>{" "}

                            </form>
                            <button onClick={handleClose} className='px-8 py-2 border bg-blue-600 text-white rounded-sm hover:bg-blue-500 cursor-pointer h-fit w-full'>Back</button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Adminwrap(ManageDepartment)

// ${showEditForm ? "hidden" : "block"}
// ${showEditForm ? "block" : "hidden"}