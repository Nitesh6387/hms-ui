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
            name: data.doctor_name || "",
            contact: data.doctor_contact || "",
            address: data.doctor_address || "",
            fees: data.doctor_fees || "",
            availableDays: data.doctor_availableDays || [],
            profile: data.doctor_profile || "",
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
        // Refetch to update profile image etc.
        const updated = await getDoctorProfile(token);
        if (updated.data) {
          const data = updated.data;
          setProfile({
            name: data.doctor_name || "",
            contact: data.doctor_contact || "",
            address: data.doctor_address || "",
            fees: data.doctor_fees || "",
            availableDays: data.doctor_availableDays || [],
            profile: data.doctor_profile || "",
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
      <div className="p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {profile.profile && (
          <div className="mb-4">
            <img
              src={`${BASEURL}/static/${profile.profile}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-2 w-full"
            placeholder="Name"
          />
          <input
            type="text"
            value={profile.contact}
            onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
            className="border p-2 w-full"
            placeholder="Contact"
          />
          <input
            type="text"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            className="border p-2 w-full"
            placeholder="Address"
          />
          <input
            type="text"
            value={profile.fees}
            onChange={(e) => setProfile({ ...profile, fees: e.target.value })}
            className="border p-2 w-full"
            placeholder="Fees"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Days</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={profile.availableDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </Dashboard>
  );
};

export default Doctorwrap(DoctorProfile);