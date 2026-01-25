import { AppointmentScheduler } from "@/components/ui/appointment-scheduler";
import { CalendarClock } from "lucide-react";
import { useEffect } from "react";

type Props = {
  selectedDate: string | null;
  selectedSlot: string | null;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: string) => void;
  onResetSlot: () => void;
};

export default function BookingDateAndSlotSection({
  onDateSelect,
  onSlotSelect,
  onResetSlot,
}: Props) {
  useEffect(() => {
    const today = new Date();

    onDateSelect(today.toISOString());

    onResetSlot();
  }, []);

  return (
    <div className="w-fit grid gap-5">
      {/* header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold mt-1">
            Choose your appointment slot
          </h2>
        </div>

        <p className="text-sm text-muted-foreground max-w-xl">
          Select a convenient date and time to visit the vaccination center.
          Appointments are available from 9 AM to 6 PM, Monday to Saturday.
        </p>
      </div>

      {/* scheduler */}
      <AppointmentScheduler
        userName="Vaxify"
        meetingTitle="Vaccination Appointment"
        meetingType="In-person"
        duration="1 hour"
        timezone="IST"
        availableDates={availableDates}
        timeSlots={timeSlots}
        onDateSelect={(day) => {
          const date = new Date();
          date.setDate(day);
          onDateSelect(date.toISOString());
          onResetSlot();
        }}
        onTimeSelect={onSlotSelect}
      />
    </div>
  );
}

const availableDates = generateAvailableDates();
const timeSlots = generateTimeSlots();

function generateTimeSlots() {
  const slots = [];

  for (let hour = 9; hour < 18; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, "0")}:00`,
      available: true,
    });
  }

  return slots;
}

function generateAvailableDates() {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  const dates = [];

  for (let day = currentDay; day <= daysInMonth; day++) {
    dates.push({
      date: day,
      hasSlots: true,
    });
  }

  return dates;
}
