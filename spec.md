# OmniSphere — SEO & Performance Optimization

## Current State
OmniSphere is a Hinglish tech blog built in React + TypeScript. The site has good foundational SEO (meta tags, OG, Twitter Card, structured data), but has several issues: render-blocking Google Fonts, missing WebP image format for Unsplash CDN images, inline SVG favicon, canonical pointing to wrong domain (`omnisphere.tech` vs actual `omnishpere.in`), no custom 404 page, and images missing lazy loading and proper aspect-ratio containment.

## Requested Changes (Diff)

### Add
- Custom 404 NotFoundPage with helpful navigation links to Home, Phones, Laptops, Articles
- `notFoundRoute` registered in App.tsx router
- Preload hint for hero image (LCP optimization)
- `dns-prefetch` for AdSense domain

### Modify
- **index.html**:
  - Title: Add keywords 'tech blog, gadget reviews, smartphones, Hinglish' — new title: "OmniSphere — Tech Blog, Gadget Reviews & Smartphones in Hinglish | India"
  - Meta description: Include 'tech blog, gadget reviews, smartphones, Hinglish'
  - Meta keywords: Update to include all four target keywords prominently
  - Canonical URL: Fix from `https://omnisphere.tech` to `https://omnishpere.in`
  - og:url and twitter:url: Fix to `https://omnishpere.in`
  - Structured data URLs: Fix to `omnishpere.in`
  - Google Fonts: Make non-render-blocking using `rel="preload" as="style"` + `onload` pattern + `<noscript>` fallback
  - AdSense: Already has `async`, add `dns-prefetch` for pagead2.googlesyndication.com
  - Favicon: Use proper `<link rel="icon">` with SVG data URI (already present, keep)
  - Add `<meta name="format-detection">` to suppress phone number auto-detection

- **All Unsplash image URLs**: Append `&fm=webp` to convert to WebP format, reducing image size ~30%
  - Hero image: add `&fm=webp`
  - Fallback images: add `&fm=webp`  
  - Article images in posts data: add `&fm=webp`
  - Phone/laptop images: add `&fm=webp`

- **PhoneCard.tsx**: Add `loading="lazy"` to phone card images, add `width` and `height` attributes for aspect ratio
- **LaptopCard.tsx**: Add `loading="lazy"` to laptop card images
- **HomePage.tsx**: 
  - Hero image: add `fetchpriority="high"` for LCP, add `&fm=webp`
  - Upcoming device images: add `loading="lazy"`
  - H1 heading: The hero h1 text in translations should reflect keywords — update hero badge text to include 'tech blog, gadget reviews, smartphones, Hinglish'

- **i18n/translations.ts**: Update hero tagline/desc to naturally include the target keywords 'tech blog, gadget reviews, smartphones, Hinglish'

### Remove
- Nothing to remove

## Implementation Plan
1. Update `src/frontend/index.html` — fix canonical, title, meta description, non-render-blocking fonts
2. Create `src/frontend/src/pages/NotFoundPage.tsx` — 404 page with nav links
3. Update `src/frontend/src/App.tsx` — add notFoundRoute
4. Add `&fm=webp` to all Unsplash image URLs across data files and components
5. Add `loading="lazy"` to PhoneCard, LaptopCard, upcoming device images
6. Add `fetchpriority="high"` to hero image in HomePage
7. Ensure all image containers use proper aspect ratio (aspect-video or explicit h- classes with object-cover)
