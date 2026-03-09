import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Property } from "@/data/properties";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const accentIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);
  return null;
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-card border border-border h-[600px]">
      <MapContainer
        center={[30.5, 69.5]}
        zoom={5}
        className="h-full w-full z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds properties={properties} />
        {properties.map((property) => (
          <Marker key={property.id} position={[property.lat, property.lng]} icon={accentIcon}>
            <Popup>
              <div className="w-56">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-sm">{property.name}</h3>
                <p className="text-xs text-gray-500 mb-1">{property.city}, {property.province}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span className="text-xs font-medium">{property.rating}</span>
                  <span className="text-xs text-gray-400">({property.reviews})</span>
                  <span className="ml-auto text-xs font-bold">PKR {property.price.toLocaleString()}/night</span>
                </div>
                <Link
                  to={`/property/${property.id}`}
                  className="block text-center text-xs font-medium bg-[hsl(var(--accent))] text-white rounded px-2 py-1.5 hover:opacity-90 transition"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
