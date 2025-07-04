import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MarkAttendanceFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const MarkAttendanceForm = ({ onClose, onSubmit }: MarkAttendanceFormProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students] = useState([
    { id: 1, name: 'Alice Wanjiku', studentId: '154789', present: true, checkIn: '08:30', checkOut: '17:00' },
    { id: 2, name: 'John Kamau', studentId: '154790', present: true, checkIn: '09:15', checkOut: '17:30' },
    { id: 3, name: 'Mary Akinyi', studentId: '154791', present: false, checkIn: '', checkOut: '' }
  ]);

  const [attendanceData, setAttendanceData] = useState(
    students.map(student => ({
      ...student,
      present: student.present,
      checkIn: student.checkIn,
      checkOut: student.checkOut,
      notes: ''
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date: selectedDate, attendance: attendanceData });
    toast({
      title: "Success",
      description: "Attendance marked successfully",
    });
    onClose();
  };

  const updateAttendance = (studentId: number, field: string, value: any) => {
    setAttendanceData(prev => prev.map(student => 
      student.id === studentId ? { ...student, [field]: value } : student
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Mark Attendance</span>
              </CardTitle>
              <CardDescription>Record student attendance for the day</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Student Attendance</h3>
              <div className="space-y-4">
                {attendanceData.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={student.present}
                            onCheckedChange={(checked) => updateAttendance(student.id, 'present', checked)}
                          />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs">Check In</Label>
                        <Input
                          type="time"
                          value={student.checkIn}
                          onChange={(e) => updateAttendance(student.id, 'checkIn', e.target.value)}
                          disabled={!student.present}
                          className="text-sm"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs">Check Out</Label>
                        <Input
                          type="time"
                          value={student.checkOut}
                          onChange={(e) => updateAttendance(student.id, 'checkOut', e.target.value)}
                          disabled={!student.present}
                          className="text-sm"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs">Status</Label>
                        <Select 
                          value={student.present ? 'present' : 'absent'} 
                          onValueChange={(value) => updateAttendance(student.id, 'present', value === 'present')}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="excused">Excused</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs">Notes</Label>
                        <Input
                          value={student.notes}
                          onChange={(e) => updateAttendance(student.id, 'notes', e.target.value)}
                          placeholder="Optional notes"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Attendance
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkAttendanceForm;