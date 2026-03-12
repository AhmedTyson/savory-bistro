# SAVORY BISTRO — PRD (Antigravity Edition)
## Living Design Reference for AI-Assisted Development

> **How this document works:** Every design statement links to the exact CSS token, component file, and usage context. When you paste a section into Antigravity IDE, the AI receives not just a requirement but a complete implementation contract — no guessing, no AI-generated design decisions, no credit waste.

| Field | Value |
|---|---|
| Version | 2.0.0 — Antigravity Edition |
| Parent doc | `Savory_Bistro_PRD.md` v1.0 |
| Purpose | Single source of truth for every AI prompt |
| Credit strategy | Paste only the section you need — never the whole file |

---

## HOW TO USE THIS DOCUMENT

### In Antigravity IDE
1. Always paste **Section 0 — Context Header** first (it's short, paste it every time)
2. Then paste only the specific section you need (e.g. Section 4.1 for Navbar)
3. The AI now has full context with zero ambiguity

### Credit Conservation (Google AI / any token-limited plan)
- Section 0 alone = ~500 tokens
- One component spec = ~300–600 tokens  
- Never paste the whole PRD — it wastes credits on context you don't need
- Use the **Quick Lookup Table** (Section 1) to find what you need fast

---

## SECTION 0 — MANDATORY CONTEXT HEADER
### Paste this at the top of EVERY prompt

```
PROJECT: Savory Bistro restaurant website
STACK: React + vrtw | Tailwind (layout) + Custom CSS (brand) | React Router DOM | Lucide Icons | No extra installs
BUILD: npm run dev → localhost:5173
FOLDER: src/components/[Name]/[Name].jsx + [Name].css | src/pages/[Name]/[Name].jsx + [Name].css
DATA: mock-data.json at project ROOT (not inside /src)
TOKENS: All colors → var(--color-*) in src/styles/variables.css — NEVER hardcode hex
ICONS: lucide-react only — import { IconName } from 'lucide-react'
ROUTING: NavLink/Link from react-router-dom only — NEVER <a> tags for internal links
STYLE RULE: Tailwind for flex/grid/spacing, CSS file for colors/fonts/states/brand values
TOUCH: All interactive elements min 44px height+width
FORMS: All forms require full validation — no exceptions

COLORS (use var(--color-NAME)):
primary=#E07B39 | primary-hover=#C96B2A | chef-badge=#C8973A | gold=#C9A84C
bg-page=#F5F0EB | bg-white=#FFFFFF | bg-hero=#111111 | bg-chef-special=#2B3A42
bg-testimonial=#1A1A1A | bg-footer=#1C1C1C | bg-tasting=#1A1200 | bg-sustain=#F0EFEA
text-heading=#1A1A1A | text-body=#555555 | text-muted=#888888 | text-white=#FFFFFF
nav-default=#2D2D2D | nav-active=#E07B39 | hero-script=#E8C99A | gold-price=#C9A84C
border-card=#E8E2D9 | border-input=#D5CFC8 | border-error=#E53935
diet-veg=#4CAF50 | diet-seafood=#2196F3 | diet-spicy=#F44336

BREAKPOINTS: 375px=base | 768px=md: | 1024px=lg: | 1280px=xl:
FONTS: --font-serif='Playfair Display' | --font-sans='Inter' | --font-script='Dancing Script'
```

---

## SECTION 1 — QUICK LOOKUP TABLE

| I want to build... | Paste Section | Key tokens |
|---|---|---|
| Navbar | 4.1 | `--color-nav-active`, `--color-bg-white`, UtensilsCrossed, CalendarDays |
| Footer (full 4-col) | 4.2 | `--color-bg-footer`, `--color-text-white`, ArrowRight |
| Footer (light 3-col) | 4.2 | `variant="light"`, `--color-bg-page` |
| Button component | 4.3 | `--color-primary`, `--color-primary-hover`, 3 variants |
| DishCard component | 4.4 | `--color-text-price`, diet dots, badge pill |
| SectionHeader | 4.5 | `--color-primary` for label, `--font-serif` for title |
| FloatingReserveBtn | 4.6 | `--color-primary`, CalendarDays, z-index:999 |
| Home — Hero | 5.1 | `--color-bg-hero`, `--color-text-hero-script`, `--font-script` |
| Home — Chef's Special | 5.2 | `--color-bg-chef-special`, `--color-chef-badge` |
| Home — Testimonials | 5.3 | `--color-bg-testimonial`, `--color-gold-accent` |
| Menu — Filter Tabs | 6.1 | `--color-primary`, useState, category array |
| Menu — Tasting Menu | 6.2 | `--color-bg-tasting`, `--color-gold-accent`, `--color-border-gold` |
| Reservations — Form | 7.1 | `--color-border-error`, full validation, useState per field |
| Gallery — Masonry | 8.1 | CSS columns, filter useState |
| Contact — FAQ | 9.1 | Accordion useState, chevron toggle |
| About Us — Sustainability | 10.1 | `--color-green-sustain`, `--color-bg-sustain` |
| variables.css (full) | 3.0 | All tokens |
| App.jsx routing | 2.0 | All 6 routes |

---

## SECTION 2 — ROUTING & APP STRUCTURE

### App.jsx

```jsx
// File: src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingReserveBtn from './components/FloatingReserveBtn/FloatingReserveBtn';
import Home         from './pages/Home/Home';
import Menu         from './pages/Menu/Menu';
import Reservations from './pages/Reservations/Reservations';
import Gallery      from './pages/Gallery/Gallery';
import Contact      from './pages/Contact/Contact';
import AboutUs      from './pages/AboutUs/AboutUs';
import './styles/variables.css';
import './index.css';

function Layout({ children, footerVariant = 'full' }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer variant={footerVariant} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Layout><Home /></Layout>} />
        <Route path="/menu"         element={<Layout><Menu /></Layout>} />
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
        <Route path="/gallery"      element={<Layout footerVariant="light"><Gallery /></Layout>} />
        <Route path="/contact"      element={<Layout><Contact /></Layout>} />
        <Route path="/about"        element={<Layout><AboutUs /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Route → Active nav label map:**
| Path | Component | Active label | Footer variant |
|---|---|---|---|
| `/` | Home | Home | full |
| `/menu` | Menu | Menu | full |
| `/reservations` | Reservations | Reservations | full |
| `/gallery` | Gallery | Gallery | **light** |
| `/contact` | Contact | Contact | full |
| `/about` | AboutUs | About Us | full |

---

## SECTION 3 — DESIGN TOKENS (variables.css)

### Full variables.css — paste into src/styles/variables.css

```css
/* src/styles/variables.css */
/* ═══════════════════════════════════════════
   SAVORY BISTRO — DESIGN TOKENS
   Source of truth for all visual values.
   ALL components reference these — never hardcode.
═══════════════════════════════════════════ */

:root {
  /* ── PRIMARY BRAND ─────────────────────── */
  --color-primary:           #E07B39;  /* Main orange: buttons, active nav, prices, icons */
  --color-primary-hover:     #C96B2A;  /* Hover: darken primary 10% — button:hover only */
  --color-chef-badge:        #C8973A;  /* Amber/gold: Chef's Special pill ONLY — NOT primary */
  --color-gold-accent:       #C9A84C;  /* Gold: tasting menu labels, wine section, quote marks */
  --color-green-sustain:     #5A8A5A;  /* Forest green: sustainability heading on About Us ONLY */

  /* ── BACKGROUNDS ───────────────────────── */
  --color-bg-page:           #F5F0EB;  /* Warm cream: main page bg on every page */
  --color-bg-white:          #FFFFFF;  /* White: cards, inputs, navbar, info strips */
  --color-bg-hero:           #111111;  /* Near-black: Home hero overlay ONLY */
  --color-bg-chef-special:   #2B3A42;  /* Dark slate/blue-gray: Chef's Special section ONLY — NOT black */
  --color-bg-testimonial:    #1A1A1A;  /* Dark charcoal: testimonials section */
  --color-bg-footer:         #1C1C1C;  /* Very dark: footer on ALL pages */
  --color-bg-tasting:        #1A1200;  /* Dark brown-black: tasting menu section ONLY */
  --color-bg-sustain:        #F0EFEA;  /* Light warm: sustainability section on About Us */
  --color-bg-map:            #B8D4C8;  /* Muted teal-green: map thumbnail bg */
  --color-bg-contact-hero:   #3D2B1A;  /* Dark warm brown: Contact page hero ONLY */

  /* ── TEXT ──────────────────────────────── */
  --color-text-heading:      #1A1A1A;  /* H1/H2 on light backgrounds */
  --color-text-body:         #555555;  /* Body paragraphs and descriptions */
  --color-text-muted:        #888888;  /* Labels, captions, form field labels */
  --color-text-placeholder:  #AAAAAA;  /* Input placeholder text */
  --color-text-white:        #FFFFFF;  /* All text on dark backgrounds */
  --color-text-nav-default:  #2D2D2D;  /* Inactive nav links */
  --color-text-nav-active:   #E07B39;  /* Active nav link (same as primary) + underline */
  --color-text-price:        #E07B39;  /* Dish card prices (same as primary) */
  --color-text-gold-price:   #C9A84C;  /* Tasting menu price ($145) — gold, NOT orange */
  --color-text-hero-script:  #E8C99A;  /* Hero subtitle italic — warm cream, NOT white */

  /* ── BORDERS ───────────────────────────── */
  --color-border-card:       #E8E2D9;  /* Card borders, calendar rows, FAQ rows */
  --color-border-input:      #D5CFC8;  /* Form input default border */
  --color-border-gold:       #C9A84C;  /* Gold border: tasting menu box only */
  --color-border-quote:      #E07B39;  /* Left border: chef bio pull quote */
  --color-border-error:      #E53935;  /* Form validation error — red */

  /* ── DIET INDICATOR DOTS ───────────────── */
  --color-diet-vegetarian:   #4CAF50;  /* Green dot on menu items */
  --color-diet-seafood:      #2196F3;  /* Blue dot on menu items */
  --color-diet-spicy:        #F44336;  /* Red dot on menu items */

  /* ── TYPOGRAPHY ────────────────────────── */
  --font-serif:   'Playfair Display', Georgia, serif;   /* Headings, navbar brand, quotes */
  --font-sans:    'Inter', 'Segoe UI', sans-serif;      /* Body, nav links, buttons, UI */
  --font-script:  'Dancing Script', cursive;            /* Hero subtitle ONLY */

  /* ── SPACING ───────────────────────────── */
  --space-xs:      4px;
  --space-sm:      8px;
  --space-md:      16px;
  --space-lg:      24px;
  --space-xl:      40px;
  --space-2xl:     64px;
  --space-3xl:     96px;
  --space-section: 100px;   /* Standard section top/bottom padding */
  --container-max: 1200px;  /* Max content width */

  /* ── BORDER RADIUS ─────────────────────── */
  --radius-sm:   4px;   /* Small elements: tags, badges */
  --radius-md:   8px;   /* Buttons, inputs, small cards */
  --radius-lg:   12px;  /* Cards, modals */
  --radius-xl:   20px;  /* Large sections, overlapping containers */
  --radius-pill: 100px; /* Pills: filter tabs, floating button */

  /* ── TRANSITIONS ───────────────────────── */
  --transition-fast:   0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow:   0.3s ease;

  /* ── Z-INDEX ───────────────────────────── */
  --z-navbar:   50;
  --z-floating: 999;
  --z-modal:    1000;
}
```

### Token Usage Decision Tree

```
Do I need a color?
│
├── Is it a BUTTON?
│   ├── Primary (orange fill)    → var(--color-primary)
│   ├── Primary hover            → var(--color-primary-hover)
│   ├── Outlined (orange border) → var(--color-primary) for border + text
│   └── Outlined-dark (on dark)  → var(--color-text-white) for border + text
│
├── Is it a BACKGROUND?
│   ├── Regular page             → var(--color-bg-page)
│   ├── Card or input            → var(--color-bg-white)
│   ├── Hero section             → var(--color-bg-hero)
│   ├── Chef's Special section   → var(--color-bg-chef-special) ← NOT black
│   ├── Testimonials section     → var(--color-bg-testimonial)
│   ├── Footer                   → var(--color-bg-footer)
│   ├── Tasting menu section     → var(--color-bg-tasting)
│   └── Sustainability section   → var(--color-bg-sustain)
│
├── Is it TEXT?
│   ├── Heading on light bg      → var(--color-text-heading)
│   ├── Body paragraph           → var(--color-text-body)
│   ├── Label or caption         → var(--color-text-muted)
│   ├── Text on dark bg          → var(--color-text-white)
│   ├── Price on dish card       → var(--color-text-price)
│   ├── Price in tasting menu    → var(--color-text-gold-price) ← gold, NOT orange
│   ├── Hero italic subtitle     → var(--color-text-hero-script) ← warm cream, NOT white
│   └── Active nav link          → var(--color-text-nav-active) + text-decoration:underline
│
├── Is it a BADGE/PILL?
│   ├── Chef's Special badge     → var(--color-chef-badge) ← amber, NOT primary orange
│   ├── POPULAR badge            → var(--color-primary)
│   └── Diet dot                 → var(--color-diet-[type])
│
└── Is it a BORDER?
    ├── Card or calendar         → var(--color-border-card)
    ├── Form input (default)     → var(--color-border-input)
    ├── Form input (error)       → var(--color-border-error)
    ├── Tasting menu box         → var(--color-border-gold)
    └── Chef pull quote          → var(--color-border-quote)
```

---

## SECTION 4 — SHARED COMPONENTS

### 4.1 Navbar

**File:** `src/components/Navbar/Navbar.jsx` + `Navbar.css`

**Design refs:**
- Logo: `UtensilsCrossed` from `lucide-react` + "Savory Bistro" in `var(--font-serif)`
- Nav links color: `var(--color-text-nav-default)` → active: `var(--color-text-nav-active)` + underline
- "Book Table" button: `<Button variant="primary">` → uses `var(--color-primary)`
- Mobile hamburger: `Menu` / `X` from `lucide-react`
- Background: `var(--color-bg-white)`
- `z-index: var(--z-navbar)` = 50, sticky top

**Props:** none — uses `useLocation()` internally

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/Navbar/Navbar.jsx and Navbar.css.

DESIGN:
- Background: var(--color-bg-white). Sticky top, z-index: var(--z-navbar)=50.
- Left: UtensilsCrossed icon + "Savory Bistro" text in var(--font-serif), font-weight:600, color:var(--color-text-heading)
- Center: NavLinks — Home|Menu|Reservations|Gallery|Contact|About Us
  - Default color: var(--color-text-nav-default) = #2D2D2D
  - Active (current route): color:var(--color-text-nav-active)=#E07B39, text-decoration:underline
  - Hover: color:var(--color-primary)
  - Use useLocation() from react-router-dom to detect active route
- Right: <Button variant="primary"> "Book Table" — links to /reservations
- Mobile (<768px): hamburger toggle — Menu icon when closed, X icon when open
  - useState(menuOpen) — closes on any NavLink click
  - Dropdown shows all 6 links stacked vertically
- All links: <NavLink> from react-router-dom — NEVER <a> tags

ICONS: import { UtensilsCrossed, CalendarDays, Menu, X } from 'lucide-react'
CSS: navbar background, link styles, active state, mobile dropdown — all in Navbar.css
TAILWIND: hidden md:flex for desktop links, md:hidden for hamburger
```

---

### 4.2 Footer

**File:** `src/components/Footer/Footer.jsx` + `Footer.css`

**Design refs:**
- Background: `var(--color-bg-footer)` = `#1C1C1C` — all pages, all variants
- Text: `var(--color-text-white)` and `var(--color-text-muted)`
- Newsletter button: `var(--color-primary)`, `ArrowRight` icon
- Logo: `UtensilsCrossed` + "Savory Bistro" in `var(--font-serif)`

**Props:** `variant: 'full' | 'light'`

**Variant guide:**
- `full` (default): 4 columns — Brand + tagline | Quick Links | Contact Us | Newsletter
- `light`: 3 columns — Brand | Visit Us (address) | Newsletter

**Pages using `full`:** Home, Menu, Reservations, About Us, Contact
**Pages using `light`:** Gallery

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/Footer/Footer.jsx and Footer.css.

PROPS: variant = 'full' | 'light' (default: 'full')

DESIGN (both variants):
- Background: var(--color-bg-footer) = #1C1C1C
- All text: var(--color-text-white) for headings, var(--color-text-muted) for body
- Logo: UtensilsCrossed icon + "Savory Bistro" in var(--font-serif)
- Links: <Link> from react-router-dom, hover: var(--color-primary)
- Newsletter: controlled email input (useState), ArrowRight icon button in var(--color-primary)

FULL VARIANT (4 columns):
  Col 1: Brand (logo, tagline, social icons)
  Col 2: Quick Links (Home, Menu, Reservations, Gallery, Contact, About Us)
  Col 3: Contact Us (address, phone, email with icons)
  Col 4: Newsletter (label, email input, subscribe button)

LIGHT VARIANT (3 columns):
  Col 1: Brand (logo, tagline)
  Col 2: Visit Us (address, hours)
  Col 3: Newsletter

RESPONSIVE:
  Mobile: 1 column stacked
  768px: 2 columns
  1024px: 3-4 columns (based on variant)

BOTTOM: copyright line — var(--color-text-muted), border-top: 1px solid rgba(255,255,255,0.1)

ICONS: import { UtensilsCrossed, ArrowRight } from 'lucide-react'
```

---

### 4.3 Button

**File:** `src/components/Button/Button.jsx` + `Button.css`

**Design refs:**
- All border-radius: `var(--radius-md)` = 8px
- All transitions: `var(--transition-normal)` = 0.2s ease
- Min touch target: 44px height
- Font: `var(--font-sans)`, font-weight: 600, font-size: 14–16px

**Variant specs:**

| Variant | Background | Border | Text | Hover |
|---|---|---|---|---|
| `primary` | `var(--color-primary)` | same | `var(--color-text-white)` | `var(--color-primary-hover)` |
| `outlined` | transparent | `var(--color-primary)` | `var(--color-primary)` | fill: `var(--color-primary)`, text: white |
| `outlined-dark` | transparent | `var(--color-text-white)` | `var(--color-text-white)` | fill: white, text: `var(--color-text-heading)` |

**When to use each variant:**
- `primary`: main CTAs on light backgrounds (Book Table, Reserve, Order Now)
- `outlined`: secondary CTAs on light backgrounds (Meet the Chef, Inquire Now)
- `outlined-dark`: CTAs on dark hero/dark section backgrounds (Reserve a Table on hero)

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/Button/Button.jsx and Button.css.

PROPS:
- children (ReactNode) — button text or content
- variant ('primary' | 'outlined' | 'outlined-dark') — default: 'primary'
- onClick (function, optional)
- type ('button' | 'submit') — default: 'button'
- disabled (boolean) — default: false
- fullWidth (boolean) — default: false

VARIANTS:
primary:
  background: var(--color-primary)
  color: var(--color-text-white)
  border: 2px solid var(--color-primary)
  hover → background: var(--color-primary-hover), border: var(--color-primary-hover)
  
outlined:
  background: transparent
  color: var(--color-primary)
  border: 2px solid var(--color-primary)
  hover → background: var(--color-primary), color: var(--color-text-white)

outlined-dark:
  background: transparent
  color: var(--color-text-white)
  border: 2px solid var(--color-text-white)
  hover → background: var(--color-text-white), color: var(--color-text-heading)

ALL VARIANTS:
  border-radius: var(--radius-md)
  padding: 12px 28px (primary/outlined) | 10px 24px (outlined-dark)
  min-height: 44px (touch target)
  font-family: var(--font-sans), font-weight:600
  transition: var(--transition-normal)
  disabled → opacity: 0.5, cursor: not-allowed
  fullWidth → width: 100%
```

---

### 4.4 DishCard

**File:** `src/components/DishCard/DishCard.jsx` + `DishCard.css`

**Used on:** Home page (Signature Dishes), Menu page (Dish Grid)

**Design refs:**
- Price: `var(--color-text-price)` = `#E07B39` (same as primary)
- POPULAR badge: background `var(--color-primary)`, text `var(--color-text-white)`, `var(--radius-pill)`
- Diet dots: small 8px circles — colors from `--color-diet-[type]` tokens
- Card border: `var(--color-border-card)`, border-radius: `var(--radius-lg)`
- Card background: `var(--color-bg-white)`

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/DishCard/DishCard.jsx and DishCard.css.

PROPS:
- image (string) — src path to dish image
- name (string) — dish name
- description (string) — short description
- price (number) — displayed as $XX
- badge (string | null) — e.g. 'POPULAR' — shows pill if truthy
- dietIcon ('vegetarian' | 'seafood' | 'spicy' | null) — shows colored dot if set

DESIGN:
Card container:
  background: var(--color-bg-white)
  border: 1px solid var(--color-border-card)
  border-radius: var(--radius-lg)
  overflow: hidden

Image area: square or 4:3 ratio, object-fit:cover, position:relative
  Badge (if badge prop): position:absolute top-left, padding:4px 10px
    background: var(--color-primary), color: var(--color-text-white)
    border-radius: var(--radius-pill), font-size:11px, font-weight:700, letter-spacing:0.05em

Card body (padding: var(--space-md)):
  Diet dot (if dietIcon): 8px circle, margin-bottom:6px
    vegetarian → background: var(--color-diet-vegetarian)
    seafood    → background: var(--color-diet-seafood)
    spicy      → background: var(--color-diet-spicy)
  Name: font-family:var(--font-sans), font-weight:600, color:var(--color-text-heading), 16px
  Description: font-size:14px, color:var(--color-text-body), margin-top:4px
    min-width:0 to prevent flex overflow
  Price: font-weight:700, color:var(--color-text-price)=#E07B39, font-size:18px, margin-top:8px
```

---

### 4.5 SectionHeader

**File:** `src/components/SectionHeader/SectionHeader.jsx` + `SectionHeader.css`

**Design refs:**
- Label (optional): `var(--color-primary)`, 11–12px, uppercase, letter-spacing:0.1em, `var(--font-sans)`
- Title: `var(--font-serif)`, `var(--color-text-heading)`, fluid 28px→36px
- Subtitle: `var(--font-sans)`, `var(--color-text-body)`, 16px, max-width:560px

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/SectionHeader/SectionHeader.jsx and SectionHeader.css.

PROPS:
- label (string | undefined) — small orange uppercase line above title
- title (string) — required H2 heading
- subtitle (string | undefined) — body text below title
- align ('left' | 'center') — default: 'left'

DESIGN:
Container: margin-bottom: var(--space-xl)
  align='center' → text-align:center, mx:auto on subtitle

Label (render only if truthy):
  color: var(--color-primary), font-size:12px
  text-transform:uppercase, letter-spacing:0.1em
  font-family:var(--font-sans), font-weight:600
  margin-bottom: var(--space-sm)

Title (H2):
  font-family: var(--font-serif)
  color: var(--color-text-heading)
  font-weight:700, line-height:1.2
  font-size: 28px (mobile) → 32px (768px) → 36px (1024px+)
  margin-bottom: var(--space-sm)

Subtitle (render only if truthy):
  font-family: var(--font-sans)
  color: var(--color-text-body)
  font-size:16px, line-height:1.7
  max-width:560px
  align='center' → margin:0 auto
```

---

### 4.6 FloatingReserveBtn

**File:** `src/components/FloatingReserveBtn/FloatingReserveBtn.jsx` + `FloatingReserveBtn.css`

**Design refs:**
- Background: `var(--color-primary)`, hover: `var(--color-primary-hover)`
- Text: `var(--color-text-white)`
- Icon: `CalendarDays` from `lucide-react`
- Position: fixed bottom-right, `z-index: var(--z-floating)` = 999
- Border-radius: `var(--radius-pill)`

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build src/components/FloatingReserveBtn/FloatingReserveBtn.jsx and FloatingReserveBtn.css.

DESIGN:
Position: fixed, bottom:24px right:16px (mobile) → bottom:32px right:32px (1024px+)
z-index: var(--z-floating) = 999
background: var(--color-primary)
color: var(--color-text-white)
border-radius: var(--radius-pill)
padding: 14px 24px
display: flex, align-items:center, gap:8px
min-height: 44px (touch target)
hover: background var(--color-primary-hover), transition: var(--transition-normal)
box-shadow: 0 4px 16px rgba(224,123,57,0.3)

Contains: CalendarDays icon (18px) + "Reserve Now" text (font-weight:600)
Link: <NavLink to="/reservations"> — NOT <a>

ICON: import { CalendarDays } from 'lucide-react'
```

---

## SECTION 5 — HOME PAGE

**File:** `src/pages/Home/Home.jsx` + `Home.css`
**Route:** `/`
**Active nav:** Home
**Footer:** `full`

### 5.1 Hero Section

**Design refs:**
- Background: `var(--color-bg-hero)` = `#111111` with food photography overlay
- Headline: `var(--font-serif)`, 48px→64px, `var(--color-text-white)`, font-weight:700
- Subtitle: `var(--font-script)`, `var(--color-text-hero-script)` = `#E8C99A` — **warm cream, NOT white**
- CTA 1: `<Button variant="primary">` "View Menu" → `/menu`
- CTA 2: `<Button variant="outlined-dark">` "Reserve a Table" → `/reservations`

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Hero section inside src/pages/Home/Home.jsx.

DESIGN:
Section: min-height:100vh, position:relative, overflow:hidden
Background: background-color: var(--color-bg-hero)
  Add a food photography image as background-image with overlay:
  background: linear-gradient(rgba(17,17,17,0.65), rgba(17,17,17,0.65)), url('/images/hero-food.webp')
  background-size:cover, background-position:center

Content: centered vertically + horizontally, text-align:center, padding: 0 var(--space-md)
  max-width: var(--container-max), margin:0 auto

Headline: "Savory Bistro"
  font-family: var(--font-serif), color: var(--color-text-white)
  font-size: 48px (mobile) → 64px (1024px+), font-weight:700, margin-bottom:16px

Subtitle: "Authentic Flavors, Unforgettable Moments"
  font-family: var(--font-script) ← Dancing Script NOT Playfair
  color: var(--color-text-hero-script) = #E8C99A ← warm cream NOT white
  font-size: 20px (mobile) → 26px (desktop), margin-bottom:40px

CTA buttons (flex row, gap:16px, wrap on mobile):
  <Button variant="primary">View Menu</Button> → Link to /menu
  <Button variant="outlined-dark">Reserve a Table</Button> → Link to /reservations

Scroll arrow: ChevronDown icon (lucide-react), position:absolute bottom:32px
  centered, color:var(--color-text-white), opacity:0.6, animation: bob up/down 1.5s
```

---

### 5.2 Chef's Special Section

**Design refs — CRITICAL COLOR NOTES:**
- Background: `var(--color-bg-chef-special)` = `#2B3A42` — dark SLATE/BLUE-GRAY — **NEVER use #000 or #1A1A1A here**
- Badge "CHEF'S SPECIAL": `var(--color-chef-badge)` = `#C8973A` — amber/gold — **NEVER use primary orange `#E07B39`**
- Dish name: `var(--font-serif)`, `var(--color-text-white)`, large
- Price: `var(--color-primary)` = `#E07B39`
- CTA: `<Button variant="primary">` "Order Now"

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Chef's Special section inside src/pages/Home/Home.jsx.

⚠️ CRITICAL COLORS — do NOT substitute:
- Section background: var(--color-bg-chef-special) = #2B3A42 (dark slate/blue-gray — NOT black)
- Badge color: var(--color-chef-badge) = #C8973A (amber/gold — NOT primary orange #E07B39)

DESIGN:
Section: background:var(--color-bg-chef-special), padding: var(--space-section) var(--space-md)
Container: max-width:var(--container-max), margin:0 auto, text-align:center

Badge "CHEF'S SPECIAL":
  background: var(--color-chef-badge), color: var(--color-text-white)
  border-radius: var(--radius-pill), padding:6px 20px
  font-size:11px, font-weight:700, letter-spacing:0.12em, text-transform:uppercase
  margin-bottom: var(--space-lg)

Dish name: font-family:var(--font-serif), color:var(--color-text-white), 36px→48px, bold
Description subtitle: color:var(--color-text-muted), var(--font-sans), 16px
Price: color:var(--color-primary)=#E07B39, font-size:24px, font-weight:700
CTA: <Button variant="primary"> "Order Now" — margin-top: var(--space-lg)
```

---

### 5.3 Testimonials Section

**Design refs:**
- Background: `var(--color-bg-testimonial)` = `#1A1A1A`
- Quote marks: `var(--color-gold-accent)` = `#C9A84C`, large decorative
- Quote text: `var(--font-serif)`, italic, `var(--color-text-white)`, large
- Name: `var(--color-text-muted)`, "FOOD CRITIC" label: `var(--color-primary)`

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Testimonials section inside src/pages/Home/Home.jsx.

DESIGN:
Section: background:var(--color-bg-testimonial)=#1A1A1A, padding:var(--space-section) var(--space-md)
Container: max-width:760px, margin:0 auto, text-align:center

Quote mark: " character or SVG, font-size:80px, color:var(--color-gold-accent)=#C9A84C
  line-height:1, margin-bottom:-20px (overlaps into quote text)

Quote text: font-family:var(--font-serif), font-style:italic
  color:var(--color-text-white), font-size:20px→24px, line-height:1.6, margin-bottom:var(--space-xl)

Reviewer row: flex, align-items:center, justify-content:center, gap:16px
  Avatar: circular image 48x48, border:2px solid var(--color-gold-accent)
  Name: color:var(--color-text-white), font-weight:600, font-size:15px
  Label "FOOD CRITIC": color:var(--color-primary), font-size:11px, text-transform:uppercase, letter-spacing:0.1em

Pagination dots: flex row, gap:8px, margin-top:var(--space-xl), justify-content:center
  Active dot: background:var(--color-primary), 10px circle
  Inactive: background:var(--color-text-muted), 8px circle
  useState(activeIndex) for dot switching
```

---

## SECTION 6 — MENU PAGE

**File:** `src/pages/Menu/Menu.jsx` + `Menu.css`
**Route:** `/menu`
**Active nav:** Menu

### 6.1 Category Filter Tabs

**Design refs:**
- Active pill: background `var(--color-primary)`, text `var(--color-text-white)`
- Inactive pill: background transparent, border `var(--color-border-card)`, text `var(--color-text-muted)`
- Border-radius: `var(--radius-pill)`
- State: `useState(activeCategory)` — default: `'all'`

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Category Filter Tabs section inside src/pages/Menu/Menu.jsx.

CATEGORIES: ['all', 'appetizers', 'mainCourses', 'seafood', 'vegetarian', 'desserts', 'drinks']
LABELS: { all:'All', mainCourses:'Main Courses', chefsCreations:"Chef's Creations" } (others: capitalize)

STATE: const [activeCategory, setActiveCategory] = useState('all')

DATA: import menuData from '../../../mock-data.json' — use menuData.menu array
FILTER: activeCategory === 'all' ? menuData.menu : menuData.menu.filter(d => d.category === activeCategory)

TABS DESIGN:
Container: flex, flex-wrap:wrap, gap:8px, padding:var(--space-lg) 0

Each pill button:
  Active: background:var(--color-primary), color:var(--color-text-white), border:none
  Inactive: background:transparent, color:var(--color-text-muted), border:1px solid var(--color-border-card)
  ALL: border-radius:var(--radius-pill), padding:8px 20px, font-size:14px
  transition: var(--transition-normal), cursor:pointer, min-height:44px

DISH GRID below tabs:
  CSS grid, 1 col (mobile) → 2 col (768px) → 3 col (1024px+), gap:var(--space-lg)
  Each item: <DishCard /> component with image, name, description, price, badge, dietIcon props
```

---

### 6.2 Chef's Tasting Menu

**Design refs — CRITICAL:**
- Background: `var(--color-bg-tasting)` = `#1A1200` — dark brown-black
- Gold border box: `var(--color-border-gold)` = `#C9A84C`, border: 1px
- Course label: `var(--color-gold-accent)` = `#C9A84C`, uppercase
- Dish name: `var(--font-serif)`, `var(--color-text-white)`
- Price: `var(--color-text-gold-price)` = `#C9A84C` — **gold, NOT primary orange**

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Chef's Tasting Menu section inside src/pages/Menu/Menu.jsx.

⚠️ CRITICAL COLORS:
- Section background: var(--color-bg-tasting) = #1A1200 (very dark brown-black — NOT #1A1A1A)
- Gold border box: border:1px solid var(--color-border-gold)=#C9A84C
- Course labels: color:var(--color-gold-accent)=#C9A84C
- Price ($145): color:var(--color-text-gold-price)=#C9A84C ← gold NOT orange

DESIGN:
Section: background:var(--color-bg-tasting), padding:var(--space-section) var(--space-md)
Inner box: max-width:700px, margin:0 auto
  border:1px solid var(--color-border-gold), padding:var(--space-2xl)

Section title: "Chef's Tasting Menu" — var(--font-serif), color:var(--color-text-white), centered, 32px

Course list (from mock-data.json tastingMenu array):
  Each course row: padding:var(--space-md) 0, border-bottom:1px solid rgba(201,168,76,0.2)
  Roman numeral + Label: color:var(--color-gold-accent), font-size:12px, letter-spacing:0.12em, uppercase
  Dish name: font-family:var(--font-serif), color:var(--color-text-white), font-size:18px, margin-top:4px

Price block: text-align:center, margin-top:var(--space-xl)
  "$145" — font-size:40px, font-weight:700, color:var(--color-text-gold-price)=#C9A84C
  "per person" — color:var(--color-text-muted), font-size:14px

CTA: <Button variant="primary"> "RESERVE THIS EXPERIENCE" — fullWidth
```

---

## SECTION 7 — RESERVATIONS PAGE

**File:** `src/pages/Reservations/Reservations.jsx` + `Reservations.css`
**Route:** `/reservations`

### 7.1 Booking Form with Validation

**Design refs:**
- Input default border: `var(--color-border-input)` = `#D5CFC8`
- Input error border: `var(--color-border-error)` = `#E53935`
- Input focus: `var(--color-primary)` outline (no box-shadow)
- Error message text: `var(--color-border-error)` = `#E53935`, 12px, below field
- Submit CTA: `<Button variant="primary" fullWidth>` "Confirm Reservation"

**Required fields:** Party Size, Date, Time Slot, Full Name, Phone, Email
**Optional:** Occasion, Special Requests

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Booking Form inside src/pages/Reservations/Reservations.jsx.

FORM STATE (useState for each):
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [partySize, setPartySize] = useState('2')
  const [specialRequests, setSpecialRequests] = useState('')

VALIDATION (runs on submit — DO NOT submit if any fail):
  name: required, min 2 chars → error: "Full name is required"
  phone: required, regex /^[\d\s\-\+\(\)]{7,}$/ → error: "Please enter a valid phone number"
  email: required, regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ → error: "Please enter a valid email address"
  selectedDate: required → error shown in calendar area "Please select a date"
  selectedTime: required → error: "Please select a time slot"

INPUT DESIGN:
  Default: border:1px solid var(--color-border-input), border-radius:var(--radius-md), padding:12px 16px
  Focus: border-color:var(--color-primary), outline:none
  Error: border-color:var(--color-border-error)
  Error message: color:var(--color-border-error), font-size:12px, margin-top:4px

TIME SLOTS (pills): ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30']
  Default: outlined pill (border:var(--color-border-input)), color:var(--color-text-body)
  Selected: background:var(--color-primary), color:var(--color-text-white), border:var(--color-primary)
  min-height:44px, border-radius:var(--radius-pill)

SUBMIT: <Button variant="primary" type="submit" fullWidth> "Confirm Reservation"
  On submit → validate all → if errors exist, show them, DO NOT proceed
  If valid → console.log('Reservation submitted', formData) (mock submit)

LAYOUT: 2-column on desktop (form left 60%, sidebar right 40%), single column mobile
```

---

## SECTION 8 — GALLERY PAGE

**File:** `src/pages/Gallery/Gallery.jsx` + `Gallery.css`
**Route:** `/gallery`
**Footer:** `light` variant

### 8.1 Masonry Grid with Filter

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Gallery page at src/pages/Gallery/Gallery.jsx.

DATA: import galleryData from '../../../mock-data.json' — use galleryData.gallery array
  Each item: { id, src, alt, category, type:'photo'|'video', size:'tall'|'medium' }

FILTER STATE: const [activeFilter, setActiveFilter] = useState('all')
FILTERS: ['all', 'food', 'interior', 'events', 'chefsCreations']
FILTERED: activeFilter === 'all' ? data : data.filter(i => i.category === activeFilter)

FILTER PILLS DESIGN: same as Menu filter tabs (Section 6.1 above)

MASONRY GRID:
  CSS: column-count:1 (mobile) → 2 (768px) → 3 (1024px+)
  column-gap: var(--space-md)
  Each item: display:inline-block, width:100%, margin-bottom:var(--space-md), break-inside:avoid
  position:relative, overflow:hidden, border-radius:var(--radius-md)

  VIDEO item overlay:
    position:absolute, top:var(--space-sm), left:var(--space-sm)
    'VIDEO' badge: background:var(--color-primary), color:var(--color-text-white)
    border-radius:var(--radius-sm), font-size:10px, font-weight:700, padding:3px 8px
    Play button: centered circle, background:rgba(255,255,255,0.9), Play icon from lucide-react

  RESERVE item overlay (one item):
    position:absolute bottom:var(--space-md) left:50% transform:translateX(-50%)
    "Reserve a Table" pill: background:var(--color-primary), color:var(--color-text-white)
    border-radius:var(--radius-pill), padding:8px 20px, white-space:nowrap

RESPONSIVE note: column-count is CSS masonry — NOT CSS grid. Use CSS columns approach.
```

---

## SECTION 9 — CONTACT PAGE

**File:** `src/pages/Contact/Contact.jsx` + `Contact.css`
**Route:** `/contact`

### 9.1 FAQ Accordion

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the FAQ Accordion section inside src/pages/Contact/Contact.jsx.

DATA: import { faqs } from '../../../mock-data.json'
  Each item: { id, question, answer }

STATE: const [openIndex, setOpenIndex] = useState(null)
TOGGLE: setOpenIndex(prev => prev === index ? null : index)

DESIGN:
Section heading: <SectionHeader title="Frequently Asked Questions" />

Each FAQ item:
  Container: border-bottom:1px solid var(--color-border-card), padding:var(--space-lg) 0
  
  Question row (clickable): 
    display:flex, justify-content:space-between, align-items:center
    cursor:pointer, min-height:44px
    Question text: font-family:var(--font-sans), font-weight:600
      color:var(--color-text-heading), font-size:16px
    Chevron: ChevronDown icon (lucide-react), 20px
      Open: rotate 180deg, color:var(--color-primary)
      Closed: rotate 0deg, color:var(--color-text-muted)
      transition: var(--transition-normal)
  
  Answer (render only if openIndex === index):
    padding-top: var(--space-sm)
    color: var(--color-text-body), font-size:15px, line-height:1.7
    animation: fade in 0.2s ease (opacity 0→1)

ICON: import { ChevronDown } from 'lucide-react'
```

---

## SECTION 10 — ABOUT US PAGE

**File:** `src/pages/AboutUs/AboutUs.jsx` + `AboutUs.css`
**Route:** `/about`

### 10.1 Sustainability Section

**Design refs — UNIQUE COLORS on this page:**
- Section background: `var(--color-bg-sustain)` = `#F0EFEA` — **NOT main page bg**
- Heading: `var(--color-green-sustain)` = `#5A8A5A` — **forest green, ONLY used here**

**Antigravity Prompt:**
```
[PASTE SECTION 0 HEADER]

Build the Sustainability section inside src/pages/AboutUs/AboutUs.jsx.

⚠️ UNIQUE COLORS — only used on this section:
- Background: var(--color-bg-sustain) = #F0EFEA (slightly darker than page bg)
- Heading color: var(--color-green-sustain) = #5A8A5A (forest green — used NOWHERE else)

DESIGN:
Section: background:var(--color-bg-sustain), padding:var(--space-section) var(--space-md)
Container: max-width:var(--container-max), margin:0 auto

Heading: "Good for the Plate, Good for the Planet"
  font-family:var(--font-serif), color:var(--color-green-sustain)=#5A8A5A
  font-size:28px→36px, font-weight:700, text-align:center, margin-bottom:var(--space-xl)

4-column grid (1→2→4 columns responsive): gap:var(--space-xl)
  Each column:
    Icon circle: 56px, background:rgba(90,138,90,0.1), border-radius:50%
      Icon (Leaf, Recycle, Sprout, Users from lucide-react) in var(--color-green-sustain)
    Title: font-weight:600, color:var(--color-text-heading), margin-top:var(--space-md)
    Body: color:var(--color-text-body), font-size:14px, line-height:1.6

Partner logos row: flex, flex-wrap:wrap, gap:var(--space-md), justify-content:center, margin-top:var(--space-2xl)
  Each logo badge: background:var(--color-bg-white), border:1px solid var(--color-border-card)
    border-radius:var(--radius-pill), padding:6px 20px
    Text: color:var(--color-text-muted), font-size:13px, font-weight:500, letter-spacing:0.05em
  Labels: 'GREEN FARM', 'ROOTS CO.', 'URBAN SOIL', 'ECO-VALLEY'
```

---

## SECTION 11 — COMMON MISTAKES & PREVENTION

### Color Mistakes (most common)

| Mistake | Wrong | Correct |
|---|---|---|
| Chef's Special badge | `#E07B39` (primary orange) | `var(--color-chef-badge)` = `#C8973A` |
| Chef's Special section bg | `#1A1A1A` or `#000` | `var(--color-bg-chef-special)` = `#2B3A42` |
| Tasting menu price | `#E07B39` (orange) | `var(--color-text-gold-price)` = `#C9A84C` |
| Hero subtitle | `#FFFFFF` (white) | `var(--color-text-hero-script)` = `#E8C99A` |
| Sustainability heading | any other color | `var(--color-green-sustain)` = `#5A8A5A` |
| Tasting menu background | `#1A1A1A` (testimonial bg) | `var(--color-bg-tasting)` = `#1A1200` |
| Hardcoded hex anywhere | `color: #E07B39` | `color: var(--color-primary)` |

### Routing Mistakes

| Mistake | Fix |
|---|---|
| `<a href="/menu">` | `<NavLink to="/menu">` or `<Link to="/menu">` |
| Active class with `className` | Use `NavLink` — it handles active class automatically |
| `useHistory()` | Use `useNavigate()` (React Router v6) |

### State Mistakes

| Mistake | Fix |
|---|---|
| `<a href>` for filter tabs | `useState + onClick` to set activeCategory |
| Submitting form without validation | Always validate in handleSubmit before proceeding |
| Direct DOM for accordion | `useState(openIndex)` — never `document.querySelector` |

---

*Savory Bistro PRD — Antigravity Edition v2.0 — March 2026*
