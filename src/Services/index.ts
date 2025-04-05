import axios from "axios";
export const BASEURL = `http://localhost:9000`

export const userAuthLogin = async (payload: any) => {
    const response = await axios.post(`http://localhost:9000/v1/api/login`, payload);
    return response?.data
}

export const userAuthRegister = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/register`, payload);
    return response?.data;
}

export const fetchDoctorsData = async (token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/admin/doctors`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}
export const fetchPatientsData = async (token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/admin/patients`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}



export const forgetUserPassword = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/forget-password`, payload)
    return response?.data;
}

export const resetUserPassword = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/reset-password`, payload)
    return response?.data;
}