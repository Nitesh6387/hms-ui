import ManagePatients from '@/components/Admin/ManagePatients'
import Dashboard from '@/components/common/Dashboard'
import React from 'react'

function page() {
    return (
        <Dashboard>
            <ManagePatients />
        </Dashboard>
    )
}

export default page