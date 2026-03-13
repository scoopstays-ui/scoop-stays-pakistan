import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { getSeoPageBySlug, allSeoPages } from "@/data/seo-pages";
import { properties, WHATSAPP_BOOKING_URL } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Star, Shield, Clock, Home, ArrowRight } from "lucide-react";

const SeoLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const page = getSeoPageBySlug(slug || "");

  useEffect(() => {
    if (!page) navigate("/404", { replace: true });
  }, [page, navigate]);

  if (!page) return null;

  const { location, propertyType } = page;

  // Filter properties matching this location
  const matchedProperties = properties.filter(
    (p) =>
      p.city.toLowerCase().includes(location.name.toLowerCase()) ||
      location.name.toLowerCase().includes(p.city.toLowerCase())
  );

  // Related SEO pages (same location, different type)
  const relatedByLocation = allSeoPages
    .filter((p) => p.location.slug === location.slug && p.slug !== page.slug)
    .slice(0, 6);

  // Related SEO pages (same type, different location)
  const relatedByType = allSeoPages
    .filter((p) => p.propertyType.slug === propertyType.slug && p.slug !== page.slug)
    .slice(0, 6);

  const benefits = [
    { icon: Shield, title: "Premium Verified Properties", desc: "Every property is personally inspected and verified for quality and comfort." },
    { icon: MessageCircle, title: "Easy WhatsApp Booking", desc: "Book your stay instantly through WhatsApp — no complicated forms or apps needed." },
    { icon: MapPin, title: "Prime Locations", desc: `Properties in the best areas of ${location.name} and across Pakistan.` },
    { icon: Clock, title: "24/7 Customer Support", desc: "Our team is available around the clock to assist with your stay." },
    { icon: Star, title: "Professionally Managed", desc: "Clean, well-maintained properties with professional housekeeping." },
    { icon: Home, title: "Flexible Options", desc: "From budget apartments to luxury villas — find the perfect stay for any occasion." },
  ];

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={`https://scoop-stays-pakistan.lovable.app/${page.slug}`} />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              {location.name}, {location.province}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {page.h1}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Discover premium {propertyType.plural.toLowerCase()} in {location.name}. ScoopStays offers verified, professionally managed properties for families, couples, and business travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="accent" className="text-base">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" /> Book on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
              About {location.name} — A Top Destination in Pakistan
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>{location.description}</p>
              <p>
                Whether you're planning a weekend getaway, a family vacation, or a business trip, {location.name} has something for everyone.
                ScoopStays makes it easy to find and book the perfect {propertyType.name.toLowerCase()} with just a WhatsApp message.
                Our properties are fully furnished, professionally cleaned, and located in the best areas of {location.name}.
              </p>
              <p>
                From scenic views to comfortable interiors, our {propertyType.plural.toLowerCase()} provide everything you need for a memorable stay.
                All bookings are handled quickly through WhatsApp for a hassle-free experience.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              Featured {propertyType.plural} in {location.name}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Browse our hand-picked selection of {propertyType.plural.toLowerCase()} available for short-term rental in {location.name}.
            </p>

            {matchedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border">
                <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  Properties Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We're adding new {propertyType.plural.toLowerCase()} in {location.name}. Contact us on WhatsApp to check current availability.
                </p>
                <Button asChild variant="accent">
                  <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> Check Availability on WhatsApp
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose ScoopStays */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              Why Choose ScoopStays in {location.name}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We make finding and booking {propertyType.plural.toLowerCase()} simple, reliable, and stress-free.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow">
                  <benefit.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Things to Do Nearby */}
        {location.attractions.length > 0 && (
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
                Things to Do in {location.name}
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                Explore top attractions and activities near your stay in {location.name}.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {location.attractions.map((attraction, i) => (
                  <div key={i} className="bg-card p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                    <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                    <span className="text-sm font-medium text-primary">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links - Related Pages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
              Explore More Stays
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Same location, different types */}
              {relatedByLocation.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-4">
                    More in {location.name}
                  </h3>
                  <ul className="space-y-2">
                    {relatedByLocation.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/${p.slug}`}
                          className="flex items-center text-muted-foreground hover:text-accent transition-colors text-sm"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Same type, different locations */}
              {relatedByType.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-4">
                    {propertyType.plural} in Other Cities
                  </h3>
                  <ul className="space-y-2">
                    {relatedByType.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/${p.slug}`}
                          className="flex items-center text-muted-foreground hover:text-accent transition-colors text-sm"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick links to main pages */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/properties">All Properties</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/about">About ScoopStays</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Book Your Stay in {location.name} Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Find the perfect {propertyType.name.toLowerCase()} in {location.name}. Book instantly through WhatsApp — no apps, no complicated forms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="accent" className="text-base">
                <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/properties">Browse All Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SeoLanding;
