
import AppointmentCard from "@/components/AppointmentCard";
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Header from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Appointments = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  // Show toast if redirected from booking confirmation
  useEffect(() => {
    if (location.state?.booked) {
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully scheduled.",
      });
    }
  }, [location.state, toast]);
  
  // Mock appointments data
  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Cardiologist",
      doctorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Today, 16 Jun",
      time: "10:00 AM",
      status: "upcoming" as const,
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Dermatologist",
      doctorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Tomorrow, 17 Jun",
      time: "2:30 PM",
      status: "upcoming" as const,
    },
  ];
  
  const pastAppointments = [
    {
      id: "3",
      doctorName: "Dr. Emily Williams",
      doctorSpecialty: "Neurologist",
      doctorImage: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "10 Jun 2025",
      time: "9:15 AM",
      status: "completed" as const,
    },
    {
      id: "4",
      doctorName: "Dr. Robert Garcia",
      doctorSpecialty: "Pediatrician",
      doctorImage: "https://randomuser.me/api/portraits/men/75.jpg",
      date: "28 May 2025",
      time: "11:00 AM",
      status: "cancelled" as const,
    },
  ];
  
  const handleReschedule = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: "You'll be contacted to reschedule your appointment.",
    });
  };
  
  const handleCancel = (id: string) => {
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled.",
    });
  };
  
  return (
    <div className="app-container">
      <Header 
        title="My Appointments" 
        rightContent={
          <Button variant="ghost" size="icon" asChild>
            <Link to="/doctors">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        }
      />
      
      <div className="page-container">
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-1">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    id={appointment.id}
                    doctorName={appointment.doctorName}
                    doctorSpecialty={appointment.doctorSpecialty}
                    doctorImage={appointment.doctorImage}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any upcoming appointments scheduled.
                </p>
                <Button asChild>
                  <Link to="/doctors">Book an Appointment</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastAppointments.length > 0 ? (
              <div className="space-y-1">
                {pastAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    id={appointment.id}
                    doctorName={appointment.doctorName}
                    doctorSpecialty={appointment.doctorSpecialty}
                    doctorImage={appointment.doctorImage}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  You don't have any past appointments.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Appointments;
