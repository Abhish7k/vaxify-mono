import { useParams } from "react-router-dom";
import BookingHeaderSection from "@/components/appointment/book/BookingHeaderSection";
import CenterNotFound from "@/components/centers/center-details/CenterNotFound";

import { centersData } from "@/constants/centers-mock-data";
import { useState } from "react";
import BookingDateAndSlotSection from "@/components/appointment/book/BookingSlotSection";

const AppointmentBookingPage = () => {
  const { centerId } = useParams();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const center = centersData.find((c) => c.id === centerId);

  if (!center) {
    return <CenterNotFound />;
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-10 grid gap-10">
      <BookingHeaderSection center={center} />

      <div className="">
        <BookingDateAndSlotSection
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }}
          onSlotSelect={setSelectedSlot}
          onResetSlot={() => setSelectedSlot(null)}
        />
      </div>
    </div>
  );
};

export default AppointmentBookingPage;
