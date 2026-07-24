"use client";
import { userSession } from "@/Helpers/userSession";
import Adminwrap from "@/HOC/Adminwrap";
import {
  deleteAppointmentById,
  fetchAppointmentdata,
  updateAppointment,
  fetchDoctorsData,
  fetchDepartmentdata,
  fetchPatientsData,
} from "@/Services";
import React, { useEffect, useState } from "react";
import { swalFire } from "@/Helpers/SwalFire";

const ManageAppointments = () => {
  const user = userSession();
  const token = user?.jwtToken;
  const [appointmentData, setAppointmentData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    departmentId: "",
    disease: "",
    symptoms: "",
    payment: "",
    status: "In-progress",
    appointmentType: "general",
    date: "",
    startTime: "",
  });

  const fetchData = async () => {
    const result = await fetchAppointmentdata(token);
    setAppointmentData(result.data || []);
  };

  const fetchDropdowns = async () => {
    const [docs, depts, pats] = await Promise.all([
      fetchDoctorsData(token),
      fetchDepartmentdata(token),
      fetchPatientsData(token),
    ]);
    setDoctors(docs.data || []);
    setDepartments(depts.data || []);
    setPatients(pats.data || []);
  };

  useEffect(() => {
    fetchData();
    fetchDropdowns();
  }, [token]);

  const resetForm = () => {
    setFormData({
      patientId: "",
      doctorId: "",
      departmentId: "",
      disease: "",
      symptoms: "",
      payment: "",
      status: "In-progress",
      appointmentType: "general",
      date: "",
      startTime: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (app: any) => {
    // Pre-fill form with appointment data
    setFormData({
      patientId: app.patient_id || "",
      doctorId: app.doctor_id || "",
      departmentId: app.department_id || "",
      disease: app.apptbl_disease || "",
      symptoms: app.apptbl_symptoms || "",
      payment: app.apptbl_payment || "",
      status: app.apptbl_status || "In-progress",
      appointmentType: app.apptbl_appointmentType || "general",
      date: app.apptbl_date ? new Date(app.apptbl_date).toISOString().slice(0, 10) : "",
      startTime: app.apptbl_startTime || "",
    });
    setEditingId(app.apptbl_id);
    setShowForm(true);
  };

  const handleDelete = async (appointmentId: string) => {
    const confirm = await swalFire(
      "Are you sure?",
      "You will not be able to recover this appointment!",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const response = await deleteAppointmentById(appointmentId, token);
      if (response?.success) {
        await fetchData();
        swalFire("Deleted!", "Appointment has been deleted.", "success");
      } else {
        swalFire("Failed", "Failed to delete the appointment.", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      swalFire("Error", "Something went wrong while deleting.", "error");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // We still use the old status update if needed, but now we also have full update
      // For inline status change, we'll use the existing updateAppointmentStatus (but we'll keep it simple)
      // We'll use the same function from Services – but we can also use updateAppointment with only status.
      // For simplicity, we'll call updateAppointmentStatus if we don't want to open the form.
      // But we already have the form for full edit. We'll keep the dropdown for quick status changes,
      // but we might want to sync the dropdown with form status. Let's keep both: dropdown for quick update,
      // and Edit button opens form for full update.
      // We'll import updateAppointmentStatus if needed.
      // For now, we'll keep as is.
      const { updateAppointmentStatus } = await import("@/Services");
      const res = await updateAppointmentStatus(id, newStatus, token);
      if (res.code === 200) {
        swalFire("Status Updated", res.message, "success");
        fetchData();
      } else {
        swalFire("Error", res.message, "error");
      }
    } catch (error) {
      swalFire("Error", "Network error", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData };
      const res = await updateAppointment(editingId!, payload, token);
      if (res.code === 200) {
        swalFire("Updated", res.message, "success");
        resetForm();
        await fetchData();
      } else {
        swalFire("Error", res.message, "error");
      }
    } catch (error: any) {
      swalFire("Error", error.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border p-2 rounded text-gray-900 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen p-4 space-y-8 bg-gray-100">
      <div className="overflow-autorelative overflow-x-auto p-4">
        <h2 className="text-center mb-4 text-4xl font-bold">
          Manage Appointments
        </h2>

        {/* Conditional Edit Form */}
        {showForm && (
          <div className="bg-white p-6 rounded shadow mb-6 relative">
            <button
              onClick={resetForm}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Patient</label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Doctor</label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((d: any) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Department</option>
                    {departments.map((d: any) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="In-progress">In-progress</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Appointment Type</label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                    className={inputClass}
                  >
                    <option value="general">General</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Payment</label>
                  <input
                    type="text"
                    value={formData.payment}
                    onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    className={inputClass}
                    placeholder="Amount"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Disease</label>
                  <input
                    type="text"
                    value={formData.disease}
                    onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Symptoms</label>
                  <textarea
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className={inputClass}
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50 hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Update Appointment"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <table className="w-full text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Sr.</th>
              <th scope="col" className="px-6 py-3">Patient Name</th>
              <th scope="col" className="px-6 py-3">Doctor Name</th>
              <th scope="col" className="px-6 py-3">Department</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Time</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentData?.map((app: any, index: number) => (
              <tr key={index} className="border-b bg-gray-800 border-gray-500">
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="capitalize px-6 py-4">
                  {app?.patient_name}
                </th>
                <td className="px-6 py-4">{app?.doctor_name}</td>
                <td className="px-6 py-4">{app?.department_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {app?.apptbl_date ? new Date(app.apptbl_date).toISOString().slice(0, 10) : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {app?.apptbl_startTime || "Not set"}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={app?.apptbl_status}
                    onChange={(e) => handleStatusChange(app.apptbl_id, e.target.value)}
                    className="bg-gray-700 text-white rounded px-2 py-1"
                  >
                    <option value="In-progress">In-progress</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-blue-700 me-1.5"
                    onClick={() => handleEditClick(app)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app.apptbl_id)}
                    className="bg-red-600 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminwrap(ManageAppointments);