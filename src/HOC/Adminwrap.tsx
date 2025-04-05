
import { userSession } from '@/Helpers/userSession'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Adminwrap(WrapperComponent: any) {
    return (props: any) => {
        const router = useRouter()
        const adminData = userSession();

        useEffect(() => {
            if (!(adminData?.jwtToken && adminData?.userType == "admin")) {
                router.push('/login')
            }
        }, [])
        return <WrapperComponent {...props} />
    }
}

export default Adminwrap