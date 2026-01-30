import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TicketCard } from "@/components/appointment/TicketCard";

interface UserDashboardTicketDialogProps {
  selectedTicket: any | null;
  onClose: () => void;
}

export default function UserDashboardTicketDialog({
  selectedTicket,
  onClose,
}: UserDashboardTicketDialogProps) {
  return (
    <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Vaccination Ticket</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        {selectedTicket && (
          <TicketCard
            appointmentId={String(selectedTicket.id)}
            center={{
              name: selectedTicket.centerName,
              address: selectedTicket.centerAddress,
            }}
            vaccine={{
              name: selectedTicket.vaccineName,
            }}
            date={selectedTicket.date}
            slot={selectedTicket.slot}
            status={
              selectedTicket.status === "BOOKED"
                ? "scheduled"
                : (selectedTicket.status.toLowerCase() as any)
            }
            className="shadow-2xl"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
