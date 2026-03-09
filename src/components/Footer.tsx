import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4">
              Scoop<span className="text-accent">Stays</span>
            </h3>
            <p className="text-primary-foreground/60 max-w-md leading-relaxed">
              Discover Pakistan's finest short-term rental properties. From mountain lodges to coastal villas, experience luxury hospitality across 100+ curated stays.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Properties" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-primary-foreground/60 hover:text-accent transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <a href="https://wa.me/923165648659" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +92 316 5648659
              </a>
              <a href="mailto:info@scoopstays.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> info@scoopstays.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Pakistan
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} ScoopStays. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
