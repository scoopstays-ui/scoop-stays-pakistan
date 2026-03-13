# Memory: index.md
Updated: today

# ScoopStays Design System

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
- Mock data in `src/data/properties.ts`
- SEO data in `src/data/seo-pages.ts` (12 locations × 12 property types = 144 pages)
- Pages: Index, Properties, PropertyDetail, Contact, About, SeoLanding, Sitemap
- Shared: Header, Footer, PropertyCard, HeroSearch, PropertyMap
- Dynamic SEO route: `/:slug` maps to SeoLanding page
- react-helmet-async for meta tags
