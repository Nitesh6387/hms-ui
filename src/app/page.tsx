"use client"

import BookingAppointment from "@/components/Home/BookingAppointment";
import Cout from "@/components/Home/Cout";
import Hero from "@/components/Home/Hero";
import InfoSection from "@/components/Home/InfosSction";
import Swipper from "@/components/Swipper";
import UserLayout from "@/components/UserLayout";
export default function Home() {
  return (
    <UserLayout >
      <Swipper />
      <Hero />
      <InfoSection />
      <Cout />
      <BookingAppointment />
    </UserLayout>
  );
}
