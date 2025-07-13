import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SchoolSupervisorDashboard from "./pages/SchoolSupervisorDashboard";
import HostSupervisorDashboard from "./pages/HostSupervisorDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import React, { useState, useEffect } from "react";
import { getAdminDashboard, getStudentDashboard, getSchoolSupervisorDashboard, getHostSupervisorDashboard, getUserProfile } from "@/lib/auth/api";

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
import { AuthProvider, useAuth } from "./lib/context";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    console.warn("User not authenticated or user missing, redirecting...");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


function HomePage() {
  const { user } = useAuth();
  console.log("HomePage user:", user);
  const userRole = user?.role;

  if (!userRole) {
    console.warn("No user role found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  switch (userRole) {
    case "student":
      return <Navigate to="/student-dashboard" replace />;
    case "administrator":
      return <Navigate to="/admin-dashboard" replace />;
    case "school-supervisor":
      return <Navigate to="/school-supervisor-dashboard" replace />;
    case "host-supervisor":
      return <Navigate to="/host-supervisor-dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}


// function App() {
  // user state
  const App: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const storedUser = user ?? JSON.parse(localStorage.getItem("user") || "null");

      if (!storedUser) {
        console.warn("No user found in context or localStorage.");
        setLoading(false);
        return;
      }

      try {
        let data: any;

        switch (storedUser.role) {
          case "administrator":
            data = await getAdminDashboard();
            break;
          case "student":
            data = await getStudentDashboard();
            break;
          case "school-supervisor":
            data = await getSchoolSupervisorDashboard();
            break;
          case "host-supervisor":
            data = await getHostSupervisorDashboard();
            break;
          default:
            data = await getUserProfile();
        }

        setDashboardData(data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  return (
   
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

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
