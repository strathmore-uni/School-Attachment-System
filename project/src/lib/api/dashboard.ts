import custAxios from "@/hooks/custAxios";
import { ApplicationData } from "./applications";

export interface DashboardStats {
  totalStudents: number;
  activeAttachments: number;
  partnerOrganizations: number;
  completionRate: number;
}

export interface Application {
  id: number;
  studentName: string;
  organization: string;
  position: string;
  status: string;
  submittedDate: string;
  type: string;
}

export interface SystemAlert {
  id: number;
  type: string;
  message: string;
  timestamp: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
  status: string;
}

export interface Organization {
  id: number;
  name: string;
  industry: string;
  studentsAssigned: number;
  maxStudents: number;
}

export interface AnalyticsData {
  attachment_types: {
    wbl: number;
    sbl: number;
  };
  topOrganizations: Array<{
    name: string;
    rating: number;
    students: number;
  }>;
}

// Dashboard API calls
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await custAxios.get("/dashboard/stats");
    return response.data as DashboardStats;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getRecentApplications = async (): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.get("/dashboard/applications");
    return response.data as ApplicationData[];
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    throw error;
  }
};

export const getSystemAlerts = async (): Promise<SystemAlert[]> => {
  try {
    const response = await custAxios.get("/dashboard/alerts");
    return response.data as SystemAlert[];
  } catch (error) {
    console.error("Error fetching system alerts:", error);
    throw error;
  }
};

export const getStudents = async (): Promise<Student[]> => {
  try {
    const response = await custAxios.get("/dashboard/students");
    return response.data as Student[];
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await custAxios.get<{ data: Organization[] }>("/organizations/get-organizations");
    console.log("Organizations fetched successfully:", response.data.data);
    return response.data.data as Organization[];
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  try {
    const response = await custAxios.get("/dashboard/analytics");
    return response.data as AnalyticsData;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

export const exportReport = async (): Promise<Blob> => {
  try {
    const response = await custAxios.get("/dashboard/export", {
      responseType: 'blob'
    });
    return response.data as Blob;
  } catch (error) {
    console.error("Error exporting report:", error);
    throw error;
  }
}; 