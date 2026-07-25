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

  const [loading, setLoading] = React.useState(false);

  const resetPassword = async (data: any) => {
    setLoading(true);
    try {
      const res = await forgetUserPassword(data);
      if (res?.code == 200) {
        swalFire("Password Reset", res.message, "success");
      } else {
        swalFire("Password Reset", res.message, "error");
      }
    } catch (error: any) {
      swalFire("Password Reset", error.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4 min-h-screen bg-gray-100">
      <div className="hidden md:block">
        <Image alt="forgot password" width={600} height={600} src="/Images/forgetPass.svg" />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email and user type to receive a password reset link.</p>
        <form onSubmit={handleSubmit((d) => resetPassword(d))}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">User Type</label>
            <select
              {...register("userType")}
              className="input-field"
            >
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
            </select>
            {errors.userType && <p className="input-error">{errors.userType?.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              className="input-field"
              placeholder="Enter your registered email"
              type="text"
            />
            {errors.email && <p className="input-error">{errors.email?.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                Sending...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;