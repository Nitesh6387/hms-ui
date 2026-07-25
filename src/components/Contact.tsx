"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { swalFire } from "@/Helpers/SwalFire";
import { sendContactMessage } from "@/Services";

const schema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  phone: yup.string().matches(/^\+?[\d\s-]{10,15}$/, "Invalid phone number").required("Phone is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await sendContactMessage(data);
      if (res?.code === 200 || res?.success) {
        swalFire("Success", "Your message has been sent successfully!", "success");
        reset();
      } else {
        swalFire("Error", res?.message || "Failed to send message", "error");
      }
    } catch (error: any) {
      swalFire("Error", error.response?.data?.message || "Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 text-center mb-8">
          Have any questions or need assistance? Feel free to reach out to us!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <i className="ri-map-pin-line text-3xl text-blue-600 mb-2"></i>
            <h2 className="text-xl font-semibold text-blue-900 mb-1">Hospital Address</h2>
            <p className="text-gray-700">15/65 Ram Nagar, Raebareli, Uttar Pradesh, India</p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
            <i className="ri-phone-line text-3xl text-green-600 mb-2"></i>
            <h2 className="text-xl font-semibold text-green-900 mb-1">Contact Details</h2>
            <p className="text-gray-700">Phone: +91 6354553821</p>
            <p className="text-gray-700">Email: supporthms@admin.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                {...register("name")}
                type="text"
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="input-error">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Email</label>
              <input
                {...register("email")}
                type="email"
                className="input-field"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="input-error">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              {...register("phone")}
              type="text"
              className="input-field"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="input-error">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Message</label>
            <textarea
              {...register("message")}
              rows={5}
              className="input-field resize-y"
              placeholder="Write your message here..."
            />
            {errors.message && <p className="input-error">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}