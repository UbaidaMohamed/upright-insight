import { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Video() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [postureStatus, setPostureStatus] = useState<"good" | "warning" | "bad">("good");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  // Mock posture detection simulation
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const statuses: Array<"good" | "warning" | "bad"> = ["good", "good", "warning", "bad"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setPostureStatus(randomStatus);
      
      if (randomStatus !== "good" && alertsEnabled) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isStreaming, alertsEnabled]);

  const getStatusText = () => {
    switch (postureStatus) {
      case "good": return "Good Posture";
      case "warning": return "Slouching Detected";
      case "bad": return "Poor Posture";
      default: return "Monitoring...";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Posture Monitoring</h1>
        <p className="text-muted-foreground">
          Monitor your sitting posture in real-time with AI-powered detection
        </p>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <Card className="border-warning bg-warning/10 animate-in slide-in-from-top">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="font-medium text-warning">Posture Alert: {getStatusText()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-2">
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Video Feed</CardTitle>
                <StatusBadge variant={postureStatus}>
                  {getStatusText()}
                </StatusBadge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                
                {!isStreaming && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <CameraOff className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Camera not active</p>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <Button
                    onClick={isStreaming ? stopCamera : startCamera}
                    size="lg"
                    className="shadow-lg"
                    variant={isStreaming ? "destructive" : "default"}
                  >
                    {isStreaming ? (
                      <>
                        <CameraOff className="w-5 h-5 mr-2" />
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Detection Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="alerts" className="text-sm font-medium">
                  Visual Alerts
                </Label>
                <Switch
                  id="alerts"
                  checked={alertsEnabled}
                  onCheckedChange={setAlertsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="audio" className="text-sm font-medium">
                  Audio Notifications
                </Label>
                <Switch
                  id="audio"
                  checked={audioEnabled}
                  onCheckedChange={setAudioEnabled}
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Current Status</h4>
                <div className="flex items-center space-x-2">
                  {audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isStreaming ? "Monitoring active" : "Monitoring paused"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Tips for Good Posture</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep your back straight against the chair</li>
                <li>• Feet flat on the floor</li>
                <li>• Monitor at eye level</li>
                <li>• Shoulders relaxed</li>
                <li>• Take breaks every 30 minutes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}