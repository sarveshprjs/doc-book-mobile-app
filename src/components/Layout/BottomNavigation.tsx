
import { cn } from "@/lib/utils";
import { Calendar, Home, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Doctors",
      icon: Search,
      path: "/doctors",
    },
    {
      name: "Appointments",
      icon: Calendar,
      path: "/appointments",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              cn(
                "flex flex-col items-center py-2 px-4",
                isActive 
                  ? "text-docbook-blue" 
                  : "text-gray-500 hover:text-docbook-blue"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
