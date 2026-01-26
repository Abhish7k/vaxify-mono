import { useState } from "react";

import MyAppointmentsHeaderSection from "@/components/appointment/my-appointments/MyAppointmentsHeaderSection";
import MyAppointmentsTabsSection, {
  type AppointmentStatus,
} from "@/components/appointment/my-appointments/MyAppointmentsTabsSection";
import type { Appointment } from "@/components/appointment/my-appointments/MyAppointmentsListSection";
import { mockAppointments } from "@/components/appointment/my-appointments/mock-data";
import MyAppointmentsListSection from "@/components/appointment/my-appointments/MyAppointmentsListSection";
import { useNavigate } from "react-router-dom";

export default function MyAppointmentsPage() {
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState<AppointmentStatus>("BOOKED");

  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);

  return (
    <div className="space-y-8 max-w-6xl mx-auto mt-10 px-10">
      {/* header */}
      <MyAppointmentsHeaderSection />

      {/* tabs */}
      <MyAppointmentsTabsSection
        value={activeStatus}
        onChange={setActiveStatus}
      />

      {/* list */}
      <MyAppointmentsListSection
        appointments={appointments}
        activeStatus={activeStatus}
        onBrowseCenters={() => navigate("/centers")}
        onViewCenter={(centerId) => navigate(`/centers/${centerId}`)}
        onCancelAppointment={(appointment) => {
          console.log("Cancel:", appointment.id);
        }}
      />
    </div>
  );
}
