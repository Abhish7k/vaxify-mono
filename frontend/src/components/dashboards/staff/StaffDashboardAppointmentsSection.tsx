import StaffDashboardUpcomingAppointmentsComponent from "./upcoming-appointments/StaffDashboardUpcomingAppointmentsComponent";
import { StaffDashboardRecentVaccinationsCardComponent } from "./upcoming-appointments/StaffDashboardRecentVaccinationsCardComponent";

export default function StaffAppointmentsSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Upcoming Appointments */}
      <StaffDashboardUpcomingAppointmentsComponent />

      {/* Recent Vaccinations */}
      <StaffDashboardRecentVaccinationsCardComponent />
    </div>
  );
}
