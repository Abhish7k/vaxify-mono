import type { HospitalStatus } from "../hospitals-page/types";
import AppointmentStatusBadge from "@/components/appointment/my-appointments/AppointmentStatusBadge";

type Props = {
  hospitalName: string;
  status: HospitalStatus;
};

export default function AdminHospitalDetailsHeaderSection({
  hospitalName,
  status,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{hospitalName}</h1>
        <p className="text-sm text-muted-foreground mt-1">Hospital details</p>
      </div>

      <AppointmentStatusBadge status={status} />
    </div>
  );
}
