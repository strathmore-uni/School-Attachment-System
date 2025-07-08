import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRecentApplications,
  getSystemAlerts,
  getStudents,
  getOrganizations,
  getAnalytics,
  exportReport,
  type DashboardStats,
  type Application,
  type SystemAlert,
  type Student,
  type Organization,
  type AnalyticsData
} from "@/lib/api/dashboard";
import { ApplicationData } from "../api/applications";

//Dashboard Stats
export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Recent Applications
export const useRecentApplications = () => {
  return useQuery<ApplicationData[]>({
    queryKey: ["recent-applications"],
    queryFn: getRecentApplications,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// System Alerts
export const useSystemAlerts = () => {
  return useQuery<SystemAlert[]>({
    queryKey: ["system-alerts"],
    queryFn: getSystemAlerts,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Students
export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Organizations
export const useOrganizations = () => {
  return useQuery<Organization[]>({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Analytics
export const useAnalytics = () => {
  return useQuery<AnalyticsData>({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Export Report
export const useExportReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: exportReport,
    onSuccess: (data) => {
      // Create download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Error exporting report:", error);
    }
  });
}; 