import AdminHospitalCard from "./AdminHospitalCard";
import EmptyAdminHospitalsState from "./EmptyAdminHospitalsState";
import type { AdminHospital, HospitalStatus } from "./types";

type Props = {
  hospitals: AdminHospital[];
  activeStatus: HospitalStatus;
  onApproveHospital: (hospital: AdminHospital) => void;
  onRejectHospital: (hospital: AdminHospital) => void;
};

export default function AdminHospitalsListSection({
  hospitals,
  activeStatus,
  onApproveHospital,
  onRejectHospital,
}: Props) {
  const filteredHospitals = hospitals.filter(
    (hospital) => hospital.status === activeStatus,
  );

  if (filteredHospitals.length === 0) {
    return <EmptyAdminHospitalsState status={activeStatus} />;
  }

  return (
    <div className="space-y-4">
      {filteredHospitals.map((hospital) => (
        <AdminHospitalCard
          key={hospital.id}
          hospital={hospital}
          onApprove={() => onApproveHospital(hospital)}
          onReject={() => onRejectHospital(hospital)}
        />
      ))}
    </div>
  );
}
