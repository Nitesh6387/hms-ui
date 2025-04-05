"use client";
import React, { useState } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { userAuthRegister } from '@/Services';
import { swalFire } from '@/Helpers/SwalFire';
import Image from 'next/image';
import Link from 'next/link';

const doctorSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required("Name is required"),
  departmentId: yup.string().oneOf(["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics"], "Invalid department").required(),
  specialist: yup.string().min(2).max(100).required("Expertise is required"),
  qualifications: yup.string().min(2).max(100).required("Qualifications are required"),
  contact: yup.string().matches(/\d{10}/, "Contact must be a 10-digit number").required(),
  experience: yup.number().typeError("Experience must be a number").min(1).max(50).required(),
  fees: yup.number().typeError("Fees must be a number").min(0).required(),
  address: yup.string().min(5).max(200).required("Address is required"),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required(),
  email: yup.string().email("Invalid email address").required(),
  profile: yup.mixed().test("fileSize", "File is required", (value: any) => value?.length > 0).required(),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  userType: yup.string().oneOf(["doctor", "patient"], "Invalid User Type").required(),
});

const patientSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required("Name is required"),
  email: yup.string().email("Invalid email address").required(),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required(),
  contact: yup.string().matches(/\d{10}/, "Contact must be a 10-digit number").required(),
  age: yup.number().typeError("Age must be a number").min(18).max(100).required(),
  profile: yup.mixed().test("fileSize", "File is required", (value: any) => value?.length > 0).required(),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  userType: yup.string().oneOf(["doctor", "patient"], "Invalid User Type").required(),
});

const UserRegister = () => {
  const [userType, setUserType] = useState("patient");
  const isDoctor = userType === "doctor";

  const [passwordType, setPasswordType] = useState(true)

  const schema: any = isDoctor ? doctorSchema : patientSchema;
  const { register, handleSubmit, formState: { errors } }: any = useForm({
    resolver: yupResolver(schema),
  });

  const registerFunction = async (data: any) => {
    try {
      const formData: any = new FormData();
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
      } else {
        swalFire("Auth", res.message, "error");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-16 bg-white p-8">
      <div className="hidden md:block">
        <Image alt="register" width={600} height={600} src="/Images/loginimg.svg" />
      </div>
      <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
        <form onSubmit={handleSubmit((d: any) => registerFunction(d))} className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">Register as:</label>
            <select
              {...register("userType")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType?.message}</p>}
          </div>

          {/* Patient Fields */}
          {userType === "patient" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("name")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your name"
                    type="text"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("email")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <select
                    {...register("gender")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("contact")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your contact number"
                    type="text"
                  />
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("age")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your age"
                    type="text"
                  />
                  {errors.age && <p className="text-red-500 text-sm">{errors.age?.message}</p>}
                </div>
                <div className="mb-4 relative">
                  <input
                    {...register("password")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Create password"
                    type={passwordType ? 'password' : 'text'}
                    id="password"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
                  <button onClick={() => setPasswordType(!passwordType)} className="absolute top-1.5 right-4 cursor-pointer w-8 h-8 hover:bg-blue-500 hover:text-white rounded-full">
                    {
                      passwordType ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>
                    }
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    {...register("profile")}
                    className="w-full border rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 file:border-0 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg"
                    type="file"
                  />
                  {errors.profile && <p className="text-red-500 text-sm">{errors.profile?.message}</p>}
                </div>
              </div>
            </>
          )}

          {/* Doctor Fields */}
          {userType === "doctor" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("name")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your name"
                    type="text"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                </div>
                <div className="mb-4">
                  <select
                    {...register("departmentId")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                  {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("specialist")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your specialty"
                    type="text"
                  />
                  {errors.specialist && <p className="text-red-500 text-sm">{errors.specialist?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("qualifications")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your qualifications"
                    type="text"
                  />
                  {errors.qualifications && <p className="text-red-500 text-sm">{errors.qualifications?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("contact")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your contact number"
                    type="text"
                  />
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("experience")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter years of experience"
                    type="number"
                  />
                  {errors.experience && <p className="text-red-500 text-sm">{errors.experience?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    {...register("fees")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your fees"
                    type="number"
                  />
                  {errors.fees && <p className="text-red-500 text-sm">{errors.fees?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("address")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your address"
                    type="text"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address?.message}</p>}
                </div>
                <div className="mb-4">
                  <input
                    {...register("email")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                </div>
                <div className="mb-4 relative">
                  <input
                    {...register("password")}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-900"
                    placeholder="Create password"
                    type={passwordType ? 'password' : 'text'}
                    id="password"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
                  <button type="button" onClick={() => setPasswordType(!passwordType)} className="absolute top-1.5 right-4 cursor-pointer w-8 h-8 hover:bg-blue-500 hover:text-white rounded-full">
                    {
                      passwordType ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>
                    }
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    {...register("profile")}
                    className="w-full border rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 file:border-0 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg"
                    type="file"
                  />
                  {errors.profile && <p className="text-red-500 text-sm">{errors.profile?.message}</p>}
                </div>
              </div>


            </>
          )}

          <input
            type="submit"
            value="Register"
            className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          />
        </form>
        <div className="mt-4 text-center">
          <p>Already have an account? <Link className="text-blue-600" href='/login'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
