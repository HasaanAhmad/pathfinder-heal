import { useState, useEffect } from "react";
import { AppBar } from "@/components/AppBar";
import { FiltersPanel } from "@/components/FiltersPanel";
import { MapView } from "@/components/MapView";
import { ResultsList } from "@/components/ResultsList";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { HotlinesPanel } from "@/components/HotlinesPanel";
import { mockTherapists } from "@/data/therapists";
import { FilterState, Therapist } from "@/types/therapist";
import { toast } from "sonner";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    radius: 25,
    inPerson: true,
    telehealth: true,
    specializations: [],
    insurance: "",
    languages: [],
    priceRange: [0, 300],
    acceptingNew: false,
  });

  const [userLocation] = useState({ lat: 40.7580, lng: -73.9855 }); // NYC default
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showHotlines, setShowHotlines] = useState(false);

  const filteredTherapists = mockTherapists.filter(therapist => {
    // Distance filter
    if (therapist.distance > filters.radius) return false;
    
    // Modality filter
    if (!filters.inPerson && therapist.inPerson && !therapist.telehealth) return false;
    if (!filters.telehealth && therapist.telehealth && !therapist.inPerson) return false;
    
    // Specialization filter
    if (filters.specializations.length > 0) {
      const hasMatch = filters.specializations.some(spec => 
        therapist.specializations.includes(spec)
      );
      if (!hasMatch) return false;
    }
    
    // Accepting new filter
    if (filters.acceptingNew && !therapist.acceptingNew) return false;
    
    return true;
  });

  const handleLocationRequest = () => {
    if ("geolocation" in navigator) {
      toast.loading("Getting your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location updated!");
          // In a real app, update userLocation state here
        },
        (error) => {
          toast.error("Unable to get location. Please enter manually.");
        }
      );
    } else {
      toast.error("Geolocation not supported in your browser");
    }
  };

  const handleMarkerClick = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
  };

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showHotlines) setShowHotlines(false);
        else if (selectedTherapist) setSelectedTherapist(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHotlines, selectedTherapist]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppBar 
        onEmergencyClick={() => setShowHotlines(true)}
        onLocationRequest={handleLocationRequest}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Filters Panel */}
        <FiltersPanel
          filters={filters}
          onFiltersChange={setFilters}
          resultsCount={filteredTherapists.length}
        />

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            therapists={filteredTherapists}
            userLocation={userLocation}
            radius={filters.radius}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Results List */}
        <div className="w-[420px] relative">
          <ResultsList
            therapists={filteredTherapists}
            onViewProfile={setSelectedTherapist}
          />
          
          {/* Profile Drawer Overlay */}
          {selectedTherapist && (
            <ProfileDrawer
              therapist={selectedTherapist}
              onClose={() => setSelectedTherapist(null)}
            />
          )}
        </div>
      </div>

      {/* Hotlines Panel Overlay */}
      {showHotlines && (
        <HotlinesPanel onClose={() => setShowHotlines(false)} />
      )}

      {/* Emergency FAB (always accessible) */}
      {!showHotlines && (
        <button
          onClick={() => setShowHotlines(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-warning text-warning-foreground shadow-elevated hover:shadow-medium transition-shadow z-40 flex items-center justify-center font-bold text-lg"
          aria-label="Emergency Support"
        >
          SOS
        </button>
      )}

      {/* Disclaimer */}
      <footer className="bg-elevated border-t border-border py-2 px-6 text-xs text-muted-foreground text-center">
        Information for support only. Not medical advice. If in crisis, call 988 or 911.
      </footer>
    </div>
  );
};

export default Index;
