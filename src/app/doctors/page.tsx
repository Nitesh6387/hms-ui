"use client"
import { useEffect, useState } from "react";
import { BASEURL, fetchDoctorsData } from "@/Services";
import Doctors from '@/components/Doctors'
import UserLayout from "@/components/UserLayout";
import { useRouter } from "next/navigation";
import { userSession } from "@/Helpers/userSession";

export default function DoctorsPage() {
  const router = useRouter();
  const session = userSession();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const token = session?.jwtToken;
        if (token) {
          const result = await fetchDoctorsData(token);
          setDoctors(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    getDoctors();
  }, [session]);

  const handleBookAppointment = (doctor: any) => {
    if (!session) {
      router.push('/login');
      return;
    }
    router.push(`/user/bookappointment?doctorId=${doctor.id}`);
  };

  return (
    <UserLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Meet Our Expert Doctors</h1>
            <p className="text-gray-600 mt-2 text-lg">Providing exceptional care with years of experience</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <i className="ri-loader-4-line animate-spin text-4xl text-cyan-600"></i>
            </div>
          ) : doctors.length === 0 ? (
            // <div className="text-center py-20 bg-white rounded-lg shadow-md">
            //   <i className="ri-user-search-line text-6xl text-gray-400 mb-4"></i>
            //   <p className="text-gray-500 text-lg">No doctors available at the moment.</p>
            // </div>
            <Doctors />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor: any) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6 text-center">
                    <img
                      src={doctor.profile ? `${BASEURL}/static/${doctor.profile}` : "/Images/doctor1.jpg"}
                      alt={doctor.name}
                      className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-cyan-100"
                    />
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h2>
                    <p className="text-cyan-600 font-medium mb-3">{doctor.specialist}</p>
                    <div className="text-left space-y-2 text-sm text-gray-600">
                      <p><strong>Experience:</strong> {doctor.experience} years</p>
                      <p><strong>Qualifications:</strong> {doctor.qualifications}</p>
                      <p><strong>Fees:</strong> ${doctor.fees}</p>
                      <p><strong>Address:</strong> {doctor.address}</p>
                      {doctor.availableDays && (
                        <p><strong>Available:</strong> {doctor.availableDays.join(", ")}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="btn-primary w-full mt-4"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}