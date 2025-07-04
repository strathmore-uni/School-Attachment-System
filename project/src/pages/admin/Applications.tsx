import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, CheckCircle, XCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import ApplicationCard from '@/components/ApplicationCard';

const Applications = () => {
  const applications = [
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
    },
    {
      id: 4,
      studentName: "Peter Ochieng",
      organization: "Co-operative Bank",
      position: "Customer Service Intern",
      status: "Pending Review",
      submittedDate: "2024-06-15",
      type: "SBL"
    }
  ];

  const handleReview = (id: number) => {
    console.log('Reviewing application:', id);
  };

  const handleApprove = (id: number) => {
    console.log('Approving application:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejecting application:', id);
  };

  const handleViewAll = () => {
    console.log('View all applications');
  };

  const pendingCount = applications.filter(app => app.status === 'Pending Review').length;
  const approvedCount = applications.filter(app => app.status === 'Approved').length;
  const underReviewCount = applications.filter(app => app.status === 'Under Review').length;

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Application Management"
          description="Review and manage student attachment applications"
          actionButton={{
            label: "View All",
            icon: Eye,
            onClick: handleViewAll
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
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
              <CardTitle className="text-lg">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{underReviewCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest attachment applications requiring review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="p-4 border rounded-lg">
                  <ApplicationCard
                    application={application}
                    showReviewButton={true}
                    onReview={handleReview}
                  />
                  {application.status === 'Pending Review' && (
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" onClick={() => handleApprove(application.id)}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(application.id)}>
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Applications;