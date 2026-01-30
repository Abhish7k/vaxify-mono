import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { type Appointment } from "@/types/appointment";

interface AppointmentCancelDialogProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isCancelling: boolean;
}

export default function AppointmentCancelDialog({
  appointment,
  isOpen,
  onOpenChange,
  onConfirm,
  isCancelling,
}: AppointmentCancelDialogProps) {
  if (!appointment) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your appointment for{" "}
            <span className="font-medium text-foreground">
              {appointment.vaccineName || "this vaccine"}
            </span>{" "}
            at{" "}
            <span className="font-medium text-foreground">
              {appointment.centerName}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCancelling}>Keep It</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isCancelling}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isCancelling ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isCancelling ? "Cancelling..." : "Yes, Cancel Appointment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
