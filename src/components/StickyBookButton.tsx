import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_BOOKING_URL } from "@/data/properties";
import { motion, AnimatePresence } from "framer-motion";

const StickyBookButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
          <Button variant="accent" size="lg" className="shadow-elevated rounded-full px-8" asChild>
            <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-4 h-4 mr-2" /> Book Now
            </a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBookButton;
