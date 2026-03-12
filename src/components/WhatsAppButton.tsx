import { MessageCircle } from "lucide-react";
import { WHATSAPP_BOOKING_URL } from "@/data/properties";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
