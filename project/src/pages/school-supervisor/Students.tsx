import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Star, TrendingUp, UserPlus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import AddStudentForm from '@/components/forms/AddStudentForm';
import CreateEvaluationForm from '@/components/forms/CreateEvaluationForm';

const Students = () => {
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showCreateEvaluationForm, setShowCreateEvaluationForm] = useState(false);
  const [selectedStudentForEvaluation, setSelectedStudentForEvaluation] = useState('');

  const students = [
    {
      id: 1,
      name: "Alice Wanjiku",
      studentId: "154789",
      organization: "Safaricom PLC",
      position: "Software Engineer Intern",
      startDate: "2024-07-01",
      progress: 75,
      lastReportDate: "2024-06-18",
      status: "Active",
      overallRating: 4.2
    },
    {
      id: 2,
      name: "John Kamau",
      studentId: "154790",
      organization: "Kenya Commercial Bank",
      position: "Business Analyst Intern",
      startDate: "2024-07-01",
      progress: 60,
      lastReportDate: "2024-06-15",
      status: "Active",
      overallRating: 3.8
    },
    {
      id: 3,
      name: "Mary Akinyi",
      studentId: "154791",
      organization: "Equity Bank",
      position: "IT Support Intern",
      startDate: "2024-07-01",
      progress: 45,
      lastReportDate: "2024-06-10",
      status: "Needs Attention",
      overallRating: 3.5
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Needs Attention': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleAddStudent = (data: any) => {
    console.log('Student added:', data);
  };

  const handleCreateEvaluation = (data: any) => {
    console.log('Evaluation created:', data);
  };

  const handleEvaluateStudent = (studentName: string) => {
    setSelectedStudentForEvaluation(studentName);
    setShowCreateEvaluationForm(true);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="My Students"
          description="Monitor and evaluate your supervised students"
          actionButton={{
            label: "Add Student",
            icon: UserPlus,
            onClick: () => setShowAddStudentForm(true)
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{students.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {students.filter(s => s.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Attention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {students.filter(s => s.status === 'Needs Attention').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>All students under your supervision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {students.map((student) => (
                <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Organization</p>
                      <p className="text-sm text-muted-foreground">{student.organization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Position</p>
                      <p className="text-sm text-muted-foreground">{student.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Overall Rating</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-semibold">{student.overallRating}/5</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(student.overallRating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Last report: {student.lastReportDate}
                    </p>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" onClick={() => handleEvaluateStudent(student.name)}>
                        Evaluate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forms */}
        {showAddStudentForm && (
          <AddStudentForm
            onClose={() => setShowAddStudentForm(false)}
            onSubmit={handleAddStudent}
          />
        )}

        {showCreateEvaluationForm && (
          <CreateEvaluationForm
            onClose={() => {
              setShowCreateEvaluationForm(false);
              setSelectedStudentForEvaluation('');
            }}
            onSubmit={handleCreateEvaluation}
            studentName={selectedStudentForEvaluation}
          />
        )}
      </div>
    </Layout>
  );
};

export default Students;