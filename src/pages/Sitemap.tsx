import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seoLocations, seoPropertyTypes, allSeoPages } from "@/data/seo-pages";

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>All Locations & Stays in Pakistan | ScoopStays</title>
        <meta name="description" content="Browse all short-term rental locations and property types across Pakistan. Find farmhouses, apartments, luxury villas, and vacation homes with ScoopStays." />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
            All Locations & Stays
          </h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore {allSeoPages.length}+ pages covering short-term rentals across Pakistan.
          </p>

          {seoLocations.map((location) => (
            <div key={location.slug} className="mb-12">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                {location.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {seoPropertyTypes.map((type) => {
                  const slug = `${location.slug}-${type.slug}`;
                  return (
                    <Link
                      key={slug}
                      to={`/${slug}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {type.plural} in {location.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Sitemap;
