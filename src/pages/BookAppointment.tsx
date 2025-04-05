
import Header from "@/components/Layout/Header";
import TimeSlotPicker from "@/components/ui/TimeSlotPicker";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const BookAppointment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [reason, setReason] = useState("");
  
  // Mock doctor data
  const doctor = {
    id: id || "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "NewYork-Presbyterian Hospital",
    fee: 120,
  };
  
  // Mock time slots
  const morningSlots: TimeSlot[] = [
    { id: "m1", time: "9:00 AM", available: true },
    { id: "m2", time: "9:30 AM", available: false },
    { id: "m3", time: "10:00 AM", available: true },
    { id: "m4", time: "10:30 AM", available: true },
    { id: "m5", time: "11:00 AM", available: false },
    { id: "m6", time: "11:30 AM", available: true },
  ];
  
  const afternoonSlots: TimeSlot[] = [
    { id: "a1", time: "1:00 PM", available: true },
    { id: "a2", time: "1:30 PM", available: false },
    { id: "a3", time: "2:00 PM", available: true },
    { id: "a4", time: "2:30 PM", available: false },
    { id: "a5", time: "3:00 PM", available: true },
    { id: "a6", time: "3:30 PM", available: true },
  ];
  
  const eveningSlots: TimeSlot[] = [
    { id: "e1", time: "4:00 PM", available: true },
    { id: "e2", time: "4:30 PM", available: true },
    { id: "e3", time: "5:00 PM", available: false },
    { id: "e4", time: "5:30 PM", available: true },
    { id: "e5", time: "6:00 PM", available: true },
    { id: "e6", time: "6:30 PM", available: false },
  ];
  
  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleBookAppointment = () => {
    // In a real app, we would send this data to our backend
    navigate("/appointments", { state: { booked: true } });
  };
  
  return (
    <div className="app-container">
      <Header title="Book Appointment" showBackButton />
      
      <div className="page-container">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-14 w-14 border">
                <img src={doctor.image} alt={doctor.name} className="object-cover" />
              </Avatar>
              <div className="ml-3">
                <h2 className="font-semibold">{doctor.name}</h2>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <section>
            <h3 className="section-title">Select Date</h3>
            <div className="border rounded-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                disabled={{ before: new Date() }}
              />
            </div>
            <p className="text-sm text-center mt-2 text-muted-foreground">
              {date ? format(date, "EEEE, MMMM do, yyyy") : "No date selected"}
            </p>
          </section>
          
          <section>
            <h3 className="section-title">Appointment Type</h3>
            <RadioGroup 
              value={appointmentType} 
              onValueChange={setAppointmentType}
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="in-person"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                data-state={appointmentType === "in-person" ? "checked" : "unchecked"}
                style={{
                  borderColor: appointmentType === "in-person" ? "hsl(var(--primary))" : ""
                }}
              >
                <RadioGroupItem value="in-person" id="in-person" className="sr-only" />
                <span className="text-sm font-medium">In-person visit</span>
              </Label>
              <Label
                htmlFor="video"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                data-state={appointmentType === "video" ? "checked" : "unchecked"}
                style={{
                  borderColor: appointmentType === "video" ? "hsl(var(--primary))" : ""
                }}
              >
                <RadioGroupItem value="video" id="video" className="sr-only" />
                <span className="text-sm font-medium">Video consultation</span>
              </Label>
            </RadioGroup>
          </section>
          
          <section>
            <h3 className="section-title">Select Time</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Morning</p>
                <TimeSlotPicker 
                  timeSlots={morningSlots} 
                  onSelectTimeSlot={handleSelectTimeSlot} 
                />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Afternoon</p>
                <TimeSlotPicker 
                  timeSlots={afternoonSlots} 
                  onSelectTimeSlot={handleSelectTimeSlot} 
                />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Evening</p>
                <TimeSlotPicker 
                  timeSlots={eveningSlots} 
                  onSelectTimeSlot={handleSelectTimeSlot} 
                />
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="section-title">Reason for Visit</h3>
            <Textarea 
              placeholder="Briefly describe your symptoms or reason for the appointment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </section>
          
          <Separator />
          
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Consultation Fee</span>
              <span className="font-semibold">${doctor.fee}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleBookAppointment}
              disabled={!selectedTimeSlot || !date}
            >
              Confirm Booking
            </Button>
            <p className="text-xs text-center mt-2 text-muted-foreground">
              By booking this appointment you agree to our Terms & Conditions
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
