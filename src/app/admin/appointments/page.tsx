import ManageAppointments from '@/components/Admin/ManageAppointments'
import Dashboard from '@/components/common/Dashboard'
import React from 'react'

function page() {
  return (
    <Dashboard>
      <ManageAppointments />
    </Dashboard>
  )
}

export default page