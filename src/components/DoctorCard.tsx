
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  availableToday?: boolean;
}

const DoctorCard = ({
  id,
  name,
  specialty,
  image,
  rating,
  experience,
  availableToday = false,
}: DoctorCardProps) => {
  return (
    <Link to={`/doctor/${id}`}>
      <Card className="overflow-hidden mb-3 hover:shadow-md transition-shadow duration-200">
        <div className="p-4 flex">
          <Avatar className="h-16 w-16 rounded-full border">
            <img src={image} alt={name} className="object-cover" />
          </Avatar>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">{name}</h3>
              {availableToday && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Available today
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">{specialty}</p>
            
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
              </div>
              
              <span className="text-sm text-muted-foreground">
                {experience} years exp
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DoctorCard;
