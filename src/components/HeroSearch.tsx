import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("city", location);
    if (guests) params.set("guests", guests);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-card/95 backdrop-blur-md rounded-xl shadow-elevated p-3 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</label>
            <input
              type="text"
              placeholder="Where to?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground/50 outline-none mt-0.5"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <Calendar className="w-5 h-5 text-accent shrink-0" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Check-in</label>
            <input type="date" className="w-full bg-transparent text-sm text-card-foreground outline-none mt-0.5" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <Users className="w-5 h-5 text-accent shrink-0" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Guests</label>
            <input
              type="number"
              placeholder="How many?"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground/50 outline-none mt-0.5"
            />
          </div>
        </div>

        <Button variant="accent" className="h-full min-h-[56px] text-base font-semibold" onClick={handleSearch}>
          <Search className="w-5 h-5 mr-2" />
          Search Stays
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroSearch;
