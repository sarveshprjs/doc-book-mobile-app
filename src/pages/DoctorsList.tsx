
import DoctorCard from "@/components/DoctorCard";
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Header from "@/components/Layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

const DoctorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  // Mock data for specialties filter
  const specialties = [
    "Cardiology", 
    "Dermatology", 
    "Neurology", 
    "Pediatrics", 
    "Orthopedics",
    "Ophthalmology"
  ];
  
  // Mock data for doctors
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      experience: 12,
      availableToday: true,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.7,
      experience: 8,
      availableToday: false,
    },
    {
      id: "3",
      name: "Dr. Emily Williams",
      specialty: "Neurologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4.8,
      experience: 15,
      availableToday: true,
    },
    {
      id: "4",
      name: "Dr. Robert Garcia",
      specialty: "Pediatrician",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4.6,
      experience: 10,
      availableToday: true,
    },
    {
      id: "5",
      name: "Dr. Jennifer Smith",
      specialty: "Orthopedic Surgeon",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      rating: 4.9,
      experience: 14,
      availableToday: false,
    },
  ];
  
  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const clearFilters = () => {
    setSelectedSpecialties([]);
  };
  
  // Filter doctors based on search and selected specialties
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialties.length === 0 || 
                             selectedSpecialties.some(s => 
                              doctor.specialty.toLowerCase().includes(s.toLowerCase()));
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <div className="app-container">
      <Header title="Find Doctors" showBackButton />
      
      <div className="page-container">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search doctors, specialties..." 
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
          
          <div className="flex items-center overflow-x-auto hide-scrollbar">
            {selectedSpecialties.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs mr-1 h-7"
                onClick={clearFilters}
              >
                Clear
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
            
            {selectedSpecialties.map(specialty => (
              <Badge 
                key={specialty} 
                variant="secondary" 
                className="mr-1 cursor-pointer"
                onClick={() => toggleSpecialty(specialty)}
              >
                {specialty}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4 flex overflow-x-auto -mx-4 px-4 pb-2 hide-scrollbar">
          {specialties.map(specialty => (
            <Badge 
              key={specialty}
              variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
              className="mr-2 cursor-pointer whitespace-nowrap"
              onClick={() => toggleSpecialty(specialty)}
            >
              {specialty}
            </Badge>
          ))}
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="available">Available Today</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {filteredDoctors.length > 0 ? (
              <div className="space-y-1">
                {filteredDoctors.map(doctor => (
                  <DoctorCard 
                    key={doctor.id}
                    id={doctor.id}
                    name={doctor.name}
                    specialty={doctor.specialty}
                    image={doctor.image}
                    rating={doctor.rating}
                    experience={doctor.experience}
                    availableToday={doctor.availableToday}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No doctors match your search</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="available">
            {filteredDoctors.filter(d => d.availableToday).length > 0 ? (
              <div className="space-y-1">
                {filteredDoctors
                  .filter(d => d.availableToday)
                  .map(doctor => (
                    <DoctorCard 
                      key={doctor.id}
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      image={doctor.image}
                      rating={doctor.rating}
                      experience={doctor.experience}
                      availableToday={doctor.availableToday}
                    />
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No doctors available today</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="top-rated">
            {filteredDoctors.filter(d => d.rating >= 4.8).length > 0 ? (
              <div className="space-y-1">
                {filteredDoctors
                  .filter(d => d.rating >= 4.8)
                  .map(doctor => (
                    <DoctorCard 
                      key={doctor.id}
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      image={doctor.image}
                      rating={doctor.rating}
                      experience={doctor.experience}
                      availableToday={doctor.availableToday}
                    />
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No top-rated doctors found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default DoctorsList;
