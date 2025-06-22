
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, Star, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';

const Organizations = () => {
  const organizations = [
    {
      id: 1,
      name: 'Safaricom PLC',
      industry: 'Telecommunications',
      location: 'Nairobi',
      contactPerson: 'Jane Wanjiku',
      email: 'jane.wanjiku@safaricom.co.ke',
      phone: '+254700123456',
      activeStudents: 5,
      totalCapacity: 10,
      rating: 4.8,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Kenya Commercial Bank',
      industry: 'Banking',
      location: 'Nairobi',
      contactPerson: 'John Kamau',
      email: 'john.kamau@kcbgroup.com',
      phone: '+254700234567',
      activeStudents: 3,
      totalCapacity: 8,
      rating: 4.6,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Equity Bank',
      industry: 'Banking',
      location: 'Nairobi',
      contactPerson: 'Mary Akinyi',
      email: 'mary.akinyi@equitybank.co.ke',
      phone: '+254700345678',
      activeStudents: 2,
      totalCapacity: 6,
      rating: 4.5,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Microsoft Kenya',
      industry: 'Technology',
      location: 'Nairobi',
      contactPerson: 'Peter Ochieng',
      email: 'peter.ochieng@microsoft.com',
      phone: '+254700456789',
      activeStudents: 0,
      totalCapacity: 5,
      rating: 4.9,
      status: 'Pending'
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Pending': return 'secondary';
      case 'Inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const activeCount = organizations.filter(org => org.status === 'Active').length;
  const pendingCount = organizations.filter(org => org.status === 'Pending').length;
  const totalCapacity = organizations.reduce((sum, org) => sum + org.totalCapacity, 0);
  const totalActiveStudents = organizations.reduce((sum, org) => sum + org.activeStudents, 0);

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Partner Organizations"
          description="Manage partnership agreements and organization details"
          actionButton={{
            label: "Add Organization",
            icon: Plus,
            onClick: () => console.log('Add organization clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{organizations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{activeCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{totalCapacity}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((totalActiveStudents / totalCapacity) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Directory</CardTitle>
            <CardDescription>All partner organizations and their details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {organizations.map((org) => (
                <div key={org.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{org.name}</h3>
                        <Badge variant="secondary">{org.industry}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{org.rating}</span>
                      </div>
                      <Badge variant={getStatusVariant(org.status)}>
                        {org.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-muted-foreground">{org.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{org.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{org.location}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Capacity</p>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {org.activeStudents}/{org.totalCapacity} students
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Phone: {org.phone}
                    </p>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">
                        Manage Students
                      </Button>
                    </div>
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

export default Organizations;
