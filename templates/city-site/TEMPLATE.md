# TEMPLATE: City Epoxy Site
## Type: Local Service Landing Page
## Use Case: 70-city epoxy network (Phoenix, Dallas, Houston, etc.)

### Routes
- `/` — Hero + services + gallery + reviews + CTA
- `/gallery` — Before/after gallery
- `/contact` — Lead form → Base44 OutreachQueue
- `/quote` — Instant quote calculator

### Required ENV
```
NEXT_PUBLIC_CITY=Phoenix
NEXT_PUBLIC_STATE=AZ
NEXT_PUBLIC_PHONE=+16025550123
NEXT_PUBLIC_BUSINESS_NAME=Phoenix Epoxy Pros
```

### Design
- White/light gray bg
- Gold CTAs (#f8b800)
- Hero: full-width image with overlay
- 10-section law applies
- Mobile-first

### Components
- HeroSection (bg image + headline + gold CTA)
- ServiceCards (3 cols: Epoxy, Polished Concrete, Metallic)
- BeforeAfterGallery (6+ pairs)
- ReviewsCarousel (Google/Yelp stars)
- LeadCaptureForm → Base44 OutreachQueue
- ServiceAreas (city/zip list or map)
- FAQ (schema markup)
