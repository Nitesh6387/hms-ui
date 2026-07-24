"use client";
import { swalFire } from "@/Helpers/SwalFire";
import { userSession } from "@/Helpers/userSession";
import Adminwrap from "@/HOC/Adminwrap";
import {
  adminAddDepartment,
  deleteDepartmentData,
  fetchDepartmentdata,
  updateDepartment,
} from "@/Services";
import React, { useEffect, useState } from "react";

const ManageDepartment = () => {
  const user = userSession();
  const token = user?.jwtToken;
  const [departmentData, setDepartmentData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const result = await fetchDepartmentdata(token);
    setDepartmentData(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const resetForm = () => {
    setFormName("");
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

  const handleEditClick = (dept: any) => {
    setIsEditMode(true);
    setEditingId(dept.id);
    setFormName(dept.name);
    setShowForm(true);
  };

  const handleDeleteDept = async (id: string) => {
    const confirm = await swalFire(
      "Are you sure?",
      "You won't be able to revert this!",
      "warning"
    );
    if (!confirm.isConfirmed) return;
    try {
      const res = await deleteDepartmentData(id, token);
      if (res.code === 200) {
        swalFire("Department", res.message, "success");
        fetchData();
      } else {
        swalFire("Department", res.message, "error");
      }
    } catch (error: any) {
      swalFire("Error", "Network error", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      swalFire("Error", "Department name is required", "error");
      return;
    }
    setLoading(true);
    try {
      if (isEditMode && editingId) {
        // Update
        const res = await updateDepartment(editingId, { name: formName.trim() }, token);
        if (res.code === 200) {
          swalFire("Department", res.message, "success");
          resetForm();
          await fetchData();
        } else {
          swalFire("Department", res.message, "error");
        }
      } else {
        // Add
        const res = await adminAddDepartment({ name: formName.trim() }, token);
        if (res.code === 201) {
          swalFire("Department", res.message, "success");
          resetForm();
          await fetchData();
        } else {
          swalFire("Department", res.message, "error");
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
    <div className="min-h-screen p-4 space-y-8 bg-gray-100">
      {/* Header and Add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Manage Departments</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            + Add Department
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
            {isEditMode ? "Edit Department" : "Add New Department"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Department Name *</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className={inputClass}
                placeholder="Enter department name"
              />
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
                {loading ? "Saving..." : isEditMode ? "Update Department" : "Add Department"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Sr.</th>
              <th scope="col" className="px-6 py-3">Department Name</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departmentData?.map((dept: any, index: number) => (
              <tr key={index} className="border-b bg-gray-800 border-gray-500">
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="uppercase px-6 py-4">
                  {dept?.name}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(dept)}
                    className="bg-green-700 cursor-pointer px-6 rounded-md py-2 text-white hover:bg-green-500 me-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDept(dept.id)}
                    className="px-4 py-2 bg-red-700 text-white rounded-sm cursor-pointer hover:bg-red-500"
                  >
                    Delete
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

export default Adminwrap(ManageDepartment);