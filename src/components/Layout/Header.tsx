
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
  rightContent?: React.ReactNode;
}

const Header = ({ 
  title, 
  showBackButton = false, 
  className,
  rightContent
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={cn("sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-white border-b shadow-sm", className)}>
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-docbook-dark-gray" />
          </button>
        )}
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}
    </header>
  );
};

export default Header;
