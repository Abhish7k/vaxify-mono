import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Syringe } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Appointment } from "./MyAppointmentsListSection";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

type Props = {
  appointment: Appointment;
  onViewCenter: () => void;
  onCancel: () => void;
};

export default function AppointmentCard({
  appointment,
  onViewCenter,
  onCancel,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="px-6">
          {/* row content */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Center name + address */}
            <div className="min-w-40">
              <p className="font-medium">{appointment.centerName}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {appointment.centerAddress}
              </div>
            </div>

            {/* vaccine */}
            <div className="flex items-center gap-2">
              <Syringe className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">{appointment.vaccine}</span>
            </div>

            {/* date */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{appointment.date}</span>
            </div>

            {/* time */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{appointment.timeSlot}</span>
            </div>

            {/* status */}
            <AppointmentStatusBadge status={appointment.status} />
          </div>

          {/* actions */}
          <div className="mt-10 flex items-center justify-between">
            <Button variant="link" className="px-0" onClick={onViewCenter}>
              View center
            </Button>

            {appointment.status === "BOOKED" && (
              <CancelAppointmentDialog
                centerName={appointment.centerName}
                onConfirm={onCancel}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
