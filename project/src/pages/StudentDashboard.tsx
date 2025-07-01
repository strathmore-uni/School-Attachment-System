import { useState } from 'react';
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

const StudentDashboard = () => {
  const [showSubmitReportForm, setShowSubmitReportForm] = useState(false);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);

  const [activeApplications] = useState([
    {
      id: 1,
      organization: 'Kenya Commercial Bank',
      position: 'IT Intern',
      status: 'Under Review',
      appliedDate: '2024-06-15',
      type: 'SBL'
    },
    {
      id: 2,
      organization: 'Safaricom PLC',
      position: 'Software Development Intern',
      status: 'Approved',
      appliedDate: '2024-06-10',
      type: 'WBL'
    }
  ]);

  const [currentAttachment] = useState({
    organization: 'Safaricom PLC',
    position: 'Software Development Intern',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    progress: 65,
    schoolSupervisor: 'Dr. Jane Wanjiku',
    hostSupervisor: 'John Kamau',
    reportsSubmitted: 8,
    totalReports: 12
  });

  const [recentReports] = useState([
    {
      id: 1,
      title: 'Week 8 Progress Report',
      submittedDate: '2024-06-18',
      status: 'Reviewed',
      feedback: 'Excellent progress on mobile app development'
    },
    {
      id: 2,
      title: 'Week 7 Progress Report',
      submittedDate: '2024-06-11',
      status: 'Reviewed',
      feedback: 'Good understanding of React Native concepts'
    },
    {
      id: 3,
      title: 'Week 6 Progress Report',
      submittedDate: '2024-06-04',
      status: 'Pending Review',
      feedback: null
    }
  ]);

  const daysCompleted = Math.round((new Date().getTime() - new Date(currentAttachment.startDate).getTime()) / (1000 * 60 * 60 * 24));

  const handleSubmitReport = (data: any) => {
    console.log('Report submitted:', data);
  };

  const handleNewApplication = (data: any) => {
    console.log('Application submitted:', data);
  };

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
          <StatsCard
            title="Active Applications"
            value={activeApplications.length.toString()}
            change="+1 from last month"
            icon={Building2}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Attachment Progress"
            value={`${currentAttachment.progress}%`}
            change={`${daysCompleted} days completed`}
            icon={Target}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Reports Submitted"
            value={`${currentAttachment.reportsSubmitted}/${currentAttachment.totalReports}`}
            change={`${currentAttachment.totalReports - currentAttachment.reportsSubmitted} remaining`}
            icon={FileText}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Overall Rating"
            value="4.2/5"
            change="Based on supervisor feedback"
            icon={User}
            iconColor="text-muted-foreground"
          />
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
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">{currentAttachment.organization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{currentAttachment.position}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{currentAttachment.startDate} - {currentAttachment.endDate}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{currentAttachment.progress}%</span>
                    </div>
                    <Progress value={currentAttachment.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supervisors</CardTitle>
                  <CardDescription>Your assigned supervisors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">School Supervisor</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>{currentAttachment.schoolSupervisor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Host Supervisor</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{currentAttachment.hostSupervisor}</span>
                    </div>
                  </div>
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
                  {activeApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
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
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">Submitted: {report.submittedDate}</p>
                        {report.feedback && (
                          <p className="text-sm text-green-600">{report.feedback}</p>
                        )}
                      </div>
                      <Badge variant={report.status === 'Reviewed' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </div>
                  ))}
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