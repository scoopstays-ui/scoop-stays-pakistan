import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Travel Blog – Pakistan Travel Guides & Tips | ScoopStays</title>
        <meta name="description" content="Read travel guides, tips, and destination articles for Pakistan. Plan your perfect trip to Murree, Hunza, Lahore, and more with ScoopStays." />
      </Helmet>
      <Header />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Travel Guides</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">ScoopStays Blog</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Destination guides, travel tips, and insider knowledge for your next trip across Pakistan.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block bg-card rounded-xl shadow-card hover:shadow-elevated transition-shadow overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                      <span className="ml-auto bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">{post.location}</span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-accent text-sm font-medium inline-flex items-center gap-1">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
