"use client"
import Dashboard from '@/components/common/Dashboard'
import Adminwrap from '@/HOC/Adminwrap'
import React from 'react'

function page() {
  return (
    <Dashboard>
        <h2>Dashboard Area</h2>
    </Dashboard>
  )
}

export default Adminwrap(page)