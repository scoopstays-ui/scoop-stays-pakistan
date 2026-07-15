import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/map-search", label: "Map" },
  { to: "/blog", label: "Blog" },
  { to: "/list-your-property", label: "List Property" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isHome ? "bg-primary/80 backdrop-blur-md" : "bg-primary shadow-elevated"}`}>
      <div className="container mx-auto flex items-center justify-between gap-3 py-4 px-4 lg:px-8">
        <Link to="/" className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary-foreground whitespace-nowrap">
          Scoop<span className="text-accent">Stays</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-primary-foreground/80 hover:text-accent transition-colors text-xs xl:text-sm font-medium tracking-wide uppercase whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="https://wa.me/923165648659" className="hidden xl:flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors text-sm whitespace-nowrap">
            <Phone className="w-4 h-4" /> +92 316 5648659
          </a>
          <Button variant="accent" size="sm" asChild>
            <Link to="/properties">Book Now</Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-primary border-t border-primary-foreground/10">
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium py-2">
                  {link.label}
                </Link>
              ))}
              <a href="https://wa.me/923165648659" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors text-sm py-2">
                <Phone className="w-4 h-4" /> +92 316 5648659
              </a>
              <Button variant="accent" size="sm" asChild>
                <Link to="/properties" onClick={() => setOpen(false)}>Book Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
