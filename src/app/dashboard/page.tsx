"use client"
import Dashboard from '@/components/common/Dashboard'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
function page() {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.session);
  useEffect(() => {
    // if (user == null) {
    //   router.push('/login')
    // }
  }, [])
  return (
    <Dashboard>
      <h2>Dashboard Area</h2>
    </Dashboard>
  )
}

export default page