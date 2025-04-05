
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-docbook-dark-blue mb-2">DocBook</h1>
          <p className="text-lg text-gray-600">Book doctor appointments with ease</p>
        </div>
        
        <div className="max-w-md mb-16">
          <img 
            src="https://img.freepik.com/free-vector/online-doctor-appointment-illustration_88138-414.jpg" 
            alt="Doctor appointment illustration" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="space-y-4 w-full max-w-xs">
          <Button className="w-full" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; 2025 DocBook App. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
