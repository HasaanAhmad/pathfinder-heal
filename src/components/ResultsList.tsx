import { Therapist } from "@/types/therapist";
import { TherapistCard } from "./TherapistCard";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

interface ResultsListProps {
  therapists: Therapist[];
  onViewProfile: (therapist: Therapist) => void;
}

export const ResultsList = ({ therapists, onViewProfile }: ResultsListProps) => {
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");

  const sortedTherapists = [...therapists].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance;
    return b.rating - a.rating;
  });

  return (
    <div className="flex flex-col h-full bg-surface border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-elevated">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Results</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "compact" ? "default" : "outline"}
              onClick={() => setViewMode("compact")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortBy === "distance" ? "default" : "outline"}
            onClick={() => setSortBy("distance")}
            className="flex-1"
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Distance
          </Button>
          <Button
            size="sm"
            variant={sortBy === "rating" ? "default" : "outline"}
            onClick={() => setSortBy("rating")}
            className="flex-1"
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Rating
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sortedTherapists.map(therapist => (
          <TherapistCard
            key={therapist.id}
            therapist={therapist}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
};
