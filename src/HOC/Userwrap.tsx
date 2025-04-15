
import { userSession } from '@/Helpers/userSession'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function Userwrap(WrapperComponent: any) {
    return (props: any) => {
        const router = useRouter()
        const userData = userSession();
        useEffect(() => {
            if (!(userData?.jwtToken && userData?.userType == "patient")) {
                router.push('/login')
            }
        }, [])
        return <WrapperComponent {...props} />
    }
}

export default Userwrap