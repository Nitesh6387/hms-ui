// import Auth from '@/components/test/Auth'
// import Counter from '@/components/test/Counter'
// import React from 'react'

// function page() {
//   return (
//     <>
//       <Auth />
//       <Counter  />
//     </>
//   )
// }

// export default page

"use client"
import Adminwrap from '@/HOC/Adminwrap'
import React from 'react'

function page() {
  return (
    <>

      <h2>HOC COMPONENT</h2>
    </>
  )
}

export default Adminwrap(page)