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

export const forgetUserPassword = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/forget-password`, payload)
    return response?.data;
}

export const resetUserPassword = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/reset-password`, payload)
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
export const deletePatient = async (token: any, id: any) => {
    const response = await axios.delete(`${BASEURL}/v1/api/admin/removePatient/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}

export const adminAddDepartment = async (payload: any, token: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/admin-add-department`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response?.data;
}
export const fetchDepartmentdata = async (token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/admin/departments`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}
export const deleteDepartmentData = async (deptId: any, token: any) => {
    const response = await axios.delete(`${BASEURL}/v1/api/admin-delete-department?id=${deptId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response?.data;
}

export const getdoctByDepartmentIDService = async (id: any, token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/get-doctor-by-departmentId?departmentId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response?.data
}

export const fetchAppointmentdata = async (token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/admin/getappointmentdata`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}

export const bookdoctorAppointment = async (payload: any, token: any) => {
    const response = await axios.post(`${BASEURL}/v1/api/doctor-appointment-book`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response?.data;
}

export const fetchAppointmentByPatientId = async (id: any, token: any) => {
    const response = await axios.get(`${BASEURL}/v1/api/get-appointment-by-patientId?patientId=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data
}


export const deleteAppointmentById = async (appointmentId: string, token: string) => {
  const response = await axios.delete(`${BASEURL}/v1/api/delete-appointment`, {
    params: { appointmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};







