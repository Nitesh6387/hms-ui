"use client"
const doctorsList = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", experience: 10, contact: "123-456-7890", availability: "Mon-Fri, 9AM - 5PM", location: "Room 101, Heart Care Unit", image: "/Images/doctor1.jpg" },
    { id: 2, name: "Dr. Michael Brown", specialization: "Neurologist", experience: 8, contact: "987-654-3210", availability: "Tue-Thu, 10AM - 4PM", location: "Room 202, Neuro Dept", image: "/Images/doctor2.png" },
    { id: 3, name: "Dr. James Anderson", specialization: "Pediatrician", experience: 5, contact: "456-789-0123", availability: "Mon-Sat, 8AM - 3PM", location: "Room 303, Child Care", image: "/Images/doctor3.png" },
    { id: 4, name: "Dr. Robert Wilson", specialization: "Orthopedic Surgeon", experience: 12, contact: "321-654-0987", availability: "Mon-Wed, 11AM - 6PM", location: "Room 404, Ortho Unit", image: "/Images/doctor6.png" },
    { id: 5, name: "Dr. Sarah Johnson", specialization: "Dermatologist", experience: 7, contact: "789-012-3456", availability: "Wed-Fri, 9AM - 3PM", location: "Room 505, Skin Care Dept", image: "/Images/doctor4.png" },
    { id: 6, name: "Dr. Emily Davis", specialization: "General Physician", experience: 6, contact: "654-321-7890", availability: "Mon-Sat, 8AM - 5PM", location: "Room 606, General Ward", image: "/Images/doctor5.png" },
];



export default function Doctors() {
    const handleBookAppointment = (doctor: any) => {
        alert(doctor.name);
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-900">Meet Our Expert Doctors</h1>
            <p className="text-center text-gray-600 mb-6">Providing exceptional care with years of experience</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {doctorsList.map((doctor) => (
                    <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 text-center transition duration-300 hover:shadow-2xl hover:scale-105">
                        <img src={doctor.image} alt={doctor.name} className="w-50 h-50 mx-auto mb-4 rounded-full object-cover border-4 border-gray-200" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{doctor.name}</h2>
                        <p className="text-gray-700 mb-2"><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p className="text-gray-600 mb-2"><strong>Experience:</strong> {doctor.experience} years</p>
                        <p className="text-gray-600 mb-2"><strong>Availability:</strong> {doctor.availability}</p>
                        <p className="text-gray-600 mb-2"><strong>Location:</strong> {doctor.location}</p>
                        <p className="text-gray-600"><strong>Contact:</strong> {doctor.contact}</p>
                        <button
                            onClick={() => handleBookAppointment(doctor)}
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
