
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleGoHome() {
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole) {
      navigate('/login');
      return;
    }

    if (userRole === 'student') navigate('/student-dashboard');
    else if (userRole === 'administrator') navigate('/admin-dashboard');
    else if (userRole === 'school-supervisor') navigate('/school-supervisor-dashboard');
    else if (userRole === 'host-supervisor') navigate('/host-supervisor-dashboard');
    else navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-2">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Route: <code className="bg-gray-200 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={handleGoHome} className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
