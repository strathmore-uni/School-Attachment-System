import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SubmitReportFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const SubmitReportForm = ({ onClose, onSubmit }: SubmitReportFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    week: '',
    activities: '',
    achievements: '',
    challenges: '',
    learnings: '',
    nextWeekPlans: '',
    attachments: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.week || !formData.activities) {
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
      description: "Report submitted successfully",
    });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Submit Progress Report</span>
              </CardTitle>
              <CardDescription>Submit your weekly progress report</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Week 8 Progress Report"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="week">Week Number *</Label>
                <Select value={formData.week} onValueChange={(value) => setFormData(prev => ({ ...prev, week: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>Week {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activities">Activities Completed *</Label>
              <Textarea
                id="activities"
                value={formData.activities}
                onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
                placeholder="Describe the activities you completed this week..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
                placeholder="List your key achievements and accomplishments..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges Faced</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                placeholder="Describe any challenges you encountered..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnings">Key Learnings</Label>
              <Textarea
                id="learnings"
                value={formData.learnings}
                onChange={(e) => setFormData(prev => ({ ...prev, learnings: e.target.value }))}
                placeholder="What did you learn this week?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextWeekPlans">Next Week Plans</Label>
              <Textarea
                id="nextWeekPlans"
                value={formData.nextWeekPlans}
                onChange={(e) => setFormData(prev => ({ ...prev, nextWeekPlans: e.target.value }))}
                placeholder="What do you plan to work on next week?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload files or drag and drop</span>
                  <span className="text-xs text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</span>
                </label>
              </div>
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReportForm;