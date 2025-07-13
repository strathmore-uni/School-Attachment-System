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
import { useCreateApplication } from '@/lib/hooks/useApplications';
import { toast } from '@/hooks/use-toast';
import { useStudentDashboard } from '@/lib/hooks/useStudents';

const Applications = () => {
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);
  const{mutateAsync: createApplication} = useCreateApplication();
  const { data: dashboardData, isLoading: dashboardLoading } = useStudentDashboard();

  const applications = dashboardData?.applications || [];

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
    });
  } catch (error: any) {
    toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    }
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
                {applications.filter(app => app.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'review').length}
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