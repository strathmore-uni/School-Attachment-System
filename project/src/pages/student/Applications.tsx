import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Building2, Calendar, Plus, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import ApplicationCard from '@/components/ApplicationCard';
import NewApplicationForm from '@/components/forms/NewApplicationForm';
import SearchOrganizationsForm from '@/components/forms/SearchOrganizationsForm';

const Applications = () => {
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);

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

  const handleNewApplication = (data: any) => {
    console.log('New application:', data);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="My Applications"
          description="Track your attachment applications and their status"
          actionButton={{
            label: "New Application",
            icon: Plus,
            onClick: () => setShowNewApplicationForm(true)
          }}
        />

        <div className="flex space-x-2 mb-4">
          <Button variant="outline" onClick={() => setShowSearchOrganizationsForm(true)}>
            <Search className="mr-2 h-4 w-4" />
            Search Organizations
          </Button>
        </div>

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

        {/* Forms */}
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

export default Applications;