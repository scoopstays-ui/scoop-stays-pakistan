import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, MapPin, MessageSquare, Headphones, Sparkles, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import PropertyCard from "@/components/PropertyCard";
import { properties, locations, WHATSAPP_BOOKING_URL } from "@/data/properties";
import heroBg from "@/assets/hero-bg.jpg";

const testimonials = [
  { name: "Ali Khan", city: "Lahore", text: "Amazing stay experience. The property was clean and exactly as shown. Highly recommended." },
  { name: "Sarah Ahmed", city: "Karachi", text: "Smooth booking process and very helpful support team." },
  { name: "Usman Raza", city: "Islamabad", text: "Great property and professional management." },
];

const Index = () => {
  const featured = properties.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Luxury stays across Pakistan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent font-medium tracking-widest uppercase text-sm mb-4"
          >
            Short-Term Rentals in Pakistan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Luxury Short-Term <br />
            <span className="text-accent">Stays Across Pakistan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Book premium apartments, farmhouses, and vacation homes with ScoopStays.
          </motion.p>
          <HeroSearch />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
          >
            <Button variant="accent" size="lg" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" /> Book on WhatsApp
              </a>
            </Button>
          </motion.div>
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

      {/* Locations We Serve */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Where We Operate</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-12">Locations We Serve in Pakistan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {locations.map((loc, i) => (
              <motion.div
                key={loc}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-background rounded-xl p-4 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-foreground font-medium text-sm">{loc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ScoopStays */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">The ScoopStays Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "Premium Verified Properties" },
              { icon: MessageSquare, title: "Easy WhatsApp Booking" },
              { icon: MapPin, title: "Prime Locations Across Pakistan" },
              { icon: Headphones, title: "24/7 Customer Support" },
              { icon: Sparkles, title: "Clean & Professionally Managed" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card shadow-card"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-sm font-semibold text-card-foreground">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Guest Reviews</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background rounded-xl p-8 shadow-card text-left relative"
              >
                <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-display font-semibold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Book Your Perfect Stay Today
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8">
            Browse our collection of 100+ luxury properties and find your perfect stay across Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
