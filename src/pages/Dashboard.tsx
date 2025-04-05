
import AppointmentCard from "@/components/AppointmentCard";
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Header from "@/components/Layout/Header";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CalendarPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data
  const upcomingAppointment = {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    doctorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Today, 16 Jun",
    time: "10:00 AM",
    status: "upcoming" as const,
  };

  const topSpecialties = [
    { id: "1", name: "Cardiology", icon: "❤️" },
    { id: "2", name: "Dermatology", icon: "🧬" },
    { id: "3", name: "Neurology", icon: "🧠" },
    { id: "4", name: "Pediatrics", icon: "👶" },
    { id: "5", name: "Orthopedics", icon: "🦴" },
    { id: "6", name: "See All", icon: "➕" },
  ];

  const topDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "3",
      name: "Dr. Emily Williams",
      specialty: "Neurologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="app-container">
      <Header 
        title="DocBook" 
        rightContent={
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-500" />
          </div>
        }
      />
      
      <div className="page-container">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Hello, John</h2>
            <p className="text-sm text-muted-foreground">How are you feeling today?</p>
          </div>
          <Avatar className="h-10 w-10">
            <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="User" />
          </Avatar>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search doctors, specialties..." 
            className="pl-10 bg-white"
          />
        </div>
        
        <section className="mobile-section">
          <Tabs defaultValue="specialists">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="specialists">Specialists</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            </TabsList>
            <TabsContent value="specialists">
              <div className="grid grid-cols-3 gap-3">
                {topSpecialties.map((specialty) => (
                  <Link to="/doctors" key={specialty.id}>
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-3 text-center">
                        <div className="text-2xl mb-1">{specialty.icon}</div>
                        <p className="text-sm truncate">{specialty.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="hospitals">
              <div className="text-center py-6 text-muted-foreground">
                Hospital search coming soon
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="mobile-section">
          <div className="flex items-center justify-between mb-2">
            <h3 className="section-title">Upcoming Appointment</h3>
            <Link to="/appointments" className="text-sm text-docbook-blue">View all</Link>
          </div>
          
          {upcomingAppointment ? (
            <AppointmentCard
              id={upcomingAppointment.id}
              doctorName={upcomingAppointment.doctorName}
              doctorSpecialty={upcomingAppointment.doctorSpecialty}
              doctorImage={upcomingAppointment.doctorImage}
              date={upcomingAppointment.date}
              time={upcomingAppointment.time}
              status={upcomingAppointment.status}
            />
          ) : (
            <Card className="mb-4">
              <CardContent className="p-6 text-center">
                <CalendarPlus className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No Upcoming Appointments</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book your first appointment with top doctors
                </p>
                <Button asChild>
                  <Link to="/doctors">Book Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
        
        <section className="mobile-section">
          <div className="flex items-center justify-between mb-2">
            <h3 className="section-title">Top Doctors</h3>
            <Link to="/doctors" className="text-sm text-docbook-blue">View all</Link>
          </div>
          
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-3">
            {topDoctors.map((doctor) => (
              <Link 
                key={doctor.id} 
                to={`/doctor/${doctor.id}`}
                className="flex-shrink-0 w-36"
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-3 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <img src={doctor.image} alt={doctor.name} className="object-cover" />
                    </Avatar>
                    <p className="font-medium text-sm truncate">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
