import axios from "axios";

export const BASEURL = `http://localhost:9000`;

// ---------- Axios interceptor for 401 ----------
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("session");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ==========
export const userAuthLogin = async (payload: any) => {
  const response = await axios.post(`${BASEURL}/v1/api/login`, payload);
  return response?.data;
};

export const userAuthRegister = async (payload: any) => {
  const response = await axios.post(`${BASEURL}/v1/api/register`, payload);
  return response?.data;
};

export const forgetUserPassword = async (payload: any) => {
  const response = await axios.post(`${BASEURL}/v1/api/forget-password`, payload);
  return response?.data;
};

export const resetUserPassword = async (payload: any) => {
  const response = await axios.post(`${BASEURL}/v1/api/reset-password`, payload);
  return response?.data;
};

// ========== ADMIN DOCTOR MANAGEMENT ==========
export const addDoctor = async (payload: any, token: string) => {
  const response = await axios.post(`${BASEURL}/v1/api/admin/doctor`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateDoctor = async (id: string, payload: any, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/admin/doctor/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const deleteDoctor = async (id: string, token: string) => {
  const response = await axios.delete(`${BASEURL}/v1/api/admin/doctor/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getDoctorById = async (id: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/doctor/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== ADMIN PATIENT ==========

export const addPatient = async (payload: any, token: string) => {
  const response = await axios.post(`${BASEURL}/v1/api/register`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};
export const fetchPatientsData = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/patients`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const deletePatient = async (token: string, id: string) => {
  const response = await axios.delete(`${BASEURL}/v1/api/admin/removePatient/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updatePatientByAdmin = async (id: string, payload: any, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/admin/patient/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const activatePatient = async (id: string, token: string) => {
  const response = await axios.patch(`${BASEURL}/v1/api/admin/patient/${id}/activate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== ADMIN DEPARTMENT ==========
export const adminAddDepartment = async (payload: any, token: string) => {
  const response = await axios.post(`${BASEURL}/v1/api/admin-add-department`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const fetchDepartmentdata = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/departments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const deleteDepartmentData = async (deptId: string, token: string) => {
  const response = await axios.delete(`${BASEURL}/v1/api/admin-delete-department?id=${deptId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateDepartment = async (id: string, payload: { name: string }, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/admin/department/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== ADMIN APPOINTMENTS ==========
export const fetchAppointmentdata = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/getappointmentdata`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateAppointmentStatus = async (id: string, status: string, token: string) => {
  const response = await axios.patch(`${BASEURL}/v1/api/admin/appointment/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};
export const updateAppointment = async (id: string, payload: any, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/admin/appointment/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== ADMIN STATS ==========
export const getDashboardStats = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== DOCTOR ==========
export const getDoctorProfile = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/doctor/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateDoctorProfile = async (payload: any, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/doctor/profile`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateAvailability = async (payload: { availableDays: string[] }, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/doctor/availability`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getDoctorAppointments = async (token: string, filters?: { status?: string; date?: string }) => {
  const response = await axios.get(`${BASEURL}/v1/api/doctor/appointments`, {
    params: filters,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getDoctorAppointmentById = async (id: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/doctor/appointment/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updateDoctorAppointmentStatus = async (id: string, status: string, token: string) => {
  const response = await axios.patch(`${BASEURL}/v1/api/doctor/appointment/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== PATIENT ==========
export const getPatientProfile = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/patient/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const updatePatientProfile = async (payload: any, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/patient/profile`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const changePatientPassword = async (payload: { oldPassword: string; newPassword: string }, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/patient/change-password`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== PATIENT APPOINTMENTS ==========
export const fetchAppointmentByPatientId = async (id: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/get-appointment-by-patientId?patientId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getPatientAppointmentById = async (id: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/patient/appointment/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const cancelAppointment = async (id: string, token: string) => {
  const response = await axios.patch(`${BASEURL}/v1/api/patient/appointment/${id}/cancel`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const rescheduleAppointment = async (id: string, payload: { date: string; startTime: string }, token: string) => {
  const response = await axios.put(`${BASEURL}/v1/api/patient/appointment/${id}/reschedule`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

// ========== COMMON / SHARED ==========
export const fetchDoctorsData = async (token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/admin/doctors`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getdoctByDepartmentIDService = async (id: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/get-doctor-by-departmentId?departmentId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const bookdoctorAppointment = async (payload: any, token: string) => {
  const response = await axios.post(`${BASEURL}/v1/api/doctor-appointment-book`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const deleteAppointmentById = async (appointmentId: string, token: string) => {
  const response = await axios.delete(`${BASEURL}/v1/api/delete-appointment`, {
    params: { appointmentId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};

export const getAppointmentsByDoctorId = async (doctorId: string, token: string) => {
  const response = await axios.get(`${BASEURL}/v1/api/get-appointment-by-doctorId/${doctorId}`, {
    params: { doctorId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response?.data;
};