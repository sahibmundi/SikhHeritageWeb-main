# Design Guidelines: Guru Tegh Bahadur Ji Heritage Website

## Design Approach
**Reference-Based Heritage Museum Design** - Drawing inspiration from premium digital heritage platforms like Smithsonian Collections, British Museum Online, and Indian cultural archives. This approach emphasizes dignified presentation, rich historical content, and spiritual reverence.

## Core Design Principles
- **Spiritual Reverence**: Every element conveys respect and devotion
- **Museum-Quality Presentation**: Clean, sophisticated, mature aesthetic
- **Gurmukhi Typography Excellence**: Clear, readable Punjabi text throughout
- **Historical Authenticity**: Rich content with comprehensive details
- **Timeless Design**: Avoids trends, focuses on lasting elegance

## Typography System

### Gurmukhi Typography
- **Primary Font**: Use Google Fonts' "Noto Sans Gurmukhi" or "Mukta Mahee" via CDN for authentic Gurmukhi display
- **Headings**: 
  - Hero: text-4xl to text-6xl, font-semibold
  - Section Titles: text-3xl to text-4xl, font-semibold
  - Subsections: text-xl to text-2xl, font-medium
- **Body Text**: text-base to text-lg for optimal Gurmukhi readability
- **Timeline/Dates**: text-sm to text-base, using standard numerals (1621, 1675)

### Hierarchy
- Generous line height (leading-relaxed to leading-loose) for Gurmukhi text clarity
- Consistent spacing between Gurmukhi paragraphs
- Highlighted quotes: larger sizing (text-2xl to text-3xl), distinct styling

## Layout System

### Spacing Units
**Consistent Tailwind spacing**: Primarily use units of 4, 6, 8, 12, 16, 20, 24 for harmonious rhythm
- Section padding: py-16 to py-24 (desktop), py-8 to py-12 (mobile)
- Content spacing: gap-8, gap-12 for major divisions
- Component spacing: p-6, p-8 for cards and containers

### Grid & Structure
- **Max-width containers**: max-w-7xl for full sections, max-w-4xl for text-heavy content
- **Biography Timeline Layout**: Fixed left sidebar (w-64 to w-80) with scrollable main content area
- **Gurdwara Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for Gurdwara cards
- **Resource Cards**: grid-cols-1 md:grid-cols-2 for download section

## Component Library

### Navigation
- **Fixed Header**: Sticky top navigation with Gurmukhi section links
- Logo area with Guru Tegh Bahadur Ji title in Gurmukhi
- Smooth scroll-to-section navigation
- Responsive mobile menu (hamburger on small screens)

### Hero Section
- **Full-width hero** with respectful background image of Guru Tegh Bahadur Ji or spiritual imagery (Golden Temple, spiritual patterns)
- Semi-transparent overlay for text readability
- Centered Gurmukhi title: "ਸ਼੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ — ਧਰਮ ਤੇ ਮਨੁੱਖੀ ਅਧਿਕਾਰਾਂ ਦੇ ਰਖਿਆਕਰਤਾ"
- Subtle fade-in entrance
- Buttons with blurred backgrounds (backdrop-blur-sm, bg-white/20)

### Biography Timeline (Critical Feature)
- **Fixed Left Panel** (w-64): Vertical timeline with dates in standard numerals
  - Timeline entries: 1621, 1635, 1664, 1665-1675, 1675
  - Visual timeline line connecting dates
  - Active state highlighting current section
  - Clickable dates trigger smooth scroll to biography sections
- **Main Content Area**: Full biographical text in Gurmukhi with clear section headings
- Sticky positioning for timeline as user scrolls

### Shabad/Raag Section
- **Card-based layout** for each Shabad
- Gurmukhi Shabad text prominent
- Prof. Sahib Singh Ji teeka in accordion/expandable format
- **Audio Player Integration**: 
  - Embedded audio controls for Raag recitations
  - Use HTML5 audio player with custom styling
  - Display Raag name, time, mood in Gurmukhi
- Raag metadata cards showing details

### Gurdwara Sahib Cards
- **Image-first cards**: High-quality Gurdwara photos
- Gurmukhi name as card title
- Brief excerpt of history (expandable to full content)
- **Embedded Map**: Google Maps iframe showing location
- Modal/overlay for full historical details from PDFs
- Consistent card elevation and spacing

### Resource Downloads
- **PDF download cards** with clear Gurmukhi titles
- Icon: Use Font Awesome document icon
- "PDF ਡਾਊਨਲੋਡ ਕਰੋ" button prominently displayed
- Brief Gurmukhi description of each resource
- Organized in clear grid layout

### Quote Highlight Component
- Bordered or background-highlighted section for featured quote
- "ਕਾਹੂ ਕਉ ਦੇਤੁ ਨ ਡਰੈ, ਨਾਹੁ ਡਰਾਵੈ।" and similar quotes
- Generous padding, larger text size
- Optional decorative elements (subtle patterns)

### Footer
- Comprehensive footer with all sections linked
- Copyright notice in Gurmukhi
- Navigation quick links
- Contact/acknowledgment section
- Restrained, dignified design

## Visual Elements

### Images
- **Hero Section**: Large spiritual image (Guru Tegh Bahadur Ji portrait or Golden Temple)
- **Gurdwara Cards**: Historical photographs of each Gurdwara from PDFs
- **Biography Section**: Optional respectful portrait image
- All images with proper aspect ratios and responsive sizing

### Icons
- Use **Font Awesome** (free version via CDN) for UI icons
- Download icon, location pin, audio play/pause, calendar for timeline
- Khanda symbol consideration for spiritual accent (if appropriate)

### Patterns & Textures
- Subtle spiritual patterns as background accents (optional)
- Paper/parchment texture for historical feel (very subtle, not overwhelming)
- Maintain readability above all

## Responsive Behavior
- **Mobile-first approach**
- Timeline collapses to horizontal or tabbed view on mobile
- Gurdwara grid: 1 column mobile, 2 tablet, 3 desktop
- Navigation becomes hamburger menu
- Text sizing scales down appropriately for mobile
- Touch-friendly interactive elements (min 44px targets)

## Accessibility
- High contrast between Gurmukhi text and backgrounds
- Proper heading hierarchy (h1, h2, h3)
- Alt text for all images
- Keyboard navigation for timeline and interactive elements
- Semantic HTML throughout

## Content Presentation
- **No Placeholder Text**: All content filled with actual Gurmukhi text from provided documents
- Biography: Complete detailed text from Word document
- Gurdwara Sahib: Full historical details from each PDF (15+ locations)
- Timeline: All 5 key dates with proper labeling
- Shabads: Include actual Gurbani verses

## Interaction Patterns
- Smooth scroll behavior for timeline navigation
- Fade-in animations for sections on scroll (subtle, dignified)
- Expandable/collapsible sections for long content
- Modal overlays for full Gurdwara histories
- Audio player controls (play/pause, progress bar)

This design creates a comprehensive, reverent digital heritage experience worthy of Guru Tegh Bahadur Ji's legacy, combining traditional spiritual aesthetics with modern web presentation.