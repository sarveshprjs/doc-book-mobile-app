
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimeSlotPicker = ({ timeSlots, onSelectTimeSlot }: TimeSlotPickerProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleSelect = (timeSlot: TimeSlot) => {
    if (!timeSlot.available) return;
    
    setSelectedTimeSlot(timeSlot.id);
    onSelectTimeSlot(timeSlot);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((slot) => (
        <Button
          key={slot.id}
          variant="outline"
          className={cn(
            "h-12",
            !slot.available && "opacity-50 cursor-not-allowed",
            selectedTimeSlot === slot.id && "border-docbook-blue bg-docbook-light-blue text-docbook-dark-blue"
          )}
          onClick={() => handleSelect(slot)}
          disabled={!slot.available}
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
