import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Volume2, 
  Smartphone, 
  Camera, 
  Shield,
  Palette,
  Clock,
  Target,
  Save,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  
  // Alert Settings
  const [visualAlerts, setVisualAlerts] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(false);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);
  const [alertDelay, setAlertDelay] = useState([3]);
  
  // Detection Settings
  const [sensitivity, setSensitivity] = useState([75]);
  const [minDetectionTime, setMinDetectionTime] = useState([2]);
  const [calibrationMode, setCalibrationMode] = useState("automatic");
  
  // Privacy Settings
  const [dataCollection, setDataCollection] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(true);
  
  // Appearance
  const [theme, setTheme] = useState("system");
  const [notificationStyle, setNotificationStyle] = useState("minimal");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been successfully updated.",
    });
  };

  const handleReset = () => {
    // Reset to defaults
    setVisualAlerts(true);
    setAudioAlerts(false);
    setVibrationAlerts(true);
    setAlertDelay([3]);
    setSensitivity([75]);
    setMinDetectionTime([2]);
    setCalibrationMode("automatic");
    setDataCollection(true);
    setCameraAccess(true);
    setAnonymousReporting(true);
    setTheme("system");
    setNotificationStyle("minimal");
    
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your posture monitoring experience</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert Preferences */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Alert Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Visual Alerts</Label>
                  <p className="text-sm text-muted-foreground">Show on-screen notifications</p>
                </div>
                <Switch checked={visualAlerts} onCheckedChange={setVisualAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Audio Notifications</Label>
                  <p className="text-sm text-muted-foreground">Play sound when poor posture detected</p>
                </div>
                <Switch checked={audioAlerts} onCheckedChange={setAudioAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Vibration Alerts</Label>
                  <p className="text-sm text-muted-foreground">Device vibration for mobile users</p>
                </div>
                <Switch checked={vibrationAlerts} onCheckedChange={setVibrationAlerts} />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Alert Delay (seconds)</Label>
              <div className="px-3">
                <Slider
                  value={alertDelay}
                  onValueChange={setAlertDelay}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Instant</span>
                  <Badge variant="outline">{alertDelay[0]}s</Badge>
                  <span>10s delay</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Notification Style</Label>
              <Select value={notificationStyle} onValueChange={setNotificationStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Detection Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Detection Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Sensitivity Level</Label>
              <div className="px-3">
                <Slider
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  max={100}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Low</span>
                  <Badge variant="outline">{sensitivity[0]}%</Badge>
                  <span>High</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Higher sensitivity detects smaller posture deviations
              </p>
            </div>

            <div className="space-y-3">
              <Label>Minimum Detection Time</Label>
              <div className="px-3">
                <Slider
                  value={minDetectionTime}
                  onValueChange={setMinDetectionTime}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1s</span>
                  <Badge variant="outline">{minDetectionTime[0]}s</Badge>
                  <span>10s</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                How long poor posture must persist before triggering an alert
              </p>
            </div>

            <div className="space-y-3">
              <Label>Calibration Mode</Label>
              <Select value={calibrationMode} onValueChange={setCalibrationMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual Setup</SelectItem>
                  <SelectItem value="guided">Guided Calibration</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How the system learns your ideal posture position
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Data Collection</Label>
                <p className="text-sm text-muted-foreground">Allow anonymous usage analytics</p>
              </div>
              <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Camera Access</Label>
                <p className="text-sm text-muted-foreground">Enable camera for posture detection</p>
              </div>
              <Switch checked={cameraAccess} onCheckedChange={setCameraAccess} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Anonymous Reporting</Label>
                <p className="text-sm text-muted-foreground">Share anonymized health insights</p>
              </div>
              <Switch checked={anonymousReporting} onCheckedChange={setAnonymousReporting} />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Data Retention</Label>
              <Select defaultValue="30days">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Session Reminders</Label>
              <Select defaultValue="30min">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="1hour">Every hour</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Break Reminders</Label>
              <Select defaultValue="2hours">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">Every hour</SelectItem>
                  <SelectItem value="2hours">Every 2 hours</SelectItem>
                  <SelectItem value="4hours">Every 4 hours</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}