import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import EmptyStaffAppointmentsState from "./EmptyStaffAppointmentsState";
import type { StaffAppointmentStatus } from "./StaffAppointmentsTabsSection";
import { getStaffAppointmentColumns } from "./StaffAppointmentColumns";

export default function StaffAppointmentsListSection({
  appointments,
  activeStatus,
  onMarkCompleted,
  onCancelAppointment,
}: Props) {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeStatus,
  );

  const columns = useMemo(
    () =>
      getStaffAppointmentColumns({
        onMarkCompleted,
        onCancelAppointment,
      }),
    [onMarkCompleted, onCancelAppointment],
  );

  if (filteredAppointments.length === 0) {
    return <EmptyStaffAppointmentsState status={activeStatus} />;
  }

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={filteredAppointments}
        searchKey="patientName"
        searchPlaceholder="Search patients..."
      />
    </div>
  );
}

export type StaffAppointment = {
  id: string;
  patientName: string;
  patientPhone: string;
  vaccine: string;
  date: string;
  timeSlot: string;
  status: StaffAppointmentStatus;
};

type Props = {
  appointments: StaffAppointment[];
  activeStatus: StaffAppointmentStatus;
  onMarkCompleted: (appointment: StaffAppointment) => void;
  onCancelAppointment: (appointment: StaffAppointment) => void;
};
