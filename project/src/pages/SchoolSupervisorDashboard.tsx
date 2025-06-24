
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import Layout from '@/components/Layout';

const SchoolSupervisorDashboard = () => {
  const supervisedStudents = [
    {
      id: 1,
      name: "Alice Wanjiku",
      studentId: "154789",
      organization: "Safaricom PLC",
      position: "Software Engineer Intern",
      startDate: "2024-07-01",
      progress: 75,
      lastReportDate: "2024-06-18",
      status: "Active",
      overallRating: 4.2
    },
    {
      id: 2,
      name: "John Kamau",
      studentId: "154790",
      organization: "Kenya Commercial Bank",
      position: "Business Analyst Intern",
      startDate: "2024-07-01",
      progress: 60,
      lastReportDate: "2024-06-15",
      status: "Active",
      overallRating: 3.8
    },
    {
      id: 3,
      name: "Mary Akinyi",
      studentId: "154791",
      organization: "Equity Bank",
      position: "IT Support Intern",
      startDate: "2024-07-01",
      progress: 45,
      lastReportDate: "2024-06-10",
      status: "Needs Attention",
      overallRating: 3.5
    }
  ];

  const recentReports = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      title: "Week 8 Progress Report",
      submittedDate: "2024-06-18",
      status: "Pending Review",
      priority: "Normal"
    },
    {
      id: 2,
      studentName: "John Kamau",
      title: "Week 7 Progress Report", 
      submittedDate: "2024-06-15",
      status: "Reviewed",
      priority: "Normal"
    },
    {
      id: 3,
      studentName: "Mary Akinyi",
      title: "Week 6 Progress Report",
      submittedDate: "2024-06-10",
      status: "Overdue",
      priority: "High"
    }
  ];

  const upcomingEvaluations = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      type: "Mid-term Evaluation",
      dueDate: "2024-06-25",
      organization: "Safaricom PLC"
    },
    {
      id: 2,
      studentName: "John Kamau",
      type: "Progress Review",
      dueDate: "2024-06-28",
      organization: "Kenya Commercial Bank"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Needs Attention':
        return 'destructive';
      case 'Reviewed':
        return 'default';
      case 'Pending Review':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Normal':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">School Supervisor Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor and evaluate your supervised students
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Create Evaluation
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supervised Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supervisedStudents.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentReports.filter(r => r.status === 'Pending Review').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need your review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">
                Overall student rating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Evaluations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvaluations.length}</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supervised Students</CardTitle>
                <CardDescription>Students under your supervision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supervisedStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Organization</p>
                          <p className="text-sm text-muted-foreground">{student.organization}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Position</p>
                          <p className="text-sm text-muted-foreground">{student.position}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Overall Rating</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-semibold">{student.overallRating}/5</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(student.overallRating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-muted-foreground">
                          Last report: {student.lastReportDate}
                        </p>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          <Button size="sm">
                            Evaluate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Reports</CardTitle>
                <CardDescription>Progress reports requiring your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{report.studentName}</h4>
                          <span className={`text-xs ${getPriorityColor(report.priority)}`}>
                            {report.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted: {report.submittedDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={getStatusBadgeVariant(report.status)}>
                          {report.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Evaluations</CardTitle>
                <CardDescription>Scheduled evaluations for your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvaluations.map((evaluation) => (
                    <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{evaluation.studentName}</h4>
                        <p className="text-sm text-muted-foreground">{evaluation.type}</p>
                        <p className="text-xs text-muted-foreground">
                          Organization: {evaluation.organization}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Due: {evaluation.dueDate}</p>
                        <Button size="sm" className="mt-2">
                          Start Evaluation
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance Trends</CardTitle>
                  <CardDescription>Average performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Technical Skills</span>
                      <span className="font-semibold">4.3/5</span>
                    </div>
                    <Progress value={86} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Communication</span>
                      <span className="font-semibold">4.1/5</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Professional Behavior</span>
                      <span className="font-semibold">4.5/5</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Submission Stats</CardTitle>
                  <CardDescription>Student report submission patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>On Time</span>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Late</span>
                      <span className="font-semibold text-yellow-600">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Missing</span>
                      <span className="font-semibold text-red-600">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SchoolSupervisorDashboard;
