import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, X } from 'lucide-react';
import { useCreateApplication } from '@/lib/hooks/useApplications';
import { useOrganizations } from '@/lib/hooks/useDashboard';
import { toast } from '@/hooks/use-toast';

interface NewApplicationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const NewApplicationForm = ({ onClose, onSubmit }: NewApplicationFormProps) => {
  const [formData, setFormData] = useState({
    organization_id: '',
    position: '',
    attachment_type: '',
    start_date: '',
    end_date: '',
    motivation: '',
    skills: '',
    experience: '',
    availability: ''
  });

  // API hooks

  const { data: organizations = [], isLoading: organizationsLoading } = useOrganizations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organization_id || !formData.position || !formData.attachment_type) {
            toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      onSubmit(formData);
      onClose();
    } catch (error: any) {
      console.error("Error creating application:", error);
      alert(error.message || "Failed to create application");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>New Attachment Application</span>
              </CardTitle>
              <CardDescription>Apply for an attachment position</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization *</Label>
              <Select value={formData.organization_id} onValueChange={(value) => setFormData(prev => ({ ...prev, organization_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizationsLoading ? (
                    <SelectItem value="loading" disabled>Loading organizations...</SelectItem>
                  ) : organizations && organizations.length > 0 ? (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={String(org.id)}>{org.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="finished" disabled>No organizations available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position/Department *</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="e.g., Software Development, Marketing, Finance"
                autoComplete="organization-title"
              />
            </div>

            <div className="space-y-2">
              <Label>Attachment Type *</Label>
              <RadioGroup 
                value={formData.attachment_type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, attachment_type: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="WBL" id="wbl" />
                  <Label htmlFor="wbl">Work-Based Learning (WBL)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SBL" id="sbl" />
                  <Label htmlFor="sbl">Service-Based Learning (SBL)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Preferred Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Preferred End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation Letter</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="Why do you want to work at this organization?"
                rows={4}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Relevant Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder="List your relevant skills and competencies..."
                rows={3}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Previous Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Describe any relevant experience or projects..."
                rows={3}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                placeholder="Specify your availability (days, hours, etc.)"
                rows={2}
                autoComplete="off"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" >
               Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewApplicationForm;