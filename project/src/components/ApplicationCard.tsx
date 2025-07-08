
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApplicationData } from '@/lib/api/applications';

interface Application {
  id: number;
  studentName: string;
  organization_id: string;
  position: string;
  status: string;
  appliedDate?: string;
  submittedDate?: string;
  type?: string;
}

interface ApplicationCardProps {
  application: ApplicationData;
  showReviewButton?: boolean;
  onReview?: (id: number) => void;
}

const ApplicationCard = ({ application, showReviewButton = false, onReview }: ApplicationCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved': return 'default';
      case 'Pending Review': return 'secondary';
      case 'Under Review': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          {application.studentId && (
            <h4 className="font-semibold">{application.studentId}</h4>
          )}
          {application.attachment_type && (
            <Badge variant={application.attachment_type === 'WBL' ? 'default' : 'secondary'}>
              {application.attachment_type}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {application.position} at {application.organization_id}
        </p>
        <p className="text-xs text-muted-foreground">
          {application.end_date ? 
            `Applied: ${application.start_date}` : 
            `Submitted: ${application.submittedDate}`
          }
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Badge variant={getStatusVariant(application.status)}>
          {application.status}
        </Badge>
        {showReviewButton && onReview && (
          <Button size="sm" variant="outline" onClick={() => onReview(application.id)}>
            Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
