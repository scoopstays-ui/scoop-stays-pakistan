import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { properties, WHATSAPP_BOOKING_URL } from "@/data/properties";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button variant="accent" asChild><Link to="/blog">Back to Blog</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = properties.filter((p) => p.city.toLowerCase().includes(post.location.toLowerCase())).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
      </Helmet>
      <Header />
      <article className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 break-words">{post.title}</h1>
            <div className="prose prose-lg max-w-none">
              {post.content.map((para, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Related Properties */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6">Stays in {post.location}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-xl p-6 sm:p-8 text-center">
            <h3 className="font-display text-lg sm:text-xl font-bold text-primary-foreground mb-3">Book Your Stay in {post.location}</h3>
            <p className="text-primary-foreground/60 text-sm mb-6">Find the perfect accommodation for your {post.location} trip.</p>
            <Button variant="accent" asChild>
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" /> Book via WhatsApp
              </a>
            </Button>
          </div>

          {/* Internal Links */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/properties" className="text-accent text-sm hover:underline">All Properties</Link>
            <Link to="/about" className="text-accent text-sm hover:underline">About ScoopStays</Link>
            <Link to="/contact" className="text-accent text-sm hover:underline">Contact Us</Link>
            <Link to="/blog" className="text-accent text-sm hover:underline">More Articles</Link>
            <Link to="/list-your-property" className="text-accent text-sm hover:underline">List Your Property</Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
