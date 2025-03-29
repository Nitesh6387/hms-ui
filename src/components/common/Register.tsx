"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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
  profile: yup.mixed().test("fileSize", "File is required", (value:any) => value?.length > 0).required(),
  userType: yup.string().oneOf(["Doctor", "Patient"], "Invalid User Type").required(),
});

const patientSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required("Name is required"),
  email: yup.string().email("Invalid email address").required(),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required(),
  contact: yup.string().matches(/\d{10}/, "Contact must be a 10-digit number").required(),
  age: yup.number().typeError("Age must be a number").min(18).max(100).required(),
  userType: yup.string().oneOf(["Doctor", "Patient"], "Invalid User Type").required(),
});

const Register = () => {
    const [userType, setUserType] = useState("Patient");
    const isDoctor = userType === "Doctor";
    
    const schema:any = isDoctor ? doctorSchema : patientSchema;
    const { register, handleSubmit, formState: { errors } }:any = useForm({
      resolver: yupResolver(schema),
    });
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 text-gray-900">
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Register as:</label>
          <select
            {...register("userType")}
            className="w-full p-2 bg-gray-100 border rounded text-gray-900"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType?.message}</p>}
        </div>
  
        <div className="mb-4">
          <input {...register("name")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter your name" type="text" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
        </div>
  
        <div className="mb-4">
          <input {...register("email")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter your email" type="email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
        </div>
  
        <div className="mb-4">
          <select {...register("gender")} className="w-full p-2 bg-gray-100 border rounded text-gray-900">
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender?.message}</p>}
        </div>
  
        <div className="mb-4">
          <input {...register("contact")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter your contact number" type="text" />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact?.message}</p>}
        </div>
  
        {isDoctor && (
          <>
            <div className="mb-4">
              <input {...register("specialist")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter your specialty" type="text" />
              {errors.specialist && <p className="text-red-500 text-sm">{errors.specialist?.message}</p>}
            </div>
  
            <div className="mb-4">
              <input {...register("qualifications")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter your qualifications" type="text" />
              {errors.qualifications && <p className="text-red-500 text-sm">{errors.qualifications?.message}</p>}
            </div>
  
            <div className="mb-4">
              <input {...register("experience")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter years of experience" type="number" />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience?.message}</p>}
            </div>
  
            <div className="mb-4">
              <input {...register("fees")} className="w-full p-2 bg-gray-100 border rounded text-gray-900" placeholder="Enter consultation fees" type="number" />
              {errors.fees && <p className="text-red-500 text-sm">{errors.fees?.message}</p>}
            </div>
          </>
        )}
  
        <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded mt-4 text-white font-semibold">
          Register
        </button>
      </form>
      <div>
          <p>Alredy have an account? <Link className="text-blue-600" href='/login'>Login</Link> </p>
        </div>
    </div>
  </div>
  
  );
};

export default Register;
