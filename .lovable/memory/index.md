ScoopStays design system, architecture, and key decisions

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
- Mock data in `src/data/properties.ts` (12 properties across Pakistan)
- Pages: Index, Properties, PropertyDetail, About, Contact
- Shared: Header, Footer, PropertyCard, HeroSearch, PropertyMap, WhatsAppButton
- WhatsApp URL constants exported from properties.ts
- Social links: Facebook, Instagram, Pinterest
- Email: scoopstays@gmail.com

## Locations Served
Murree, Hunza, Lahore, Karachi, Islamabad, Rawalpindi, Bahria Town Lahore/Islamabad, DHA Lahore/Karachi, Abbottabad, Khara Gali
