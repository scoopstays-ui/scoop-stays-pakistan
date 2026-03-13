import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { properties } from "@/data/properties";

const WhatsAppBookingForm = ({ propertyName }: { propertyName?: string }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(propertyName || "");

  const handleSubmit = () => {
    const message = `Hello, I want to book a property from ScoopStays.

Property: ${selectedProperty}
Guest Name: ${name}
Phone: ${phone}
Check-in: ${checkIn ? format(checkIn, "PPP") : "Not selected"}
Check-out: ${checkOut ? format(checkOut, "PPP") : "Not selected"}
Guests: ${guests}`;

    window.open(`https://wa.me/923165648659?text=${encodeURIComponent(message)}`, "_blank");
  };

  const isValid = name.trim() && selectedProperty;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="accent" className="gap-2">
          <MessageSquare className="w-4 h-4" /> Book on WhatsApp
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Book via WhatsApp</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Guest Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" maxLength={100} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 3XX XXXXXXX" maxLength={20} />
          </div>
          {!propertyName && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Select Property *</label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger><SelectValue placeholder="Choose a property" /></SelectTrigger>
                <SelectContent>
                  {properties.map((p) => (
                    <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PP") : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(d) => d < new Date()} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PP") : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(d) => d < (checkIn || new Date())} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Number of Guests</label>
            <Input type="number" min={1} max={50} value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 4" />
          </div>
          <Button variant="accent" className="w-full gap-2" onClick={handleSubmit} disabled={!isValid}>
            <MessageSquare className="w-4 h-4" /> Send Booking on WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppBookingForm;
