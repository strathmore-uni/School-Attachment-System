
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SchoolSupervisorDashboard from "./pages/SchoolSupervisorDashboard";
import HostSupervisorDashboard from "./pages/HostSupervisorDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Student pages
import StudentApplications from "./pages/student/Applications";
import StudentReports from "./pages/student/Reports";
import StudentOrganizations from "./pages/student/Organizations";

// School Supervisor pages
import SchoolSupervisorStudents from "./pages/school-supervisor/Students";
import SchoolSupervisorEvaluations from "./pages/school-supervisor/Evaluations";
import SchoolSupervisorReports from "./pages/school-supervisor/Reports";

// Host Supervisor pages
import HostSupervisorStudents from "./pages/host-supervisor/Students";
import HostSupervisorAttendance from "./pages/host-supervisor/Attendance";
import HostSupervisorEvaluations from "./pages/host-supervisor/Evaluations";

// Admin pages
import AdminApplications from "./pages/admin/Applications";
import AdminStudents from "./pages/admin/Students";
import AdminOrganizations from "./pages/admin/Organizations";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function HomePage() {
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === 'student') return <Navigate to="/student-dashboard" replace />;
  if (userRole === 'administrator') return <Navigate to="/admin-dashboard" replace />;
  if (userRole === 'school-supervisor') return <Navigate to="/school-supervisor-dashboard" replace />;
  if (userRole === 'host-supervisor') return <Navigate to="/host-supervisor-dashboard" replace />;
  
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Profile Route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Routes */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/applications" 
              element={
                <ProtectedRoute>
                  <StudentApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/reports" 
              element={
                <ProtectedRoute>
                  <StudentReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/organizations" 
              element={
                <ProtectedRoute>
                  <StudentOrganizations />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/applications" 
              element={
                <ProtectedRoute>
                  <AdminApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute>
                  <AdminStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organizations" 
              element={
                <ProtectedRoute>
                  <AdminOrganizations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* School Supervisor Routes */}
            <Route 
              path="/school-supervisor-dashboard" 
              element={
                <ProtectedRoute>
                  <SchoolSupervisorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school-supervisor/students" 
              element={
                <ProtectedRoute>
                  <SchoolSupervisorStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school-supervisor/evaluations" 
              element={
                <ProtectedRoute>
                  <SchoolSupervisorEvaluations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school-supervisor/reports" 
              element={
                <ProtectedRoute>
                  <SchoolSupervisorReports />
                </ProtectedRoute>
              } 
            />
            
            {/* Host Supervisor Routes */}
            <Route 
              path="/host-supervisor-dashboard" 
              element={
                <ProtectedRoute>
                  <HostSupervisorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host-supervisor/students" 
              element={
                <ProtectedRoute>
                  <HostSupervisorStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host-supervisor/attendance" 
              element={
                <ProtectedRoute>
                  <HostSupervisorAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host-supervisor/evaluations" 
              element={
                <ProtectedRoute>
                  <HostSupervisorEvaluations />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
