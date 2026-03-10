# OmniSphere

## Current State
React + TypeScript frontend-only app. Has HomePage, ArticlePage, CategoryPage, AboutPage. Features: dark mode, search, newsletter, article cards, phone cards with price filter and compare, browse-by-budget section. No quiz, no deal section, no EMI calculator, no reviews system.

## Requested Changes (Diff)

### Add
1. **PhoneQuiz component** - Floating red "Find My Phone" button (bottom right, fixed). Opens fullscreen modal with 5-step quiz (Budget, Priority, Usage, 5G, Brand). Progress bar (Step X of 5). Results show Top 3 matched phones with specs + Amazon buy button + WhatsApp share.
2. **DealOfTheDay component** - Eye-catching section on Homepage with red background. Countdown timer (resets every 24h). Featured phone: original price (strikethrough), deal price (big white), discount % badge, Amazon+Flipkart buttons, "X people viewing" counter.
3. **EmiCalculator component** - Widget on Homepage. Input: phone price. Select: tenure (3/6/9/12 months). Select: bank (HDFC/SBI/ICICI/Axis/All). Output: monthly EMI, total payable, total interest. Apply EMI button. Smooth animation on calculate.
4. **ReviewSystem component** - On ArticlePage for phone articles. Star rating 1-5. Review form: Name, Rating, Review text, Pros, Cons. Verified Buyer badge. Sort by Most Recent/Most Helpful/Highest Rated. Average rating display. Rating breakdown bar chart. Thumbs up/down on reviews. State stored in localStorage.

### Modify
- HomePage: Add DealOfTheDay section (after hero or before newsletter), EmiCalculator section, PhoneQuiz floating button
- ArticlePage: Add ReviewSystem section for phone-category articles
- App.tsx: Import PhoneQuiz as global floating button

### Remove
Nothing removed.

## Implementation Plan
1. Create `src/components/PhoneQuiz.tsx` - quiz modal with phone data matching logic
2. Create `src/components/DealOfTheDay.tsx` - countdown timer, deal display, viewer counter
3. Create `src/components/EmiCalculator.tsx` - EMI calculation widget
4. Create `src/components/ReviewSystem.tsx` - full review system with localStorage persistence
5. Update `HomePage.tsx` to include DealOfTheDay + EmiCalculator sections
6. Update `ArticlePage.tsx` to include ReviewSystem for phone articles
7. Update `App.tsx` to include PhoneQuiz floating button globally
