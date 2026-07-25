"use client";
import { useEffect, useState } from "react";
import Doctorwrap from "@/HOC/Doctorwrap";
import { getDoctorProfile, updateDoctorProfile } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { swalFire } from "@/Helpers/SwalFire";
import Dashboard from "@/components/common/Dashboard";
import { BASEURL } from "@/Services";

const DoctorProfile = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [profile, setProfile] = useState({
    name: "",
    contact: "",
    address: "",
    fees: "",
    availableDays: [] as string[],
    profile: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getDoctorProfile(token);
        if (res.data) {
          const data = res.data;
          setProfile({
            name: data.doctor_name || data.name || "",
            contact: data.doctor_contact || data.contact || "",
            address: data.doctor_address || data.address || "",
            fees: data.doctor_fees || data.fees || "",
            availableDays: data.doctor_availableDays || data.availableDays || [],
            profile: data.doctor_profile || data.profile || "",
          });
        }
      } catch (error) {
        swalFire("Error", "Failed to load profile", "error");
      }
    };
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: profile.name,
        contact: profile.contact,
        address: profile.address,
        fees: profile.fees,
        availableDays: profile.availableDays,
      };
      const res = await updateDoctorProfile(payload, token);
      if (res.code === 200) {
        swalFire("Updated", res.message, "success");
        const updated = await getDoctorProfile(token);
        if (updated.data) {
          const data = updated.data;
          setProfile({
            name: data.doctor_name || data.name || "",
            contact: data.doctor_contact || data.contact || "",
            address: data.doctor_address || data.address || "",
            fees: data.doctor_fees || data.fees || "",
            availableDays: data.doctor_availableDays || data.availableDays || [],
            profile: data.doctor_profile || data.profile || "",
          });
        }
      } else {
        swalFire("Error", res.message, "error");
      }
    } catch (error) {
      swalFire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (day: string) => {
    setProfile((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  return (
    <Dashboard>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-8">
            {profile.profile ? (
              <img
                src={`${BASEURL}/static/${profile.profile}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-cyan-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase() || "D"}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
              <p className="text-gray-500">{session?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input type="text" value={profile.contact} onChange={(e) => setProfile({ ...profile, contact: e.target.value })} className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fees ($)</label>
                <input type="text" value={profile.fees} onChange={(e) => setProfile({ ...profile, fees: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                <div className="flex flex-wrap gap-3">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <label key={day} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={profile.availableDays.includes(day)} onChange={() => handleDayToggle(day)} className="text-cyan-600" />
                      <span className="text-sm">{day.substring(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Doctorwrap(DoctorProfile);