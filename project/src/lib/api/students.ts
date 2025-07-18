import custAxios from "@/hooks/custAxios";
import { ApplicationData } from "./applications";
import { ReportData } from "./reports";

export interface StudentData {
  id?: number;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  department?: string;
  yearOfStudy?: number;
  progress?: number;
  organization?: string;
  position?: string;
  overallRating?: number;
  lastReportDate?: number;
  status?: string;
  schoolSupervisorId?: number;
  currentAttachmentId?: number;
}

export interface StudentResponse {
  success: boolean;
  message: string;
  student?: StudentData;
}

export interface ReportDashboardData  {
    achievements: string;
    activities: string;
    created_at: string;
    feedback: string;
    id: number;
    report_title: string;
    status: string;
    student_id: number;
    week_number: number;
    attachment_url?: string;
    challenges: string;
    key_learnings: string;
    next_weeks_plan: string;
  };

export interface ApplicationDashboardData {
    student_name?: string;
    attachment_type: string;
    availability: string;
    created_at: string;
    end_date: string;
    id: number;
    host_supervisor: string;
    school_supervisor: string;
    organization_id: number;
    experience: string;
    motivation: string;
    location: string;
    organization_name: string;
    position: string;
    skills: string;
    start_date: string;
    status: string;
    student_id: number;
    updated_at: string;
  };

export interface StudentDashboardData {
  applications: Array<ApplicationDashboardData>;
  profile: StudentData;
  reports: Array<ReportDashboardData>;
  statistics: {
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
    totalReports: number;
  }
  recentReports: Array<{
    id: number;
    title: string;
    submittedDate: string;
    status: string;
    feedback?: string;
  }>;
  overallRating: number;
}

// Students API calls
export const createStudent = async (
  data: StudentData
): Promise<StudentResponse> => {
  try {
    const response = await custAxios.post<{ data: StudentResponse }>("/students/create-student", data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error creating student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create student"
    );
  }
};

export const getStudents = async (): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get<{ data: StudentData[] }>("/students");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (id: number): Promise<StudentData> => {
  try {
    const response = await custAxios.get<{ data: StudentData }>(`/students/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const updateStudent = async (
  id: number,
  data: Partial<StudentData>
): Promise<StudentResponse> => {
  try {
    const response = await custAxios.put<{ data: StudentResponse }>(`/students/${id}`, data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error updating student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update student"
    );
  }
};

export const deleteStudent = async (id: number): Promise<StudentResponse> => {
  try {
    const response = await custAxios.delete<{ data: StudentResponse }>(`/students/${id}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error deleting student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete student"
    );
  }
};

export const getStudentDashboard = async (): Promise<StudentDashboardData> => {
  try {
    const response = await custAxios.get<{ data: StudentDashboardData }>("/dashboard/student");
    console.log("Student Dashboard Data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    throw error;
  }
};

export const getStudentProfile = async (): Promise<StudentData> => {
  try {
    const response = await custAxios.get<{ data: StudentData }>("/students/student-profile");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw error;
  }
};

export const updateStudentProfile = async (
  data: Partial<StudentData>
): Promise<StudentResponse> => {
  try {
    const response = await custAxios.put<{ data: StudentResponse }>("/students/update-student-profile", data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error updating student profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

export const assignSupervisor = async (
  studentId: number,
  supervisorId: number
): Promise<StudentResponse> => {
  try {
    const response = await custAxios.patch<{ data: StudentResponse }>(`/students//assign-supervisor/${studentId}`, { supervisorId } );
    return response.data.data;
  } catch (error: any) {
    console.error("Error assigning supervisor:", error);
    throw new Error(
      error.response?.data?.message || "Failed to assign supervisor"
    );
  }
};

export const getSupervisorStudents = async (): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get<{ data: StudentData[] }>("/students/supervisor-students");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching supervisor students:", error);
    throw error;
  }
};

export const searchStudents = async (query: string): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get<{ data: StudentData[] }>(`/students/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  } catch (error) {
    console.error("Error searching students:", error);
    throw error;
  }
};

export const getStudentAttachments = async (
  studentId: number
): Promise<any[]> => {
  try {
    const response = await custAxios.get<{ data: any[] }>(`/students/student-attachment/${studentId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student attachments:", error);
    throw error;
  }
};

export const exportStudents = async (filters?: any): Promise<Blob> => {
  try {
    const response = await custAxios.get<{ data: Blob }>("/students/export-students", {
      params: filters,
      responseType: "blob",
    });
    return response.data.data;
  } catch (error) {
    console.error("Error exporting students:", error);
    throw error;
  }
};
