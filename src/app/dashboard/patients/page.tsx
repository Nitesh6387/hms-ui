import DashboardDoctor from '@/components/Doctor/DashboardDoctor'
import Patients from '@/components/Doctor/Patients'
import React from 'react'

function page() {
  return (
    <DashboardDoctor>
        <Patients />
    </DashboardDoctor>
  )
}

export default page