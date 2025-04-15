
import { userSession } from '@/Helpers/userSession'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function Doctorwrap(WrapperComponent: any) {
    return (props: any) => {
        const router = useRouter()
        const DoctorData = userSession();
        useEffect(() => {
            if (!(DoctorData?.jwtToken && DoctorData?.userType == "doctor")) {
                router.push('/login')
            }
        }, [])
        return <WrapperComponent {...props} />
    }
}

export default Doctorwrap