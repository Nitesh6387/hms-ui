"use client";
import { useEffect, useState } from "react";
import Userwrap from "@/HOC/Userwrap";
import { getPatientProfile, updatePatientProfile } from "@/Services";
import { userSession } from "@/Helpers/userSession";
import { swalFire } from "@/Helpers/SwalFire";
import Dashboard from "@/components/common/Dashboard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const profileSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required("Name is required"),
  contact: yup.string().matches(/^\d{10}$/, "Contact must be a 10-digit number").required("Contact is required"),
  gender: yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
  age: yup.number().typeError("Age must be a number").min(1).max(120).required("Age is required"),
  bloodGroup: yup.string(),
});

const UserProfile = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getPatientProfile(token);
        if (res.data) {
          reset({
            name: res.data.name || "",
            contact: res.data.contact || "",
            gender: res.data.gender || "Male",
            age: res.data.age || "",
            bloodGroup: res.data.bloodGroup || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [token, reset]);

  const handleUpdate = async (data: any) => {
    setLoading(true);
    try {
      const res = await updatePatientProfile(data, token);
      if (res.code === 200) {
        swalFire("Updated", res.message, "success");
      } else {
        swalFire("Error", res.message, "error");
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
              {session?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
              <p className="text-gray-500">{session?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input {...register("name")} className="input-field" />
                {errors.name && <p className="input-error">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input {...register("contact")} className="input-field" />
                {errors.contact && <p className="input-error">{errors.contact.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select {...register("gender")} className="input-field">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="input-error">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input {...register("age")} type="number" className="input-field" />
                {errors.age && <p className="input-error">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <input {...register("bloodGroup")} className="input-field" placeholder="e.g., A+, B+, O-" />
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

export default Userwrap(UserProfile);