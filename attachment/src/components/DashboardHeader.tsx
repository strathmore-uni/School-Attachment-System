
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  description: string;
  actionButton?: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
  };
}

const DashboardHeader = ({ title, description, actionButton }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {actionButton && (
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={actionButton.onClick}>
          <actionButton.icon className="mr-2 h-4 w-4" />
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;
