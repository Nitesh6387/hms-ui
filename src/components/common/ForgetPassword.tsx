"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { swalFire } from "@/Helpers/SwalFire";
import { forgetUserPassword } from "@/Services";

const schema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["admin", "doctor", "patient"], "Invalid User type")
    .required("User type is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const resetPassword = async (data: any) => {
    const res = await forgetUserPassword(data)
    if (res?.code == 200) {
      swalFire("Password", res.message, "success")

    } else {
      swalFire("Password", res.message, "error")
    }
  }

  return (
    <div className="flex justify-center items-center py-16  gap-16">
      <div className=" hidden md:block">
        <Image alt="login" width={600} height={600} src="/Images/forgetPass.svg" />
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Forget Password</h2>
        <form onSubmit={handleSubmit((d) => resetPassword(d))}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Select UserType:</label>
            <select
              {...register("userType")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
            >
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>

            </select>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType?.message}</p>}
          </div>
          <div className="mb-5">
            <input
              {...register("email")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              placeholder="Enter your email"
              type="text"
              id="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
          </div>
          <button
            type="submit"
            className="w-1/2 mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
