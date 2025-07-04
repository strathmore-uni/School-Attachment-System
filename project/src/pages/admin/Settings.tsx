import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Shield, Users, Bell, Save } from 'lucide-react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    systemName: 'Strathmore Attachment System',
    academicYear: '2024/2025',
    attachmentDuration: '3 months',
    maxApplications: '3',
    autoApproveRegistration: true,
    passwordPolicy: 'Strong',
    sessionTimeout: '30 minutes',
    twoFactorAuth: 'Optional',
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    weeklyDigest: true,
    dataEncryption: 'AES-256',
    auditLogging: true,
    apiRateLimit: '100 requests/minute',
    backupFrequency: 'Daily'
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const systemSettings = [
    {
      category: "General Settings",
      icon: SettingsIcon,
      settings: [
        { key: 'systemName', name: "System Name", value: settings.systemName, type: "text" },
        { key: 'academicYear', name: "Academic Year", value: settings.academicYear, type: "text" },
        { key: 'attachmentDuration', name: "Attachment Duration", value: settings.attachmentDuration, type: "select", options: ['3 months', '4 months', '6 months'] },
        { key: 'maxApplications', name: "Max Applications per Student", value: settings.maxApplications, type: "number" }
      ]
    },
    {
      category: "User Management",
      icon: Users,
      settings: [
        { key: 'autoApproveRegistration', name: "Auto-approve Student Registration", value: settings.autoApproveRegistration, type: "toggle" },
        { key: 'passwordPolicy', name: "Password Policy", value: settings.passwordPolicy, type: "select", options: ['Weak', 'Medium', 'Strong'] },
        { key: 'sessionTimeout', name: "Session Timeout", value: settings.sessionTimeout, type: "select", options: ['15 minutes', '30 minutes', '1 hour', '2 hours'] },
        { key: 'twoFactorAuth', name: "Two-Factor Authentication", value: settings.twoFactorAuth, type: "select", options: ['Disabled', 'Optional', 'Required'] }
      ]
    },
    {
      category: "Notifications",
      icon: Bell,
      settings: [
        { key: 'emailNotifications', name: "Email Notifications", value: settings.emailNotifications, type: "toggle" },
        { key: 'smsNotifications', name: "SMS Notifications", value: settings.smsNotifications, type: "toggle" },
        { key: 'systemAlerts', name: "System Alerts", value: settings.systemAlerts, type: "toggle" },
        { key: 'weeklyDigest', name: "Weekly Digest", value: settings.weeklyDigest, type: "toggle" }
      ]
    },
    {
      category: "Security",
      icon: Shield,
      settings: [
        { key: 'dataEncryption', name: "Data Encryption", value: settings.dataEncryption, type: "text" },
        { key: 'auditLogging', name: "Audit Logging", value: settings.auditLogging, type: "toggle" },
        { key: 'apiRateLimit', name: "API Rate Limiting", value: settings.apiRateLimit, type: "text" },
        { key: 'backupFrequency', name: "Backup Frequency", value: settings.backupFrequency, type: "select", options: ['Hourly', 'Daily', 'Weekly'] }
      ]
    }
  ];

  const systemStatus = [
    { name: "Database", status: "Healthy", color: "bg-green-500" },
    { name: "File Storage", status: "Healthy", color: "bg-green-500" },
    { name: "Email Service", status: "Healthy", color: "bg-green-500" },
    { name: "Backup System", status: "Warning", color: "bg-yellow-500" }
  ];

  const handleEdit = (key: string, currentValue: any) => {
    setEditingField(key);
    setTempValue(currentValue.toString());
  };

  const handleSave = (key: string, type: string) => {
    let newValue: any = tempValue;
    
    if (type === 'toggle') {
      newValue = !settings[key as keyof typeof settings];
    } else if (type === 'number') {
      newValue = tempValue;
    }

    setSettings(prev => ({
      ...prev,
      [key]: newValue
    }));

    setEditingField(null);
    setTempValue('');

    toast({
      title: "Setting Updated",
      description: "The setting has been updated successfully",
    });
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "All settings have been saved successfully",
    });
  };

  const renderSettingValue = (setting: any) => {
    const isEditing = editingField === setting.key;

    if (setting.type === 'toggle') {
      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={setting.value}
            onCheckedChange={() => handleSave(setting.key, 'toggle')}
          />
          <span className="text-sm">{setting.value ? 'Enabled' : 'Disabled'}</span>
        </div>
      );
    }

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          {setting.type === 'select' ? (
            <Select value={tempValue} onValueChange={setTempValue}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-48"
              type={setting.type === 'number' ? 'number' : 'text'}
            />
          )}
          <Button size="sm" onClick={() => handleSave(setting.key, setting.type)}>
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm">{setting.value.toString()}</span>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleEdit(setting.key, setting.value)}
        >
          Edit
        </Button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="System Settings"
          description="Configure and manage system-wide settings and preferences"
          actionButton={{
            label: "Save Changes",
            icon: Save,
            onClick: handleSaveChanges
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
                <div className="space-y-4">
                  {section.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{setting.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {setting.value.toString()}
                        </p>
                      </div>
                      {renderSettingValue(setting)}
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