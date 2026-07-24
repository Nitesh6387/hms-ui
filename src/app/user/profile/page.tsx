"use client";
import { useEffect, useState } from "react";
import Userwrap from "@/HOC/Userwrap";
import { getPatientProfile, updatePatientProfile } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { swalFire } from "@/Helpers/SwalFire";
import Dashboard from "@/components/common/Dashboard";

const UserProfile = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [profile, setProfile] = useState({ name: "", contact: "", gender: "", age: "", bloodGroup: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getPatientProfile(token);
      if (res.data) setProfile(res.data);
    };
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updatePatientProfile(profile, token);
      if (res.code === 200) swalFire("Updated", res.message, "success");
    } catch (error) {
      swalFire("Error", "Network error", "error");
    }
  };

  return (
    <Dashboard>
        <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="border p-2 w-full"
          placeholder="Name"
        />
        <input
          type="text"
          value={profile.contact || ""}
          onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
          className="border p-2 w-full"
          placeholder="Contact"
        />
        <input
          type="text"
          value={profile.gender || ""}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
          className="border p-2 w-full"
          placeholder="Gender"
        />
        <input
          type="number"
          value={profile.age || ""}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          className="border p-2 w-full"
          placeholder="Age"
        />
        <input
          type="text"
          value={profile.bloodGroup || ""}
          onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
          className="border p-2 w-full"
          placeholder="Blood Group"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
    </Dashboard>
  );
};

export default Userwrap(UserProfile);