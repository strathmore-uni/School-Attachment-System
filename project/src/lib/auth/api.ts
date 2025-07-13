// src/lib/api.ts

import custAxios from "../../hooks/custAxios";

// Helper to parse JSON and throw on error
async function handleResponse(res: any) {
  const data = res.data;
  if (!res.data.success && res.status !== 200) {
    throw new Error(data.message || res.statusText);
  }
  return data;
}

// Get token + user role and headers
const getToken = () => localStorage.getItem("token");
const getUserRole = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u).role : null;
};

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

//  API methods

export async function getUserProfile() {
  try {
    const res = await custAxios.get("/profile");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }
    throw error;
  }
}

export async function getAdminDashboard(): Promise<any> {
  try {
    const res = await custAxios.get("/dashboard/admin");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 403) return Promise.reject("Admin privileges required");
    throw error;
  }
}

export async function getStudentDashboard(): Promise<any> {
  try {
    const res = await custAxios.get("/dashboard/student");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 403) return Promise.reject("Student privileges required");
    throw error;
  }
}

export async function getSchoolSupervisorDashboard(): Promise<any> {
  try {
    const res = await custAxios.get("/dashboard/school-supervisor");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 403) return Promise.reject("School supervisor privileges required");
    throw error;
  }
}

export async function getHostSupervisorDashboard(): Promise<any> {
  try {
    const res = await custAxios.get("/dashboard/host-supervisor");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 403) return Promise.reject("Host supervisor privileges required");
    throw error;
  }
}

// Authentication methods
export async function loginUser(user: {
  role: string;
  email: string;
  password: string;
}): Promise<any> {
  try {
    const res = await custAxios.post("/auth/login", user);
    const data = await handleResponse(res);

    // Store token and user data
   
      const { user: userData, token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  }

  //   return data;
  // } catch (error: any) {
  //   if (error.response?.status === 401) return Promise.reject("Invalid credentials");
  //   throw error;
  // }


export async function registerUser(user: {
  role: string;
  name: string;
  password: string;
  email: string;
}): Promise<any> {
  try {
    const res = await custAxios.post("/auth/create-user", user);
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 400) return Promise.reject("Registration failed");
    throw error;
  }
}

export async function getUser() {
  try {
    const res = await custAxios.get("/auth/user");
    return handleResponse(res);
  } catch (error: any) {
    if (error.response?.status === 401) return Promise.reject("Unauthorized");
    throw error;
  }
}

export async function logoutUser() {
  try {
    const res = await custAxios.post("/auth/logout");
    // Clear local storage regardless of response
    localStorage.clear();
    return handleResponse(res);
  } catch (error: any) {
    // Clear local storage even if logout fails
    localStorage.clear();
    if (error.response?.status === 401) return Promise.reject("Unauthorized");
    throw error;
  }
}

// Applications API
export async function getApplications() {
  try {
    const res = await custAxios.get("/applications");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function getStudentApplications() {
  try {
    const res = await custAxios.get("/applications/student");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function createApplication(application: any) {
  try {
    const res = await custAxios.post("/applications", application);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

// Organizations API
export async function getOrganizations() {
  try {
    const res = await custAxios.get("/organizations");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function searchOrganizations(query: string, location?: string) {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (location) params.append("location", location);
    
    const res = await custAxios.get(`/organizations/search?${params.toString()}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

// Reports API
export async function getReports() {
  try {
    const res = await custAxios.get("/reports");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function getStudentReports() {
  try {
    const res = await custAxios.get("/reports/student");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function createReport(report: any) {
  try {
    const res = await custAxios.post("/reports", report);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

// Students API
export async function getStudents() {
  try {
    const res = await custAxios.get("/students");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function searchStudents(query: string, course?: string) {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (course) params.append("course", course);
    
    const res = await custAxios.get(`/students/search?${params.toString()}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

// Admin API
export async function getAdminStats() {
  try {
    const res = await custAxios.get("/admin/stats");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function getAdminAnalytics() {
  try {
    const res = await custAxios.get("/admin/analytics");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function getAdminActivities(limit?: number) {
  try {
    const params = limit ? `?limit=${limit}` : "";
    const res = await custAxios.get(`/admin/activities${params}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

// Profile API
export async function updateProfile(profile: any) {
  try {
    const res = await custAxios.put("/profile", profile);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function changePassword(passwords: { currentPassword: string; newPassword: string }) {
  try {
    const res = await custAxios.put("/profile/password", passwords);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}

export async function getUserActivity() {
  try {
    const res = await custAxios.get("/profile/activity");
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
}
