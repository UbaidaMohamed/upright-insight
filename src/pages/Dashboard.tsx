import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download
} from "lucide-react";

// Mock data
const postureData = [
  { time: "09:00", good: 85, poor: 15, score: 85 },
  { time: "10:00", good: 92, poor: 8, score: 92 },
  { time: "11:00", good: 78, poor: 22, score: 78 },
  { time: "12:00", good: 95, poor: 5, score: 95 },
  { time: "13:00", good: 88, poor: 12, score: 88 },
  { time: "14:00", good: 75, poor: 25, score: 75 },
  { time: "15:00", good: 82, poor: 18, score: 82 },
  { time: "16:00", good: 90, poor: 10, score: 90 },
];

const weeklyData = [
  { day: "Mon", score: 87, sessions: 8 },
  { day: "Tue", score: 92, sessions: 7 },
  { day: "Wed", score: 78, sessions: 9 },
  { day: "Thu", score: 85, sessions: 6 },
  { day: "Fri", score: 91, sessions: 8 },
  { day: "Sat", score: 83, sessions: 4 },
  { day: "Sun", score: 76, sessions: 3 },
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("today");
  
  const currentScore = 87;
  const todayHours = 6.5;
  const weeklyAverage = 85;
  const totalAlerts = 12;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Posture Dashboard</h1>
          <p className="text-muted-foreground">Track your posture health and progress</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Check-in
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-2xl font-bold text-foreground">{currentScore}%</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="mt-2">
              <StatusBadge variant="good">Excellent</StatusBadge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours Today</p>
                <p className="text-2xl font-bold text-foreground">{todayHours}h</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">+1.2h from yesterday</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Average</p>
                <p className="text-2xl font-bold text-foreground">{weeklyAverage}%</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">↑ 3% from last week</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Alerts</p>
                <p className="text-2xl font-bold text-foreground">{totalAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">-5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Posture Score Timeline */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Posture Score Today</CardTitle>
              <div className="flex space-x-1">
                {["today", "week", "month"].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeframe(period as any)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={postureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "14:30", type: "good", message: "Great posture maintained for 45 minutes" },
              { time: "13:15", type: "warning", message: "Slouching detected - corrected within 30 seconds" },
              { time: "12:00", type: "good", message: "Perfect lunch break posture check" },
              { time: "10:45", type: "bad", message: "Poor posture alert - leaning forward" },
              { time: "09:30", type: "good", message: "Session started with excellent posture" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "good" ? "bg-success" :
                  activity.type === "warning" ? "bg-warning" : "bg-destructive"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                </div>
                {activity.type === "good" && (
                  <CheckCircle className="w-4 h-4 text-success mt-1" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}