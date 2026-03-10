# OmniSphere — Features 5-10

## Current State
OmniSphere is a React + TypeScript Hinglish tech blog/phone discovery platform. It has:
- Homepage with hero, featured posts, deal of the day, categories, latest articles, EMI calculator, newsletter
- Header with dark mode toggle and basic search input
- Phone quiz modal (PhoneQuiz component)
- Article, Category, About pages
- No phone data model yet (phones exist only in quiz/deal components as inline data)
- No wishlist, no smart search, no trending section, no expert scores, no price tracking

## Requested Changes (Diff)

### Add
- **phones.ts** — Central phone data file with 8 phones, each having: amazonPrice, flipkartPrice, originalPrice (for price drop badge), expertScore + 5 sub-scores, priceHistory (30-day array), trending data (viewsToday, isNewLaunch, priceTrend), and top 5 specs
- **LivePriceTracker component** — Amazon (blue) + Flipkart (yellow) price tags on phone cards; "Lowest Price" green badge; "Price Drop!" red badge when discounted; price history sparkline graph (SVG); "Set Price Alert" modal (email + target price, localStorage stored, confirmation message)
- **ExpertScore component** — Animated circular score gauge (SVG/CSS), 5 sub-score progress bars with color coding (green 8-10, orange 6-7, red <6), "OmniSphere Recommended" gold badge for 8+ score
- **TrendingSection component** — "Trending This Week" homepage section; 5 phone cards with fire emoji, views counter, price change indicator (↑↓), New Launch/Price Drop badges; auto-scrolling carousel on mobile
- **QuickSpecsPopup component** — Hover (desktop) / long-press (mobile) popup on phone name; shows image, top 5 specs, price, star rating, Full Review link; smooth fade animation
- **WishlistPage** — Route /wishlist; heart icon on every phone card (saves to localStorage); "My Saved Phones" page listing saved phones
- **ShareButtons component** — WhatsApp, Twitter/X, Copy link buttons; Download Comparison as Image (html2canvas or CSS print approach with OmniSphere watermark)
- **SmartSearch** — Enhanced header search: autocomplete dropdown with phone names, categories, recent searches, popular searches; keyboard navigation (arrow keys); spec-query parsing ("8GB RAM under 15000"); voice search button (Web Speech API)

### Modify
- **App.tsx** — Add /wishlist route
- **HomePage.tsx** — Add TrendingSection between Featured Posts and Deal of the Day
- **Header.tsx** — Replace basic search input with SmartSearch component
- **PhoneCard component** — Integrate LivePriceTracker, ExpertScore, heart/wishlist icon, QuickSpecsPopup on phone name hover

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/data/phones.ts` with 8 phones including all new fields
2. Create `LivePriceTracker.tsx` — price tags, badges, sparkline, price alert modal
3. Create `ExpertScore.tsx` — circular animated score + sub-score bars
4. Create `PhoneCard.tsx` — unified phone card integrating price tracker, expert score, heart icon, quick specs popup
5. Create `TrendingSection.tsx` — trending phones carousel/grid
6. Create `QuickSpecsPopup.tsx` — hover/long-press popup
7. Create `WishlistPage.tsx` — saved phones from localStorage
8. Create `ShareButtons.tsx` — social share + download as image
9. Update `Header.tsx` with SmartSearch — autocomplete, keyboard nav, voice search
10. Update `HomePage.tsx` — add TrendingSection
11. Update `App.tsx` — add /wishlist route, add Wishlist nav
