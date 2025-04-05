
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Header from "@/components/Layout/Header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Heart, MapPin, MessageCircle, Phone, Star, Video } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock doctor data
  const doctor = {
    id: id || "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviewCount: 124,
    experience: 12,
    location: "NewYork-Presbyterian Hospital",
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience. She specializes in general cardiology, preventive cardiology, and women's cardiovascular health. Dr. Johnson completed her medical degree at Johns Hopkins University and her cardiology fellowship at Mayo Clinic.",
    services: ["General Cardiology", "Heart Disease Prevention", "Echocardiography", "Stress Testing", "Cardiac Rehabilitation"],
    education: [
      { degree: "MD", institution: "Johns Hopkins University", year: "2009" },
      { degree: "Cardiology Fellowship", institution: "Mayo Clinic", year: "2013" },
    ],
    availableTimes: [
      { date: "Today, 16 Jun", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
      { date: "Tomorrow, 17 Jun", slots: ["10:00 AM", "1:30 PM", "4:00 PM"] },
      { date: "Fri, 18 Jun", slots: ["9:30 AM", "12:00 PM", "3:30 PM"] },
    ],
  };
  
  return (
    <div className="app-container">
      <Header title="Doctor Profile" showBackButton />
      
      <div className="page-container">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Avatar className="h-20 w-20 border">
                <img src={doctor.image} alt={doctor.name} className="object-cover" />
              </Avatar>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-muted-foreground">{doctor.specialty}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <span className="mx-2 text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{doctor.reviewCount} Reviews</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full",
                  isFavorite && "text-red-500 hover:text-red-600"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500")} />
              </Button>
            </div>
            
            <div className="flex space-x-3 mb-4">
              <Button className="flex-1" asChild>
                <Link to={`/book-appointment/${doctor.id}`}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book
                </Link>
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{doctor.location}</span>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <div className="space-y-6">
              <section>
                <h3 className="section-title">About</h3>
                <p className="text-sm">{doctor.about}</p>
              </section>
              
              <section>
                <h3 className="section-title">Services</h3>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="justify-start font-normal h-8">
                      {service}
                    </Badge>
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="section-title">Education</h3>
                <div className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="space-y-6">
              <div className="flex space-x-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
                {doctor.availableTimes.map((day, index) => (
                  <Card 
                    key={index} 
                    className={cn(
                      "min-w-[150px] cursor-pointer",
                      index === 0 && "border-docbook-blue"
                    )}
                  >
                    <CardContent className="p-3 text-center">
                      <p className={cn(
                        "text-sm font-medium",
                        index === 0 && "text-docbook-blue"
                      )}>
                        {day.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.slots.length} slots available
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="section-title">Morning</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    30 min
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.availableTimes[0].slots.slice(0, 1).map((slot, index) => (
                    <Button key={index} variant="outline" asChild>
                      <Link to={`/book-appointment/${doctor.id}?time=${slot}`}>
                        {slot}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="section-title">Afternoon</h3>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.availableTimes[0].slots.slice(1).map((slot, index) => (
                    <Button key={index} variant="outline" asChild>
                      <Link to={`/book-appointment/${doctor.id}?time=${slot}`}>
                        {slot}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Reviews coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 mb-2">
          <Card className="bg-docbook-light-blue border-docbook-blue">
            <CardContent className="p-4 flex items-center">
              <div className="flex-1">
                <h3 className="font-medium text-docbook-dark-blue mb-1">
                  Video Consultation Available
                </h3>
                <p className="text-sm text-blue-700">
                  Get medical advice from the comfort of your home
                </p>
              </div>
              <Button size="sm" className="whitespace-nowrap">
                <Video className="h-4 w-4 mr-1" />
                Book Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default DoctorDetail;
