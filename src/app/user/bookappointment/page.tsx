import Dashboard from '@/components/common/Dashboard'
import Appointment from '@/components/User/AppoinmentBook'
import React from 'react'

const page = () => {
  return (
    <Dashboard>
      <Appointment />
    </Dashboard>
  )
}

export default page