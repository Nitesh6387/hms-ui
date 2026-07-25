"use client";
import { useState } from "react";
import Dashboard from "@/components/common/Dashboard";
import Userwrap from "@/HOC/Userwrap";
import { changePatientPassword } from "@/Services";
import { swalFire } from "@/Helpers/SwalFire";
import { userSession } from "@/Helpers/userSession";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must be 8-16 characters with uppercase, lowercase, number and special character"),
  confirmPassword: yup.string().required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const UserSettings = () => {
  const session = userSession();
  const token = session?.jwtToken;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleChangePassword = async (data: any) => {
    setLoading(true);
    try {
      const res = await changePatientPassword(
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        token
      );
      if (res.code === 200) {
        swalFire("Password", "Password changed successfully", "success");
        reset();
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <i className="ri-information-line mr-1"></i>
              Update your password regularly to keep your account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" {...register("oldPassword")} className="input-field" placeholder="Enter current password" />
              {errors.oldPassword && <p className="input-error">{errors.oldPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" {...register("newPassword")} className="input-field" placeholder="Enter new password" />
              {errors.newPassword && <p className="input-error">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" {...register("confirmPassword")} className="input-field" placeholder="Confirm new password" />
              {errors.confirmPassword && <p className="input-error">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Userwrap(UserSettings);