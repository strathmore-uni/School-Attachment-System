# Frontend-Backend Integration Guide

This document outlines the complete integration between the React frontend and Node.js backend for the School Attachment System.

## Overview

The frontend has been fully integrated with the backend API, replacing all hardcoded data with real API calls. The integration uses:

- **React Query** for state management and caching
- **Axios** for HTTP requests
- **JWT** for authentication
- **TypeScript** for type safety

## API Integration Structure

### 1. API Services (`src/lib/api/`)

#### `dashboard.ts`
- Dashboard statistics
- Recent applications
- System alerts
- Analytics data
- Export functionality

#### `applications.ts`
- CRUD operations for applications
- Approval/rejection workflows
- Student-specific application queries

#### `organizations.ts`
- Organization management
- Search functionality
- Student assignment

#### `reports.ts`
- Report submission and management
- Review workflows
- Export capabilities

#### `students.ts`
- Student profile management
- Dashboard data
- Supervisor assignments

### 2. React Query Hooks (`src/lib/hooks/`)

#### `useDashboard.ts`
```typescript
export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

#### `useApplications.ts`
```typescript
export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApplicationResponse, Error, ApplicationData>({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
    },
  });
};
```

#### `useStudents.ts`
- Student data management
- Profile updates
- Dashboard integration

## Authentication Integration

### Login Flow
1. User submits credentials
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. User redirected to role-specific dashboard

### Token Management
```typescript
// Login success
localStorage.setItem("token", token);
localStorage.setItem("userRole", userRole);
localStorage.setItem("userId", session.userData.id.toString());
localStorage.setItem("userName", session.userData.name);
```

### Axios Configuration
```typescript
// Automatic token inclusion in requests
custAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Updated Components

### 1. Login Page (`src/pages/Login.tsx`)
- ✅ Integrated with backend authentication
- ✅ Proper error handling
- ✅ User data storage
- ✅ Role-based navigation

### 2. Admin Dashboard (`src/pages/AdminDashboard.tsx`)
- ✅ Real-time dashboard statistics
- ✅ Live application data
- ✅ Application approval/rejection
- ✅ Export functionality
- ✅ Loading states and error handling

### 3. Student Dashboard (`src/pages/StudentDashboard.tsx`)
- ✅ Student-specific data
- ✅ Current attachment information
- ✅ Progress tracking
- ✅ Report history
- ✅ Application status

### 4. Application Forms
- ✅ NewApplicationForm: Integrated with organizations API
- ✅ SubmitReportForm: Connected to reports API
- ✅ AddOrganizationForm: Organization creation
- ✅ AddStudentForm: Student registration

## Data Flow

### Dashboard Data Flow
```
1. Component mounts
2. React Query hook called
3. API request made to backend
4. Data cached and displayed
5. Automatic refetch on stale data
```

### Form Submission Flow
```
1. User fills form
2. Validation performed
3. API mutation called
4. Success/error handling
5. Cache invalidation
6. UI updates
```

## Error Handling

### API Error Handling
```typescript
try {
  const response = await custAxios.post("/applications", data);
  return response.data;
} catch (error: any) {
  console.error("Error creating application:", error);
  throw new Error(error.response?.data?.message || "Failed to create application");
}
```

### User Feedback
```typescript
toast({
  title: "Success",
  description: "Application submitted successfully",
});

toast({
  title: "Error",
  description: error.message || "An error occurred",
  variant: "destructive",
});
```

## Loading States

### Skeleton Loading
```typescript
{applicationsLoading ? (
  // Loading skeleton
  Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className="p-4 border rounded-lg animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  ))
) : (
  // Actual content
)}
```

### Button Loading States
```typescript
<Button 
  type="submit" 
  disabled={createApplicationMutation.isPending}
>
  {createApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
</Button>
```

## Caching Strategy

### Query Caching
- **Dashboard stats**: 5 minutes
- **Applications**: 2 minutes
- **Students**: 5 minutes
- **Organizations**: 5 minutes
- **Analytics**: 10 minutes

### Cache Invalidation
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["applications"] });
  queryClient.invalidateQueries({ queryKey: ["student-applications"] });
  queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
}
```

## Security Features

### JWT Token Validation
- Automatic token inclusion in requests
- Token expiration handling
- Secure storage in localStorage

### Role-Based Access
- Frontend route protection
- API endpoint authorization
- User role validation

## Development Setup

### 1. Install Dependencies
```bash
cd IS/School-Attachment-System/project
npm install
```

### 2. Environment Configuration
Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Backend Integration
Ensure backend is running on `http://localhost:3000`

## API Endpoints Used

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/create-user` - User registration
- `GET /api/auth/user` - Get current user

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/applications` - Recent applications
- `GET /api/dashboard/alerts` - System alerts
- `GET /api/dashboard/analytics` - Analytics data
- `GET /api/dashboard/export` - Export reports

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create application
- `PATCH /api/applications/:id/approve` - Approve application
- `PATCH /api/applications/:id/reject` - Reject application
- `GET /api/applications/student` - Student applications
- `GET /api/applications/pending` - Pending applications

### Students
- `GET /api/students` - Get all students
- `GET /api/students/dashboard` - Student dashboard
- `GET /api/students/profile` - Student profile
- `PUT /api/students/profile` - Update profile

### Organizations
- `GET /api/organizations` - Get organizations
- `POST /api/organizations` - Create organization
- `GET /api/organizations/search` - Search organizations

### Reports
- `GET /api/reports` - Get reports
- `POST /api/reports` - Submit report
- `PATCH /api/reports/:id/review` - Review report

## Testing the Integration

### 1. Login Test
1. Navigate to login page
2. Enter valid credentials
3. Verify successful login and navigation

### 2. Dashboard Test
1. Login as admin
2. Verify dashboard loads with real data
3. Test application approval/rejection

### 3. Student Dashboard Test
1. Login as student
2. Verify student-specific data loads
3. Test application submission

### 4. Form Integration Test
1. Open application form
2. Verify organizations load from API
3. Submit form and verify success

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check API base URL in frontend

2. **Authentication Errors**
   - Verify JWT token is valid
   - Check token storage in localStorage

3. **Data Not Loading**
   - Check network tab for API errors
   - Verify backend endpoints are working
   - Check React Query cache

4. **Form Submission Errors**
   - Validate form data structure
   - Check API endpoint requirements
   - Verify error handling

### Debug Tools

1. **React Query DevTools**
   - Install: `npm install @tanstack/react-query-devtools`
   - Add to App.tsx for debugging

2. **Network Tab**
   - Monitor API requests
   - Check response data

3. **Console Logs**
   - Check for error messages
   - Verify data flow

## Performance Optimizations

### 1. Query Optimization
- Appropriate stale times
- Selective cache invalidation
- Background refetching

### 2. Loading States
- Skeleton loading
- Progressive loading
- Optimistic updates

### 3. Error Boundaries
- Graceful error handling
- User-friendly error messages
- Fallback UI

## Future Enhancements

### 1. Real-time Updates
- WebSocket integration
- Live notifications
- Real-time data sync

### 2. Offline Support
- Service worker implementation
- Offline data caching
- Sync when online

### 3. Advanced Features
- File upload integration
- Advanced search
- Bulk operations

## Conclusion

The frontend-backend integration is now complete with:

- ✅ Full API integration
- ✅ Real-time data loading
- ✅ Proper error handling
- ✅ Loading states
- ✅ Authentication flow
- ✅ Role-based access
- ✅ Form submissions
- ✅ Data caching

The system is ready for production use with a robust, scalable architecture that provides a seamless user experience. 