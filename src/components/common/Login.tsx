"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { userAuthLogin } from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";
import Image from "next/image";
import { login } from "@/Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["admin", "doctor", "patient"], "Invalid User type")
    .required("User type is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginFunction = async (data: any) => {
    setLoading(true);
    try {
      const res = await userAuthLogin(data);
      if (res?.code === 200) {
        swalFire("Auth", res.message, "success");
        dispatch(login(res?.data));
        if (res?.data.userType === "admin") {
          router.push("/admin");
        } else if (res?.data.userType === "doctor") {
          router.push("/doctor/appointments");
        } else {
          router.push("/user/appointments");
        }
      } else {
        swalFire("Auth", res.message, "error");
      }
    } catch (error: any) {
      swalFire("Auth", error.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex justify-center gap-16 items-center py-16 px-4">
      <div className="hidden md:block">
        <Image alt="login" width={600} height={600} src="/Images/loginimg.svg" />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit((d) => loginFunction(d))}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Login as:</label>
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

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              className="input-field"
              placeholder="Enter your email"
              type="text"
            />
            {errors.email && <p className="input-error">{errors.email?.message}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              {...register("password")}
              className="input-field pr-10"
              placeholder="Enter your password"
              type={passwordType ? 'password' : 'text'}
            />
            <button
              type="button"
              onClick={() => setPasswordType(!passwordType)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <i className={passwordType ? "ri-eye-line text-lg" : "ri-eye-off-line text-lg"}></i>
            </button>
            {errors.password && <p className="input-error">{errors.password?.message}</p>}
          </div>

          <div className="flex justify-end text-sm mb-4">
            <Link href="/forget-password" className="text-cyan-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link className="text-cyan-600 font-semibold hover:underline" href='/register'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;