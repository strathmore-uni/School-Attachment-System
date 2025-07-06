import custAxios from "@/hooks/custAxios";

export interface ReportData {
  report_title: string;
  week_number: number;
  activities: string;
  achievements: string;
  challenges: string;
  key_learnings: string;
  next_weeks_plans: string;
  attachment_url: string;
}

export interface ReportResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: ReportData;
  };
}

// Reports API calls
export const createReport = async (data: ReportData): Promise<ReportData> => {
  try {
    const response = await custAxios.post<ReportResponse>("/reports/create-report", data);

    return response.data.data.data;
  } catch (error: any) {
    console.error("Error creating report:", error);
    throw new Error(error.response?.data?.message || "Failed to create report");
  }
};

// export const getReports = async (): Promise<ReportData[]> => {
//   try {
//     const response = await custAxios.get("/reports");
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     throw error;
//   }
// };

// export const getReportById = async (id: number): Promise<ReportData> => {
//   try {
//     const response = await custAxios.get(`/reports/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching report:", error);
//     throw error;
//   }
// };

// export const updateReport = async (id: number, data: Partial<ReportData>): Promise<ReportResponse> => {
//   try {
//     const response = await custAxios.put(`/reports/${id}`, data);
//     return response.data;
//   } catch (error: any) {
//     console.error("Error updating report:", error);
//     throw new Error(error.response?.data?.message || "Failed to update report");
//   }
// };

// export const deleteReport = async (id: number): Promise<ReportResponse> => {
//   try {
//     const response = await custAxios.delete(`/reports/${id}`);
//     return response.data;
//   } catch (error: any) {
//     console.error("Error deleting report:", error);
//     throw new Error(error.response?.data?.message || "Failed to delete report");
//   }
// };

// export const getStudentReports = async (): Promise<ReportData[]> => {
//   try {
//     const response = await custAxios.get("/reports/student");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching student reports:", error);
//     throw error;
//   }
// };

// export const getSupervisorReports = async (): Promise<ReportData[]> => {
//   try {
//     const response = await custAxios.get("/reports/supervisor");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching supervisor reports:", error);
//     throw error;
//   }
// };

// export const reviewReport = async (id: number, feedback: string, status: string): Promise<ReportResponse> => {
//   try {
//     const response = await custAxios.patch(`/reports/${id}/review`, { feedback, status });
//     return response.data;
//   } catch (error: any) {
//     console.error("Error reviewing report:", error);
//     throw new Error(error.response?.data?.message || "Failed to review report");
//   }
// };

// export const approveReport = async (id: number, feedback?: string): Promise<ReportResponse> => {
//   try {
//     const response = await custAxios.patch(`/reports/${id}/approve`, { feedback });
//     return response.data;
//   } catch (error: any) {
//     console.error("Error approving report:", error);
//     throw new Error(error.response?.data?.message || "Failed to approve report");
//   }
// };

// export const rejectReport = async (id: number, feedback: string): Promise<ReportResponse> => {
//   try {
//     const response = await custAxios.patch(`/reports/${id}/reject`, { feedback });
//     return response.data;
//   } catch (error: any) {
//     console.error("Error rejecting report:", error);
//     throw new Error(error.response?.data?.message || "Failed to reject report");
//   }
// };

// export const getPendingReports = async (): Promise<ReportData[]> => {
//   try {
//     const response = await custAxios.get("/reports/pending");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching pending reports:", error);
//     throw error;
//   }
// };

// export const exportReports = async (filters?: any): Promise<Blob> => {
//   try {
//     const response = await custAxios.get("/reports/export", {
//       params: filters,
//       responseType: 'blob'
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error exporting reports:", error);
//     throw error;
//   }
// }; 