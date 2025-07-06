import custAxios from "@/hooks/custAxios";

export interface OrganizationData {
  // id?: number;
  name: string;
  industry: string;
 location: string;
  student_capacity: string;
  contactPerson?: string;
 email_address: string;
  phone_number?: string;
  website: number;
  physical_address: number;
  //status?: string;
  description:string;
  students_requirements?: string;
  benefits_offered?: string;
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  organization?: OrganizationData;
}

// Organizations API calls
export const createOrganization = async (data: OrganizationData): Promise<OrganizationData> => {
  try {
    const response = await custAxios.post<{data: OrganizationData}>("/organizations/create-organization", data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error creating organization:", error);
    throw new Error(error.response?.data?.message || "Failed to create organization");
  }
};

export const getOrganizations = async (): Promise<OrganizationData[]> => {
  try {
    const response = await custAxios.get<OrganizationData[]>("/organizations");
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const getOrganizationById = async (id: number): Promise<OrganizationData> => {
  try {
    const response = await custAxios.get<OrganizationData>(`/organizations/ get-organisation/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organization:", error);
    throw error;
  }
};

export const updateOrganization = async (id: number, data: Partial<OrganizationData>): Promise<OrganizationResponse> => {
  try {
    const response = await custAxios.put<OrganizationResponse>(`/organizations/update-organization/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating organization:", error);
    throw new Error(error.response?.data?.message || "Failed to update organization");
  }
};

export const deleteOrganization = async (id: number): Promise<OrganizationResponse> => {
  try {
    const response = await custAxios.delete<OrganizationResponse>(`/organizations/delete-organization/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting organization:", error);
    throw new Error(error.response?.data?.message || "Failed to delete organization");
  }
};

export const searchOrganizations = async (query: string): Promise<OrganizationData[]> => {
  try {
    const response = await custAxios.get<{ data: OrganizationData[] }>(`/organizations/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  } catch (error) {
    console.error("Error searching organizations:", error);
    throw error;
  }
};

export const getOrganizationStudents = async (id: number): Promise<any[]> => {
  try {
    const response = await custAxios.get<{ data: any[] }>(`/organizations/organisation-students${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching organization students:", error);
    throw error;
  }
};

export const assignStudentToOrganization = async (organizationId: number, studentId: number): Promise<OrganizationResponse> => {
  try {
    const response = await custAxios.post<{ success: boolean; message: string }>(`/organizations/assign-student-to-organisation/${organizationId}`, { studentId });
    return response.data;
  } catch (error: any) {
    console.error("Error assigning student to organization:", error);
    throw new Error(error.response?.data?.message || "Failed to assign student");
  }
};

export const removeStudentFromOrganization = async (organizationId: number, studentId: number): Promise<OrganizationResponse> => {
  try {
    const response = await custAxios.delete<{ success: boolean; message: string }>(`/organizations/remove-student-from-organisation/${organizationId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error removing student from organization:", error);
    throw new Error(error.response?.data?.message || "Failed to remove student");
  }
}; 