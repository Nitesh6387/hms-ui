"use client";
import Adminwrap from "@/HOC/Adminwrap";
import { BASEURL, deleteDoctor, fetchDoctorsData, addDoctor, updateDoctor, fetchDepartmentdata } from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";
import { userSession } from "@/Helpers/userSession";
import React, { useEffect, useState } from "react";

const ManageDoctors = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [doctorData, setDoctorData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departmentId: "",
    specialist: "",
    qualifications: "",
    contact: "",
    experience: "",
    fees: "",
    address: "",
    gender: "Male",
    availableDays: [] as string[],
    password: "",
    profile: null as File | null,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
    fetchDepartments();
  }, [token]);

  const fetchData = async () => {
    const result = await fetchDoctorsData(token);
    setDoctorData(result.data || []);
  };

  const fetchDepartments = async () => {
    const res = await fetchDepartmentdata(token);
    setDepartments(res.data || []);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      departmentId: "",
      specialist: "",
      qualifications: "",
      contact: "",
      experience: "",
      fees: "",
      address: "",
      gender: "Male",
      availableDays: [],
      password: "",
      profile: null,
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

  const handleEditClick = (doctor: any) => {
    setIsEditMode(true);
    setEditingId(doctor.id);
    setFormData({
      name: doctor.name || "",
      email: doctor.email || "",
      departmentId: doctor.departmentId || "",
      specialist: doctor.specialist || "",
      qualifications: doctor.qualifications || "",
      contact: doctor.contact || "",
      experience: doctor.experience || "",
      fees: doctor.fees || "",
      address: doctor.address || "",
      gender: doctor.gender || "Male",
      availableDays: doctor.availableDays || [],
      password: "",
      profile: null,
      isActive: doctor.isActive !== undefined ? doctor.isActive : true,
    });
    setShowForm(true);
  };

  const handleRemoveDoctor = async (id: string) => {
    const confirm = await swalFire(
      "Are you sure?",
      "This will soft-delete the doctor.",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const res = await deleteDoctor(id, token);
      if (res.code === 200) {
        swalFire("Deleted", res.message, "success");
        await fetchData();
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
      if (isEditMode && editingId) {
        // EDIT
        const payload: any = { ...formData };
        delete payload.profile;
        delete payload.password;
        delete payload.email; // email is read-only for edit
        const res = await updateDoctor(editingId, payload, token);
        if (res.code === 200) {
          swalFire("Updated", res.message, "success");
          resetForm();
          await fetchData();
        } else {
          swalFire("Error", res.message, "error");
        }
      } else {
        // ADD
        const payload = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === "profile" && formData.profile) {
            payload.append(key, formData.profile);
          } else if (key === "availableDays") {
            formData.availableDays.forEach((day) => payload.append("availableDays", day));
          } else if (key === "password" && formData.password) {
            payload.append(key, formData.password);
          } else if (key !== "profile" && key !== "availableDays" && key !== "password") {
            payload.append(key, String(formData[key as keyof typeof formData]));
          }
        });
        payload.append("userType", "doctor");
        const res = await addDoctor(payload, token);
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

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const inputClass = "w-full border p-2 rounded text-gray-900 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header and Add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Manage Doctors</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            + Add Doctor
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
            {isEditMode ? "Edit Doctor" : "Add New Doctor"}
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
                <label className={labelClass}>Department *</label>
                <select
                  required
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {departments.map((dept: any) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Specialist *</label>
                <input
                  type="text"
                  required
                  value={formData.specialist}
                  onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Qualifications *</label>
                <input
                  type="text"
                  required
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className={inputClass}
                />
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
                <label className={labelClass}>Experience (years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Fees *</label>
                <input
                  type="number"
                  required
                  value={formData.fees}
                  onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
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
                <label className={labelClass}>Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={inputClass}
                />
              </div>
              {!isEditMode && (
                <div className="md:col-span-2">
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
              <div className="md:col-span-2">
                <label className={labelClass}>Available Days</label>
                <div className="flex flex-wrap gap-3 mt-1">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <label key={day} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              {!isEditMode && (
                <div className="md:col-span-2">
                  <label className={labelClass}>Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, profile: e.target.files?.[0] || null })}
                    className={inputClass}
                  />
                </div>
              )}
              {isEditMode && (
                <div className="md:col-span-2">
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
                {loading ? "Saving..." : isEditMode ? "Update Doctor" : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table – always visible */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Avl. Days</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorData.map((doctor: any, index: number) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {doctor.name}
                </th>
                <td className="px-6 py-4">{doctor.email}</td>
                <td className="px-6 py-4">{doctor.availableDays?.join(", ")}</td>
                <td className="px-6 py-4">{doctor.address}</td>
                <td className="px-6 py-4">
                  <img
                    src={`${BASEURL}/static/${doctor.profile}`}
                    alt="profile"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(doctor)}
                    className="bg-blue-500 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-blue-700 me-1.5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveDoctor(doctor.id)}
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

export default Adminwrap(ManageDoctors);