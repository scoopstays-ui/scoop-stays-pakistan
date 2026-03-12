import { motion } from "framer-motion";
import { Shield, Home, Users, Headphones, Sparkles, BarChart3, MessageSquare, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/data/properties";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="pt-24 pb-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Who We Are</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">About ScoopStays</h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
              ScoopStays is a short-term rental platform in Pakistan offering comfortable and premium stays across major cities and tourist destinations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              We provide fully furnished apartments, vacation homes, and luxury properties for travelers, families, and business guests.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed mb-12">
              Our goal is to provide a smooth booking experience, reliable service, and high-quality accommodation across Pakistan.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {[
              { icon: Shield, title: "Premium Verified Properties", desc: "Every property is personally vetted for quality, cleanliness, and hospitality standards." },
              { icon: MessageSquare, title: "Easy WhatsApp Booking", desc: "Book your stay instantly through WhatsApp for a seamless experience." },
              { icon: Globe, title: "Prime Locations Across Pakistan", desc: "From Hunza to Karachi, find stays in the best locations nationwide." },
              { icon: Headphones, title: "24/7 Customer Support", desc: "Our team is available around the clock to assist with any queries." },
              { icon: Sparkles, title: "Clean & Professionally Managed", desc: "All properties are professionally cleaned and maintained to premium standards." },
              { icon: Users, title: "Trusted by 5000+ Guests", desc: "Join thousands of happy guests who have experienced ScoopStays hospitality." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-card shadow-card"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">For Property Owners</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              List Your Property With ScoopStays
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              If you own an apartment, house, or farmhouse, ScoopStays can help you earn passive income through short-term rentals. We provide full property management services without you managing day-to-day operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: Home, text: "Creating and managing listings" },
              { icon: BarChart3, text: "Professional marketing" },
              { icon: Users, text: "Handling guest bookings" },
              { icon: Sparkles, text: "Pricing optimization" },
              { icon: MessageSquare, text: "Guest communication and support" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-background"
              >
                <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="accent" size="lg" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Contact Us on WhatsApp to List Your Property
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
