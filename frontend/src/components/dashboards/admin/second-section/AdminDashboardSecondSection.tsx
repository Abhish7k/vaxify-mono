import AdminDashboardPendingHospitals from "./AdminDashboardPendingHospitals";
import AdminDashboardRecentActivity from "./AdminDashboardRecentActivity";

const AdminDashboardSecondSection = ({
  pendingHospitals,
  activities,
}: {
  pendingHospitals: any[];
  activities: any[];
}) => {
  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <AdminDashboardPendingHospitals pendingHospitals={pendingHospitals} />

      <AdminDashboardRecentActivity activities={activities} />
    </div>
  );
};

export default AdminDashboardSecondSection;
