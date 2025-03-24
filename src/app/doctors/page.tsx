import React from 'react'
import Doctors from '../../components/Doctors'
import UserLayout from '@/components/UserLayout'

function page() {
  return (
   <UserLayout>
     <Doctors />
   </UserLayout>
  )
}

export default page