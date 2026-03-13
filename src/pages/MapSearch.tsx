import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyMap from "@/components/PropertyMap";
import { properties } from "@/data/properties";
import { motion } from "framer-motion";

const MapSearch = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Map Search – Explore Properties Across Pakistan | ScoopStays</title>
        <meta name="description" content="Explore ScoopStays properties on an interactive map. Find luxury apartments, farmhouses, and vacation homes across Murree, Hunza, Lahore, Karachi, Islamabad and more." />
      </Helmet>
      <Header />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Explore</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Find Stays on the Map</h1>
            <p className="text-muted-foreground mt-2">Click on any pin to preview properties and book instantly via WhatsApp.</p>
          </motion.div>
          <PropertyMap properties={properties} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MapSearch;
