import { emergencyHotlines } from "@/data/therapists";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Phone, MessageSquare, AlertTriangle, LogOut } from "lucide-react";

interface HotlinesPanelProps {
  onClose: () => void;
}

export const HotlinesPanel = ({ onClose }: HotlinesPanelProps) => {
  return (
    <div className="absolute right-0 top-0 w-full md:w-[400px] h-full bg-surface shadow-elevated z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-danger text-danger-foreground p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold">Emergency Support</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-danger-foreground hover:bg-danger-foreground/10">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-sm text-danger-foreground/90">
          Free, confidential support available 24/7
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Region Selector */}
        <Card className="p-3 bg-elevated">
          <p className="text-sm font-medium mb-2">Region: United States</p>
          <p className="text-xs text-muted-foreground">
            Auto-detected. These are national resources available to everyone.
          </p>
        </Card>

        {/* Safety Notice */}
        <Card className="p-3 bg-warning/10 border-warning/20">
          <div className="flex gap-2">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-warning">If you're in immediate danger</p>
              <p className="text-xs text-muted-foreground mt-1">
                Call 911 or go to your nearest emergency room
              </p>
            </div>
          </div>
        </Card>

        {/* Hotlines List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Available Hotlines</h3>
          {emergencyHotlines.map(hotline => (
            <Card key={hotline.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold">{hotline.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hotline.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {hotline.hours}
                    </Badge>
                    {hotline.press && (
                      <Badge variant="secondary" className="text-xs">
                        Press {hotline.press}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                {hotline.type === "call" && (
                  <Button className="flex-1 gap-2">
                    <Phone className="w-4 h-4" />
                    Call {hotline.number}
                  </Button>
                )}
                {hotline.type === "text" && (
                  <Button className="flex-1 gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Text {hotline.textCode} to {hotline.number}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="p-4 bg-elevated">
          <h3 className="font-semibold mb-2">Safety Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• All calls and texts are confidential</li>
            <li>• Trained counselors are available to listen</li>
            <li>• No judgment, just support when you need it</li>
            <li>• Crisis chat options available if you prefer typing</li>
          </ul>
        </Card>

        {/* Quick Exit */}
        <Button 
          variant="outline" 
          className="w-full gap-2 border-muted-foreground/20"
          onClick={onClose}
        >
          <LogOut className="w-4 h-4" />
          Exit to Safety (ESC)
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          This information is for support only and does not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};
