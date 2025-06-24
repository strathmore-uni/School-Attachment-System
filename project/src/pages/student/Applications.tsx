
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Building2, Calendar, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import ApplicationCard from '@/components/ApplicationCard';

const Applications = () => {
  const applications = [
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
    },
    {
      id: 3,
      organization: 'Equity Bank',
      position: 'Customer Service Intern',
      status: 'Pending Review',
      appliedDate: '2024-06-08',
      type: 'SBL'
    }
  ];

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="My Applications"
          description="Track your attachment applications and their status"
          actionButton={{
            label: "New Application",
            icon: Plus,
            onClick: () => console.log('New application clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {applications.filter(app => app.status === 'Approved').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'Under Review').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application History</CardTitle>
            <CardDescription>Your submitted attachment applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Applications;
