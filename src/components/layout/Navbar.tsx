import { NavLink } from "react-router-dom";
import { Video, BarChart3, Settings, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Video", to: "/video", icon: Video },
  { title: "Dashboard", to: "/", icon: BarChart3 },
  { title: "Settings", to: "/settings", icon: Settings },
];

export function Navbar() {
  return (
    <nav className="border-b bg-gradient-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PostureGuard</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:block">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}