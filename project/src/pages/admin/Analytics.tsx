
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';

const Analytics = () => {
  const performanceMetrics = [
    { title: "Overall Completion Rate", value: 94, trend: "+2%", color: "bg-green-500" },
    { title: "Average Student Rating", value: 85, trend: "+5%", color: "bg-blue-500" },
    { title: "Organization Satisfaction", value: 92, trend: "+1%", color: "bg-purple-500" },
    { title: "Report Submission Rate", value: 88, trend: "+3%", color: "bg-yellow-500" }
  ];

  const attachmentTypes = [
    { type: "Work-Based Learning (WBL)", count: 68, percentage: 68 },
    { type: "Service-Based Learning (SBL)", count: 32, percentage: 32 }
  ];

  const topOrganizations = [
    { name: "Safaricom PLC", rating: 4.8, students: 45 },
    { name: "Kenya Commercial Bank", rating: 4.6, students: 32 },
    { name: "Equity Bank", rating: 4.5, students: 28 },
    { name: "Co-operative Bank", rating: 4.4, students: 24 }
  ];

  const monthlyData = [
    { month: "Jan", applications: 45, completions: 42 },
    { month: "Feb", applications: 52, completions: 48 },
    { month: "Mar", applications: 48, completions: 45 },
    { month: "Apr", applications: 61, completions: 58 },
    { month: "May", applications: 55, completions: 52 },
    { month: "Jun", applications: 67, completions: 63 }
  ];

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Analytics Dashboard"
          description="Comprehensive insights into the attachment system performance"
          actionButton={{
            label: "Export Report",
            icon: Download,
            onClick: () => console.log('Export report clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold">{metric.value}%</div>
                  <div className="text-sm text-green-600">{metric.trend}</div>
                </div>
                <Progress value={metric.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attachment Types Distribution</CardTitle>
              <CardDescription>Work-Based vs Service-Based Learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attachmentTypes.map((type, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{type.type}</span>
                      <span className="text-sm font-semibold">{type.percentage}%</span>
                    </div>
                    <Progress 
                      value={type.percentage} 
                      className="h-3"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Organizations</CardTitle>
              <CardDescription>Based on student feedback and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
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

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Application and completion trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="space-y-2">
                      <p className="text-xs font-medium">{data.month}</p>
                      <div className="space-y-1">
                        <div className="h-20 bg-blue-100 rounded flex items-end justify-center">
                          <div 
                            className="bg-blue-500 rounded-t w-full"
                            style={{ height: `${(data.applications / 70) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{data.applications}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span>Applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Completions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Uptime</span>
                  <span className="text-sm font-semibold text-green-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Sync</span>
                  <span className="text-sm font-semibold text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Status</span>
                  <span className="text-sm font-semibold text-green-600">Current</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">15 new applications today</p>
                <p className="text-muted-foreground">8 evaluations completed</p>
                <p className="text-muted-foreground">3 organizations approved</p>
                <p className="text-muted-foreground">12 reports submitted</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
