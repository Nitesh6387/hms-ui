"use client";
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { fetchDepartmentdata, userAuthRegister } from '@/Services';
import { swalFire } from '@/Helpers/SwalFire';
import Image from 'next/image';
import Link from 'next/link';
import { userSession } from '@/Helpers/userSession';

const doctorSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").max(50).required("Name is required"),
  departmentId: yup.string().required("Department is required"),
  specialist: yup.string().min(2, "Specialist must be at least 2 characters").max(100).required("Specialist is required"),
  qualifications: yup.string().min(2, "Qualifications must be at least 2 characters").max(100).required("Qualifications are required"),
  contact: yup.string().matches(/^\d{10}$/, "Contact must be a 10-digit number").required("Contact is required"),
  experience: yup.number().typeError("Experience must be a number").min(1, "Minimum 1 year").max(50, "Maximum 50 years").required("Experience is required"),
  fees: yup.number().typeError("Fees must be a number").min(0, "Fees cannot be negative").required("Fees is required"),
  address: yup.string().min(5, "Address must be at least 5 characters").max(200).required("Address is required"),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required("Gender is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  profile: yup.mixed().test("fileSize", "Profile image is required", (value: any) => value?.length > 0).required(),
  availableDays: yup.array().of(yup.string().oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]))
    .min(1, "Select at least one available day")
    .required("Available days are required"),
  password: yup.string().required("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 
    "Password must be 8-16 characters with uppercase, lowercase, number and special character"),
  userType: yup.string().oneOf(["doctor", "patient"], "Invalid User Type").required(),
});

const patientSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").max(50).required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required("Gender is required"),
  contact: yup.string().matches(/^\d{10}$/, "Contact must be a 10-digit number").required("Contact is required"),
  age: yup.number().typeError("Age must be a number").min(1, "Age must be at least 1").max(120, "Age must be at most 120").required("Age is required"),
  profile: yup.mixed().test("fileSize", "Profile image is required", (value: any) => value?.length > 0).required(),
  password: yup.string().required("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    "Password must be 8-16 characters with uppercase, lowercase, number and special character"),
  userType: yup.string().oneOf(["doctor", "patient"], "Invalid User Type").required(),
});

const UserRegister = () => {
  const user = userSession();
  const [userType, setUserType] = useState("patient");
  const isDoctor = userType === "doctor";
  const [passwordType, setPasswordType] = useState(true);
  const [loading, setLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetchDepartmentdata(user?.jwtToken);
      setDepartmentData(result.data || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const schema: any = isDoctor ? doctorSchema : patientSchema;
  const { register, handleSubmit, formState: { errors }, reset }: any = useForm({
    resolver: yupResolver(schema),
  });

  const registerFunction = async (data: any) => {
    setLoading(true);
    try {
      const formData: any = new FormData();
      data.availableDays?.forEach((day: any) => {
        formData.append("availableDays", day);
      });

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("profile", data.profile[0]);
      formData.append("gender", data.gender);
      formData.append("password", data.password);
      formData.append("age", data.age);
      formData.append("userType", data.userType);
      formData.append("departmentId", data.departmentId);
      formData.append("specialist", data.specialist);
      formData.append("qualifications", data.qualifications);
      formData.append("experience", data.experience);
      formData.append("fees", data.fees);
      formData.append("address", data.address);

      const res = await userAuthRegister(formData);
      if (res?.code == 201) {
        swalFire("Auth", res.message, "success");
        reset();
        setUserType("patient");
      } else {
        swalFire("Auth", res.message || "Registration failed", "error");
      }
    } catch (error: any) {
      swalFire("Auth", error.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Image */}
          <div className="hidden lg:flex bg-cyan-50 items-center justify-center p-8">
            <Image alt="register" width={500} height={500} src="/Images/loginimg.svg" className="max-w-full h-auto" />
          </div>

          {/* Right Form */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
            
            <form onSubmit={handleSubmit((d: any) => registerFunction(d))} className="space-y-4">
              {/* User Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Register as:</label>
                <select
                  {...register("userType")}
                  className={inputClass}
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
                {errors.userType && <p className="input-error">{errors.userType?.message}</p>}
              </div>

              {/* Patient Fields */}
              {userType === "patient" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input {...register("name")} className={inputClass} placeholder="Enter your name" type="text" />
                      {errors.name && <p className="input-error">{errors.name?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input {...register("email")} className={inputClass} placeholder="Enter your email" type="email" />
                      {errors.email && <p className="input-error">{errors.email?.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select {...register("gender")} className={inputClass}>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="input-error">{errors.gender?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input {...register("contact")} className={inputClass} placeholder="10-digit number" type="text" />
                      {errors.contact && <p className="input-error">{errors.contact?.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input {...register("age")} className={inputClass} placeholder="Enter your age" type="number" />
                      {errors.age && <p className="input-error">{errors.age?.message}</p>}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input {...register("password")} className={`${inputClass} pr-10`} placeholder="Create password" type={passwordType ? 'password' : 'text'} />
                      <button type='button' onClick={() => setPasswordType(!passwordType)} className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700">
                        <i className={passwordType ? "ri-eye-line text-lg" : "ri-eye-off-line text-lg"}></i>
                      </button>
                      {errors.password && <p className="input-error">{errors.password?.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                    <input {...register("profile")} className="w-full border border-gray-300 rounded-lg bg-white file:border-0 file:bg-cyan-600 file:text-white file:py-2 file:px-4 file:rounded-lg file:cursor-pointer hover:file:bg-cyan-700" type="file" />
                    {errors.profile && <p className="input-error">{errors.profile?.message}</p>}
                  </div>
                </>
              )}

              {/* Doctor Fields */}
              {userType === "doctor" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input {...register("name")} className={inputClass} placeholder="Enter your name" type="text" />
                      {errors.name && <p className="input-error">{errors.name?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select {...register("departmentId")} className={inputClass}>
                        <option value="">Select Department</option>
                        {departmentData?.map((dept: any, index: any) => (
                          <option value={dept?.id} key={index}>{dept?.name}</option>
                        ))}
                      </select>
                      {errors.departmentId && <p className="input-error">{errors.departmentId?.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialist</label>
                      <input {...register("specialist")} className={inputClass} placeholder="e.g., Cardiologist" type="text" />
                      {errors.specialist && <p className="input-error">{errors.specialist?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                      <input {...register("qualifications")} className={inputClass} placeholder="e.g., MBBS, MD" type="text" />
                      {errors.qualifications && <p className="input-error">{errors.qualifications?.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input {...register("contact")} className={inputClass} placeholder="10-digit number" type="text" />
                      {errors.contact && <p className="input-error">{errors.contact?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                      <input {...register("experience")} className={inputClass} placeholder="Years of experience" type="number" />
                      {errors.experience && <p className="input-error">{errors.experience?.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fees</label>
                      <input {...register("fees")} className={inputClass} placeholder="Fees in $" type="number" />
                      {errors.fees && <p className="input-error">{errors.fees?.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select {...register("gender")} className={inputClass}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="input-error">{errors.gender?.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input {...register("address")} className={inputClass} placeholder="Full address" type="text" />
                    {errors.address && <p className="input-error">{errors.address?.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input {...register("email")} className={inputClass} placeholder="Enter your email" type="email" />
                    {errors.email && <p className="input-error">{errors.email?.message}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input {...register("password")} className={`${inputClass} pr-10`} placeholder="Create password" type={passwordType ? 'password' : 'text'} />
                    <button type="button" onClick={() => setPasswordType(!passwordType)} className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700">
                      <i className={passwordType ? "ri-eye-line text-lg" : "ri-eye-off-line text-lg"}></i>
                    </button>
                    {errors.password && <p className="input-error">{errors.password?.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                        <label key={index} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" value={day} {...register("availableDays")} className="text-cyan-600 focus:ring-cyan-500" />
                          <span className="text-sm">{day}</span>
                        </label>
                      ))}
                    </div>
                    {errors.availableDays && <p className="input-error">{errors.availableDays.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                    <input {...register("profile")} className="w-full border border-gray-300 rounded-lg bg-white file:border-0 file:bg-cyan-600 file:text-white file:py-2 file:px-4 file:rounded-lg file:cursor-pointer hover:file:bg-cyan-700" type="file" />
                    {errors.profile && <p className="input-error">{errors.profile?.message}</p>}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link className="text-cyan-600 font-semibold hover:underline" href='/login'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;