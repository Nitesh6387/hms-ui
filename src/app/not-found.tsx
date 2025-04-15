"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()
    const handleClick = () => {
        router.back()
    }
    return (
        <div className='min-h-screen flex justify-center items-center flex-col'>
            <h2 className='text-4xl font-bold'>Page Not Found!</h2>
            <button onClick={handleClick} className='mt-4 border cursor-pointer px-6 py-3 rounded-md hover:bg-blue-500 hover:text-white'>Back To Page</button>
        </div>
    )
}

export default NotFound