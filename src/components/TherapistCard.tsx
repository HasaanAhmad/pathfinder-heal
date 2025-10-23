import { Therapist } from "@/types/therapist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, Navigation, Star, MapPin, Video } from "lucide-react";

interface TherapistCardProps {
  therapist: Therapist;
  onViewProfile: (therapist: Therapist) => void;
}

export const TherapistCard = ({ therapist, onViewProfile }: TherapistCardProps) => {
  return (
    <Card className="p-4 hover:shadow-medium transition-shadow cursor-pointer" onClick={() => onViewProfile(therapist)}>
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-primary">
            {therapist.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {therapist.name}
              </h3>
              <p className="text-sm text-muted-foreground">{therapist.credentials}</p>
            </div>
            {therapist.verified && (
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Verified
              </Badge>
            )}
          </div>

          {/* Rating & Distance */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{therapist.rating}</span>
              <span className="text-muted-foreground">({therapist.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{therapist.distance} km</span>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex gap-1 mt-2 flex-wrap">
            {therapist.specializations.slice(0, 3).map(spec => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>

          {/* Modalities */}
          <div className="flex gap-2 mt-2">
            {therapist.inPerson && (
              <Badge variant="secondary" className="text-xs">
                In-person
              </Badge>
            )}
            {therapist.telehealth && (
              <Badge variant="secondary" className="text-xs gap-1">
                <Video className="w-3 h-3" />
                Telehealth
              </Badge>
            )}
          </div>

          {/* Availability */}
          {therapist.nextAvailable && (
            <p className="text-xs text-success mt-2">
              Next available: {therapist.nextAvailable}
            </p>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1" onClick={(e) => {
              e.stopPropagation();
              onViewProfile(therapist);
            }}>
              View Profile
            </Button>
            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
