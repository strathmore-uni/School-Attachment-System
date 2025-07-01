import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Star, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CreateEvaluationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  studentName?: string;
}

const CreateEvaluationForm = ({ onClose, onSubmit, studentName }: CreateEvaluationFormProps) => {
  const [formData, setFormData] = useState({
    studentName: studentName || '',
    evaluationType: '',
    period: '',
    technicalSkills: [4],
    communication: [4],
    teamwork: [4],
    punctuality: [4],
    initiative: [4],
    problemSolving: [4],
    strengths: '',
    areasForImprovement: '',
    recommendations: '',
    overallComments: ''
  });

  const students = ['Alice Wanjiku', 'John Kamau', 'Mary Akinyi'];
  const evaluationTypes = ['Weekly Assessment', 'Monthly Review', 'Mid-term Evaluation', 'Final Evaluation'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.evaluationType) {
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
      description: "Evaluation created successfully",
    });
    onClose();
  };

  const renderRatingSlider = (label: string, value: number[], onChange: (value: number[]) => void) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">{value[0]}/5</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < value[0] ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        max={5}
        min={1}
        step={0.1}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Create Student Evaluation</span>
              </CardTitle>
              <CardDescription>Evaluate student performance and progress</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student *</Label>
                <Select 
                  value={formData.studentName} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, studentName: value }))}
                  disabled={!!studentName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student} value={student}>{student}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evaluationType">Evaluation Type *</Label>
                <Select value={formData.evaluationType} onValueChange={(value) => setFormData(prev => ({ ...prev, evaluationType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {evaluationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Evaluation Period</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                placeholder="e.g., Week 1-4, Month 1, etc."
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderRatingSlider('Technical Skills', formData.technicalSkills, (value) => setFormData(prev => ({ ...prev, technicalSkills: value })))}
                {renderRatingSlider('Communication', formData.communication, (value) => setFormData(prev => ({ ...prev, communication: value })))}
                {renderRatingSlider('Teamwork', formData.teamwork, (value) => setFormData(prev => ({ ...prev, teamwork: value })))}
                {renderRatingSlider('Punctuality', formData.punctuality, (value) => setFormData(prev => ({ ...prev, punctuality: value })))}
                {renderRatingSlider('Initiative', formData.initiative, (value) => setFormData(prev => ({ ...prev, initiative: value })))}
                {renderRatingSlider('Problem Solving', formData.problemSolving, (value) => setFormData(prev => ({ ...prev, problemSolving: value })))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detailed Feedback</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strengths">Key Strengths</Label>
                  <Textarea
                    id="strengths"
                    value={formData.strengths}
                    onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
                    placeholder="Highlight the student's key strengths and positive attributes..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
                  <Textarea
                    id="areasForImprovement"
                    value={formData.areasForImprovement}
                    onChange={(e) => setFormData(prev => ({ ...prev, areasForImprovement: e.target.value }))}
                    placeholder="Identify areas where the student can improve..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    value={formData.recommendations}
                    onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                    placeholder="Provide specific recommendations for the student's development..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overallComments">Overall Comments</Label>
                  <Textarea
                    id="overallComments"
                    value={formData.overallComments}
                    onChange={(e) => setFormData(prev => ({ ...prev, overallComments: e.target.value }))}
                    placeholder="Additional comments about the student's performance..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Evaluation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvaluationForm;