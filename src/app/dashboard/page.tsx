"use client"
import Dashboard from '@/components/common/Dashboard'
import React from 'react'

function DashboardPage() {
  return (
    <Dashboard>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to your dashboard.</p>
      </div>
    </Dashboard>
  )
}

export default DashboardPage