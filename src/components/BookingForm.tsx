import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBooking } from "@/hooks/useBookings";

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
}

const BookingForm = ({ propertyId, propertyName }: BookingFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createBooking = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createBooking.mutateAsync({
        property_id: propertyId,
        property_name: propertyName,
        guest_name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        check_in: checkIn ? format(checkIn, "yyyy-MM-dd") : undefined,
        check_out: checkOut ? format(checkOut, "yyyy-MM-dd") : undefined,
        guests: parseInt(guests) || 1,
        message: message.trim() || undefined,
      });
      setSubmitted(true);
    } catch {
      // error handled by mutation
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">
          Request Received!
        </h3>
        <p className="text-muted-foreground text-sm">
          Your booking request has been received. We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={100}
          required
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3XX XXXXXXX"
          maxLength={20}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          maxLength={100}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("w-full justify-start text-left font-normal text-xs", !checkIn && "text-muted-foreground")}>
                <CalendarIcon className="mr-1 h-3 w-3" />
                {checkIn ? format(checkIn, "MMM d") : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(d) => d < new Date()} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("w-full justify-start text-left font-normal text-xs", !checkOut && "text-muted-foreground")}>
                <CalendarIcon className="mr-1 h-3 w-3" />
                {checkOut ? format(checkOut, "MMM d") : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(d) => d < (checkIn || new Date())} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Guests</label>
        <Input
          type="number"
          min={1}
          max={50}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="1"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Message (optional)</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any special requests?"
          maxLength={500}
          rows={2}
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={!name.trim() || createBooking.isPending}
      >
        {createBooking.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        Request Booking
      </Button>
    </form>
  );
};

export default BookingForm;
