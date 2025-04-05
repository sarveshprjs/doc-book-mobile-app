
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface AppointmentCardProps {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const AppointmentCard = ({
  id,
  doctorName,
  doctorSpecialty,
  doctorImage,
  date,
  time,
  status,
  onReschedule,
  onCancel,
}: AppointmentCardProps) => {
  const statusColors = {
    upcoming: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const statusText = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-12 w-12 rounded-full border">
            <img src={doctorImage} alt={doctorName} className="object-cover" />
          </Avatar>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold">{doctorName}</h3>
            <p className="text-sm text-muted-foreground">{doctorSpecialty}</p>
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {statusText[status]}
          </Badge>
        </div>

        <div className="flex gap-4 mb-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-docbook-blue" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-docbook-blue" />
            <span>{time}</span>
          </div>
        </div>

        {status === "upcoming" && (
          <div className="flex gap-2 mt-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onReschedule?.(id)}
            >
              Reschedule
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
              onClick={() => onCancel?.(id)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AppointmentCard;
