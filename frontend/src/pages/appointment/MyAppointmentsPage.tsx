import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MyAppointmentsHeaderSection from "@/components/appointment/my-appointments/MyAppointmentsHeaderSection";
import MyAppointmentsTabsSection, {
  type AppointmentStatus,
} from "@/components/appointment/my-appointments/MyAppointmentsTabsSection";
import { type Appointment } from "@/types/appointment";
import MyAppointmentsListSection from "@/components/appointment/my-appointments/MyAppointmentsListSection";
import { appointmentApi } from "@/api/appointment.api";
import { MyAppointmentsSkeleton } from "@/components/skeletons/MyAppointmentsSkeleton";

// Modular Dialogs
import AppointmentTicketDialog from "@/components/appointment/AppointmentTicketDialog";
import AppointmentCancelDialog from "@/components/appointment/AppointmentCancelDialog";

export default function MyAppointmentsPage() {
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState<AppointmentStatus>("BOOKED");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Appointment | null>(
    null,
  );

  // Dialog state for cancellation
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<Appointment | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const minDelay = new Promise((resolve) => setTimeout(resolve, 400));
      const [data] = await Promise.all([
        appointmentApi.getMyAppointments(),
        minDelay,
      ]);
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const confirmCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      setIsCancelling(true);
      await appointmentApi.cancelAppointment(appointmentToCancel.id);
      toast.success("Cancelled appointment successfully");
      fetchAppointments();
    } catch (error) {
      toast.error("Failed to cancel appointment");
    } finally {
      setIsCancelling(false);
      setIsCancelDialogOpen(false);
      setAppointmentToCancel(null);
    }
  };

  return (
    <div className="space-y-8 container mx-auto mt-10 px-4 sm:px-8 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* header */}
      <MyAppointmentsHeaderSection
        onRefresh={fetchAppointments}
        loading={isLoading}
      />
      {/* tabs */}
      <MyAppointmentsTabsSection
        value={activeStatus}
        onChange={setActiveStatus}
      />
      {/* list */}
      {isLoading ? (
        <MyAppointmentsSkeleton />
      ) : (
        <MyAppointmentsListSection
          appointments={appointments.map((a) => ({
            id: a.id,
            centerId: a.centerId || "",
            centerName: a.centerName || "Unknown Center",
            centerAddress: a.centerAddress || "",
            vaccine: a.vaccineName || "Unknown Vaccine",
            date: a.date,
            timeSlot: a.slot,
            status: (a.status || "BOOKED").toUpperCase() as any,
          }))}
          activeStatus={activeStatus}
          onBrowseCenters={() => navigate("/centers")}
          onViewCenter={(centerId) => navigate(`/centers/${centerId}`)}
          onCancelAppointment={(appointment) => {
            const fullAppt = appointments.find((a) => a.id === appointment.id);
            if (fullAppt) {
              setAppointmentToCancel(fullAppt);
              setIsCancelDialogOpen(true);
            }
          }}
          onViewTicket={(appointmentId) => {
            const appointment = appointments.find(
              (a) => a.id === appointmentId,
            );
            if (appointment) setSelectedTicket(appointment);
          }}
        />
      )}

      <AppointmentTicketDialog
        appointment={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

      <AppointmentCancelDialog
        appointment={appointmentToCancel}
        isOpen={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onConfirm={confirmCancelAppointment}
        isCancelling={isCancelling}
      />
    </div>
  );
}
