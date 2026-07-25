"use client";
import { useState } from "react";
import Dashboard from "@/components/common/Dashboard";
import Adminwrap from "@/HOC/Adminwrap";
import { swalFire } from "@/Helpers/SwalFire";
import { BASEURL } from "@/Services";
import axios from "axios";
import { userSession } from "@/Helpers/userSession";

const AdminSettings = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [hospitalName, setHospitalName] = useState("Global Health Center");
  const [address, setAddress] = useState("15/65 Ram Nagar, Raebareli, Uttar Pradesh, India");
  const [phone, setPhone] = useState("+91 6354553821");
  const [email, setEmail] = useState("supporthms@admin.com");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${BASEURL}/v1/api/admin/settings`, {
        hospitalName, address, phone, email
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data?.code === 200) {
        swalFire("Settings", "Settings updated successfully", "success");
      } else {
        swalFire("Error", res.data?.message || "Failed to update", "error");
      }
    } catch (error: any) {
      swalFire("Error", error.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
              <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Adminwrap(AdminSettings);