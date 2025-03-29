"use client"
import Doctors from '@/components/Doctors'
import UserLayout from '@/components/UserLayout'
import React from 'react'

const page = () => {
  return (
   <UserLayout>
    <Doctors/>
   </UserLayout>
  )
}

export default page