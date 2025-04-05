
import BottomNavigation from "@/components/Layout/BottomNavigation";
import Header from "@/components/Layout/Header";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, CreditCard, HelpCircle, LogOut, Settings, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  };
  
  const menuItems = [
    {
      name: "Personal Information",
      icon: User,
      onClick: () => console.log("Personal Info clicked"),
    },
    {
      name: "Payment Methods",
      icon: CreditCard,
      onClick: () => console.log("Payment Methods clicked"),
    },
    {
      name: "Notifications",
      icon: Bell,
      onClick: () => console.log("Notifications clicked"),
    },
    {
      name: "Family Members",
      icon: UserPlus,
      onClick: () => console.log("Family Members clicked"),
    },
  ];
  
  const supportItems = [
    {
      name: "Help & Support",
      icon: HelpCircle,
      onClick: () => console.log("Help clicked"),
    },
    {
      name: "Settings",
      icon: Settings,
      onClick: () => console.log("Settings clicked"),
    },
  ];
  
  const handleLogout = () => {
    // In a real app, we would clear auth tokens, etc.
    navigate("/");
  };
  
  return (
    <div className="app-container">
      <Header title="Profile" />
      
      <div className="page-container">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Avatar className="h-16 w-16">
                <img src={user.image} alt={user.name} className="object-cover" />
              </Avatar>
              <div className="ml-4">
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <section>
            <h3 className="section-title">Account</h3>
            <Card>
              {menuItems.map((item, index) => (
                <div key={index}>
                  <CardContent className="p-0">
                    <button
                      className="flex items-center w-full p-4 text-left hover:bg-muted/50"
                      onClick={item.onClick}
                    >
                      <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>{item.name}</span>
                    </button>
                  </CardContent>
                  {index < menuItems.length - 1 && <Separator />}
                </div>
              ))}
            </Card>
          </section>
          
          <section>
            <h3 className="section-title">Support</h3>
            <Card>
              {supportItems.map((item, index) => (
                <div key={index}>
                  <CardContent className="p-0">
                    <button
                      className="flex items-center w-full p-4 text-left hover:bg-muted/50"
                      onClick={item.onClick}
                    >
                      <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>{item.name}</span>
                    </button>
                  </CardContent>
                  {index < supportItems.length - 1 && <Separator />}
                </div>
              ))}
            </Card>
          </section>
          
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
