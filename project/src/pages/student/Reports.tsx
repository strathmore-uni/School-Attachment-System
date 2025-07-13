import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Clock, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import SubmitReportForm from '@/components/forms/SubmitReportForm';
import { useCreateReport } from '@/lib/hooks/useReports';
import { toast } from '@/hooks/use-toast';
import { useStudentDashboard } from '@/lib/hooks/useStudents';

const Reports = () => {
  const [showSubmitReportForm, setShowSubmitReportForm] = useState(false);
    const { data: dashboardData, isLoading: dashboardLoading } = useStudentDashboard();
  const { mutateAsync: submitReport } = useCreateReport();

  const reports = dashboardData?.reports || [];


  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Reviewed': return 'default';
      case 'Pending Review': return 'secondary';
      default: return 'secondary';
    }
  };

  async function handleSubmitReport(data: any) {
    try {
      const reportData = {
        report_title: data.report_title,
        content: data.content,
        activities: data.activities,
        achievements: data.achievements,
        challenges: data.challenges,
        key_learnings: data.key_learnings,
        next_weeks_plans: data.next_week_plans,
        attachment_url: data.attachment_url,
        week_number: parseInt(data.week_number)
      };

      console.log("Submitting report data:", reportData);

      await submitReport(reportData);
      setShowSubmitReportForm(false);
      toast({
        title: "Success",
        description: "Report submitted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit report",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Progress Reports"
          description="Submit and track your weekly progress reports"
          actionButton={{
            label: "Submit Report",
            icon: Plus,
            onClick: () => setShowSubmitReportForm(true)
          }}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{reports.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {reports.filter(report => report.status === 'reviewed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {reports.filter(report => report.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
            <CardDescription>View all your submitted progress reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{report.report_title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Submitted: {new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {report.feedback && (
                      <p className="text-sm text-green-600">{report.feedback}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusVariant(report.status)}>
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forms */}
        {showSubmitReportForm && (
          <SubmitReportForm
            onClose={() => setShowSubmitReportForm(false)}
            onSubmit={handleSubmitReport}
          />
        )}
      </div>
    </Layout>
  );
};

export default Reports;