# ScoopStays Design System & Architecture

## Brand Colors (HSL)
- Primary (Teal): 189 72% 21% (#0F4C5C)
- Secondary (Warm Cream): 40 33% 94% (#F6F2EA)
- Accent (Salmon): 11 58% 63% (#D97B66)

## Fonts
- Display: Playfair Display (serif)
- Body: Inter (sans-serif)

## Design Tokens
- Uses shadcn semantic tokens
- Custom: `--gradient-hero`, `--gradient-accent`, `--shadow-card`, `--shadow-elevated`
- Button has custom `accent` variant

## Architecture
- Mock data in `src/data/properties.ts`, `src/data/deals.ts`, `src/data/blog-posts.ts`, `src/data/seo-pages.ts`
- Pages: Index, Properties, PropertyDetail, Contact, About, MapSearch, ListYourProperty, Blog, BlogPost, SeoLanding, Sitemap
- Shared: Header, Footer, PropertyCard, HeroSearch, WhatsAppButton, WhatsAppBookingForm, PropertyMap
- SEO: 144+ programmatic pages via seo-pages.ts, blog articles, destination pages
- WhatsApp number: +923165648659
