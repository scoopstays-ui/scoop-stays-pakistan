# Full Responsive Pass

Goal: make every page render cleanly on mobile (360–430px), tablet (768–1024px), and desktop (1280px+). No layout changes to the design language — just fixes so nothing overflows, overlaps, or cuts off.

## Approach

1. **Audit** each page with Playwright at 3 viewports (390 / 820 / 1440), capture screenshots, catalog issues.
2. **Fix** by category (below), reusing existing Tailwind tokens and shadcn primitives. No new colors, fonts, or components.
3. **Re-verify** the same screenshots pass after fixes.

## Scope

**Public**: Index, Properties, PropertyDetail, MapSearch, Blog, BlogPost, ListYourProperty, About, Contact, SeoLanding, Sitemap, NotFound
**Admin**: AdminLayout, Dashboard, Properties, PropertyForm, Bookings, CMS, Activity, Login, ResetPassword
**Shared**: Header, Footer, HeroSearch, PropertyCard, StickyBookButton, WhatsAppBookingForm, PropertyMap, AdminSidebar

## Fix categories (applied wherever found)

- **Overflow**: add `overflow-x-hidden` on `body`, `min-w-0` on flex children, `break-words` on long strings (emails, URLs, property names).
- **Grids**: normalize to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` patterns; stats/deals from 2→4 at `md`.
- **Hero**: reduce `h-screen min-h-[700px]` on mobile (`min-h-[560px]`), scale headline (`text-3xl sm:text-4xl md:text-6xl lg:text-7xl`), stack CTA buttons full-width on mobile.
- **HeroSearch**: stack fields vertically on mobile, grid on `md+`.
- **Header**: keep mobile drawer; ensure phone number hides on `<lg`, logo doesn't wrap.
- **Admin tables**: wrap in `overflow-x-auto` container with `min-w-full`; convert dense tables to card list on `<md` where practical (Bookings, Activity, Properties).
- **AdminSidebar**: verify `collapsible="icon"` behavior on tablet; ensure trigger stays visible.
- **AdminCMS / AdminPropertyForm**: form grids `grid-cols-1 md:grid-cols-2`, full-width inputs, sticky action bar on mobile.
- **PropertyDetail**: image gallery → single column mobile, 2-col tablet, sidebar booking card stacks below content on `<lg`.
- **MapSearch**: split map/list becomes tabbed (Map | List) toggle on `<md`.
- **StickyBookButton**: ensure it doesn't cover footer CTAs; add bottom padding to page on mobile.
- **Typography**: cap display sizes with responsive steps; body min 14px.
- **Spacing**: sections use `py-12 md:py-16 lg:py-20`; containers `px-4 md:px-6 lg:px-8`.
- **Images**: `w-full h-auto` with fixed aspect via `aspect-*` utilities to prevent CLS.

## Verification

Playwright script captures each route at 390/820/1440, screenshots saved to `/tmp/browser/responsive/`. Manual review of each before/after, plus a check that no horizontal scrollbar appears at any breakpoint.

## Out of scope

- Redesigns, new components, color/font changes
- Business logic, data model, auth changes
- Admin table → card conversions beyond the 3 noted (Bookings, Activity, Properties)
