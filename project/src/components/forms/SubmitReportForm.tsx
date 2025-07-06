import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCreateReport } from '@/lib/hooks/useReports';

interface SubmitReportProps {
  onClose: () => void;
  onSubmit: (data: {
    report_title: string;
    week_number: string;
    activities: string;
    achievements: string;
    challenges: string;
    key_learnings: string;
    next_week_plans: string;
    attachment_url: string;
  }) => void;
}

const SubmitReportForm = ({ onClose, onSubmit }: SubmitReportProps) => {
  const [formData, setFormData] = useState({
    report_title: '',
    week_number: '',
    activities: '',
    achievements: '',
    challenges: '',
    key_learnings: '',
    next_weeks_plans: '',
    attachment_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.report_title || !formData.week_number || !formData.activities) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Call the onSubmit prop with the data
      onSubmit({
        report_title: formData.report_title,
        week_number: formData.week_number,
        activities: formData.activities,
        achievements: formData.achievements,
        challenges: formData.challenges,
        key_learnings: formData.key_learnings,
        next_week_plans: formData.next_weeks_plans,
        attachment_url: formData.attachment_url,
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit report",
        variant: "destructive",
      });
    }
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData(prev => ({
  //       ...prev,
  //       attachments: [...prev.attachments, ...Array.from(e.target.files!)]
  //     }));
  //   }
  // };

  // const removeFile = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     attachments: prev.attachments.filter((_, i) => i !== index)
  //   }));
  // };

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
                <Label htmlFor="report_title">Report Title *</Label>
                <Input
                  id="report_title"
                  value={formData.report_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, report_title: e.target.value }))}
                  placeholder="e.g., Week 8 Progress Report"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="week_number">Week Number *</Label>
                <Select value={formData.week_number} onValueChange={(value) => setFormData(prev => ({ ...prev, week_number: value }))}>
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
              <Label htmlFor="key_learnings">Key Learnings</Label>
              <Textarea
                id="key_learnings"
                value={formData.key_learnings}
                onChange={(e) => setFormData(prev => ({ ...prev, key_learnings: e.target.value }))}
                placeholder="What did you learn this week?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next_weeks_plans">Next Week Plans</Label>
              <Textarea
                id="next_weeks_plans"
                value={formData.next_weeks_plans}
                onChange={(e) => setFormData(prev => ({ ...prev, next_weeks_plans: e.target.value }))}
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
                  // onChange={handleFileUpload}
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
              {/* {formData.attachments.length > 0 && (
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
              )} */}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                "Submit Report"
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReportForm;
