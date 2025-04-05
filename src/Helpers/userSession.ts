import { useSelector } from "react-redux"

export const userSession = () => {
    const user = useSelector((state: any) => state.auth.session)
    return user
}