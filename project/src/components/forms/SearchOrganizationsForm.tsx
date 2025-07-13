import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MapPin,
  Users,
  Star,
  X,
  Building2
} from 'lucide-react';
import { useOrganizations } from '@/lib/hooks/useDashboard';

interface SearchOrganizationsFormProps {
  onClose: () => void;
}

const getRandomRating = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

const SearchOrganizationsForm = ({ onClose }: SearchOrganizationsFormProps) => {
  const { data: organizationsData = [] } = useOrganizations();
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    industry: '',
    location: '',
    minRating: ''
  });

  const industries = ['All Industries', 'Banking', 'Technology', 'Telecommunications', 'Healthcare', 'Manufacturing'];
  const locations = ['All Locations', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];

  const filteredOrganizations = useMemo(() => {
    return organizationsData
      .map((org) => {
        const approved = parseInt(String(org.approved_applications || '0'), 10);
        const capacity = org.capacity || 0;
        const availablePositions = Math.max(capacity - approved, 0);
        const rating = org.rating ?? getRandomRating();

        return {
          ...org,
          availablePositions,
          rating
        };
      })
      .filter((org) => {
        const matchesName = searchFilters.name
          ? org.name.toLowerCase().includes(searchFilters.name.toLowerCase())
          : true;
        const matchesIndustry = searchFilters.industry && searchFilters.industry !== 'All Industries'
          ? org.industry?.toLowerCase().includes(searchFilters.industry.toLowerCase())
          : true;
        const matchesLocation = searchFilters.location && searchFilters.location !== 'All Locations'
          ? org.location?.toLowerCase().includes(searchFilters.location.toLowerCase())
          : true;
        const matchesRating = searchFilters.minRating
          ? org.rating >= parseFloat(searchFilters.minRating)
          : true;

        return matchesName && matchesIndustry && matchesLocation && matchesRating;
      });
  }, [organizationsData, searchFilters]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Organizations</span>
              </CardTitle>
              <CardDescription>Find the perfect organization for your attachment</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={searchFilters.name}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Search by name..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={searchFilters.industry}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={searchFilters.location}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Min Rating</Label>
                <Select
                  value={searchFilters.minRating}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, minRating: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Min rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Search Results ({filteredOrganizations.length})</h3>
              <div className="grid gap-4">
                {filteredOrganizations.map((org) => (
                  <div key={org.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{org.name}</h4>
                          <Badge variant="secondary">{org.industry}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{org.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{org.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{org.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{org.availablePositions} positions available</span>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchOrganizationsForm;
