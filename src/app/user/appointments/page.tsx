import Dashboard from '@/components/common/Dashboard'
import MyAppointments from '@/components/User/MyAppointments'
import React from 'react'

const page = () => {
    return (
        <Dashboard>
            <MyAppointments />
        </Dashboard>
    )
}

export default page