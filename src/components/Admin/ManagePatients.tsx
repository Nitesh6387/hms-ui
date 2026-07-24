"use client";
import Adminwrap from "@/HOC/Adminwrap";
import {
  deletePatient,
  fetchPatientsData,
  updatePatientByAdmin,
  addPatient,
} from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";
import { userSession } from "@/Helpers/userSession";
import React, { useEffect, useState } from "react";

const ManagePatients = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [patientData, setPatientData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Male",
    contact: "",
    age: "",
    bloodGroup: "",
    aadhaarNo: "",
    password: "",
    isActive: true,
  });

  const fetchData = async () => {
    const result = await fetchPatientsData(token);
    setPatientData(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      gender: "Male",
      contact: "",
      age: "",
      bloodGroup: "",
      aadhaarNo: "",
      password: "",
      isActive: true,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    resetForm();
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (patient: any) => {
    setIsEditMode(true);
    setEditingId(patient.id);
    setFormData({
      name: patient.name || "",
      email: patient.email || "",
      gender: patient.gender || "Male",
      contact: patient.contact || "",
      age: patient.age || "",
      bloodGroup: patient.bloodGroup || "",
      aadhaarNo: patient.aadhaarNo || "",
      password: "",
      isActive: patient.isActive !== undefined ? patient.isActive : true,
    });
    setShowForm(true);
  };

  const removeUser = async (id: any) => {
    const confirm = await swalFire(
      "Are you sure?",
      "You won't be able to revert this!",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const res = await deletePatient(token, id);
      if (res.success) {
        swalFire("Deleted", res.message, "success");
        fetchData();
      } else {
        swalFire("Error", res.message || "Something went wrong.", "error");
      }
    } catch (error) {
      swalFire("Error", "Network or server error occurred.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode && editingId) {
        // EDIT
        const payload: any = { ...formData };
        delete payload.password;
        delete payload.email; // email is read-only
        const res = await updatePatientByAdmin(editingId, payload, token);
        if (res.code === 200) {
          swalFire("Updated", res.message, "success");
          resetForm();
          await fetchData();
        } else {
          swalFire("Error", res.message, "error");
        }
      } else {
        // ADD
        const payload: any = { ...formData };
        const res = await addPatient(payload, token);
        if (res.code === 201) {
          swalFire("Success", res.message, "success");
          resetForm();
          await fetchData();
        } else {
          swalFire("Error", res.message, "error");
        }
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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header and Add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Manage Patients</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            + Add Patient
          </button>
        )}
      </div>

      {/* Conditional Form */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6 relative">
          <button
            onClick={resetForm}
            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">
            {isEditMode ? "Edit Patient" : "Add New Patient"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  disabled={isEditMode}
                />
                {isEditMode && <p className="text-xs text-gray-500">Email cannot be changed</p>}
              </div>
              <div>
                <label className={labelClass}>Contact *</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className={inputClass}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Age *</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Blood Group</label>
                <input
                  type="text"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., A+, B-, O+"
                />
              </div>
              <div>
                <label className={labelClass}>Aadhaar No.</label>
                <input
                  type="text"
                  value={formData.aadhaarNo}
                  onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                  className={inputClass}
                />
              </div>
              {!isEditMode && (
                <div>
                  <label className={labelClass}>Password *</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={inputClass}
                  />
                </div>
              )}
              {isEditMode && (
                <div>
                  <label className={labelClass}>Active</label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="ml-2"
                  />
                </div>
              )}
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
                {loading ? "Saving..." : isEditMode ? "Update Patient" : "Add Patient"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientData?.map((patient: any, index: number) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {patient?.name}
                </th>
                <td className="px-6 py-4">{patient?.email}</td>
                <td className="px-6 py-4">{patient?.contact}</td>
                <td className="px-6 py-4">{patient?.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(patient)}
                    className="bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-blue-700 me-1.5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeUser(patient?.id)}
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

export default Adminwrap(ManagePatients);