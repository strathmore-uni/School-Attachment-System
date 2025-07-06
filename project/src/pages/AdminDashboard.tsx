import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  BarChart3,
  Plus,
  Eye,
  XCircle,
  Download
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import ApplicationCard from '@/components/ApplicationCard';
import AddOrganizationForm from '@/components/forms/AddOrganizationForm';
import AddStudentForm from '@/components/forms/AddStudentForm';
import { toast } from '@/hooks/use-toast';
import { 
  useDashboardStats, 
  useRecentApplications, 
  useSystemAlerts, 
  useStudents, 
  useOrganizations, 
  useAnalytics, 
  useExportReport 
} from '@/lib/hooks/useDashboard';
import { useApproveApplication, useRejectApplication } from '@/lib/hooks/useApplications';

const AdminDashboard = () => {
  const [showAddOrganizationForm, setShowAddOrganizationForm] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  // API hooks
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentApplications, isLoading: applicationsLoading } = useRecentApplications();
  // const { data: systemAlerts, isLoading: alertsLoading } = useSystemAlerts();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: organizations, isLoading: organizationsLoading } = useOrganizations();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const exportReportMutation = useExportReport();
  const approveApplicationMutation = useApproveApplication();
  const rejectApplicationMutation = useRejectApplication();

  // Transform stats data
  const stats = dashboardStats ? [
    {
      title: "Total Students",
      value: dashboardStats.totalStudents.toString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Attachments",
      value: dashboardStats.activeAttachments.toString(),
      change: "+8%",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Partner Organizations",
      value: dashboardStats.partnerOrganizations.toString(),
      change: "+3%",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Completion Rate",
      value: `${dashboardStats.completionRate}%`,
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ] : [];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleReview = (id: number) => {
    console.log('Reviewing application:', id);
  };

  const handleApprove = async (id: number) => {
    try {
      await approveApplicationMutation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Application approved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve application",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectApplicationMutation.mutateAsync({ id, reason: "Application rejected by admin" });
      toast({
        title: "Success",
        description: "Application rejected successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject application",
        variant: "destructive",
      });
    }
  };

  const handleViewAll = () => {
    console.log('View all applications');
  };

  const handleAddOrganization = (data: any) => {
    console.log('Organization added:', data);
  };

  const handleAddStudent = (data: any) => {
    console.log('Student added:', data);
  };

  const handleExportReport = async () => {
    try {
      await exportReportMutation.mutateAsync();
      toast({
        title: "Success",
        description: "Report exported successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to export report",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Administrator Dashboard"
          description="Manage and monitor the attachment system"
          actionButton={{
            label: "Add Organization",
            icon: Plus,
            onClick: () => setShowAddOrganizationForm(true)
          }}
        />

        <div className="flex space-x-2 mb-4">
          <Button 
            variant="outline" 
            onClick={handleExportReport}
            disabled={exportReportMutation.isPending}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            {exportReportMutation.isPending ? "Generating..." : "Generate Report"}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-6 border rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))
          ) : (
            stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                iconColor={stat.color}
              />
            ))
          )}
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Recent Applications</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest attachment applications requiring review</CardDescription>
                  </div>
                  <Button onClick={handleViewAll}>
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationsLoading ? (
                    // Loading skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    ))
                  ) : recentApplications && recentApplications.length > 0 ? (
                    recentApplications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg">
                        <ApplicationCard
                          application={application}
                          showReviewButton={true}
                          onReview={handleReview}
                        />
                        {application.status === 'Pending Review' && (
                          <div className="flex space-x-2 mt-4">
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(application.id)}
                              disabled={approveApplicationMutation.isPending}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              {approveApplicationMutation.isPending ? "Approving..." : "Approve"}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleReject(application.id)}
                              disabled={rejectApplicationMutation.isPending}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              {rejectApplicationMutation.isPending ? "Rejecting..." : "Reject"}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No applications found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>Manage all students in the system</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddStudentForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Alice Wanjiku</h4>
                        <p className="text-sm text-muted-foreground">ID: 154789</p>
                        <p className="text-sm text-muted-foreground">alice.wanjiku@student.strathmore.edu</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm">
                          Assign
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Organization Management</CardTitle>
                    <CardDescription>Manage partner organizations</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddOrganizationForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Organization
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Safaricom PLC</h4>
                        <p className="text-sm text-muted-foreground">Telecommunications</p>
                        <p className="text-sm text-muted-foreground">5/10 students assigned</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm">
                          Manage Students
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Attachment Types Distribution</CardTitle>
                      <CardDescription>Work-Based vs Service-Based Learning</CardDescription>
                    </div>
                    <Button onClick={handleExportReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Work-Based Learning (WBL)</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Service-Based Learning (SBL)</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Organizations</CardTitle>
                  <CardDescription>Based on student feedback and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Safaricom PLC", rating: 4.8, students: 45 },
                      { name: "Kenya Commercial Bank", rating: 4.6, students: 32 },
                      { name: "Equity Bank", rating: 4.5, students: 28 },
                      { name: "Co-operative Bank", rating: 4.4, students: 24 }
                    ].map((org, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{org.name}</p>
                          <p className="text-xs text-muted-foreground">{org.students} students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{org.rating}/5</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(org.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
{/* 
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
         */}
</Tabs>
        {/* Forms */}
        {showAddOrganizationForm && (
          <AddOrganizationForm
            onClose={() => setShowAddOrganizationForm(false)}
            onSubmit={handleAddOrganization}
          />
        )}

        {showAddStudentForm && (
          <AddStudentForm
            onClose={() => setShowAddStudentForm(false)}
            onSubmit={handleAddStudent}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;