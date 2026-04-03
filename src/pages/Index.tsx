import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, MapPin, MessageSquare, Headphones, Sparkles, Quote, Tag, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppBookingForm from "@/components/WhatsAppBookingForm";
import StickyBookButton from "@/components/StickyBookButton";
import { locations, WHATSAPP_BOOKING_URL } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { getDealsWithProperties } from "@/data/deals";
import heroBg from "@/assets/hero-bg.jpg";

const testimonials = [
  { name: "Ali Khan", city: "Lahore", text: "Amazing stay experience. The property was clean and exactly as shown. Highly recommended." },
  { name: "Sarah Ahmed", city: "Karachi", text: "Smooth booking process and very helpful support team." },
  { name: "Usman Raza", city: "Islamabad", text: "Great property and professional management." },
];

const Index = () => {
  const { data: properties = [] } = useProperties();
  const featured = properties.slice(0, 6);
  const dealsWithProps = getDealsWithProperties();

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
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
            Short-Term Rentals in Pakistan
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Verified Stays <br />
            <span className="text-accent">Across Pakistan</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Book directly. No hidden fees. Trusted by 5000+ guests.
          </motion.p>
          <HeroSearch />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
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
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-4xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Deals */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Limited Time</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Special Deals & Offers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealsWithProps.map((deal, i) => (
              <motion.div
                key={deal.propertyId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl shadow-card overflow-hidden group"
              >
                <div className="relative">
                  <img src={deal.property.image} alt={deal.label} className="w-full h-40 object-cover" />
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {deal.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-card-foreground text-sm mb-1">{deal.label}</h3>
                  <p className="text-muted-foreground text-xs mb-2">{deal.property.city}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-muted-foreground line-through text-xs">PKR {deal.originalPrice.toLocaleString()}</span>
                    <span className="text-accent font-bold text-sm">PKR {deal.discountedPrice.toLocaleString()}/night</span>
                  </div>
                  <WhatsAppBookingForm propertyName={deal.property.name} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground">Featured Properties</h2>
            </div>
            <Button variant="ghost" className="text-accent hover:text-accent/80" asChild>
              <Link to="/properties">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Where We Operate</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Locations We Serve in Pakistan</h2>
          <p className="text-muted-foreground mb-4">
            <Link to="/map-search" className="inline-flex items-center gap-2 text-accent hover:underline">
              <Map className="w-4 h-4" /> Explore on Map
            </Link>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {locations.map((loc, i) => {
              const locSlug = loc.toLowerCase().replace(/\s+/g, "-");
              return (
                <motion.div key={loc} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/${locSlug}-vacation-rentals`} className="block bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-shadow">
                    <MapPin className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-foreground font-medium text-sm">{loc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ScoopStays */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-12">The ScoopStays Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "Premium Verified Properties" },
              { icon: MessageSquare, title: "Easy WhatsApp Booking" },
              { icon: MapPin, title: "Prime Locations Across Pakistan" },
              { icon: Headphones, title: "24/7 Customer Support" },
              { icon: Sparkles, title: "Clean & Professionally Managed" },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-background shadow-card">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Guest Reviews</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-card rounded-xl p-8 shadow-card text-left relative">
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Book Your Perfect Stay Today</h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8">Browse our collection of 100+ luxury properties and find your perfect stay across Pakistan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">Book via WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBookButton />
    </div>
  );
};

export default Index;
