import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentDashboard,
  getStudentProfile,
  updateStudentProfile,
  assignSupervisor,
  getSupervisorStudents,
  searchStudents,
  getStudentAttachments,
  exportStudents,
  type StudentData,
  type StudentResponse,
  type StudentDashboardData
} from "@/lib/api/students";

// Get all students
export const useStudents = () => {
  return useQuery<StudentData[]>({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get student by ID
export const useStudent = (id: number) => {
  return useQuery<StudentData>({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get student dashboard data
export const useStudentDashboard = () => {
  return useQuery<StudentDashboardData>({
    queryKey: ["student-dashboard"],
    queryFn: getStudentDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get student profile
export const useStudentProfile = () => {
  return useQuery<StudentData>({
    queryKey: ["student-profile"],
    queryFn: getStudentProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get supervisor students
export const useSupervisorStudents = () => {
  return useQuery<StudentData[]>({
    queryKey: ["supervisor-students"],
    queryFn: getSupervisorStudents,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Search students
export const useSearchStudents = (query: string) => {
  return useQuery<StudentData[]>({
    queryKey: ["search-students", query],
    queryFn: () => searchStudents(query),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get student attachments
export const useStudentAttachments = (studentId: number) => {
  return useQuery({
    queryKey: ["student-attachments", studentId],
    queryFn: () => getStudentAttachments(studentId),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentResponse, Error, StudentData>({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error("Error creating student:", error);
    }
  });
};

// Update student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentResponse, Error, { id: number; data: Partial<StudentData> }>({
    mutationFn: ({ id, data }) => updateStudent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", id] });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    }
  });
};

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentResponse, Error, number>({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
    }
  });
};

// Update student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentResponse, Error, Partial<StudentData>>({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
      queryClient.invalidateQueries({ queryKey: ["student-dashboard"] });
    },
    onError: (error) => {
      console.error("Error updating student profile:", error);
    }
  });
};

// Assign supervisor
export const useAssignSupervisor = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentResponse, Error, { studentId: number; supervisorId: number }>({
    mutationFn: ({ studentId, supervisorId }) => assignSupervisor(studentId, supervisorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["supervisor-students"] });
    },
    onError: (error) => {
      console.error("Error assigning supervisor:", error);
    }
  });
};

// Export students
export const useExportStudents = () => {
  return useMutation({
    mutationFn: exportStudents,
    onSuccess: (data) => {
      // Create download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `students-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Error exporting students:", error);
    }
  });
}; 