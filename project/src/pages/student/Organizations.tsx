import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, Star, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import SearchOrganizationsForm from '@/components/forms/SearchOrganizationsForm';
import { useOrganizations } from '@/lib/hooks/useDashboard';

const Organizations = () => {
  const [showSearchOrganizationsForm, setShowSearchOrganizationsForm] = useState(false);
  const { data: organizationsData, isLoading: organizationsLoading } = useOrganizations();

  const organizations = Array.isArray(organizationsData)
    ? organizationsData.map((org) => {
        const approved = parseInt(String(org.approved_applications || '0'));
        const capacity = org.capacity || 0;
        const available_positions = Math.max(capacity - approved, 0);

        return {
          ...org,
          approved_applications: approved,
          available_positions,
          rating: org.rating ?? 4.0, // default rating if undefined or null
        };
      })
    : [];

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Partner Organizations"
          description="Browse available attachment opportunities with our partner organizations"
          actionButton={{
            label: "Search Organizations",
            icon: Search,
            onClick: () => setShowSearchOrganizationsForm(true),
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{organizations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {organizations.reduce((sum, org) => sum + org.available_positions, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {new Set(organizations.map((org) => org.industry || 'Other')).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {(
                  organizations.reduce((sum, org) => sum + (org.rating ?? 4.0), 0) /
                  organizations.length
                ).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Organizations</CardTitle>
            <CardDescription>
              Partner organizations offering attachment positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {organizations.map((org) => (
                <div key={org.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{org.name}</h3>
                        {org.industry && <Badge variant="secondary">{org.industry}</Badge>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{org.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{org.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{org.available_positions} positions available</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {showSearchOrganizationsForm && (
          <SearchOrganizationsForm onClose={() => setShowSearchOrganizationsForm(false)} />
        )}
      </div>
    </Layout>
  );
};

export default Organizations;
