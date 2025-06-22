
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Student {
  id: number;
  name: string;
  studentId: string;
  department: string;
  position: string;
  startDate: string;
  attendanceRate: number;
  status: string;
  lastCheckIn?: string;
  totalDays?: number;
  presentDays?: number;
}

interface StudentCardProps {
  student: Student;
  showAttendanceDetails?: boolean;
  onViewDetails?: (id: number) => void;
  onEvaluate?: (id: number) => void;
}

const StudentCard = ({ student, showAttendanceDetails = false, onViewDetails, onEvaluate }: StudentCardProps) => {
  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold">{student.name}</h4>
          <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
        </div>
        <Badge variant="default">{student.status}</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium">Department</p>
          <p className="text-sm text-muted-foreground">{student.department}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Position</p>
          <p className="text-sm text-muted-foreground">{student.position}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Start Date</p>
          <p className="text-sm text-muted-foreground">{student.startDate}</p>
        </div>
      </div>

      {showAttendanceDetails && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium">Attendance Rate</p>
            <p className={`text-lg font-semibold ${getAttendanceColor(student.attendanceRate)}`}>
              {student.attendanceRate}%
            </p>
          </div>
          {student.presentDays && student.totalDays && (
            <div>
              <p className="text-sm font-medium">Days Present</p>
              <p className="text-sm">{student.presentDays}/{student.totalDays}</p>
            </div>
          )}
          {student.lastCheckIn && (
            <div>
              <p className="text-sm font-medium">Last Check-in</p>
              <p className="text-sm text-muted-foreground">{student.lastCheckIn}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {onViewDetails && (
          <Button size="sm" variant="outline" onClick={() => onViewDetails(student.id)}>
            View Details
          </Button>
        )}
        {onEvaluate && (
          <Button size="sm" onClick={() => onEvaluate(student.id)}>
            Evaluate
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
