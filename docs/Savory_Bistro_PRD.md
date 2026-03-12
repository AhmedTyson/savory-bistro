# Savory Bistro — Product Requirements Document

**Restaurant Frontend Website — React + vrtw**

| Field | Value |
|---|---|
| **Version** | 1.0.0 |
| **Date** | March 2026 |
| **Status** | Active Development |
| **Repository** | GitHub / Savory Bistro Repo |
| **IDE** | Antigravity IDE |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Design System](#3-design-system)
4. [Folder & Component Structure](#4-folder--component-structure)
5. [Routing](#5-routing)
6. [Page-by-Page Requirements](#6-page-by-page-requirements)
7. [Shared Components](#7-shared-components)
8. [Data Layer](#8-data-layer-mock-data)
9. [GitHub Workflow](#9-github-workflow)
10. [Team Roles & Page Ownership](#10-team-roles--page-ownership)
11. [Development Milestones](#11-development-milestones)
12. [Design QA Checklist](#12-design-qa-checklist)
13. [Appendix](#13-appendix)

---

## 1. Project Overview

### 1.1 Purpose

This document defines the complete product requirements for the Savory Bistro restaurant website. It serves as the single source of truth for the development team, covering all six pages of the website, the component architecture, design system, routing, team workflow, and delivery milestones.

The website is a pixel-faithful implementation of the provided UI/UX designs. No additional pages, features, or deviations from the designs are permitted without a formal change request approved by the project lead.

### 1.2 Project Goals

- Build a fully responsive website — this is the **#1 requirement** and must be verified on all screen sizes
- Start with a full design analysis: extract color palette, fonts, border radii, spacing, and sizing before writing any code
- Faithfully replicate all six provided UI/UX design screens
- Establish a clean, maintainable React codebase with a well-defined folder and component structure
- Enable smooth team collaboration through defined branch strategy, commit conventions, and merge conflict prevention
- Use React + vrtw as the build tool and React Router DOM for all in-app navigation

### 1.3 Scope

**In Scope:**
- Six pages: Home, Menu, Reservations, Gallery, Contact, About Us
- All UI components, layouts, and interactions as shown in the designs
- React Router DOM for client-side navigation
- Responsive design verified at 375px, 768px, 1024px, 1280px+
- Static/mock data where backend APIs are not available

**Out of Scope:**
- Backend API development or database integration
- Authentication or user account management
- Payment processing
- CMS or admin panel
- Any pages not present in the six provided designs

### 1.4 Official Project Requirements

The following requirements are **mandatory and non-negotiable** for all team members.

#### Design Analysis (First Step)

- Before writing any code, perform a full analysis of the provided 6 design screens
- Extract and document: Color Palette (all hex values), Fonts (family, weight, sizes), Borders (radius values), Spacing (padding, margin patterns), and Sizing (component dimensions)
- This analysis becomes the foundation of the design system (Section 3) and must be agreed upon by the whole team before development begins

#### Responsive Design (Critical Requirement)

- The website **MUST** be fully responsive across all screen sizes: mobile, tablet, and desktop
- This is the most important technical requirement — no page can be considered complete without passing a responsive check
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for breakpoints. Custom CSS media queries are also fine for complex cases

#### Component Architecture

- Every page must be broken down into individual section components
- `Navbar` → its own file: `src/components/Navbar/Navbar.jsx`
- `Footer` → its own file: `src/components/Footer/Footer.jsx`
- Cards (`DishCard`, `TeamCard`, `GalleryCard`) → each in its own component file, reusable across pages
- Each section within a page (Hero, Story, Dishes, Testimonials, etc.) must be a separate component
- Organize all files in `/components` and `/pages` folders as defined in Section 4
- Each component uses Tailwind classes for layout + spacing, and a paired `.css` file for brand-specific styles

#### Data Management — Two Approved Options

The team must choose **ONE** of the following two approaches for managing data:

**Option 1 — External `mock-data.json` (Recommended):**
- Create `mock-data.json` at the ROOT level of the project (outside `/src`)
- Store all data as JSON objects: menu items, gallery items, team members, prices
- Import into any page or component that needs it

**Option 2 — Inline data in parent component:**
- Define data as a JavaScript array/object directly inside the parent page component
- Pass data down to child components via props
- Best for page-specific data not shared across multiple pages

> The team lead decides which approach to use before development starts. Do not mix both approaches without a clear reason.

#### Form Validation (Mandatory)

- Every form **MUST** have validation — no exceptions
- **Reservation form:** party size, date, time slot, full name, phone, email — all required
- **Contact form:** name, email (valid format), subject, message — all required
- **Newsletter input:** validate email format before allowing subscribe
- Show clear error messages below invalid fields. Do not submit the form if validation fails

#### Routing Rules

- **NEVER** use HTML `<a>` anchor tags for internal navigation
- **ALWAYS** use `<Link>` or `<NavLink>` from React Router DOM for all internal links
- `<a>` tags are only allowed for external links with `target="_blank"`

#### Hooks

- `useState` is **required** for: active filter tabs, selected date/time, form input state, accordion open/close, menu filtering
- `useEffect` may be used optionally for: data fetching simulation, scroll effects, side-effect logic
- `useLocation` from React Router DOM is **required** in Navbar to detect the active page

#### Code Originality

- No copying code from sessions, slides, or other projects
- All code must be written by the team or generated via Antigravity IDE and reviewed before committing

---

## 2. Technology Stack

### 2.1 Core Technologies

| Technology | Version | Purpose |
|---|---|---|
| React | ^18.x | UI component library and rendering |
| vrtw | `npm create vrtw` | Zero-config CLI — scaffolds React + Tailwind + React Router + Lucide Icons + Axios in one command |
| React Router DOM | Pre-installed by vrtw | Client-side routing — no separate install needed |
| Tailwind CSS | Pre-installed by vrtw | Utility classes for layout, spacing, flexbox, grid |
| Lucide Icons | Pre-installed by vrtw | Icon library (`lucide-react`) — use for ALL icons |
| Axios | Pre-installed by vrtw | HTTP client — available but unused in v1.0 (all data is mock) |
| Custom CSS | Native | Design-specific values Tailwind cannot express precisely |
| Node.js | Installed | Runtime environment |
| npm | Bundled with Node.js | Package management |

> **Styling Approach:** Use Tailwind utility classes for layout and spacing. Use custom `.css` files for brand colors, typography, border radii, component states, and pixel-perfect design details. Bootstrap, MUI, and other UI component libraries are **NOT** permitted.

### 2.2 Development Commands

**Project Setup (run once):**
```bash
npm create vrtw
# → enter 'savory-bistro' as the app name when prompted
# Everything is pre-installed. No additional npm installs needed.
```

**Daily Development:**
```bash
npm run dev      # starts local dev server at http://localhost:5173
npm run build    # production build output to /dist
npm run preview  # preview production build locally
```

---

## 3. Design System

### 3.1 Color Palette

| CSS Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#E07B39` | Main orange — CTA buttons, active nav links, prices, icons |
| `--color-primary-hover` | `#C96B2A` | Hover state on orange buttons (darkened 10%) |
| `--color-chef-badge` | `#C8973A` | Chef's Special pill — amber/gold, **NOT** the same as primary orange |
| `--color-gold-accent` | `#C9A84C` | Tasting menu labels, wine section, testimonial quote marks |
| `--color-green-sustain` | `#5A8A5A` | "Good for the Plate" heading on About Us |
| `--color-bg-page` | `#F5F0EB` | Main warm off-white — used on every page |
| `--color-bg-white` | `#FFFFFF` | Cards, inputs, navbar background |
| `--color-bg-hero` | `#111111` | Home hero section overlay — near black |
| `--color-bg-chef-special` | `#2B3A42` | Chef's Special section — dark slate blue-gray (**NOT** black) |
| `--color-bg-testimonial` | `#1A1A1A` | Testimonials section — dark charcoal |
| `--color-bg-footer` | `#1C1C1C` | Footer across all pages |
| `--color-bg-tasting-menu` | `#1A1200` | Menu page tasting section — very dark brown-black |
| `--color-bg-sustainability` | `#F0EFEA` | About Us sustainability section |
| `--color-bg-map` | `#B8D4C8` | Map thumbnail — muted teal-green |
| `--color-text-heading` | `#1A1A1A` | H1/H2 on light backgrounds |
| `--color-text-body` | `#555555` | Paragraphs, descriptions |
| `--color-text-muted` | `#888888` | Labels, captions, form field labels |
| `--color-text-placeholder` | `#AAAAAA` | Input placeholder text |
| `--color-text-white` | `#FFFFFF` | All text on dark backgrounds |
| `--color-text-nav-default` | `#2D2D2D` | Inactive nav links |
| `--color-text-nav-active` | `#E07B39` | Active nav link — orange + underline (all 6 pages) |
| `--color-text-price` | `#E07B39` | Dish card prices |
| `--color-text-gold-price` | `#C9A84C` | Tasting menu price ($145 per person) |
| `--color-text-hero-script` | `#E8C99A` | Hero italic subtitle — warm cream (**NOT** white) |
| `--color-border-light` | `#E8E2D9` | Card borders, calendar border, FAQ rows |
| `--color-border-input` | `#D5CFC8` | Form input border (default state) |
| `--color-border-gold` | `#C9A84C` | Gold border around tasting menu box |
| `--color-border-quote` | `#E07B39` | Left orange border on chef pull quote |
| `--color-border-error` | `#E53935` | Form validation error state |
| `--color-diet-vegetarian` | `#4CAF50` | Green dot on menu items |
| `--color-diet-seafood` | `#2196F3` | Blue dot on menu items |
| `--color-diet-spicy` | `#F44336` | Red dot on menu items |

### 3.2 Typography

| Element | Font | Size | Weight / Style |
|---|---|---|---|
| Navbar Brand | Playfair Display (serif) | 16–18px | Bold |
| Hero Heading | Playfair Display (serif) | 48–64px | Bold, white |
| Hero Subtitle | Dancing Script | 20–24px | Italic, `#E8C99A` |
| Section Headings (H2) | Playfair Display (serif) | 28–36px | Bold, dark |
| Sub-headings (H3) | Inter (sans-serif) | 20–24px | Semi-bold |
| Body Text | Inter (sans-serif) | 14–16px | Regular, `#555555` |
| Nav Links | Inter (sans-serif) | 14px | Regular / Medium |
| Button Text | Inter (sans-serif) | 14–16px | Bold / Semi-bold |
| Price Labels | Inter (sans-serif) | 16–18px | Bold, primary orange |
| Labels / Captions | Inter (sans-serif) | 11–13px | Uppercase, letter-spaced |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap');
```

### 3.3 Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 4px | Micro spacing |
| `--space-sm` | 8px | Icon gaps, small padding |
| `--space-md` | 16px | Card inner padding |
| `--space-lg` | 24px | Component gaps |
| `--space-xl` | 40px | Section internal spacing |
| `--space-2xl` | 64px | Large section gaps |
| `--space-3xl` | 96px | Footer top padding |
| `--space-section` | 100px | Standard top/bottom section padding |
| `--container-max` | 1200px | Max content width, centered |

### 3.4 Component States

| Component | State | Visual |
|---|---|---|
| Button (primary) | Default | Orange fill, white text |
| Button (primary) | Hover | 10% darker (`#C96B2A`) |
| Button (primary) | Disabled | 50% opacity |
| Button (outlined) | Default | Transparent + orange border |
| Button (outlined) | Hover | Orange fill, white text |
| Button (outlined-dark) | Default | Transparent + white border |
| Button (outlined-dark) | Hover | White fill, dark text |
| Nav link | Default | `#2D2D2D` |
| Nav link | Active | `#E07B39` + underline |
| Nav link | Hover | `#E07B39` |
| Form input | Default | White + `#D5CFC8` border |
| Form input | Focus | `#E07B39` orange border |
| Form input | Error | `#E53935` red border + error message |
| Filter pill | Default | Outlined gray |
| Filter pill | Active | Orange fill, white text |
| Time slot | Default | Outlined |
| Time slot | Selected | Orange fill, white text |

---

## 4. Folder & Component Structure

### 4.1 Root Directory Layout

```
savory-bistro/
├── public/
│   ├── images/               ← All static image assets (use .webp format)
│   └── favicon.ico
├── src/
│   ├── assets/               ← Imported assets (icons, SVGs)
│   ├── components/           ← Shared/reusable UI components
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── DishCard/
│   │   │   ├── DishCard.jsx
│   │   │   └── DishCard.css
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.jsx
│   │   │   └── SectionHeader.css
│   │   └── FloatingReserveBtn/
│   │       ├── FloatingReserveBtn.jsx
│   │       └── FloatingReserveBtn.css
│   ├── pages/                ← One folder per route/page
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Menu/
│   │   │   ├── Menu.jsx
│   │   │   └── Menu.css
│   │   ├── Reservations/
│   │   │   ├── Reservations.jsx
│   │   │   └── Reservations.css
│   │   ├── Gallery/
│   │   │   ├── Gallery.jsx
│   │   │   └── Gallery.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   └── AboutUs/
│   │       ├── AboutUs.jsx
│   │       └── AboutUs.css
│   ├── styles/
│   │   └── variables.css     ← All CSS custom properties
│   ├── App.jsx               ← Root component + router setup
│   ├── index.css             ← Global styles + Tailwind imports
│   └── main.jsx              ← React entry point
├── mock-data.json            ← Root level mock data (Option 1)
├── optimize-images.py        ← Image compression script
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### 4.2 Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Page components | PascalCase folder + file | `Home/Home.jsx` |
| Shared components | PascalCase folder + file | `DishCard/DishCard.jsx` |
| CSS files | Same name as component | `Navbar.css` |
| CSS variables | kebab-case with `--` prefix | `--color-primary` |
| Event handlers | `handle` + Action | `handleSubmit`, `handleFilter` |
| State variables | camelCase noun | `selectedDate`, `activeTab` |
| Boolean state | `is`/`has` prefix | `isOpen`, `hasError`, `menuOpen` |

---

## 5. Routing

### 5.1 Route Map

| Route Path | Page Component | Nav Label | Notes |
|---|---|---|---|
| `/` | Home | Home | Default route, landing page |
| `/menu` | Menu | Menu | Full menu with filter tabs |
| `/reservations` | Reservations | Reservations | Table booking form |
| `/gallery` | Gallery | Gallery | Masonry photo/video grid |
| `/contact` | Contact | Contact | Contact form + FAQ |
| `/about` | AboutUs | About Us | Team, story, sustainability |

### 5.2 App.jsx Structure

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingReserveBtn from './components/FloatingReserveBtn/FloatingReserveBtn';
// ... page imports

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Layout><Home /></Layout>} />
        <Route path="/menu"         element={<Layout><Menu /></Layout>} />
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
        <Route path="/gallery"      element={<Layout><Gallery /></Layout>} />
        <Route path="/contact"      element={<Layout><Contact /></Layout>} />
        <Route path="/about"        element={<Layout><AboutUs /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 6. Page-by-Page Requirements

### 6.1 Home Page (`/`)

**Navbar:** Logo left, all 6 nav links center, "Book Table" CTA button right. "Home" link active (orange + underline).

**Hero Section:**
- Full-width dark background (`#111111`) with food photography
- Headline: "Savory Bistro" — large Playfair Display serif, white
- Subtitle: italic Dancing Script "Authentic Flavors, Unforgettable Moments" in `#E8C99A` warm cream
- Two CTAs: "View Menu" (orange fill) + "Reserve a Table" (outlined white)
- Scroll-down arrow at bottom center

**Info Strip:** Three-column — Hours, Address, Phone. Background `#F5F0EB`.

**Our Story:** Two-column — text left, chef photo right. "Meet the Chef" outlined orange button.

**Signature Dishes:**
- Horizontal scrollable card row
- Each card: dish photo, "POPULAR" badge (optional), name, description, price in orange
- Left/right arrow navigation controls

**Chef's Special:**
- Background: `#2B3A42` (dark slate/blue-gray — **NOT** black)
- "CHEF'S SPECIAL" pill badge in `#C8973A` amber/gold
- Dish name in large white serif, price in `#E07B39`, "Order Now" button

**Testimonials:**
- Background: `#1A1A1A`
- Quote marks in `#C9A84C` gold
- Large italic white serif quote text
- Circular avatar + name + "FOOD CRITIC" label, dot pagination

**Footer:** 4-column dark footer — Brand, Quick Links, Contact Us, Newsletter.

---

### 6.2 Menu Page (`/menu`)

**Navbar:** "Menu" link active. Shopping cart icon + badge top-right.

**Hero Banner:** Full-width food photography. "Our Menu" white serif + italic subtitle.

**Category Filter Tabs** (uses `useState`):
- Pills: All, Appetizers, Main Courses, Seafood, Vegetarian, Desserts, Drinks
- Active: orange fill / white text. Default: outlined gray.

**Dish Grid:**
- Three-column grid
- Circular dish photo left, name + description + price right
- "POPULAR" badge (optional), diet dots: green/blue/red

**Chef's Tasting Menu:**
- Background: `#1A1200`, gold border box
- Roman numeral courses I–V, course label in `#C9A84C`, dish name in white serif
- Price: "$145 per person" in large gold text
- "RESERVE THIS EXPERIENCE" orange button

**Drinks & Wine Section:**
- White background, two columns
- "Vintage Cellar" (gold italic) — wine list with origin + price
- "Craft Cocktails" (gold italic) — cocktail list with description + price

---

### 6.3 Reservations Page (`/reservations`)

**Breadcrumb:** Home > Reservations

**Page Header:** H1 "Book Your Table" + subtitle

**Booking Form (left column) — all marked required must validate:**
- Party Size dropdown
- Occasion dropdown (optional)
- Inline date picker calendar (selected date = orange circle, unavailable = grayed)
- Time slot pills grid 17:00–20:30 (selected = orange fill)
- Full Name *(required)*
- Phone Number *(required)*
- Email Address *(required, valid format)*
- Special Requests textarea (optional)
- "Confirm Reservation" full-width orange submit button

**Sidebar (right column):**
- Today's Hours card
- Contact Us card (phone + email)
- Private Dining card + "Inquire Now" button
- Map card + "Get Directions" link

---

### 6.4 Gallery Page (`/gallery`)

**Page Header:** H1 "Moments at Savory Bistro" + subtitle (no hero image)

**Category Filter Pills** (uses `useState`): All, Food, Interior, Events, Chef's Creations

**Masonry Grid:**
- 3-column CSS masonry layout, varying heights
- One item: VIDEO badge + play button overlay
- One item: "Reserve a Table" orange pill overlay

**Explore More:** Two cards — "Our Story" + "Join the Team"

**Footer:** Light variant (Brand + Visit Us + Newsletter)

---

### 6.5 Contact Page (`/contact`)

**Hero Banner:** Dark warm background (`#3D2B1A`). "Get in Touch" + subtitle centered.

**Info Cards Row:** Three white cards — Address (with "Get Directions" link), Hours, Contact (phone + email + socials)

**Two-Column Layout:**
- Left — Contact Form:
  - Name + Email (side by side on desktop, stacked mobile)
  - Subject dropdown (General Inquiry, Reservation, Events, Feedback)
  - Message textarea *(required)*
  - "Send Message" orange button + "We reply within 24 hours"
- Right — Illustrated map (`#B8D4C8` bg), orange pin, "Reserve Table" overlay button

**FAQ Accordion** (uses `useState` — 5 questions, chevron toggle):
1. Do you accommodate dietary restrictions?
2. Is there parking available?
3. Do you accept walk-ins?
4. Can I bring my own wine?
5. Do you offer gift certificates?

---

### 6.6 About Us Page (`/about`)

**Our Journey:**
- Orange label "SINCE 2015", H1 "Our Journey"
- Award badges: Michelin Plate (`#C9A84C` gold), Best New Bistro (`#E07B39` orange)
- Right: 2×2 photo grid

**Chef Feature:**
- Large chef photo left, bio right
- Title in orange italic, left-border pull quote (`#E07B39`)
- Signature dishes list, floating "Reserve Table" orange pill

**Sustainability:**
- Background `#F0EFEA`, heading in `#5A8A5A` forest green
- Four icon columns: Local Sourcing, Zero Waste, Composting, Community
- Partner logo pills: Green Farm, Roots Co., Urban Soil, Eco-Valley

**Meet the Family:** Four team cards — circular avatar, name, role, bio, social icon

**Press Logos:** Forbes, EATER, The New York Times, Vogue (gray)

**Testimonial:** Large italic quote, dark background, orange attribution, dot pagination

---

## 7. Shared Components

### 7.1 Navbar

| Prop | Type | Notes |
|---|---|---|
| none | — | Uses `useLocation()` for active detection |

- Mobile: hamburger toggle (`Menu` / `X` from Lucide) — uses `useState(menuOpen)`
- Dropdown closes when any link is clicked (`closeMenu()` on each NavLink)
- Active style: `color: var(--color-primary)` + `text-decoration: underline`
- Sticky top, `z-index: 50`

### 7.2 Footer

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'full' \| 'light'` | `'full'` | Controls column layout |

- Full: 4 columns — Brand, Quick Links, Contact, Newsletter
- Light: 3 columns — Brand, Visit Us, Newsletter
- Newsletter uses `useState` for email input

### 7.3 Button

| Prop | Type | Default |
|---|---|---|
| `children` | ReactNode | — |
| `variant` | `'primary' \| 'outlined' \| 'outlined-dark'` | `'primary'` |
| `onClick` | function | — |
| `type` | `'button' \| 'submit'` | `'button'` |
| `disabled` | boolean | `false` |
| `fullWidth` | boolean | `false` |

- Min touch target: 44px height + width
- All colors via CSS variables only

### 7.4 DishCard

| Prop | Type | Notes |
|---|---|---|
| `image` | string | Image src path |
| `name` | string | Dish name |
| `description` | string | Short description |
| `price` | number | Displayed as `$XX` in orange |
| `badge` | string \| null | Optional — "POPULAR" pill |
| `dietIcon` | `'vegetarian' \| 'seafood' \| 'spicy' \| null` | Colored dot |

### 7.5 FloatingReserveBtn

- Fixed position bottom-right, `z-index: 999`
- Always rendered via Layout — visible on all 6 pages
- Uses `CalendarDays` icon from `lucide-react`
- Min touch target: 44px

### 7.6 SectionHeader

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | string | — | Optional orange uppercase label |
| `title` | string | — | Required H2 heading |
| `subtitle` | string | — | Optional body text below |
| `align` | `'left' \| 'center'` | `'left'` | Text alignment |

---

## 8. Data Layer (Mock Data)

All data is static mock data in `mock-data.json` at the project root. No API calls in v1.0.

**Top-level keys in `mock-data.json`:**

| Key | Used On | Shape |
|---|---|---|
| `menu` | Menu page | `{ id, name, description, price, category, badge, dietIcon }` |
| `tastingMenu` | Menu page | `{ course, label, dish }` |
| `wines` | Menu page | `{ id, name, origin, price }` |
| `cocktails` | Menu page | `{ id, name, description, price }` |
| `signatureDishes` | Home page | `{ id, name, description, price, badge }` |
| `gallery` | Gallery page | `{ id, src, alt, category, type, size }` |
| `team` | About Us page | `{ id, name, role, bio }` |
| `faqs` | Contact page | `{ id, question, answer }` |

**Menu item categories:** `mainCourses`, `seafood`, `vegetarian`, `appetizers`, `desserts`, `drinks`
**Gallery types:** `photo` \| `video`
**Gallery sizes:** `tall` \| `medium`

---

## 9. GitHub Workflow

### 9.1 Repository Setup

- **Repo:** `savory-bistro` on GitHub
- **`main`** — Protected. Production-ready only. No direct pushes.
- **`develop`** — Integration branch. All features merge here first.
- **`feature/*`** — One branch per page or component.

### 9.2 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production. Protected. Merge via PR from `develop` only. |
| `develop` | Integration. All feature branches merge here. |
| `feature/home-page` | Home page |
| `feature/navbar-footer` | Shared layout components |
| `feature/menu-page` | Menu page |
| `feature/reservations-page` | Reservations page |
| `feature/gallery-page` | Gallery page |
| `feature/contact-page` | Contact page |
| `feature/about-page` | About Us page |

### 9.3 Commit Convention

**Format:** `type(scope): description`

```
feat(home): add hero section with CTA buttons
feat(menu): implement category filter tabs with useState
fix(navbar): correct active link highlight on refresh
style(button): adjust hover state to match design
refactor(footer): extract newsletter into shared component
chore: update .gitignore and README
```

**Types:** `feat` `fix` `style` `refactor` `chore` `docs` `test`

### 9.4 Pull Request Rules

1. PR from `feature/your-page` → `develop` (**never** → `main`)
2. PR title references the feature
3. Minimum 1 reviewer approval required
4. No build errors — CI must pass
5. Delete feature branch after merge

### 9.5 Merge Conflict Prevention

- **Always** `git pull origin develop` before starting any work session
- **Announce** in team chat before editing shared files (`Navbar.jsx`, `Footer.jsx`, `App.jsx`, `variables.css`)
- **Commit often** — smaller commits are easier to resolve
- **Never** push directly to `main` or `develop`

### 9.6 Daily Workflow

```bash
# Start of day — sync develop first
git checkout develop && git pull origin develop

# Switch to your branch
git checkout feature/your-page

# Merge latest develop into your branch
git merge develop

# Work, then commit
git add .
git commit -m "feat(page): what you built"
git push origin feature/your-page

# When done → open PR on GitHub: feature/your-page → develop
```

---

## 10. Team Roles & Page Ownership

| Role | Assigned To | Responsibilities |
|---|---|---|
| Project Lead | TBD | PRD ownership, code review, final merge approvals, design QA |
| Developer A | TBD | Home page + Navbar, Footer, Button, FloatingReserveBtn |
| Developer B | TBD | Menu page + DishCard component + menu data |
| Developer C | TBD | Reservations page (calendar, time slots, form validation) |
| Developer D | TBD | Gallery page + gallery data |
| Developer E | TBD | Contact page (form, FAQ accordion, map) |
| Developer F | TBD | About Us page + team data |

> Shared component changes (Navbar, Footer, Button) must be discussed in the team chat before implementation — they affect all pages.

---

## 11. Development Milestones

| Phase | Milestone | Deliverables |
|---|---|---|
| **Phase 0** | Project Setup | vrtw initialized, folder structure created, Router configured, CSS variables defined, `mock-data.json` created, repo pushed to GitHub |
| **Phase 1** | Shared Components | Navbar (with hamburger menu), Footer (full + light variants), Button (3 variants), FloatingReserveBtn, SectionHeader, DishCard — all complete and reviewed |
| **Phase 2** | Home + Menu | Home page all sections, Menu page with filter tabs and tasting menu |
| **Phase 3** | Reservations + Gallery | Calendar, time slot picker, reservation form; Gallery masonry grid with filter |
| **Phase 4** | Contact + About Us | Contact form + FAQ accordion + map; About Us all sections |
| **Phase 5** | QA & Polish | Design QA all 6 pages, responsive fixes, image optimization (WebP), cross-browser checks, final merge to `main` |

---

## 12. Design QA Checklist

Before merging any page to `develop`, verify every item below.

### 12.1 Visual Fidelity
- [ ] Colors match design tokens exactly — CSS variables used, no hardcoded hex
- [ ] Typography: font size, weight, and color match design per element
- [ ] Spacing: section padding, card padding, gutters match design
- [ ] Button styles: primary, outlined, outlined-dark all render correctly
- [ ] Active states: nav links, filter pills, time slots show correct orange highlight

### 12.2 Functionality
- [ ] All navigation links route correctly with **no** page refresh (`<NavLink>` only)
- [ ] Zero `<a>` tags for internal routing — inspect DOM to verify
- [ ] Menu filter tabs show/hide dishes correctly
- [ ] Reservation calendar date selection works (orange highlight)
- [ ] Time slot buttons toggle selected state
- [ ] Gallery filter tabs show/hide photos by category
- [ ] FAQ accordion items open/close on click
- [ ] All forms capture input state via `useState`
- [ ] Newsletter email input captures state

### 12.3 Form Validation
- [ ] Submitting reservation form with empty required fields shows error messages
- [ ] Contact form: empty name, invalid email, empty message all produce errors
- [ ] Email fields reject invalid formats (no `@domain`)
- [ ] Forms do **NOT** submit when validation fails
- [ ] Error messages appear clearly below invalid fields
- [ ] Newsletter rejects invalid email format

### 12.4 Responsive Design
- [ ] Verified at: **375px**, **768px**, **1024px**, **1280px+**
- [ ] No horizontal scroll at any breakpoint
- [ ] Navbar collapses to hamburger on mobile (< 768px)
- [ ] Hamburger opens/closes correctly — closes on link click
- [ ] Cards stack vertically on mobile — no overflow
- [ ] Images scale correctly — no overflow
- [ ] Text readable at all screen sizes
- [ ] Reservation sidebar stacks below form on mobile
- [ ] Footer collapses to single column on mobile
- [ ] All interactive elements meet 44px minimum touch target

---

## 13. Appendix

### 13.1 Glossary

| Term | Definition |
|---|---|
| **PRD** | Product Requirements Document |
| **SPA** | Single Page Application |
| **CTA** | Call To Action (e.g. "Book Table", "Order Now") |
| **QA** | Quality Assurance |
| **vrtw** | Zero-config CLI. Run `npm create vrtw`, name the app `savory-bistro`. Pre-installs React, Tailwind CSS, React Router DOM, Lucide Icons, Axios, and a Vite production build setup. |
| **Tailwind CSS** | Utility-first CSS framework. Use alongside custom CSS for brand-specific values. |
| **Lucide Icons** | React icon library pre-installed by vrtw. `import { CalendarDays } from 'lucide-react'` |
| **WebP** | Modern image format ~55% smaller than PNG at same quality. All images must be converted using `optimize-images.py`. |

### 13.2 Quick HEX Reference Card

| Element | HEX | Notes |
|---|---|---|
| Primary CTA orange | `#E07B39` | Buttons, active nav, prices, icons |
| Primary hover | `#C96B2A` | Darkened 10% |
| Chef's Special badge | `#C8973A` | Amber/gold — **NOT** the same as CTA orange |
| Gold accent | `#C9A84C` | Tasting menu, wine section, testimonial quotes |
| Page background | `#F5F0EB` | Warm cream/off-white |
| White surfaces | `#FFFFFF` | Cards, inputs, navbar |
| Hero background | `#111111` | Near-black overlay |
| Chef's Special section | `#2B3A42` | Dark slate/blue-gray (**NOT** black) |
| Testimonial section | `#1A1A1A` | Dark charcoal |
| Footer | `#1C1C1C` | Very dark charcoal |
| Tasting menu section | `#1A1200` | Very dark brown-black |
| Heading text | `#1A1A1A` | H1/H2 on light backgrounds |
| Body text | `#555555` | Paragraphs, descriptions |
| Muted / label text | `#888888` | Form labels, captions |
| Placeholder text | `#AAAAAA` | Input placeholders |
| Default nav links | `#2D2D2D` | Inactive nav link text |
| Hero subtitle script | `#E8C99A` | Warm cream italic (not white) |
| Sustainability heading | `#5A8A5A` | Forest green — About Us only |
| Card borders | `#E8E2D9` | Warm light gray |
| Input borders | `#D5CFC8` | Slightly darker warm gray |
| Map background | `#B8D4C8` | Muted teal-green |
| Diet: vegetarian | `#4CAF50` | Green dot |
| Diet: seafood | `#2196F3` | Blue dot |
| Diet: spicy | `#F44336` | Red dot |
| Form error | `#E53935` | Red border on invalid inputs |

### 13.3 Assets Needed

| Asset | Page | Notes |
|---|---|---|
| Food photography hero | Home, Menu | Full-width, high resolution |
| Chef portrait | Home (Our Story), About Us | Professional portrait |
| Team member avatars ×4 | About Us | Circular crop |
| Gallery — food photos ×3 | Gallery | Various dishes |
| Gallery — interior photos ×2 | Gallery | Dining room, bar |
| Gallery — cocktail photo ×1 | Gallery | Craft cocktail |
| Gallery — video thumbnail ×1 | Gallery | "Behind the Scenes" |
| Restaurant exterior | Contact hero | Dark, atmospheric |
| About Us 2×2 grid | About Us | Exterior, interior, team, menu board |
| Partner logos ×4 | About Us | Green Farm, Roots Co., Urban Soil, Eco-Valley |
| Press logos ×4 | About Us | Forbes, Eater, New York Times, Vogue |

> All images must be run through `optimize-images.py` before committing. Use `.webp` format in all `<img>` `src` attributes.

---

*Savory Bistro • PRD v1.0 • March 2026*
