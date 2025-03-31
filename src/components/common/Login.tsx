"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { userAuthLogin } from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";
import Image from "next/image";
const schema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["admin", "doctor", "patient"], "Invalid User type")
    .required("User type is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Login = () => {
  const loginFunction = async (data: any) => {
    const res = await userAuthLogin(data)
    if (res?.code == 200) {
      swalFire("Auth", res.message, "success")
    } else {
      swalFire("Auth", res.message, "error")
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex justify-center gap-16 items-center py-16 ">
      <div className=" hidden md:block">
        <Image alt="login" width={600} height={600} src="/Images/loginimg.svg" />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit((d) => loginFunction(d))}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Login as:</label>
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
              {...register("email")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              placeholder="Enter your email"
              type="text"
              id="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
          </div>

          <div className="mb-4">
            <input
              {...register("password")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-900"
              placeholder="Enter your password"
              type="password"
              id="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
          </div>

          <div className="flex justify-between text-sm text-blue-500">
            <Link href="/forget-password" className="hover:underline">
              Forget Password?
            </Link>
            <Link href="/reset-password" className="hover:underline">
              Reset Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p>Don't have an account? <Link className="text-blue-600" href='/register'>Register</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
