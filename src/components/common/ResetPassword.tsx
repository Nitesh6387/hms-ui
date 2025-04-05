"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";
import { resetUserPassword } from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";

const schema = yup.object().shape({

  userType: yup
    .string()
    .oneOf(["admin", "doctor", "patient"], "Invalid User type")
    .required("User type is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const params = useSearchParams()
  const token = params.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetPassword = async (data: any) => {
    // delete data.confirmpassword
    const updatedPayload = { ...data, token }
    const res = await resetUserPassword(updatedPayload)
    if (res.code === 200) {
      swalFire("Reset Password", res?.message, "success")
    } else {
      swalFire("Reset Password", res?.message, "error")
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit((data) => handleResetPassword(data))}>
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
          <div className="mb-4">
            <input
              {...register("password")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              placeholder="Enter your password"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
          </div>

          <div className="mb-4">
            <input
              {...register("confirmpassword")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              placeholder="Confirm your password"
              type="password"
            />
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm">{errors.confirmpassword?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
