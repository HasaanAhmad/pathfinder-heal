import { Therapist } from "@/types/therapist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, Star, MapPin, Phone, Mail, Globe, Copy, Share2, 
  CheckCircle, Calendar, Clock, DollarSign, Languages, Shield 
} from "lucide-react";
import { toast } from "sonner";

interface ProfileDrawerProps {
  therapist: Therapist | null;
  onClose: () => void;
}

export const ProfileDrawer = ({ therapist, onClose }: ProfileDrawerProps) => {
  if (!therapist) return null;

  const copyContact = () => {
    navigator.clipboard.writeText(`${therapist.phone}\n${therapist.email}`);
    toast.success("Contact information copied!");
  };

  const shareProfile = () => {
    toast.success("Share link copied!");
  };

  return (
    <div className="absolute right-0 top-0 w-full md:w-[420px] h-full bg-surface shadow-elevated z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-surface border-b border-border p-4 z-10">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{therapist.name}</h2>
              <p className="text-sm text-muted-foreground">{therapist.credentials}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-warning">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{therapist.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-3 h-3" />
                  {therapist.distance} km
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        {therapist.verified && (
          <Badge className="mt-3 bg-success/10 text-success border-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Provider
          </Badge>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="p-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-elevated">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Calendar className="w-4 h-4" />
                Experience
              </div>
              <p className="font-semibold">{therapist.yearsExperience} years</p>
            </div>
            <div className="p-3 rounded-lg bg-elevated">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                Fee Range
              </div>
              <p className="font-semibold">{therapist.feeRange}</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {therapist.bio}
            </p>
          </div>

          {/* Modalities */}
          <div>
            <h3 className="font-semibold mb-2">Therapeutic Approaches</h3>
            <div className="flex flex-wrap gap-2">
              {therapist.modalities.map(modality => (
                <Badge key={modality} variant="secondary">
                  {modality}
                </Badge>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Languages
            </h3>
            <div className="flex gap-2">
              {therapist.languages.map(lang => (
                <Badge key={lang} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Insurance Accepted
            </h3>
            <div className="flex flex-wrap gap-2">
              {therapist.insurance.map(ins => (
                <Badge key={ins} variant="outline">
                  {ins}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specializations" className="space-y-3 mt-4">
          {therapist.specializations.map(spec => (
            <div key={spec} className="p-3 rounded-lg bg-elevated">
              <h4 className="font-medium mb-1">{spec}</h4>
              <p className="text-sm text-muted-foreground">
                Specialized treatment and support for {spec.toLowerCase()} related concerns.
              </p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="availability" className="space-y-4 mt-4">
          {therapist.nextAvailable && (
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 text-success font-medium">
                <Clock className="w-4 h-4" />
                Next Available
              </div>
              <p className="text-sm mt-1">{therapist.nextAvailable}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3">Office Hours</h3>
            <div className="space-y-2">
              {Object.entries(therapist.schedule).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="font-medium">{day}</span>
                  <span className="text-sm text-muted-foreground">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {therapist.inPerson && (
              <Badge variant="secondary" className="flex-1 justify-center py-2">
                In-Person Sessions
              </Badge>
            )}
            {therapist.telehealth && (
              <Badge variant="secondary" className="flex-1 justify-center py-2">
                Telehealth Available
              </Badge>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-elevated">
              <Phone className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{therapist.phone}</p>
              </div>
              <Button size="sm">Call</Button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-elevated">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{therapist.email}</p>
              </div>
              <Button size="sm">Email</Button>
            </div>

            {therapist.website && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-elevated">
                <Globe className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Website</p>
                  <p className="font-medium">{therapist.website}</p>
                </div>
                <Button size="sm">Visit</Button>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-elevated">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium text-sm">{therapist.address}</p>
              </div>
              <Button size="sm">Directions</Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyContact}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Contact
            </Button>
            <Button variant="outline" className="flex-1" onClick={shareProfile}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
            Information is user-provided. Verified providers are marked with a badge.
          </p>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="sticky bottom-0 p-4 border-t border-border bg-surface">
        <Button className="w-full" size="lg">
          Request Information
        </Button>
      </div>
    </div>
  );
};
