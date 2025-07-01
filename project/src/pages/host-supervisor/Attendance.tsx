import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import MarkAttendanceForm from '@/components/forms/MarkAttendanceForm';

const Attendance = () => {
  const [showMarkAttendanceForm, setShowMarkAttendanceForm] = useState(false);

  const todayAttendance = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      checkIn: "08:30",
      checkOut: "17:00",
      status: "Present",
      hoursWorked: 8.5
    },
    {
      id: 2,
      studentName: "John Kamau",
      checkIn: "09:15",
      checkOut: "17:30",
      status: "Present",
      hoursWorked: 8.25
    },
    {
      id: 3,
      studentName: "Mary Akinyi",
      checkIn: "08:45",
      checkOut: "16:45",
      status: "Present",
      hoursWorked: 8.0
    }
  ];

  const weeklyAttendance = [
    { day: "Monday", present: 3, absent: 0, late: 0 },
    { day: "Tuesday", present: 2, absent: 1, late: 0 },
    { day: "Wednesday", present: 3, absent: 0, late: 1 },
    { day: "Thursday", present: 3, absent: 0, late: 0 },
    { day: "Friday", present: 3, absent: 0, late: 0 },
  ];

  const presentToday = todayAttendance.filter(a => a.status === 'Present').length;
  const totalStudents = todayAttendance.length;

  const handleMarkAttendance = (data: any) => {
    console.log('Attendance marked:', data);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Attendance Management"
          description="Track and manage student attendance records"
          actionButton={{
            label: "Mark Attendance",
            icon: Plus,
            onClick: () => setShowMarkAttendanceForm(true)
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {presentToday}/{totalStudents}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round((presentToday / totalStudents) * 100)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {(todayAttendance.reduce((sum, a) => sum + a.hoursWorked, 0) / todayAttendance.length).toFixed(1)}h
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Late Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {todayAttendance.filter(a => a.checkIn > "09:00").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Student check-in and check-out records for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{record.studentName}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm">In: {record.checkIn}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Out: {record.checkOut}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Hours: {record.hoursWorked}
                        </span>
                      </div>
                    </div>
                    <Badge variant="default">{record.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
              <CardDescription>Attendance summary for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyAttendance.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">{day.day}</div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{day.present}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{day.absent}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{day.late}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms */}
        {showMarkAttendanceForm && (
          <MarkAttendanceForm
            onClose={() => setShowMarkAttendanceForm(false)}
            onSubmit={handleMarkAttendance}
          />
        )}
      </div>
    </Layout>
  );
};

export default Attendance;