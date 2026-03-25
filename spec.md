# OmniSphere

## Current State
Fully functional Hinglish tech blog with Home, Article, Category, About, Contact, Privacy, Disclaimer, Terms, Admin, Wishlist, HireUs pages. Has OmniBot chatbot, PhoneQuiz, EMI Calculator, Deal of the Day, Newsletter, Dark Mode, Language Toggle, SEO, AdSense script in head, TOC sidebar in articles, trending section on homepage.

## Requested Changes (Diff)

### Add
- Article sidebar: Trending posts widget, Categories widget, Recent posts widget, AdSense sidebar placeholder — visible on desktop (md:block)
- Category page sidebar: same 3 widgets + AdSense sidebar placeholder
- In-article AdSense placeholder — injected after 2nd paragraph in article content
- Admin Auto Scheduler tab: topic queue input, daily schedule toggle, "Test Now" button, scheduled topics list

### Modify
- ArticlePage: widen layout from max-w-5xl to accommodate 3-column (content + TOC + sidebar), or keep 2-col (content+sidebar) with TOC inside content; add AdSense placeholder inside article after 2nd paragraph
- CategoryPage: add right sidebar with widgets
- AdminPage: add tabs (Subscribers, API Key, Auto Scheduler)

### Remove
- Nothing

## Implementation Plan
1. Create `ArticleSidebar.tsx` component with: Trending posts (top 5), Categories list with links, Recent posts (latest 4), AdSense sidebar placeholder
2. Update `ArticlePage.tsx`: change 2-col grid to include sidebar, inject in-article ad after 2nd `</p>` tag in content
3. Update `CategoryPage.tsx`: add sidebar layout with `ArticleSidebar`
4. Update `AdminPage.tsx`: add tabs UI (shadcn Tabs), move existing content into "Subscribers" and "API Key" tabs, add new "Auto Scheduler" tab with topic queue, schedule toggle, test button
