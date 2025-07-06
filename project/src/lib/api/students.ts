import custAxios from "@/hooks/custAxios";

export interface StudentData {
  id?: number;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  department?: string;
  yearOfStudy?: number;
  status?: string;
  schoolSupervisorId?: number;
  currentAttachmentId?: number;
}

export interface StudentResponse {
  success: boolean;
  message: string;
  student?: StudentData;
}

export interface StudentDashboardData {
  activeApplications: number;
  currentAttachment?: {
    organization: string;
    position: string;
    start_date: string;
    end_date: string;
    progress: number;
    schoolSupervisor: string;
    hostSupervisor: string;
    reportsSubmitted: number;
    totalReports: number;
  };
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
    const response = await custAxios.post("/students/create-student", data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create student"
    );
  }
};

export const getStudents = async (): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (id: number): Promise<StudentData> => {
  try {
    const response = await custAxios.get(`/students/${id}`);
    return response.data;
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
    const response = await custAxios.put(`/students/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update student"
    );
  }
};

export const deleteStudent = async (id: number): Promise<StudentResponse> => {
  try {
    const response = await custAxios.delete(`/students/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting student:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete student"
    );
  }
};

export const getStudentDashboard = async (): Promise<StudentDashboardData> => {
  try {
    const response = await custAxios.get("/students/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    throw error;
  }
};

export const getStudentProfile = async (): Promise<StudentData> => {
  try {
    const response = await custAxios.get("/students/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw error;
  }
};

export const updateStudentProfile = async (
  data: Partial<StudentData>
): Promise<StudentResponse> => {
  try {
    const response = await custAxios.put("/students/profile", data);
    return response.data;
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
    const response = await custAxios.patch(
      `/students/${studentId}/assign-supervisor`,
      { supervisorId }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error assigning supervisor:", error);
    throw new Error(
      error.response?.data?.message || "Failed to assign supervisor"
    );
  }
};

export const getSupervisorStudents = async (): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get("/students/supervisor");
    return response.data;
  } catch (error) {
    console.error("Error fetching supervisor students:", error);
    throw error;
  }
};

export const searchStudents = async (query: string): Promise<StudentData[]> => {
  try {
    const response = await custAxios.get(
      `/students/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching students:", error);
    throw error;
  }
};

export const getStudentAttachments = async (
  studentId: number
): Promise<any[]> => {
  try {
    const response = await custAxios.get(`/students/${studentId}/attachments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student attachments:", error);
    throw error;
  }
};

export const exportStudents = async (filters?: any): Promise<Blob> => {
  try {
    const response = await custAxios.get("/students/export", {
      params: filters,
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error exporting students:", error);
    throw error;
  }
};
