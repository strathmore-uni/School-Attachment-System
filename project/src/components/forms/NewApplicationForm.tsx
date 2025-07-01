import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NewApplicationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const NewApplicationForm = ({ onClose, onSubmit }: NewApplicationFormProps) => {
  const [formData, setFormData] = useState({
    organization: '',
    position: '',
    attachmentType: '',
    startDate: '',
    endDate: '',
    motivation: '',
    skills: '',
    experience: '',
    availability: ''
  });

  const organizations = [
    'Safaricom PLC',
    'Kenya Commercial Bank',
    'Equity Bank',
    'Co-operative Bank',
    'Microsoft Kenya',
    'IBM Kenya'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organization || !formData.position || !formData.attachmentType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Success",
      description: "Application submitted successfully",
    });
    onClose();
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
              <Select value={formData.organization} onValueChange={(value) => setFormData(prev => ({ ...prev, organization: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position/Department *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="e.g., Software Development, Marketing, Finance"
              />
            </div>

            <div className="space-y-2">
              <Label>Attachment Type *</Label>
              <RadioGroup 
                value={formData.attachmentType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, attachmentType: value }))}
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
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Preferred End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation Letter</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="Why do you want to work at this organization?"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Relevant Skills</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder="List your relevant skills and competencies..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Previous Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Describe any relevant experience or projects..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Textarea
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                placeholder="Specify your availability (days, hours, etc.)"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
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