import { Link } from "react-router-dom";
import { Star, MapPin, Users, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";
import { whatsappPropertyUrl } from "@/data/properties";
import PropertyImage from "@/components/PropertyImage";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-sm font-semibold text-card-foreground">{property.rating}</span>
        </div>
        {property.airbnbUrl && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            Airbnb Linked
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 text-accent">
          <Shield className="w-3 h-3" /> Verified
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {property.city}
        </div>
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{property.name}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <Users className="w-3.5 h-3.5" />
          Up to {property.guests} guests · {property.bedrooms} bed · {property.bathrooms} bath
        </div>

        <div className="mb-4">
          <span className="text-lg font-bold text-card-foreground">PKR {property.price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>

        <div className="flex gap-2">
          <Button variant="accent" size="sm" className="flex-1" asChild>
            <Link to={`/property/${property.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={whatsappPropertyUrl(property.name)} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
