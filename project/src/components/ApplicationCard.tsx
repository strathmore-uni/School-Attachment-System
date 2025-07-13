
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApplicationData } from '@/lib/api/applications';
import { ApplicationDashboardData } from '@/lib/api/students';

interface applicationData {
  id: number;
  student_name: string;
  organization_id: string;
  position: string;
  status: string;
  appliedDate?: string;
  submittedDate?: string;
  type?: string;
  attachment_type?: string;
  start_date?: string;
  end_date?: string;
  motivation?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  studentId?: number;
  created_at?: string;

}

interface ApplicationCardProps {
  application: ApplicationDashboardData | applicationData;
  showReviewButton?: boolean;
  onReview?: (id: number) => void;
}

const ApplicationCard = ({ application, showReviewButton = false, onReview }: ApplicationCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'review': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          {application.id && (
            <h4 className="font-semibold">{application.id}</h4>
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
            `Applied: ${new Date(application.start_date).toLocaleDateString()}` : 
            `Submitted: ${new Date(application.created_at).toLocaleDateString()}`
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
export type { applicationData };
