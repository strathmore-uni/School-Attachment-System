import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  approveApplication,
   rejectApplication,
   getStudentApplications,
   getPendingApplications,
  type ApplicationData,
  type ApplicationResponse
} from "@/lib/api/applications";

// Get all applications
export const useApplications = () => {
  return useQuery<ApplicationData[]>({
    queryKey: ["applications"],
    queryFn: getApplications,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get application by ID
export const useApplication = (id: number) => {
  return useQuery<ApplicationData>({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get student applications
export const useStudentApplications = () => {
  return useQuery<ApplicationData[]>({
    queryKey: ["student-applications"],
    queryFn: getStudentApplications,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get pending applications
export const usePendingApplications = () => {
  return useQuery<ApplicationData[]>({
    queryKey: ["pending-applications"],
    queryFn: getPendingApplications,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Create application
export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationData[], Error, ApplicationData>({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
      queryClient.invalidateQueries({ queryKey: ["recent-applications"] });
    },
    onError: (error) => {
      console.error("Error creating application:", error);
    }
  });
};

// Update application
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationResponse, Error, { id: number; data: Partial<ApplicationData> }>({
    mutationFn: ({ id, data }) => updateApplication(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application", id] });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
      queryClient.invalidateQueries({ queryKey: ["recent-applications"] });
    },
    onError: (error) => {
      console.error("Error updating application:", error);
    }
  });
};

// Delete application
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationResponse, Error, number>({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
      queryClient.invalidateQueries({ queryKey: ["recent-applications"] });
    },
    onError: (error) => {
      console.error("Error deleting application:", error);
    }
  });
};

// Approve application
export const useApproveApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationResponse, Error, number>({
    mutationFn: approveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
      queryClient.invalidateQueries({ queryKey: ["recent-applications"] });
    },
    onError: (error) => {
      console.error("Error approving application:", error);
    }
  });
};

// Reject application
export const useRejectApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationResponse, Error, { id: number; reason?: string }>({
    mutationFn: ({ id, reason }) => rejectApplication(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
      queryClient.invalidateQueries({ queryKey: ["recent-applications"] });
    },
    onError: (error) => {
      console.error("Error rejecting application:", error);
    }
  });
}; 