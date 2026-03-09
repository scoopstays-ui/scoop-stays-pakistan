import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featured = properties.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Luxury mountain lodge in Pakistan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent font-medium tracking-widest uppercase text-sm mb-4"
          >
            Luxury Stays Across Pakistan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Discover Pakistan's <br />
            <span className="text-accent">Finest Retreats</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            100+ curated short-term rental properties — from Himalayan lodges to coastal villas, managed by ScoopStays.
          </motion.p>
          <HeroSearch />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100+", label: "Properties" },
              { value: "15+", label: "Cities" },
              { value: "4.8", label: "Avg Rating" },
              { value: "5000+", label: "Happy Guests" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Featured Properties</h2>
            </div>
            <Button variant="ghost" className="text-accent hover:text-accent/80" asChild>
              <Link to="/properties">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why ScoopStays */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-12">The ScoopStays Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Verified Properties", desc: "Every property is personally vetted to ensure quality, cleanliness, and premium hospitality standards." },
              { icon: Star, title: "Seamless Booking", desc: "Book directly or via Airbnb with synced calendars to prevent double bookings." },
              { icon: MapPin, title: "Local Expertise", desc: "Our team across Pakistan provides 24/7 support and curated local experiences." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-xl bg-background shadow-card"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Explore Pakistan?
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8">
            Browse our collection of 100+ luxury properties and find your perfect stay.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/properties">Browse All Properties</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
