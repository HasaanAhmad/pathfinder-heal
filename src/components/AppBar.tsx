import { Search, MapPin, Bell, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppBarProps {
  onEmergencyClick: () => void;
  onLocationRequest: () => void;
}

export const AppBar = ({ onEmergencyClick, onLocationRequest }: AppBarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">S</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Therapist Finder
          </h1>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter city, ZIP code..."
              className="pl-10 bg-elevated border-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLocationRequest}
            className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden md:inline">Use my location</span>
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEmergencyClick}
            className="gap-2 border-warning bg-warning/10 text-warning hover:bg-warning/20"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="hidden lg:inline">Emergency</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
