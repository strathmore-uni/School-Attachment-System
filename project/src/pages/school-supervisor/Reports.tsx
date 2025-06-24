
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';

const Reports = () => {
  const reportStats = [
    { title: "Technical Skills", average: 4.3, progress: 86 },
    { title: "Communication", average: 4.1, progress: 82 },
    { title: "Professional Behavior", average: 4.5, progress: 90 },
    { title: "Time Management", average: 3.9, progress: 78 }
  ];

  const studentReports = [
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Reviewed': return 'default';
      case 'Pending Review': return 'secondary';
      case 'Overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Normal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Reports & Analytics"
          description="View student performance reports and analytics"
          actionButton={{
            label: "Generate Report",
            icon: Download,
            onClick: () => console.log('Generate report clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {studentReports.filter(r => r.status === 'Pending Review').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overdue Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {studentReports.filter(r => r.status === 'Overdue').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {studentReports.filter(r => r.status === 'Reviewed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {(reportStats.reduce((sum, stat) => sum + stat.average, 0) / reportStats.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Average student performance across key areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stat.title}</span>
                      <span className="text-sm font-semibold">{stat.average}/5</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                ))}
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
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Student Reports</CardTitle>
            <CardDescription>Latest reports requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentReports.map((report) => (
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
      </div>
    </Layout>
  );
};

export default Reports;
