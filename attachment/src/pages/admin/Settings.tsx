
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Shield, Users, Bell, Save } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';

const Settings = () => {
  const systemSettings = [
    {
      category: "General Settings",
      icon: SettingsIcon,
      settings: [
        { name: "System Name", value: "Strathmore Attachment System", type: "text" },
        { name: "Academic Year", value: "2024/2025", type: "text" },
        { name: "Attachment Duration", value: "3 months", type: "select" },
        { name: "Max Applications per Student", value: "3", type: "number" }
      ]
    },
    {
      category: "User Management",
      icon: Users,
      settings: [
        { name: "Auto-approve Student Registration", value: "Enabled", type: "toggle" },
        { name: "Password Policy", value: "Strong", type: "select" },
        { name: "Session Timeout", value: "30 minutes", type: "select" },
        { name: "Two-Factor Authentication", value: "Optional", type: "select" }
      ]
    },
    {
      category: "Notifications",
      icon: Bell,
      settings: [
        { name: "Email Notifications", value: "Enabled", type: "toggle" },
        { name: "SMS Notifications", value: "Disabled", type: "toggle" },
        { name: "System Alerts", value: "Enabled", type: "toggle" },
        { name: "Weekly Digest", value: "Enabled", type: "toggle" }
      ]
    },
    {
      category: "Security",
      icon: Shield,
      settings: [
        { name: "Data Encryption", value: "AES-256", type: "text" },
        { name: "Audit Logging", value: "Enabled", type: "toggle" },
        { name: "API Rate Limiting", value: "100 requests/minute", type: "text" },
        { name: "Backup Frequency", value: "Daily", type: "select" }
      ]
    }
  ];

  const systemStatus = [
    { name: "Database", status: "Healthy", color: "bg-green-500" },
    { name: "File Storage", status: "Healthy", color: "bg-green-500" },
    { name: "Email Service", status: "Healthy", color: "bg-green-500" },
    { name: "Backup System", status: "Warning", color: "bg-yellow-500" }
  ];

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="System Settings"
          description="Configure and manage system-wide settings and preferences"
          actionButton={{
            label: "Save Changes",
            icon: Save,
            onClick: () => console.log('Save changes clicked')
          }}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">99.9%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Storage Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">45GB</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">12.5K</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${component.color}`} />
                    <span className="font-medium">{component.name}</span>
                  </div>
                  <Badge variant={component.status === 'Healthy' ? 'default' : 'secondary'}>
                    {component.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {systemSettings.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <section.icon className="h-5 w-5 text-blue-600" />
                  <CardTitle>{section.category}</CardTitle>
                </div>
                <CardDescription>Configure {section.category.toLowerCase()} options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{setting.name}</p>
                        <p className="text-sm text-muted-foreground">Current: {setting.value}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
