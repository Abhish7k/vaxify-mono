import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import EmptyAppointmentsState from "./EmptyAppointmentsState";
import type { AppointmentStatus } from "./MyAppointmentsTabsSection";
import { getMyAppointmentsColumns } from "./MyAppointmentsColumns";

export default function MyAppointmentsListSection({
  appointments,
  activeStatus,
  onBrowseCenters,
  onViewCenter,
  onCancelAppointment,
  onViewTicket,
}: Props) {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeStatus,
  );

  const columns = useMemo(
    () =>
      getMyAppointmentsColumns({
        onCancelAppointment,
        onViewTicket,
        onViewCenter,
      }),
    [onCancelAppointment, onViewTicket, onViewCenter],
  );

  if (filteredAppointments.length === 0) {
    return (
      <EmptyAppointmentsState
        status={activeStatus}
        onBrowseCenters={onBrowseCenters}
      />
    );
  }

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={filteredAppointments}
        searchKey="centerName"
        searchPlaceholder="Search centers..."
      />
    </div>
  );
}

export type Appointment = {
  id: string;
  centerId: string;
  centerName: string;
  centerAddress: string;
  vaccine: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
};

type Props = {
  appointments: Appointment[];
  activeStatus: AppointmentStatus;
  onBrowseCenters: () => void;
  onViewCenter: (centerId: string) => void;
  onCancelAppointment: (appointment: Appointment) => void;
  onViewTicket: (appointmentId: string) => void;
};
