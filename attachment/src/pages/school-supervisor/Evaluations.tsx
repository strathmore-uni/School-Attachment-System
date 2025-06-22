
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Clock, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';

const Evaluations = () => {
  const upcomingEvaluations = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      type: "Mid-term Evaluation",
      dueDate: "2024-06-25",
      organization: "Safaricom PLC"
    },
    {
      id: 2,
      studentName: "John Kamau",
      type: "Progress Review",
      dueDate: "2024-06-28",
      organization: "Kenya Commercial Bank"
    },
    {
      id: 3,
      studentName: "Mary Akinyi",
      type: "Final Evaluation",
      dueDate: "2024-06-30",
      organization: "Equity Bank"
    }
  ];

  const completedEvaluations = [
    {
      id: 1,
      studentName: "Alice Wanjiku",
      type: "Weekly Assessment",
      completedDate: "2024-06-18",
      score: 4.2,
      status: "Completed"
    },
    {
      id: 2,
      studentName: "John Kamau",
      type: "Monthly Review",
      completedDate: "2024-06-15",
      score: 3.8,
      status: "Completed"
    }
  ];

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Student Evaluations"
          description="Create and manage student performance evaluations"
          actionButton={{
            label: "New Evaluation",
            icon: Plus,
            onClick: () => console.log('New evaluation clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {upcomingEvaluations.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {completedEvaluations.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {upcomingEvaluations.filter(e => new Date(e.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {completedEvaluations.length > 0 
                  ? (completedEvaluations.reduce((sum, e) => sum + e.score, 0) / completedEvaluations.length).toFixed(1)
                  : '0.0'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Evaluations</CardTitle>
              <CardDescription>Evaluations due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{evaluation.studentName}</h4>
                      <p className="text-sm text-muted-foreground">{evaluation.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Organization: {evaluation.organization}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {evaluation.dueDate}</span>
                      </div>
                      <Button size="sm">
                        Start Evaluation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Evaluations</CardTitle>
              <CardDescription>Recently completed evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{evaluation.studentName}</h4>
                      <p className="text-sm text-muted-foreground">{evaluation.type}</p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Completed: {evaluation.completedDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold mb-1">
                        {evaluation.score}/5
                      </div>
                      <Badge variant="default">{evaluation.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Evaluations;
