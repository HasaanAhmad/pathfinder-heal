import { FilterState } from "@/types/therapist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sliders } from "lucide-react";

interface FiltersPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

const SPECIALIZATIONS = [
  "Anxiety", "Depression", "Trauma", "PTSD", "Burnout", 
  "Couples Therapy", "Family Therapy", "Adolescents", "LGBTQ+", 
  "Grief", "Addiction", "Career Counseling"
];

const RADIUS_PRESETS = [5, 10, 25];

export const FiltersPanel = ({ filters, onFiltersChange, resultsCount }: FiltersPanelProps) => {
  const toggleSpecialization = (spec: string) => {
    const newSpecs = filters.specializations.includes(spec)
      ? filters.specializations.filter(s => s !== spec)
      : [...filters.specializations, spec];
    onFiltersChange({ ...filters, specializations: newSpecs });
  };

  const clearFilters = () => {
    onFiltersChange({
      radius: 25,
      inPerson: true,
      telehealth: true,
      specializations: [],
      insurance: "",
      languages: [],
      priceRange: [0, 300],
      acceptingNew: false,
    });
  };

  return (
    <aside className="w-80 bg-elevated border-r border-border overflow-y-auto">
      <div className="sticky top-0 bg-elevated border-b border-border p-6 z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            Filters
          </h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {resultsCount} results
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Location */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Location</Label>
          <div className="flex gap-2">
            <Input placeholder="Enter location..." className="flex-1" />
            <Button size="icon" variant="outline">
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Distance</Label>
            <span className="text-sm text-muted-foreground">{filters.radius} km</span>
          </div>
          <Slider
            value={[filters.radius]}
            onValueChange={([value]) => onFiltersChange({ ...filters, radius: value })}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex gap-2">
            {RADIUS_PRESETS.map(preset => (
              <Button
                key={preset}
                size="sm"
                variant={filters.radius === preset ? "default" : "outline"}
                onClick={() => onFiltersChange({ ...filters, radius: preset })}
                className="flex-1"
              >
                {preset} km
              </Button>
            ))}
          </div>
        </div>

        {/* Modality */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Session Type</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="in-person" className="text-sm font-normal cursor-pointer">
                In-person
              </Label>
              <Switch
                id="in-person"
                checked={filters.inPerson}
                onCheckedChange={(checked) => onFiltersChange({ ...filters, inPerson: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="telehealth" className="text-sm font-normal cursor-pointer">
                Online / Telehealth
              </Label>
              <Switch
                id="telehealth"
                checked={filters.telehealth}
                onCheckedChange={(checked) => onFiltersChange({ ...filters, telehealth: checked })}
              />
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Specializations</Label>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map(spec => (
              <Badge
                key={spec}
                variant={filters.specializations.includes(spec) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSpecialization(spec)}
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Accepting New */}
        <div className="flex items-center justify-between">
          <Label htmlFor="accepting" className="text-sm font-semibold cursor-pointer">
            Accepting new clients
          </Label>
          <Switch
            id="accepting"
            checked={filters.acceptingNew}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, acceptingNew: checked })}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </span>
          </div>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
            min={0}
            max={300}
            step={10}
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button className="flex-1" onClick={() => {}}>
            Apply Filters
          </Button>
          <Button variant="ghost" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </aside>
  );
};
