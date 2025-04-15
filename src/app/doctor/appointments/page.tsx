import Dashboard from '@/components/common/Dashboard'
import Appointments from '@/components/Doctor/Appointments'
import React from 'react'

const page = () => {
  return (
    <Dashboard>
        <Appointments />
    </Dashboard>
  )
}

export default page