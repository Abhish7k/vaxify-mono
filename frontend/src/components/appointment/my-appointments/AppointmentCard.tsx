import { Calendar, Clock, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Appointment } from "./MyAppointmentsListSection";
import type { AppointmentStatus } from "./MyAppointmentsTabsSection";

export default function AppointmentCard({
  appointment,
  onViewCenter,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium">{appointment.centerName}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {appointment.centerAddress}
            </div>
          </div>

          {renderStatusBadge(appointment.status)}
        </div>

        {/* details */}
        <div className="grid gap-2 text-sm mt-5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.timeSlot}</span>
          </div>

          <div>
            <span className="text-muted-foreground">Vaccine:</span>{" "}
            {appointment.vaccine}
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-between mt-5">
          <Button
            variant="link"
            className="px-0 cursor-pointer"
            onClick={onViewCenter}
          >
            View center
          </Button>

          {appointment.status === "BOOKED" && (
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive cursor-pointer active:scale-95 transition-all"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

type Props = {
  appointment: Appointment;
  onViewCenter: () => void;
  onCancel: () => void;
};

const renderStatusBadge = (status: AppointmentStatus) => {
  switch (status) {
    case "COMPLETED":
      return (
        <Badge className="border border-green-600/20 bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 ">
          Completed
        </Badge>
      );

    case "BOOKED":
      return (
        <Badge className="border border-blue-600/20 bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40">
          Booked
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge className="border border-destructive/50 bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40">
          Cancelled
        </Badge>
      );

    default:
      return null;
  }
};
