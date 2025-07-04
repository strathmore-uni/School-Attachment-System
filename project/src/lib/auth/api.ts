// src/lib/api.ts

// Helper to parse JSON and throw on error
async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || res.statusText);
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
  const res = await fetch("/api/profile/profile", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
  return handleResponse(res);
}

export async function getAdminDashboard(): Promise<any> {
  const res = await fetch("/api/admin/dashboard", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (res.status === 403) return Promise.reject("Admin privileges required");
  return handleResponse(res);
}

export async function getStudentDashboard(): Promise<any> {
  const res = await fetch("/api/student/dashboard", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (res.status === 403) return Promise.reject("Student privileges required");
  return handleResponse(res);
}

export async function getSupervisorDashboard(): Promise<any> {
  const res = await fetch("/api/supervisor/dashboard", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (res.status === 403) return Promise.reject("Supervisor privileges required");
  return handleResponse(res);
}
// Authentication methods
export async function loginUser(user: {
  role: string;
  email: string;
  password: string;
}): Promise<any> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 401) return Promise.reject("Invalid credentials");
  return handleResponse(res);
}
export async function registerUser(user: {
  role: string;
  name: string;
  password: string;
  email: string;
}): Promise<any> {
  const res = await fetch("/api/auth/create-user", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 400) return Promise.reject("Registration failed");
  return handleResponse(res);
}
export async function getUser() {
  const res = await fetch("/api/auth/user", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (res.status === 401) return Promise.reject("Unauthorized");
  return handleResponse(res);
}
export async function logoutUser() {
  const res = await fetch("/api/auth/logout", { 
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (res.status === 401) return Promise.reject("Unauthorized");
  return handleResponse(res);
}
//       <p>Role: {user?.role}</p>
//       {dashboardData && (
//         <div>
//           <h2>Dashboard Data</h2>
//           <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };
