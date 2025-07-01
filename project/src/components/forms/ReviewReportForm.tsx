import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, X, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReviewReportFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  report: {
    id: number;
    studentName: string;
    title: string;
    submittedDate: string;
    content: {
      activities: string;
      achievements: string;
      challenges: string;
      learnings: string;
    };
  };
}

const ReviewReportForm = ({ onClose, onSubmit, report }: ReviewReportFormProps) => {
  const [reviewData, setReviewData] = useState({
    status: '',
    grade: '',
    feedback: '',
    recommendations: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewData.status || !reviewData.feedback) {
      toast({
        title: "Error",
        description: "Please provide status and feedback",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ ...reviewData, reportId: report.id });
    toast({
      title: "Success",
      description: "Report reviewed successfully",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Review Report</span>
              </CardTitle>
              <CardDescription>Review and provide feedback on student report</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Report Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{report.title}</h3>
                <Badge variant="secondary">Pending Review</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Student: {report.studentName} | Submitted: {report.submittedDate}
              </p>
            </div>

            {/* Report Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Report Content</h3>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Activities Completed</h4>
                  <p className="text-sm text-muted-foreground">{report.content.activities}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Key Achievements</h4>
                  <p className="text-sm text-muted-foreground">{report.content.achievements}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Challenges Faced</h4>
                  <p className="text-sm text-muted-foreground">{report.content.challenges}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Key Learnings</h4>
                  <p className="text-sm text-muted-foreground">{report.content.learnings}</p>
                </div>
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold">Review & Feedback</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Review Status *</Label>
                  <Select value={reviewData.status} onValueChange={(value) => setReviewData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Approved</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="needs-revision">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-yellow-600" />
                          <span>Needs Revision</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>Rejected</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade (Optional)</Label>
                  <Select value={reviewData.grade} onValueChange={(value) => setReviewData(prev => ({ ...prev, grade: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A - Excellent</SelectItem>
                      <SelectItem value="B">B - Good</SelectItem>
                      <SelectItem value="C">C - Satisfactory</SelectItem>
                      <SelectItem value="D">D - Needs Improvement</SelectItem>
                      <SelectItem value="F">F - Unsatisfactory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback *</Label>
                <Textarea
                  id="feedback"
                  value={reviewData.feedback}
                  onChange={(e) => setReviewData(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="Provide detailed feedback on the student's report..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={reviewData.recommendations}
                  onChange={(e) => setReviewData(prev => ({ ...prev, recommendations: e.target.value }))}
                  placeholder="Provide recommendations for improvement or next steps..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewReportForm;