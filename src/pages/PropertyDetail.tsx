import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, MapPin, Users, Bed, Bath, ChevronLeft, ExternalLink, Check, MessageSquare, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import PropertyImage from "@/components/PropertyImage";
import { whatsappPropertyUrl } from "@/data/properties";
import { useProperty } from "@/hooks/useProperties";
import { motion } from "framer-motion";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: property, isLoading } = useProperty(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Property Not Found</h1>
          <Button variant="accent" className="mt-6" asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const reviews = [
    { name: "Ahmed K.", rating: 5, text: "Absolutely stunning property! The views were incredible and the hosts were very responsive.", date: "Feb 2026" },
    { name: "Sarah M.", rating: 5, text: "A perfect getaway. Clean, well-maintained, and exactly as described. Will definitely return!", date: "Jan 2026" },
    { name: "David R.", rating: 4, text: "Great location and beautiful interiors. Highly recommend for families.", date: "Dec 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/properties" className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors text-sm mb-6">
            <ChevronLeft className="w-4 h-4" /> Back to Properties
          </Link>

          {/* Gallery */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <div className="rounded-xl overflow-hidden aspect-[16/9] mb-3">
              <PropertyImage src={property.images[selectedImage]} alt={property.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all ${
                    i === selectedImage ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <PropertyImage src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Details */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 text-sm mb-2 flex-wrap">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {property.city}, {property.province}
                  </span>
                  <span className="flex items-center gap-1 bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Shield className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{property.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-accent fill-accent" /> {property.rating} ({property.reviews} reviews)</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {property.guests} guests</span>
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.bedrooms} bedrooms</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.bathrooms} bathrooms</span>
                </div>

                <p className="text-foreground/80 leading-relaxed mb-8">{property.description}</p>

                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-accent" /> {a}
                    </div>
                  ))}
                </div>

                {property.googleMapsEmbed && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Location</h2>
                    <div className="rounded-xl overflow-hidden mb-10 aspect-video">
                      <iframe
                        src={property.googleMapsEmbed}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${property.name} location`}
                      />
                    </div>
                  </>
                )}

                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Guest Reviews</h2>
                <div className="space-y-4 mb-10">
                  {reviews.map((review, i) => (
                    <div key={i} className="bg-card rounded-xl p-5 shadow-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-card-foreground">{review.name}</span>
                        <span className="text-muted-foreground text-xs">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-card-foreground/80">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Booking Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl p-6 shadow-elevated sticky top-28"
              >
                <div className="mb-4">
                  <span className="text-2xl font-bold text-card-foreground">PKR {property.price.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm"> / night</span>
                </div>

                <Tabs defaultValue="booking" className="mb-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="booking" className="flex-1">Request Booking</TabsTrigger>
                    <TabsTrigger value="whatsapp" className="flex-1">WhatsApp</TabsTrigger>
                  </TabsList>
                  <TabsContent value="booking" className="mt-3">
                    <BookingForm propertyId={property.id} propertyName={property.name} />
                  </TabsContent>
                  <TabsContent value="whatsapp" className="mt-3 space-y-3">
                    <h3 className="font-display text-lg font-semibold text-card-foreground mb-3">Availability</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-lg border border-border mb-4 pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                    <Button variant="accent" className="w-full" size="lg" asChild>
                      <a href={whatsappPropertyUrl(property.name)} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-4 h-4 mr-2" /> Book via WhatsApp
                      </a>
                    </Button>
                  </TabsContent>
                </Tabs>

                {property.airbnbUrl && (
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href={property.airbnbUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Book on Airbnb
                    </a>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
