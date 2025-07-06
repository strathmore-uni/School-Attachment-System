import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReport,
  // getReports,
  // getReportById,
  // updateReport,
  // deleteReport,
  // getStudentReports,
  // getSupervisorReports,
  // reviewReport,
  // approveReport,
  // rejectReport,
  // getPendingReports,
  // exportReports,
  type ReportData,
  type ReportResponse
} from "@/lib/api/reports";

// Get all reports
// export const useReports = () => {
//   return useQuery<ReportData[]>({
//     queryKey: ["reports"],
//     queryFn: getReports,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//   });
// };

// // Get report by ID
// export const useReport = (id: number) => {
//   return useQuery<ReportData>({
//     queryKey: ["report", id],
//     queryFn: () => getReportById(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// // Get student reports
// export const useStudentReports = () => {
//   return useQuery<ReportData[]>({
//     queryKey: ["student-reports"],
//     queryFn: getStudentReports,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//   });
// };

// // Get supervisor reports
// export const useSupervisorReports = () => {
//   return useQuery<ReportData[]>({
//     queryKey: ["supervisor-reports"],
//     queryFn: getSupervisorReports,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//   });
// };

// // Get pending reports
// export const usePendingReports = () => {
//   return useQuery<ReportData[]>({
//     queryKey: ["pending-reports"],
//     queryFn: getPendingReports,
//     staleTime: 1 * 60 * 1000, // 1 minute
//   });
// };

// Create report
export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation<ReportData, Error, ReportData>({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["student-reports"] });
      queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
    },
    onError: (error) => {
      console.error("Error creating report:", error);
    }
  });
};

// Update report
// export const useUpdateReport = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<ReportResponse, Error, { id: number; data: Partial<ReportData> }>({
//     mutationFn: ({ id, data }) => updateReport(id, data),
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries({ queryKey: ["reports"] });
//       queryClient.invalidateQueries({ queryKey: ["report", id] });
//       queryClient.invalidateQueries({ queryKey: ["student-reports"] });
//       queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
//     },
//     onError: (error) => {
//       console.error("Error updating report:", error);
//     }
//   });
// };

// // Delete report
// export const useDeleteReport = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<ReportResponse, Error, number>({
//     mutationFn: deleteReport,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["reports"] });
//       queryClient.invalidateQueries({ queryKey: ["student-reports"] });
//       queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
//     },
//     onError: (error) => {
//       console.error("Error deleting report:", error);
//     }
//   });
// };

// // Review report
// export const useReviewReport = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<ReportResponse, Error, { id: number; feedback: string; status: string }>({
//     mutationFn: ({ id, feedback, status }) => reviewReport(id, feedback, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["reports"] });
//       queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
//       queryClient.invalidateQueries({ queryKey: ["supervisor-reports"] });
//     },
//     onError: (error) => {
//       console.error("Error reviewing report:", error);
//     }
//   });
// };

// // Approve report
// export const useApproveReport = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<ReportResponse, Error, { id: number; feedback?: string }>({
//     mutationFn: ({ id, feedback }) => approveReport(id, feedback),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["reports"] });
//       queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
//       queryClient.invalidateQueries({ queryKey: ["supervisor-reports"] });
//     },
//     onError: (error) => {
//       console.error("Error approving report:", error);
//     }
//   });
// };

// // Reject report
// export const useRejectReport = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<ReportResponse, Error, { id: number; feedback: string }>({
//     mutationFn: ({ id, feedback }) => rejectReport(id, feedback),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["reports"] });
//       queryClient.invalidateQueries({ queryKey: ["pending-reports"] });
//       queryClient.invalidateQueries({ queryKey: ["supervisor-reports"] });
//     },
//     onError: (error) => {
//       console.error("Error rejecting report:", error);
//     }
//   });
// };

// // Export reports
// export const useExportReports = () => {
//   return useMutation({
//     mutationFn: exportReports,
//     onSuccess: (data) => {
//       // Create download link
//       const url = window.URL.createObjectURL(data);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `reports-${new Date().toISOString().split('T')[0]}.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     },
//     onError: (error) => {
//       console.error("Error exporting reports:", error);
//     }
//   });
// }; 