import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { WHATSAPP_URL } from "@/data/properties";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/share/1HjSA4nFEB/?mibextid=wwXIfr" },
  { name: "Instagram", url: "https://www.instagram.com/scoopstays?igsh=M24xajZjcnZvcXh0&utm_source=qr" },
  { name: "Pinterest", url: "https://pin.it/6gxM2d8Op" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">We'd love to hear from you</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking for your next stay or want to list your property with ScoopStays, reach out and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-accent transition-colors">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                    <p className="font-medium">+92 316 5648659</p>
                  </div>
                </a>
                <a href="mailto:scoopstays@gmail.com" className="flex items-center gap-4 text-foreground hover:text-accent transition-colors">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">scoopstays@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">Follow us on social media</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 shadow-card"
            >
              <div className="space-y-5">
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone", key: "phone", type: "tel", placeholder: "+92 300 0000000" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.key !== "phone"}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">Message</label>
                  <textarea
                    placeholder="Tell us about your trip or inquiry..."
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-accent/30 transition-shadow resize-none"
                  />
                </div>
                <Button variant="accent" type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
