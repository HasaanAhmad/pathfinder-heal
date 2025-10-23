import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { Therapist } from "@/types/therapist";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  therapists: Therapist[];
  userLocation: { lat: number; lng: number };
  radius: number;
  onMarkerClick: (therapist: Therapist) => void;
}

const therapistIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Ccircle cx='12' cy='12' r='10' fill='white' stroke='%234F46E5' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%234F46E5'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const userIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2314B8A6'%3E%3Ccircle cx='12' cy='12' r='8' fill='%2314B8A6'/%3E%3Ccircle cx='12' cy='12' r='3' fill='white'/%3E%3C/svg%3E",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const MapView = ({ therapists, userLocation, radius, onMarkerClick }: MapViewProps) => {
  const center: LatLngExpression = [userLocation.lat, userLocation.lng];

  return (
    <div className="relative flex-1 h-full">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} />
        
        <Marker 
          position={center} 
          icon={userIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>

        <Circle
          center={center}
          radius={radius * 1000}
          pathOptions={{
            fillColor: "#4F46E5",
            fillOpacity: 0.1,
            color: "#4F46E5",
            opacity: 0.3,
            weight: 2,
          }}
        />

        {therapists.map((therapist) => (
          <Marker
            key={therapist.id}
            position={[therapist.lat, therapist.lng]}
            icon={therapistIcon}
            eventHandlers={{
              click: () => onMarkerClick(therapist),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm">{therapist.name}</h3>
                <p className="text-xs text-muted-foreground">{therapist.credentials}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs">★ {therapist.rating}</span>
                  <span className="text-xs text-muted-foreground">• {therapist.distance} km</span>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {therapist.specializations.slice(0, 2).map(spec => (
                    <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
