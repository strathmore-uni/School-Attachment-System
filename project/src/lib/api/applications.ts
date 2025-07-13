import custAxios from "@/hooks/custAxios";

export interface ApplicationData {
  id?: number;
  organization_id: string;
  position: string;
  attachment_type: string;
  start_date: string;
  end_date: string;
  motivation: string;
  skills: string;
  experience: string;
  availability: string;
  status?: string;
  submittedDate?: string;
  stdentId?: number;
}

export interface ApplicationResponse {
  // success: boolean;
  // message: string;
  application?: ApplicationData;
  showReviewButton?: boolean;
  review?: boolean;
  onReview?: () => void;
}

// Applications API calls
export const createApplication = async (data: ApplicationData): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.post<{ data: ApplicationData[] }>("/applications/create-application", data);
    return response.data.data as ApplicationData[];
  } catch (error: any) {
    console.error("Error creating application:", error);
    throw new Error(error.response?.data?.message || "Failed to create application");
  }
};

export const getApplications = async (organization_id: string = ""): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.get<{ data: ApplicationData[] }>("/applications/get-applications", {
      params: { organization_id }
    });
    return response.data.data as ApplicationData[];
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export const getApplicationById = async (id: number): Promise<ApplicationData> => {
  try {
    const response = await custAxios.get<{ data: ApplicationData }>(`/applications/get-application/${id}`);
    return response.data.data as ApplicationData;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

export const updateApplication = async (id: number, data: Partial<ApplicationData>): Promise<ApplicationResponse> => {
  try {
    const response = await custAxios.put<{ data: ApplicationResponse }>(`/applications/update-application/${id}`, data);
    return response.data.data as ApplicationResponse;
  } catch (error: any) {
    console.error("Error updating application:", error);
    throw new Error(error.response?.data?.message || "Failed to update application");
  }
};

export const deleteApplication = async (id: number): Promise<ApplicationResponse> => {
  try {
    const response = await custAxios.delete<{ data: ApplicationResponse }>(`/applications/delete-application/${id}`);
    return response.data.data as ApplicationResponse;
  } catch (error: any) {
    console.error("Error deleting application:", error);
    throw new Error(error.response?.data?.message || "Failed to delete application");
  }
};

export const approveApplication = async (id: number): Promise<ApplicationResponse> => {
  try {
    const response = await custAxios.patch<{ data: ApplicationResponse }>(`/applications/approve_application/${id}`);
    return response.data.data as ApplicationResponse;
  } catch (error: any) {
    console.error("Error approving application:", error);
    throw new Error(error.response?.data?.message || "Failed to approve application");
  }
};

export const rejectApplication = async (id: number, reason?: string): Promise<ApplicationResponse> => {
  try {
    const response = await custAxios.patch<{ data: ApplicationResponse }>(`/applications/reject_application/${id}`, { reason });
    return response.data.data as ApplicationResponse;
  } catch (error: any) {
    console.error("Error rejecting application:", error);
    throw new Error(error.response?.data?.message || "Failed to reject application");
  }
};

export const getStudentApplications = async (): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.get<{ data: ApplicationData[] }>("/applications/get-applications");
    return response.data.data as ApplicationData[];
  } catch (error) {
    console.error("Error fetching student applications:", error);
    throw error;
  }
};

export const getStudentgApplications = async (): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.get<{ data: ApplicationData[] }>("/applications/get-student-applications");
    return response.data.data as ApplicationData[];
  } catch (error) {
    console.error("Error fetching student applications:", error);
    throw error;
  }
}

export const getPendingApplications = async (): Promise<ApplicationData[]> => {
  try {
    const response = await custAxios.get<{ data: ApplicationData[] }>("/applications/get-pending-application");
    return response.data.data as ApplicationData[];
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    throw error;
  }
}; 