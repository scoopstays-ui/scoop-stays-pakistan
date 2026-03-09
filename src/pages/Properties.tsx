import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, LayoutGrid, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { properties, cities, propertyTypes } from "@/data/properties";
import { motion } from "framer-motion";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";
  const initialGuests = searchParams.get("guests") || "";

  const [cityFilter, setCityFilter] = useState(initialCity);
  const [typeFilter, setTypeFilter] = useState("");
  const [guestsFilter, setGuestsFilter] = useState(initialGuests);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (cityFilter && !p.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (guestsFilter && p.guests < parseInt(guestsFilter)) return false;
      return true;
    });
  }, [cityFilter, typeFilter, guestsFilter]);

  const clearFilters = () => {
    setCityFilter("");
    setTypeFilter("");
    setGuestsFilter("");
  };

  const hasFilters = cityFilter || typeFilter || guestsFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Browse</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Properties</h1>
            <p className="text-muted-foreground mt-2">{filtered.length} properties available</p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                {hasFilters && <span className="ml-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>}
              </Button>
              <div className="ml-auto flex gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-card rounded-xl p-6 shadow-card mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">City</label>
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                    >
                      <option value="">All Cities</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Property Type</label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Min Guests</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Any"
                      value={guestsFilter}
                      onChange={(e) => setGuestsFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                    />
                  </div>
                </div>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4 text-accent">
                    <X className="w-3 h-3 mr-1" /> Clear All
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <PropertyMap properties={filtered} />
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No properties match your filters.</p>
              <Button variant="accent" onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
