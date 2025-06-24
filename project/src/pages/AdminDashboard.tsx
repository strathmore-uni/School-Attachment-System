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
  Plus
} from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/StatsCard';
import ApplicationCard from '@/components/ApplicationCard';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Attachments",
      value: "456",
      change: "+8%",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Partner Organizations",
      value: "89",
      change: "+3%",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      organization: "Safaricom PLC",
      position: "Software Engineer Intern",
      status: "Pending Review",
      submittedDate: "2024-06-18",
      type: "WBL"
    },
    {
      id: 2,
      studentName: "John Kamau",
      organization: "Kenya Commercial Bank",
      position: "Business Analyst Intern",
      status: "Approved",
      submittedDate: "2024-06-17",
      type: "SBL"
    },
    {
      id: 3,
      studentName: "Mary Akinyi",
      organization: "Equity Bank",
      position: "IT Support Intern",
      status: "Under Review",
      submittedDate: "2024-06-16",
      type: "WBL"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "15 students have pending report submissions",
      timestamp: "2024-06-18 09:30"
    },
    {
      id: 2,
      type: "info",
      message: "New organization partnership request from Microsoft Kenya",
      timestamp: "2024-06-18 08:15"
    },
    {
      id: 3,
      type: "success",
      message: "Monthly evaluation reports generated successfully",
      timestamp: "2024-06-17 16:45"
    }
  ];

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

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Administrator Dashboard"
          description="Manage and monitor the attachment system"
          actionButton={{
            label: "Add Organization",
            icon: Plus,
            onClick: () => console.log('Add organization clicked')
          }}
        />

        <div className="flex space-x-2 mb-4">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              iconColor={stat.color}
            />
          ))}
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Recent Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest attachment applications requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      showReviewButton={true}
                      onReview={handleReview}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attachment Types Distribution</CardTitle>
                  <CardDescription>Work-Based vs Service-Based Learning</CardDescription>
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
