import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import AddStudentForm from '@/components/forms/AddStudentForm';

const Students = () => {
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const students = [
    {
      id: 1,
      name: "Alice Wanjiku",
      studentId: "154789",
      email: "alice.wanjiku@student.strathmore.edu",
      course: "Bachelor of Business Information Technology",
      year: 3,
      status: "Active",
      organization: "Safaricom PLC",
      supervisor: "Dr. Jane Wanjiku"
    },
    {
      id: 2,
      name: "John Kamau",
      studentId: "154790",
      email: "john.kamau@student.strathmore.edu",
      course: "Bachelor of Commerce",
      year: 3,
      status: "Active",
      organization: "Kenya Commercial Bank",
      supervisor: "Prof. Peter Mburu"
    },
    {
      id: 3,
      name: "Mary Akinyi",
      studentId: "154791",
      email: "mary.akinyi@student.strathmore.edu",
      course: "Bachelor of Information Technology",
      year: 4,
      status: "Inactive",
      organization: "Equity Bank",
      supervisor: "Dr. Sarah Muthoni"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const activeCount = students.filter(s => s.status === 'Active').length;
  const inactiveCount = students.filter(s => s.status === 'Inactive').length;

  const handleAddStudent = (data: any) => {
    console.log('Student added:', data);
  };

  const handleViewProfile = (id: number) => {
    console.log('View profile for student:', id);
  };

  const handleEditStudent = (id: number) => {
    console.log('Edit student:', id);
  };

  const handleAssignStudent = (id: number) => {
    console.log('Assign student:', id);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Student Management"
          description="Manage all students in the attachment system"
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
              <div className="text-3xl font-bold text-green-600">{activeCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{inactiveCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {new Set(students.map(s => s.course)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Directory</CardTitle>
            <CardDescription>Complete list of registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <Badge variant={getStatusVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Course</p>
                      <p className="text-sm text-muted-foreground">{student.course}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Year</p>
                      <p className="text-sm text-muted-foreground">Year {student.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization</p>
                      <p className="text-sm text-muted-foreground">{student.organization || 'Not assigned'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Supervisor: {student.supervisor || 'Not assigned'}
                    </p>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile(student.id)}>
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditStudent(student.id)}>
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => handleAssignStudent(student.id)}>
                        Assign
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
      </div>
    </Layout>
  );
};

export default Students;