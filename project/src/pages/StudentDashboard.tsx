import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Building2, 
  User, 
  Target,
  Plus,
  Search
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import ApplicationCard from '@/components/ApplicationCard';
import SubmitReportForm from '@/components/forms/SubmitReportForm';
import NewApplicationForm from '@/components/forms/NewApplicationForm';
import SearchOrganizationsForm from '@/components/forms/SearchOrganizationsForm';
import { toast } from '@/hooks/use-toast';
import { useStudentDashboard } from '@/lib/hooks/useStudents';
import { useCreateApplication, useStudentApplications } from '@/lib/hooks/useApplications';
import { useCreateReport } from '@/lib/hooks/useReports';
import dayjs from "dayjs";

const StudentDashboard = () => {
  const [progress, setProgress] = useState(0);
  const [showSubmitReportForm, setShowSubmitReportForm] = useState(false);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);

  const { mutateAsync: submitReport } = useCreateReport();
  const { mutateAsync: createApplication } = useCreateApplication();

  const { data: dashboardData, isLoading: dashboardLoading } = useStudentDashboard();
  const activeApplications = dashboardData?.applications || [];
  useEffect(() => {
    if (dashboardLoading || !dashboardData?.applications?.[0]) return;

    const app = dashboardData.applications[0];
    const start = dayjs(app.start_date);
    const end = dayjs(app.end_date);
    const today = dayjs();

    const totalDays = end.diff(start, "day");
    const daysPassed = today.diff(start, "day");

    const percentage = Math.min(
      100,
      Math.max(0, Math.round((daysPassed / totalDays) * 100))
    );

    setProgress(percentage);
  }, [dashboardLoading, dashboardData]);

  const handleSubmitReport = async (data: any) => {
    try {
      const reportData = {
        report_title: data.report_title,
        activities: data.activities,
        achievements: data.achievements,
        challenges: data.challenges,
        key_learnings: data.key_learnings,
        next_weeks_plans: data.next_week_plans,
        attachment_url: data.attachment_url,
        week_number: parseInt(data.week_number),
      };

      console.log("Submitting report data:", reportData);
      await submitReport(reportData);

      toast({
        title: "Success",
        description: "Report submitted successfully",
      });
      setShowSubmitReportForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit report",
        variant: "destructive",
      });
    }
  };


  const app = dashboardData?.applications?.[0];

  const handleNewApplication = async (data: any) => {
    try{
    const applicationData = {
      organization_id: data.organization_id,
      position: data.position,
      attachment_type: data.attachment_type,
      start_date: data.start_date,
      end_date: data.end_date,
      motivation: data.motivation,
      skills: data.skills,
      experience: data.experience,
      availability: data.availability
    };

    await createApplication(applicationData);
    setShowNewApplicationForm(false);

          toast({
        title: "Success",
        description: "Application submitted successfully",
      });}
    catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    }
  };

    if (dashboardLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const daysCompleted = app ? dayjs().diff(dayjs(app.start_date), "day") : 0;
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Student Dashboard"
          description="Welcome back! Here's your attachment progress overview."
          actionButton={{
            label: "Submit Report",
            icon: FileText,
            onClick: () => setShowSubmitReportForm(true)
          }}
        />

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-6 border rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))
          ) : (
            <>
              <StatsCard
                title="Active Applications"
                value={activeApplications?.length?.toString() || "0"}
                change="+1 from last month"
                icon={Building2}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Attachment Progress"
                value={dashboardData?.applications  ? `${progress}%` : "0%"}
                change={`${daysCompleted} days completed`}
                icon={Target}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Reports Submitted"
                value={dashboardData?.statistics ? `${dashboardData.statistics.totalReports}` : "0"}
                icon={FileText}
                iconColor="text-muted-foreground"
              />
              <StatsCard
                title="Overall Rating"
                value={dashboardData?.overallRating ? `${dashboardData.overallRating}/5` : "0/5"}
                change="Based on supervisor feedback"
                icon={User}
                iconColor="text-muted-foreground"
              />
            </>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Attachment</CardTitle>
                  <CardDescription>Your ongoing attachment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData?.applications ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold">{dashboardData.applications[0].organization_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{dashboardData.applications[0].position}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {new Date(dashboardData.applications[0].start_date).toLocaleDateString(

                            "en-KE" , {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )} -{" "}
                          {new Date(dashboardData.applications[0].end_date).toLocaleDateString(
                            "en-KE" , {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No active attachment found
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supervisors</CardTitle>
                  <CardDescription>Your assigned supervisors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData?.applications ? (
                    <>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">School Supervisor</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span>{dashboardData.applications[0].school_supervisor}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Host Supervisor</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-green-600" />
                          </div>
                          <span>{dashboardData.applications[0].host_supervisor}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No supervisor information available
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Application Status</CardTitle>
                    <CardDescription>Track your attachment applications</CardDescription>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => setShowSearchOrganizationsForm(true)} variant="outline">
                      <Search className="mr-2 h-4 w-4" />
                      Search Organizations
                    </Button>
                    <Button onClick={() => setShowNewApplicationForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Application
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardLoading ? (
                    // Loading skeleton
                    Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    ))
                  ) : activeApplications && activeApplications.length > 0 ? (
                    activeApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
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

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Progress Reports</CardTitle>
                    <CardDescription>Your submitted reports and feedback</CardDescription>
                  </div>
                  <Button onClick={() => setShowSubmitReportForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.reports && dashboardData.reports.length > 0 ? (
                    dashboardData.reports.map((report) => (
                      <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{report.report_title}</h4>
                          <p className="text-sm text-muted-foreground">Submitted: {new Date(report.created_at).toLocaleDateString()}</p>
                          {report.feedback && (
                            <p className="text-sm text-green-600">{report.feedback}</p>
                          )}
                        </div>
                        <Badge variant={report.status === 'Reviewed' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No reports found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Evaluations</CardTitle>
                <CardDescription>View your performance evaluations from supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Technical Skills</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Programming</span>
                          <span className="text-sm font-medium">4.5/5</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Communication</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Overall</span>
                          <span className="text-sm font-medium">4.0/5</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        {showSubmitReportForm && (
          <SubmitReportForm
            onClose={() => setShowSubmitReportForm(false)}
            onSubmit={handleSubmitReport}
          />
        )}

        {showNewApplicationForm && (
          <NewApplicationForm
            onClose={() => setShowNewApplicationForm(false)}
            onSubmit={handleNewApplication}
          />
        )}

        {showSearchOrganizationsForm && (
          <SearchOrganizationsForm
            onClose={() => setShowSearchOrganizationsForm(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;