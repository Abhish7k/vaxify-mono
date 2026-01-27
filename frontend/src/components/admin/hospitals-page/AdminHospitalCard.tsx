import { Building2, MapPin, User, Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AdminHospital } from "./types";
import AppointmentStatusBadge from "@/components/appointment/my-appointments/AppointmentStatusBadge";

type Props = {
  hospital: AdminHospital;
  onApprove: () => void;
  onReject: () => void;
};

export default function AdminHospitalCard({
  hospital,
  onApprove,
  onReject,
}: Props) {
  return (
    <Card className={hospital.status !== "PENDING" ? "opacity-60" : undefined}>
      <CardContent className="p-6 space-y-4">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {hospital.address}
            </div>
          </div>

          {/*  */}
          <AppointmentStatusBadge status={hospital.status} />
        </div>

        {/* staff info */}
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{hospital.staffName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{hospital.staffEmail}</span>
          </div>
        </div>

        {/* actions */}
        {hospital.status === "PENDING" && (
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onReject}>
              Reject
            </Button>

            <Button size="sm" onClick={onApprove}>
              Approve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
