"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset your Password</h2>
        <form onSubmit={handleSubmit((d) => console.log(d))}>
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
