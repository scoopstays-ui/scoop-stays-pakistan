import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calculator, MessageSquare, Home, TrendingUp, Users, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WHATSAPP_URL } from "@/data/properties";

const earningsData: Record<string, Record<string, number>> = {
  murree: { apartment: 6000, farmhouse: 12000, villa: 15000, house: 8000 },
  hunza: { apartment: 5000, farmhouse: 10000, villa: 14000, house: 7000 },
  lahore: { apartment: 5500, farmhouse: 11000, villa: 16000, house: 7500 },
  karachi: { apartment: 7000, farmhouse: 13000, villa: 18000, house: 9000 },
  islamabad: { apartment: 6500, farmhouse: 12000, villa: 17000, house: 8500 },
  rawalpindi: { apartment: 5000, farmhouse: 9000, villa: 13000, house: 7000 },
  abbottabad: { apartment: 4500, farmhouse: 8000, villa: 12000, house: 6000 },
  "khara gali": { apartment: 4000, farmhouse: 9000, villa: 11000, house: 5500 },
  "dha lahore": { apartment: 7000, farmhouse: 14000, villa: 20000, house: 10000 },
  "dha karachi": { apartment: 8000, farmhouse: 15000, villa: 22000, house: 11000 },
  "bahria town lahore": { apartment: 6000, farmhouse: 12000, villa: 18000, house: 8000 },
  "bahria town islamabad": { apartment: 5500, farmhouse: 11000, villa: 16000, house: 7500 },
};

const ListYourProperty = () => {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [earnings, setEarnings] = useState<number | null>(null);

  const calculate = () => {
    const cityKey = city.toLowerCase();
    const typeKey = type.toLowerCase();
    const base = earningsData[cityKey]?.[typeKey] || 6000;
    const beds = parseInt(bedrooms) || 1;
    const monthly = base * beds * 20; // ~20 nights/month occupancy
    setEarnings(monthly);
  };

  const whatsappListUrl = `${WHATSAPP_URL}?text=${encodeURIComponent("Hello, I want to list my property with ScoopStays.")}`;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>List Your Property | Earn Passive Income | ScoopStays Pakistan</title>
        <meta name="description" content="List your apartment, farmhouse, or villa on ScoopStays and earn passive income through short-term rentals across Pakistan." />
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pb-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Earn Passive Income with <span className="text-accent">ScoopStays</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-foreground/60 max-w-2xl mx-auto text-base md:text-lg">
            List your apartment, house, or farmhouse and let us handle everything — from marketing to guest management.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 sm:p-8 shadow-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-card-foreground">Earnings Calculator</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(earningsData).map((c) => (
                      <SelectItem key={c} value={c}>{c.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Property Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {["Apartment", "Farmhouse", "Villa", "House"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Number of Bedrooms</label>
                <Input type="number" min={1} max={20} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="e.g. 3" />
              </div>
              <Button variant="accent" className="w-full" onClick={calculate} disabled={!city || !type || !bedrooms}>
                Calculate Earnings
              </Button>
              {earnings !== null && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-accent/10 rounded-xl p-6 text-center mt-4">
                  <p className="text-muted-foreground text-sm mb-1">Estimated Monthly Earnings</p>
                  <p className="font-display text-3xl font-bold text-accent">PKR {earnings.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Your property in {city.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} could earn approximately PKR {earnings.toLocaleString()} per month with ScoopStays.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-card-foreground mb-10 md:mb-12">What We Handle For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Home, title: "Listing & Marketing", desc: "Professional photography, listing creation, and marketing across platforms." },
              { icon: Users, title: "Guest Management", desc: "We handle all guest communication, check-ins, and support 24/7." },
              { icon: TrendingUp, title: "Pricing Optimization", desc: "Dynamic pricing strategies to maximize your occupancy and revenue." },
              { icon: Shield, title: "Property Care", desc: "Regular cleaning, maintenance coordination, and quality inspections." },
              { icon: MessageSquare, title: "Booking Management", desc: "Seamless booking flow with calendar sync and instant confirmations." },
              { icon: Calculator, title: "Financial Reports", desc: "Monthly earnings reports and transparent fee breakdowns." },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background rounded-xl p-6 shadow-card">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">Ready to Start Earning?</h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8">Contact us on WhatsApp to list your property with ScoopStays. No hassle, full management.</p>
          <Button variant="accent" size="lg" asChild>
            <a href={whatsappListUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-4 h-4 mr-2" /> Contact Us on WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListYourProperty;
