# SAVORY BISTRO — REFACTOR INSTRUCTIONS
## For Gemini Flash in Antigravity IDE

> **Purpose:** Refactor and clean the existing codebase only.
> No new pages. No new features. No design decisions.
> Every phase has a mandatory test gate — do NOT proceed to the next phase until all checks pass.

---

## MANDATORY RULES — READ BEFORE EVERY PHASE

These rules apply to every single file in every phase. No exceptions.

### Rule 1 — BEM Class Naming
Every CSS class must follow BEM: `ComponentName__element` or `ComponentName__element--modifier`.

```
CORRECT:   .Navbar__link  .Navbar__link--active  .DishCard__badge--featured
WRONG:     .link  .active  .badge  .nav-link  .card-badge
```

If a class name exists without the component prefix, rename it. Update both the `.css` file and every `className` reference in the `.jsx` file.

### Rule 2 — No Hardcoded Colors
Every color value must use a CSS variable from `src/styles/variables.css`.

```
CORRECT:   color: var(--color-primary)
WRONG:     color: #E07B39   color: rgb(224,123,57)   color: orange
```

If a hardcoded hex is found, replace it with the nearest matching variable from this map:

```
#E07B39 or similar orange    → var(--color-primary)
#C96B2A                      → var(--color-primary-hover)
#C8973A                      → var(--color-chef-badge)
#C9A84C                      → var(--color-gold-accent)
#F5F0EB                      → var(--color-bg-page)
#FFFFFF                      → var(--color-bg-white)
#111111                      → var(--color-bg-hero)
#2B3A42                      → var(--color-bg-chef-special)
#1A1A1A                      → var(--color-bg-testimonial)
#1C1C1C                      → var(--color-bg-footer)
#1A1200                      → var(--color-bg-tasting)
#1A1A1A (text heading)       → var(--color-text-heading)
#555555                      → var(--color-text-body)
#888888                      → var(--color-text-muted)
#FFFFFF (on dark bg)         → var(--color-text-white)
#2D2D2D                      → var(--color-text-nav-default)
#E8C99A                      → var(--color-text-hero-script)
#E8E2D9                      → var(--color-border-card)
#D5CFC8                      → var(--color-border-input)
#E53935                      → var(--color-border-error)
#4CAF50                      → var(--color-diet-vegetarian)
#2196F3                      → var(--color-diet-seafood)
#F44336                      → var(--color-diet-spicy)
```

### Rule 3 — No `<a>` Tags for Internal Links
Internal navigation must use React Router components only.

```
CORRECT:   <NavLink to="/menu">   <Link to="/reservations">
WRONG:     <a href="/menu">   <a href="/reservations">
```

External links (https://) may keep `<a target="_blank" rel="noopener noreferrer">`.

### Rule 4 — No TypeScript
All files remain `.jsx` and `.js`. Do not add type annotations or `.ts` extensions.

### Rule 5 — No Anchor Tags in Docs
Do not add HTML anchors or anchor links anywhere in this file or in any generated file.

### Rule 6 — Tailwind for Layout, CSS for Brand
```
Tailwind  → flex, grid, spacing, responsive prefixes (md: lg: xl:)
CSS file  → colors (var(--)), fonts, borders, transitions, states, brand values
```

Never use hardcoded Tailwind color classes like `text-[#E07B39]` or `bg-orange-500`.

### Rule 7 — Section Splitting Trigger
Any page `.jsx` file that contains more than 120 lines must be split into a `sections/` subfolder.
Each section gets its own `.jsx` file AND its own `.css` file.
The parent `index` file becomes a thin assembler only — it imports and renders sections, nothing else. Max 35 lines.

### Rule 8 — One Task Per Phase
Complete each phase fully. Run the test gate. Commit. Then and only then move to the next phase.

---

## PHASE 0 — VERIFY BASE SETUP

**Who:** Project Lead
**Branch:** `develop` (no feature branch for this phase)
**Goal:** Confirm that the repo foundation is correct before any refactoring begins.

### Step 0.1 — Verify `src/styles/variables.css`

Open `src/styles/variables.css`. Confirm the following tokens exist. If any are missing, add them now:

```css
--color-primary: #E07B39;
--color-primary-hover: #C96B2A;
--color-chef-badge: #C8973A;
--color-gold-accent: #C9A84C;
--color-green-sustain: #5A8A5A;
--color-bg-page: #F5F0EB;
--color-bg-white: #FFFFFF;
--color-bg-hero: #111111;
--color-bg-chef-special: #2B3A42;
--color-bg-testimonial: #1A1A1A;
--color-bg-footer: #1C1C1C;
--color-bg-tasting: #1A1200;
--color-bg-sustain: #F0EFEA;
--color-bg-map: #B8D4C8;
--color-bg-contact-hero: #3D2B1A;
--color-text-heading: #1A1A1A;
--color-text-body: #555555;
--color-text-muted: #888888;
--color-text-placeholder: #AAAAAA;
--color-text-white: #FFFFFF;
--color-text-nav-default: #2D2D2D;
--color-text-nav-active: #E07B39;
--color-text-price: #E07B39;
--color-text-gold-price: #C9A84C;
--color-text-hero-script: #E8C99A;
--color-border-card: #E8E2D9;
--color-border-input: #D5CFC8;
--color-border-gold: #C9A84C;
--color-border-quote: #E07B39;
--color-border-error: #E53935;
--color-diet-vegetarian: #4CAF50;
--color-diet-seafood: #2196F3;
--color-diet-spicy: #F44336;
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', 'Segoe UI', sans-serif;
--font-script: 'Dancing Script', cursive;
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 40px;
--space-2xl: 64px;
--space-3xl: 96px;
--space-section: 100px;
--container-max: 1200px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 20px;
--radius-pill: 100px;
--transition-fast: 0.15s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;
--z-navbar: 50;
--z-floating: 999;
--z-modal: 1000;
```

Do not remove any tokens that already exist. Only add missing ones.

### Step 0.2 — Verify `src/index.css`

Confirm this file contains exactly these lines and nothing else that conflicts:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 0.3 — Verify `src/App.jsx`

`App.jsx` must contain routes for Login and Signup. Open the file and confirm these routes exist. If they are missing, add them now:

```jsx
import Login  from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
```

```jsx
<Route path="/login"  element={<Login />} />
<Route path="/signup" element={<Signup />} />
```

Login and Signup routes must NOT be wrapped in `<Layout>` — they are standalone pages with no Navbar, Footer, or FloatingReserveBtn.

The full correct `App.jsx` structure:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar             from './components/Navbar/Navbar';
import Footer             from './components/Footer/Footer';
import FloatingReserveBtn from './components/FloatingReserveBtn/FloatingReserveBtn';
import Home               from './pages/Home/Home';
import Menu               from './pages/Menu/Menu';
import Reservations       from './pages/Reservations/Reservations';
import Gallery            from './pages/Gallery/Gallery';
import Contact            from './pages/Contact/Contact';
import AboutUs            from './pages/AboutUs/AboutUs';
import Login              from './pages/Login/Login';
import Signup             from './pages/Signup/Signup';
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
        <Route path="/login"        element={<Login />} />
        <Route path="/signup"       element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Step 0.4 — Verify `mock-data.json` at Root Level

Confirm `mock-data.json` exists at the project root (same level as `package.json`).
It must NOT be inside `src/`.

If it exists, verify it has these top-level keys (values can be empty arrays for now):

```json
{
  "menu": [],
  "tastingMenu": [],
  "wines": [],
  "cocktails": [],
  "signatureDishes": [],
  "gallery": [],
  "team": [],
  "faqs": []
}
```

### Step 0.5 — Rename `src/components/redesign/` to `src/components/SvgAssets/`

Current state:
```
src/components/redesign/AuthBgCurve.jsx
src/components/redesign/AuthLeafLines.jsx
src/components/redesign/ZigZagLightning.jsx
```

Required state:
```
src/components/SvgAssets/AuthBgCurve.jsx
src/components/SvgAssets/AuthLeafLines.jsx
src/components/SvgAssets/ZigZagLightning.jsx
```

After renaming the folder, find every import of these three files anywhere in the codebase and update the import path. Search for `redesign` in all `.jsx` files and replace every occurrence.

Note: These are JSX wrapper components for the SVG assets in `src/assets/`. They have no `.css` files — that is correct. Do not add CSS files to them.

### Step 0.6 — Rename `src/pages/Home/sections/About/` to `src/pages/Home/sections/OurStory/`

Current state:
```
src/pages/Home/sections/About/About.jsx
src/pages/Home/sections/About/About.css
```

Required state:
```
src/pages/Home/sections/OurStory/OurStory.jsx
src/pages/Home/sections/OurStory/OurStory.css
```

After renaming, update the import in `src/pages/Home/Home.jsx`. The component function name inside the file must also be renamed from `About` to `OurStory`.

---

### PHASE 0 — TEST GATE

Do not proceed to Phase 1 until every item below passes:

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser opens at localhost:5173 → no blank screen
[ ] 3. Browser console → zero errors, zero warnings
[ ] 4. DevTools → Elements → any element → Computed styles shows --color-primary: #E07B39
[ ] 5. Navigate to /login → page renders (no crash)
[ ] 6. Navigate to /signup → page renders (no crash)
[ ] 7. src/components/SvgAssets/ folder exists (not redesign/)
[ ] 8. src/pages/Home/sections/OurStory/ folder exists (not About/)
```

### Phase 0 — Git Commit

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-0-base-setup
git add .
git commit -m "chore: verify base setup, rename redesign to SvgAssets, rename About to OurStory, add login/signup routes"
git push origin refactor/phase-0-base-setup
```

Open PR: `refactor/phase-0-base-setup` → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 1 — SHARED COMPONENTS REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-1-shared-components`
**Goal:** Refactor all 6 shared components for BEM, hardcoded colors, and routing violations.

Start by pulling the latest develop:

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-1-shared-components
```

Work through components in this exact order. Complete and visually verify each one before moving to the next.

---

### 1.1 — Button Component

**Files:** `src/components/Button/Button.jsx` + `Button.css`

Open both files. Apply every rule from the Mandatory Rules section.

BEM class names required in `Button.css`:

```
.Button                      → base container
.Button--primary             → primary variant
.Button--outlined            → outlined variant
.Button--outlined-dark       → outlined-dark variant
.Button--disabled            → disabled state
.Button--full-width          → fullWidth prop
```

Check for violations:
- Any hardcoded hex color → replace with `var(--color-*)` from the color map above
- Any class without `Button__` or `Button--` prefix → rename and update JSX
- `type` prop must default to `"button"` — confirm it is set

Verify props are correctly handled:

```
children    → required
variant     → 'primary' | 'outlined' | 'outlined-dark', default: 'primary'
onClick     → optional function
type        → 'button' | 'submit', default: 'button'
disabled    → boolean, default: false
fullWidth   → boolean, default: false
```

### 1.2 — SectionHeader Component

**Files:** `src/components/SectionHeader/SectionHeader.jsx` + `SectionHeader.css`

BEM class names required:

```
.SectionHeader               → container
.SectionHeader--center       → when align='center'
.SectionHeader__label        → small orange uppercase line
.SectionHeader__title        → H2 heading
.SectionHeader__subtitle     → body text below title
```

Check for violations. Verify props:

```
label     → string | undefined
title     → string, required
subtitle  → string | undefined
align     → 'left' | 'center', default: 'left'
```

### 1.3 — DishCard Component

**Files:** `src/components/DishCard/DishCard.jsx` + `DishCard.css`

BEM class names required:

```
.DishCard                    → card container
.DishCard__image-wrapper     → image container (position: relative)
.DishCard__image             → the <img> element
.DishCard__badge             → POPULAR badge (absolute top-left)
.DishCard__body              → card body padding area
.DishCard__diet-dot          → 8px diet indicator circle
.DishCard__diet-dot--veg     → green dot
.DishCard__diet-dot--seafood → blue dot
.DishCard__diet-dot--spicy   → red dot
.DishCard__name              → dish name
.DishCard__description       → dish description
.DishCard__price             → price value
```

Check for violations. Verify props:

```
image       → string (src path)
name        → string
description → string
price       → number
badge       → string | null
dietIcon    → 'vegetarian' | 'seafood' | 'spicy' | null
```

### 1.4 — FloatingReserveBtn Component

**Files:** `src/components/FloatingReserveBtn/FloatingReserveBtn.jsx` + `FloatingReserveBtn.css`

BEM class names required:

```
.FloatingReserveBtn          → the fixed button container
.FloatingReserveBtn__icon    → CalendarDays icon wrapper
.FloatingReserveBtn__text    → "Reserve Now" text
```

Critical checks:
- Link must be `<NavLink to="/reservations">` — NOT `<a href="/reservations">`
- `z-index` must use `var(--z-floating)` — NOT hardcoded `999`
- Background must use `var(--color-primary)` — NOT hardcoded hex
- Position: `fixed`, `bottom: 32px`, `right: 32px`

### 1.5 — Navbar Component

**Files:** `src/components/Navbar/Navbar.jsx` + `Navbar.css`

BEM class names required:

```
.Navbar                      → the nav element
.Navbar__brand               → logo + brand name container
.Navbar__brand-icon          → UtensilsCrossed icon
.Navbar__brand-name          → "Savory Bistro" text
.Navbar__links               → desktop links container
.Navbar__link                → individual NavLink
.Navbar__link--active        → active route state
.Navbar__cta                 → "Book Table" button area
.Navbar__hamburger           → mobile hamburger button
.Navbar__mobile-menu         → mobile dropdown container
.Navbar__mobile-menu--open   → visible state
.Navbar__mobile-link         → link inside mobile menu
```

Critical checks:
- All internal links must be `<NavLink to="...">` — NOT `<a href="...">`
- Active state detection: must use `useLocation()` from `react-router-dom`
- `z-index` must use `var(--z-navbar)` — NOT hardcoded `50`
- Mobile menu state: `const [menuOpen, setMenuOpen] = useState(false)`
- Mobile menu must close when any link is clicked

### 1.6 — Footer Component

**Files:** `src/components/Footer/Footer.jsx` + `Footer.css`

BEM class names required:

```
.Footer                      → footer element
.Footer--light               → light variant modifier
.Footer__container           → max-width wrapper
.Footer__grid                → columns grid
.Footer__brand               → logo + tagline column
.Footer__brand-icon          → UtensilsCrossed icon
.Footer__brand-name          → "Savory Bistro" text
.Footer__tagline             → tagline text
.Footer__column-title        → column heading (Quick Links, Contact Us, etc.)
.Footer__link                → internal link
.Footer__newsletter          → newsletter column
.Footer__newsletter-input    → email input field
.Footer__newsletter-btn      → subscribe button
.Footer__bottom              → copyright bar
.Footer__copyright           → copyright text
```

Critical checks:
- All internal links must be `<Link to="...">` — NOT `<a href="...">`
- External links may remain `<a target="_blank" rel="noopener noreferrer">`
- `variant` prop: `'full'` (4 columns) or `'light'` (3 columns) — default: `'full'`
- Newsletter email: controlled with `useState`

### 1.7 — Toast Component

**Files:** `src/components/Toast/Toast.jsx` + `Toast.css`

BEM class names required:

```
.Toast                       → container
.Toast--success              → success variant
.Toast--error                → error variant
.Toast--warning              → warning variant
.Toast__message              → message text
.Toast__close                → close button
```

Check for hardcoded hex colors. Replace with nearest `var(--color-*)` token.

---

### PHASE 1 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. Navbar: active link shows orange at all 6 routes
[ ] 4. Navbar: hamburger opens/closes on mobile (375px)
[ ] 5. Navbar: "Book Table" uses <NavLink> — verify in DevTools (no <a> for internal links)
[ ] 6. Footer: renders full 4-column layout on Home
[ ] 7. Footer: renders 3-column layout on Gallery (/gallery)
[ ] 8. Button: all 3 variants render without hardcoded colors
[ ] 9. FloatingReserveBtn: visible fixed bottom-right, links to /reservations
[ ] 10. Responsive check on all shared components: 375px, 768px, 1024px
```

### Phase 1 — Git Commit

```bash
git add .
git commit -m "refactor(components): apply BEM, replace hardcoded hex, fix routing violations in all shared components"
git push origin refactor/phase-1-shared-components
```

Open PR: `refactor/phase-1-shared-components` → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 2 — SvgAssets COMPONENTS REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-2-svg-assets`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-2-svg-assets
```

**Files:**
```
src/components/SvgAssets/AuthBgCurve.jsx
src/components/SvgAssets/AuthLeafLines.jsx
src/components/SvgAssets/ZigZagLightning.jsx
```

These are SVG wrapper components. They have no `.css` files — that is correct and expected.

For each file apply these checks:

**AuthBgCurve.jsx:**
- Renders the SVG from `src/assets/auth-bg-curve.svg`
- Must export a default function named `AuthBgCurve`
- Any inline color styles must use `var(--color-*)` tokens
- No hardcoded hex in JSX `style` props

**AuthLeafLines.jsx:**
- Renders the SVG from `src/assets/auth-leaf-lines.svg`
- Must export a default function named `AuthLeafLines`
- Any inline color styles must use `var(--color-*)` tokens

**ZigZagLightning.jsx:**
- Renders the SVG from `src/assets/zigzag.svg` or `src/assets/zigzag-orange.svg`
- Must export a default function named `ZigZagLightning`
- Accept a `variant` prop if it switches between the two SVGs: `variant='default' | 'orange'`
- Any inline color styles must use `var(--color-*)` tokens

---

### PHASE 2 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. All three components import correctly wherever they are used
[ ] 4. No hardcoded hex in any SvgAssets file
```

### Phase 2 — Git Commit

```bash
git add .
git commit -m "refactor(SvgAssets): rename from redesign, apply naming and token rules"
git push origin refactor/phase-2-svg-assets
```

Open PR → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 3 — HOME PAGE REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-3-home`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-3-home
```

The Home page already has a `sections/` structure. This phase refactors each section file for BEM, colors, and routing — and renames the `About` section to `OurStory` (if not already done in Phase 0).

**Current sections:**
```
src/pages/Home/sections/Hero/Hero.jsx + Hero.css
src/pages/Home/sections/OurStory/OurStory.jsx + OurStory.css   ← renamed from About/
src/pages/Home/sections/ChefSpecial/ChefSpecial.jsx + ChefSpecial.css
src/pages/Home/sections/InfoBar/InfoBar.jsx + InfoBar.css
src/pages/Home/sections/SignatureDishes/SignatureDishes.jsx + SignatureDishes.css
src/pages/Home/sections/Testimonials/Testimonials.jsx + Testimonials.css
```

**`src/pages/Home/Home.jsx` — thin assembler only:**

After refactoring, `Home.jsx` must look like this and nothing else:

```jsx
import './Home.css';
import Hero             from './sections/Hero/Hero';
import InfoBar          from './sections/InfoBar/InfoBar';
import ChefSpecial      from './sections/ChefSpecial/ChefSpecial';
import SignatureDishes  from './sections/SignatureDishes/SignatureDishes';
import Testimonials     from './sections/Testimonials/Testimonials';
import OurStory         from './sections/OurStory/OurStory';

export default function Home() {
  return (
    <div className="Home">
      <Hero />
      <InfoBar />
      <ChefSpecial />
      <SignatureDishes />
      <Testimonials />
      <OurStory />
    </div>
  );
}
```

If `Home.jsx` contains any section JSX directly (not imported from sections/), extract it into its correct section file.

### 3.1 — Hero Section

**File:** `src/pages/Home/sections/Hero/Hero.jsx` + `Hero.css`

BEM classes required:

```
.Hero                        → section container
.Hero__background            → background image/overlay container
.Hero__content               → centered content wrapper
.Hero__headline              → "Savory Bistro" H1
.Hero__subtitle              → Dancing Script subtitle
.Hero__cta-group             → flex row for buttons
.Hero__scroll-arrow          → bottom scroll indicator
```

Critical color checks:
- Background overlay: `var(--color-bg-hero)` = `#111111` — NOT any other dark color
- Headline: `var(--color-text-white)`
- Subtitle: `var(--color-text-hero-script)` = `#E8C99A` — NOT white (`#FFFFFF`)
- Subtitle font: `var(--font-script)` — NOT `var(--font-serif)`

Routing checks:
- "View Menu" button → `<Link to="/menu">` — NOT `<a href="/menu">`
- "Reserve a Table" button → `<Link to="/reservations">` — NOT `<a>`

### 3.2 — InfoBar Section

**File:** `src/pages/Home/sections/InfoBar/InfoBar.jsx` + `InfoBar.css`

BEM classes required:

```
.InfoBar                     → section container
.InfoBar__container          → max-width wrapper
.InfoBar__item               → individual info item
.InfoBar__item-icon          → lucide icon wrapper
.InfoBar__item-text          → text content
```

Check: background must use `var(--color-bg-white)` — NOT hardcoded white.

### 3.3 — ChefSpecial Section

**File:** `src/pages/Home/sections/ChefSpecial/ChefSpecial.jsx` + `ChefSpecial.css`

BEM classes required:

```
.ChefSpecial                 → section container
.ChefSpecial__container      → max-width wrapper
.ChefSpecial__badge          → "CHEF'S SPECIAL" pill
.ChefSpecial__dish-name      → dish title
.ChefSpecial__description    → dish subtitle
.ChefSpecial__price          → price display
.ChefSpecial__cta            → button wrapper
```

Critical color checks — these are the most commonly wrong:
- Section background: `var(--color-bg-chef-special)` = `#2B3A42` — NOT `#000` or `#1A1A1A`
- Badge background: `var(--color-chef-badge)` = `#C8973A` — NOT `var(--color-primary)` or `#E07B39`
- Price: `var(--color-primary)` = `#E07B39`

### 3.4 — SignatureDishes Section

**File:** `src/pages/Home/sections/SignatureDishes/SignatureDishes.jsx` + `SignatureDishes.css`

BEM classes required:

```
.SignatureDishes              → section container
.SignatureDishes__container   → max-width wrapper
.SignatureDishes__grid        → card grid
```

Check: `<DishCard>` components must be imported from `../../../../components/DishCard/DishCard`.
Data must come from `mock-data.json` using key `signatureDishes`.

Correct import path from this file's location:
```js
import mockData from '../../../../mock-data.json';
```

### 3.5 — Testimonials Section

**File:** `src/pages/Home/sections/Testimonials/Testimonials.jsx` + `Testimonials.css`

BEM classes required:

```
.Testimonials                → section container
.Testimonials__container     → max-width wrapper
.Testimonials__quote-mark    → decorative quote character
.Testimonials__quote-text    → testimonial body
.Testimonials__reviewer      → reviewer row
.Testimonials__avatar        → circular avatar image
.Testimonials__reviewer-name → reviewer name
.Testimonials__reviewer-label→ "FOOD CRITIC" label
.Testimonials__dots          → pagination dots container
.Testimonials__dot           → individual dot
.Testimonials__dot--active   → active dot
```

Critical color checks:
- Section background: `var(--color-bg-testimonial)` = `#1A1A1A`
- Quote mark: `var(--color-gold-accent)` = `#C9A84C`
- Quote text: `var(--color-text-white)`
- Reviewer label: `var(--color-primary)`
- Active dot: `var(--color-primary)`

State check: `const [activeIndex, setActiveIndex] = useState(0)` must exist.

### 3.6 — OurStory Section

**File:** `src/pages/Home/sections/OurStory/OurStory.jsx` + `OurStory.css`

BEM classes required:

```
.OurStory                    → section container
.OurStory__container         → max-width wrapper
.OurStory__content           → text/image layout
.OurStory__text              → text column
.OurStory__image             → image column
```

Verify the component function is named `OurStory` (not `About`).

---

### PHASE 3 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. Navigate to / → Home page renders all sections
[ ] 4. Hero subtitle is warm cream (#E8C99A), NOT white
[ ] 5. ChefSpecial background is dark slate (#2B3A42), NOT black
[ ] 6. ChefSpecial badge is amber (#C8973A), NOT orange (#E07B39)
[ ] 7. Hero CTA buttons link correctly to /menu and /reservations (no full page refresh)
[ ] 8. Responsive check: 375px, 768px, 1024px — no broken layouts
```

### Phase 3 — Git Commit

```bash
git add .
git commit -m "refactor(home): apply BEM, replace hardcoded hex, fix routing, verify section structure"
git push origin refactor/phase-3-home
```

Open PR → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 4 — LOGIN PAGE REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-4-login`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-4-login
```

The Login page already has `sections/` structure. This phase refactors for BEM, colors, and violations only.

**Current structure:**
```
src/pages/Login/Login.jsx
src/pages/Login/Login.css
src/pages/Login/sections/LoginForm/LoginForm.jsx + LoginForm.css
src/pages/Login/sections/LoginPanel/LoginPanel.jsx + LoginPanel.css
```

**`src/pages/Login/Login.jsx` — thin assembler only:**

```jsx
import './Login.css';
import LoginPanel from './sections/LoginPanel/LoginPanel';
import LoginForm  from './sections/LoginForm/LoginForm';

export default function Login() {
  return (
    <div className="Login">
      <LoginPanel />
      <LoginForm />
    </div>
  );
}
```

### 4.1 — LoginPanel Section

**File:** `src/pages/Login/sections/LoginPanel/LoginPanel.jsx` + `LoginPanel.css`

This panel uses the SVG assets. BEM classes required:

```
.LoginPanel                  → section container
.LoginPanel__background      → SVG background wrapper
.LoginPanel__content         → centered content
.LoginPanel__logo            → logo area
.LoginPanel__tagline         → tagline text
```

SVG imports must come from `../../../../components/SvgAssets/` (not `redesign/`).
If they still import from `redesign/`, update the path now.

Check all colors use `var(--color-*)` tokens.

### 4.2 — LoginForm Section

**File:** `src/pages/Login/sections/LoginForm/LoginForm.jsx` + `LoginForm.css`

BEM classes required:

```
.LoginForm                   → form container
.LoginForm__title            → page heading
.LoginForm__subtitle         → subheading
.LoginForm__field            → form field wrapper
.LoginForm__label            → input label
.LoginForm__input            → text/email/password input
.LoginForm__input--error     → error state
.LoginForm__error            → error message text
.LoginForm__submit           → submit button area
.LoginForm__footer           → "Don't have an account?" row
.LoginForm__link             → link to /signup
```

Critical checks:
- "Sign up" / "Create account" link → `<Link to="/signup">` — NOT `<a href="/signup">`
- Form must have validation: email format check, password minimum length
- All inputs: controlled with `useState`
- Error messages: shown below each invalid field using `var(--color-border-error)`
- Border color on error inputs: `var(--color-border-error)` = `#E53935`

Note: `AuthContext` is at `src/context/AuthContext.jsx`.
Import path from this file: `../../../../context/AuthContext`.

---

### PHASE 4 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. Navigate to /login → page renders correctly
[ ] 4. Login has no Navbar, Footer, or FloatingReserveBtn
[ ] 5. Submit empty form → validation errors appear
[ ] 6. "Sign up" link → navigates to /signup without page refresh
[ ] 7. SVG assets load (no broken image icons)
[ ] 8. Responsive check: 375px, 768px, 1024px
```

### Phase 4 — Git Commit

```bash
git add .
git commit -m "refactor(login): apply BEM, replace hardcoded hex, fix routing, update SvgAssets import paths"
git push origin refactor/phase-4-login
```

Open PR → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 5 — SIGNUP PAGE REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-5-signup`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-5-signup
```

**Current structure:**
```
src/pages/Signup/Signup.jsx
src/pages/Signup/Signup.css
src/pages/Signup/sections/SignupForm/SignupForm.jsx + SignupForm.css
src/pages/Signup/sections/SignupPanel/SignupPanel.jsx + SignupPanel.css
```

**`src/pages/Signup/Signup.jsx` — thin assembler only:**

```jsx
import './Signup.css';
import SignupPanel from './sections/SignupPanel/SignupPanel';
import SignupForm  from './sections/SignupForm/SignupForm';

export default function Signup() {
  return (
    <div className="Signup">
      <SignupPanel />
      <SignupForm />
    </div>
  );
}
```

### 5.1 — SignupPanel Section

**File:** `src/pages/Signup/sections/SignupPanel/SignupPanel.jsx` + `SignupPanel.css`

BEM classes required:

```
.SignupPanel                 → section container
.SignupPanel__background     → SVG background wrapper
.SignupPanel__content        → centered content
.SignupPanel__logo           → logo area
.SignupPanel__tagline        → tagline text
```

SVG imports must come from `../../../../components/SvgAssets/` — NOT `redesign/`.
Check and update if needed.

### 5.2 — SignupForm Section

**File:** `src/pages/Signup/sections/SignupForm/SignupForm.jsx` + `SignupForm.css`

BEM classes required:

```
.SignupForm                  → form container
.SignupForm__title           → page heading
.SignupForm__subtitle        → subheading
.SignupForm__field           → form field wrapper
.SignupForm__label           → input label
.SignupForm__input           → text/email/password input
.SignupForm__input--error    → error state
.SignupForm__error           → error message text
.SignupForm__submit          → submit button area
.SignupForm__footer          → "Already have an account?" row
.SignupForm__link            → link to /login
```

Critical checks:
- "Log in" / "Sign in" link → `<Link to="/login">` — NOT `<a href="/login">`
- Form validation: name required, email format, password min 8 chars, confirm password match
- All inputs: controlled with `useState`
- Error messages shown below each invalid field

---

### PHASE 5 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. Navigate to /signup → page renders correctly
[ ] 4. Signup has no Navbar, Footer, or FloatingReserveBtn
[ ] 5. Submit empty form → validation errors appear
[ ] 6. Password mismatch → error shown on confirm field
[ ] 7. "Log in" link → navigates to /login without page refresh
[ ] 8. SVG assets load correctly
[ ] 9. Responsive check: 375px, 768px, 1024px
```

### Phase 5 — Git Commit

```bash
git add .
git commit -m "refactor(signup): apply BEM, replace hardcoded hex, fix routing, update SvgAssets import paths"
git push origin refactor/phase-5-signup
```

Open PR → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 6 — FLAT PAGES REFACTOR (Menu, Reservations, Gallery, Contact, AboutUs)

**Who:** Next available developer — one sub-phase per developer if team is available
**Branch:** One branch per page (see below)

These 5 pages are currently flat — a single `.jsx` file with no `sections/` subfolder.
Per the agreed strategy: refactor only what exists, leave missing sections as empty placeholders.

For each page, the process is:

1. Open the `.jsx` file and read all existing code
2. Identify each distinct visual section in the existing code
3. Create a `sections/` subfolder
4. For each identified section: create `SectionName.jsx` + `SectionName.css` inside `sections/`
5. Move the existing section JSX into the correct section file
6. If a section is referenced in the PRD but has no code yet: create the file with an empty placeholder only
7. Reduce the parent `.jsx` to a thin assembler

**Empty placeholder format** (use this exactly for any missing section):

```jsx
export default function SectionName() {
  return <section className="SectionName"></section>;
}
```

```css
/* SectionName — placeholder, not yet built */
.SectionName {}
```

---

### 6.1 — Menu Page

**Branch:** `refactor/phase-6-menu`

```bash
git checkout develop && git pull origin develop
git checkout -b refactor/phase-6-menu
```

**Required sections structure:**

```
src/pages/Menu/
  Menu.jsx              ← thin assembler
  Menu.css              ← page-level only
  sections/
    MenuHero/
      MenuHero.jsx
      MenuHero.css
    FilterTabs/
      FilterTabs.jsx
      FilterTabs.css
    MenuGrid/
      MenuGrid.jsx
      MenuGrid.css
    TastingMenu/
      TastingMenu.jsx
      TastingMenu.css
    WineList/
      WineList.jsx
      WineList.css
```

**Thin assembler `Menu.jsx`:**

```jsx
import './Menu.css';
import MenuHero    from './sections/MenuHero/MenuHero';
import FilterTabs  from './sections/FilterTabs/FilterTabs';
import MenuGrid    from './sections/MenuGrid/MenuGrid';
import TastingMenu from './sections/TastingMenu/TastingMenu';
import WineList    from './sections/WineList/WineList';

export default function Menu() {
  return (
    <div className="Menu">
      <MenuHero />
      <FilterTabs />
      <MenuGrid />
      <TastingMenu />
      <WineList />
    </div>
  );
}
```

BEM classes for existing sections:

**FilterTabs:**
```
.FilterTabs                  → container
.FilterTabs__list            → flex list of pills
.FilterTabs__pill            → individual filter button
.FilterTabs__pill--active    → active state
```

**MenuGrid:**
```
.MenuGrid                    → section container
.MenuGrid__container         → max-width wrapper
.MenuGrid__grid              → CSS grid of DishCards
```

**TastingMenu:**
```
.TastingMenu                 → section container
.TastingMenu__container      → max-width wrapper
.TastingMenu__box            → gold border inner box
.TastingMenu__title          → section heading
.TastingMenu__course-row     → each course line
.TastingMenu__course-label   → roman numeral + label
.TastingMenu__course-name    → dish name
.TastingMenu__price-block    → price + "per person"
.TastingMenu__price          → "$145" value
.TastingMenu__price-label    → "per person" text
```

Critical color for TastingMenu — most commonly wrong:
- Section background: `var(--color-bg-tasting)` = `#1A1200` — NOT `#1A1A1A`
- Gold border: `var(--color-border-gold)` = `#C9A84C`
- Course label color: `var(--color-gold-accent)` = `#C9A84C`
- Price color: `var(--color-text-gold-price)` = `#C9A84C` — NOT `var(--color-primary)` or orange

Data import from Menu page files:
```js
import mockData from '../../../../mock-data.json';
```

Test gate for Menu:
```
[ ] npm run dev → zero errors
[ ] Browser console → zero errors
[ ] Navigate to /menu → renders without crash
[ ] sections/ folder exists with all 5 section files
[ ] TastingMenu background is dark brown #1A1200 (check in DevTools)
[ ] FilterTabs: active pill shows orange background
[ ] Responsive: 375px, 768px, 1024px
```

```bash
git add .
git commit -m "refactor(menu): split into sections/, apply BEM, fix colors and routing"
git push origin refactor/phase-6-menu
```

---

### 6.2 — Reservations Page

**Branch:** `refactor/phase-6-reservations`

```bash
git checkout develop && git pull origin develop
git checkout -b refactor/phase-6-reservations
```

**Required sections structure:**

```
src/pages/Reservations/
  Reservations.jsx
  Reservations.css
  sections/
    ReservationHero/
      ReservationHero.jsx
      ReservationHero.css
    CalendarPicker/
      CalendarPicker.jsx
      CalendarPicker.css
    TimeSlots/
      TimeSlots.jsx
      TimeSlots.css
    ReservationForm/
      ReservationForm.jsx
      ReservationForm.css
```

**Thin assembler `Reservations.jsx`:**

```jsx
import './Reservations.css';
import ReservationHero from './sections/ReservationHero/ReservationHero';
import CalendarPicker  from './sections/CalendarPicker/CalendarPicker';
import TimeSlots       from './sections/TimeSlots/TimeSlots';
import ReservationForm from './sections/ReservationForm/ReservationForm';

export default function Reservations() {
  return (
    <div className="Reservations">
      <ReservationHero />
      <CalendarPicker />
      <TimeSlots />
      <ReservationForm />
    </div>
  );
}
```

BEM for ReservationForm:

```
.ReservationForm             → form section
.ReservationForm__container  → max-width wrapper
.ReservationForm__group      → field group
.ReservationForm__label      → input label
.ReservationForm__input      → text input
.ReservationForm__input--error → error state
.ReservationForm__error      → error message
.ReservationForm__submit     → submit button area
```

State rule: one `useState` per form field. No grouped state objects.

```
const [name, setName]         = useState('');
const [email, setEmail]       = useState('');
const [phone, setPhone]       = useState('');
const [partySize, setPartySize] = useState('');
const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
```

Test gate for Reservations:
```
[ ] npm run dev → zero errors
[ ] Browser console → zero errors
[ ] Navigate to /reservations → renders without crash
[ ] sections/ folder exists with all 4 section files
[ ] Form validation: submit empty → errors appear on all required fields
[ ] Responsive: 375px, 768px, 1024px
```

```bash
git add .
git commit -m "refactor(reservations): split into sections/, apply BEM, fix colors"
git push origin refactor/phase-6-reservations
```

---

### 6.3 — Gallery Page

**Branch:** `refactor/phase-6-gallery`

```bash
git checkout develop && git pull origin develop
git checkout -b refactor/phase-6-gallery
```

**Required sections structure:**

```
src/pages/Gallery/
  Gallery.jsx
  Gallery.css
  sections/
    GalleryHero/
      GalleryHero.jsx
      GalleryHero.css
    GalleryFilter/
      GalleryFilter.jsx
      GalleryFilter.css
    MasonryGrid/
      MasonryGrid.jsx
      MasonryGrid.css
```

**Thin assembler `Gallery.jsx`:**

```jsx
import './Gallery.css';
import GalleryHero   from './sections/GalleryHero/GalleryHero';
import GalleryFilter from './sections/GalleryFilter/GalleryFilter';
import MasonryGrid   from './sections/MasonryGrid/MasonryGrid';

export default function Gallery() {
  return (
    <div className="Gallery">
      <GalleryHero />
      <GalleryFilter />
      <MasonryGrid />
    </div>
  );
}
```

BEM for MasonryGrid:

```
.MasonryGrid                 → section container
.MasonryGrid__container      → max-width wrapper
.MasonryGrid__grid           → CSS columns layout
.MasonryGrid__item           → individual grid item
.MasonryGrid__item--tall     → tall size variant
.MasonryGrid__item--medium   → medium size variant
.MasonryGrid__image          → image element
```

State: `const [activeFilter, setActiveFilter] = useState('all')`
Filter values from `mock-data.json` gallery array: `'all' | 'photo' | 'video'`

Test gate for Gallery:
```
[ ] npm run dev → zero errors
[ ] Browser console → zero errors
[ ] Navigate to /gallery → renders without crash
[ ] Footer on /gallery is the light 3-column variant (verify in browser)
[ ] sections/ folder exists with all 3 section files
[ ] Responsive: 375px, 768px, 1024px
```

```bash
git add .
git commit -m "refactor(gallery): split into sections/, apply BEM, fix colors"
git push origin refactor/phase-6-gallery
```

---

### 6.4 — Contact Page

**Branch:** `refactor/phase-6-contact`

```bash
git checkout develop && git pull origin develop
git checkout -b refactor/phase-6-contact
```

**Required sections structure:**

```
src/pages/Contact/
  Contact.jsx
  Contact.css
  sections/
    ContactHero/
      ContactHero.jsx
      ContactHero.css
    ContactForm/
      ContactForm.jsx
      ContactForm.css
    FAQAccordion/
      FAQAccordion.jsx
      FAQAccordion.css
    MapEmbed/
      MapEmbed.jsx
      MapEmbed.css
```

**Thin assembler `Contact.jsx`:**

```jsx
import './Contact.css';
import ContactHero  from './sections/ContactHero/ContactHero';
import ContactForm  from './sections/ContactForm/ContactForm';
import FAQAccordion from './sections/FAQAccordion/FAQAccordion';
import MapEmbed     from './sections/MapEmbed/MapEmbed';

export default function Contact() {
  return (
    <div className="Contact">
      <ContactHero />
      <ContactForm />
      <FAQAccordion />
      <MapEmbed />
    </div>
  );
}
```

BEM for FAQAccordion:

```
.FAQAccordion                → section container
.FAQAccordion__container     → max-width wrapper
.FAQAccordion__item          → single FAQ row
.FAQAccordion__question      → clickable question row
.FAQAccordion__question-text → question text
.FAQAccordion__icon          → chevron icon
.FAQAccordion__icon--open    → rotated state when open
.FAQAccordion__answer        → answer text (hidden/shown)
.FAQAccordion__answer--open  → visible state
```

State: `const [openIndex, setOpenIndex] = useState(null)`
Data: `import mockData from '../../../../mock-data.json'` — use `mockData.faqs`

ContactHero background: `var(--color-bg-contact-hero)` = `#3D2B1A`

Test gate for Contact:
```
[ ] npm run dev → zero errors
[ ] Browser console → zero errors
[ ] Navigate to /contact → renders without crash
[ ] sections/ folder exists with all 4 section files
[ ] FAQ accordion: click question → answer expands
[ ] FAQ accordion: click again → answer collapses
[ ] Responsive: 375px, 768px, 1024px
```

```bash
git add .
git commit -m "refactor(contact): split into sections/, apply BEM, fix colors"
git push origin refactor/phase-6-contact
```

---

### 6.5 — About Us Page

**Branch:** `refactor/phase-6-about`

```bash
git checkout develop && git pull origin develop
git checkout -b refactor/phase-6-about
```

**Required sections structure:**

```
src/pages/AboutUs/
  AboutUs.jsx
  AboutUs.css
  sections/
    AboutHero/
      AboutHero.jsx
      AboutHero.css
    OurStorySection/
      OurStorySection.jsx
      OurStorySection.css
    TeamSection/
      TeamSection.jsx
      TeamSection.css
    Sustainability/
      Sustainability.jsx
      Sustainability.css
```

Note: the section is named `OurStorySection` (not `OurStory`) to avoid confusion with the Home page section of the same name.

**Thin assembler `AboutUs.jsx`:**

```jsx
import './AboutUs.css';
import AboutHero       from './sections/AboutHero/AboutHero';
import OurStorySection from './sections/OurStorySection/OurStorySection';
import TeamSection     from './sections/TeamSection/TeamSection';
import Sustainability  from './sections/Sustainability/Sustainability';

export default function AboutUs() {
  return (
    <div className="AboutUs">
      <AboutHero />
      <OurStorySection />
      <TeamSection />
      <Sustainability />
    </div>
  );
}
```

BEM for Sustainability:

```
.Sustainability              → section container
.Sustainability__container   → max-width wrapper
.Sustainability__heading     → section title
.Sustainability__content     → text + image layout
.Sustainability__text        → text column
.Sustainability__image       → image column
```

Sustainability color — commonly wrong:
- Section background: `var(--color-bg-sustain)` = `#F0EFEA` — NOT white
- Heading color: `var(--color-green-sustain)` = `#5A8A5A` — only used here

BEM for TeamSection:

```
.TeamSection                 → section container
.TeamSection__container      → max-width wrapper
.TeamSection__grid           → card grid
.TeamSection__card           → individual team member card
.TeamSection__avatar         → circular photo
.TeamSection__name           → member name
.TeamSection__role           → member role/title
.TeamSection__bio            → member bio
```

Data: `import mockData from '../../../../mock-data.json'` — use `mockData.team`

Test gate for About Us:
```
[ ] npm run dev → zero errors
[ ] Browser console → zero errors
[ ] Navigate to /about → renders without crash
[ ] sections/ folder exists with all 4 section files
[ ] Sustainability background is warm off-white #F0EFEA (not white — verify in DevTools)
[ ] Sustainability heading is forest green #5A8A5A (verify in DevTools)
[ ] Responsive: 375px, 768px, 1024px
```

```bash
git add .
git commit -m "refactor(about): split into sections/, apply BEM, fix colors"
git push origin refactor/phase-6-about
```

---

## PHASE 7 — AuthContext REFACTOR

**Who:** Next available developer
**Branch:** `refactor/phase-7-context`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-7-context
```

**File:** `src/context/AuthContext.jsx`

This is a flat file with no CSS — that is correct. Do not create a folder for it.

Apply these checks:

- No hardcoded hex colors anywhere in this file
- No `<a>` tags — if any navigation is triggered from context, it must use `useNavigate()` from `react-router-dom`
- Export must be: `export const AuthContext = createContext()` + `export default function AuthProvider`
- `AuthProvider` wraps children: `<AuthContext.Provider value={...}>{children}</AuthContext.Provider>`

Verify that `main.jsx` wraps `<App />` in `<AuthProvider>`:

```jsx
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

If `main.jsx` does not wrap App in AuthProvider, add it now.

---

### PHASE 7 — TEST GATE

```
[ ] 1. npm run dev → zero errors in terminal
[ ] 2. Browser console → zero errors, zero warnings
[ ] 3. /login page: auth context is accessible (no context errors in console)
[ ] 4. /signup page: auth context is accessible
[ ] 5. main.jsx wraps App in AuthProvider
```

### Phase 7 — Git Commit

```bash
git add .
git commit -m "refactor(context): verify AuthContext structure, ensure AuthProvider wraps App in main.jsx"
git push origin refactor/phase-7-context
```

Open PR → `develop`. Get 1 approval. Merge. Delete branch.

---

## PHASE 8 — FINAL INTEGRATION CHECK

**Who:** Project Lead
**Branch:** `refactor/phase-8-final`

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/phase-8-final
```

This is the full-repo verification pass. No code changes — only checks and fixes for anything missed in earlier phases.

### 8.1 — Global Search for Violations

Run a search across the entire `src/` folder for these patterns. Fix every occurrence found:

**Search for hardcoded hex:**
In your editor, search `src/` for: `#E07B39` `#C96B2A` `#C8973A` `#F5F0EB` `#111111` `#2B3A42` `#1A1A1A` `#1C1C1C` `#1A1200` `#555555` `#888888` `#E8E2D9` `#D5CFC8` `#E53935`
Every match must be replaced with the correct `var(--color-*)` token.

**Search for `<a href="/"` or `<a href="/`:**
Every internal `<a>` tag must become `<NavLink>` or `<Link>`.

**Search for `redesign`:**
Must return zero results. If any remain, update the import path to `SvgAssets`.

**Search for `sections/About/`:**
Must return zero results. If any remain, rename to `OurStory`.

### 8.2 — Route Check

Navigate to every route and confirm no crashes:

```
/            → Home
/menu        → Menu
/reservations→ Reservations
/gallery     → Gallery
/contact     → Contact
/about       → About Us
/login       → Login (no Navbar/Footer)
/signup      → Signup (no Navbar/Footer)
```

### 8.3 — Final Responsive Check

Test every page at: `375px`, `768px`, `1024px`, `1280px`

No page should have:
- Horizontal scroll at any breakpoint
- Overlapping elements
- Text overflow outside containers

### 8.4 — Console Check

Open DevTools console on every page. Must show: zero errors, zero warnings.

---

### PHASE 8 — FINAL TEST GATE

```
[ ] 1. npm run build → zero errors (production build passes)
[ ] 2. All 8 routes render without crash
[ ] 3. Browser console: zero errors on every page
[ ] 4. No hardcoded hex found anywhere in src/
[ ] 5. No <a> tags for internal links anywhere in src/
[ ] 6. No import from redesign/ anywhere in src/
[ ] 7. sections/About/ does not exist — OurStory/ used instead
[ ] 8. Every page: responsive at 375px, 768px, 1024px, 1280px
[ ] 9. Footer on /gallery is light variant (3 columns)
[ ] 10. FloatingReserveBtn absent on /login and /signup
```

### Phase 8 — Final Commit and Merge to Main

```bash
git add .
git commit -m "chore: final integration check — all violations cleared, all routes verified"
git push origin refactor/phase-8-final
```

Open PR: `refactor/phase-8-final` → `develop`. Get 1 approval. Merge. Delete branch.

Then merge `develop` → `main`:

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

Tag the release:

```bash
git tag -a v1.0-refactor -m "Refactor complete: BEM, tokens, routing, section structure"
git push origin v1.0-refactor
```

---

## QUICK REFERENCE

### Final Expected File Tree After All Phases

```
src/
  App.jsx
  index.css
  main.jsx
  assets/
    auth-bg-curve.svg
    auth-leaf-lines.svg
    zigzag.svg
    zigzag-orange.svg
  components/
    Button/Button.jsx + Button.css
    DishCard/DishCard.jsx + DishCard.css
    FloatingReserveBtn/FloatingReserveBtn.jsx + FloatingReserveBtn.css
    Footer/Footer.jsx + Footer.css
    Navbar/Navbar.jsx + Navbar.css
    SectionHeader/SectionHeader.jsx + SectionHeader.css
    SvgAssets/
      AuthBgCurve.jsx
      AuthLeafLines.jsx
      ZigZagLightning.jsx
    Toast/Toast.jsx + Toast.css
  context/
    AuthContext.jsx
  pages/
    Home/
      Home.jsx + Home.css
      sections/
        Hero/Hero.jsx + Hero.css
        InfoBar/InfoBar.jsx + InfoBar.css
        ChefSpecial/ChefSpecial.jsx + ChefSpecial.css
        SignatureDishes/SignatureDishes.jsx + SignatureDishes.css
        Testimonials/Testimonials.jsx + Testimonials.css
        OurStory/OurStory.jsx + OurStory.css
    Login/
      Login.jsx + Login.css
      sections/
        LoginForm/LoginForm.jsx + LoginForm.css
        LoginPanel/LoginPanel.jsx + LoginPanel.css
    Signup/
      Signup.jsx + Signup.css
      sections/
        SignupForm/SignupForm.jsx + SignupForm.css
        SignupPanel/SignupPanel.jsx + SignupPanel.css
    Menu/
      Menu.jsx + Menu.css
      sections/
        MenuHero/MenuHero.jsx + MenuHero.css
        FilterTabs/FilterTabs.jsx + FilterTabs.css
        MenuGrid/MenuGrid.jsx + MenuGrid.css
        TastingMenu/TastingMenu.jsx + TastingMenu.css
        WineList/WineList.jsx + WineList.css
    Reservations/
      Reservations.jsx + Reservations.css
      sections/
        ReservationHero/ReservationHero.jsx + ReservationHero.css
        CalendarPicker/CalendarPicker.jsx + CalendarPicker.css
        TimeSlots/TimeSlots.jsx + TimeSlots.css
        ReservationForm/ReservationForm.jsx + ReservationForm.css
    Gallery/
      Gallery.jsx + Gallery.css
      sections/
        GalleryHero/GalleryHero.jsx + GalleryHero.css
        GalleryFilter/GalleryFilter.jsx + GalleryFilter.css
        MasonryGrid/MasonryGrid.jsx + MasonryGrid.css
    Contact/
      Contact.jsx + Contact.css
      sections/
        ContactHero/ContactHero.jsx + ContactHero.css
        ContactForm/ContactForm.jsx + ContactForm.css
        FAQAccordion/FAQAccordion.jsx + FAQAccordion.css
        MapEmbed/MapEmbed.jsx + MapEmbed.css
    AboutUs/
      AboutUs.jsx + AboutUs.css
      sections/
        AboutHero/AboutHero.jsx + AboutHero.css
        OurStorySection/OurStorySection.jsx + OurStorySection.css
        TeamSection/TeamSection.jsx + TeamSection.css
        Sustainability/Sustainability.jsx + Sustainability.css
  styles/
    variables.css
```

### Phase Summary

| Phase | Scope | Branch |
|---|---|---|
| 0 | Base setup verification | refactor/phase-0-base-setup |
| 1 | Shared components | refactor/phase-1-shared-components |
| 2 | SvgAssets components | refactor/phase-2-svg-assets |
| 3 | Home page | refactor/phase-3-home |
| 4 | Login page | refactor/phase-4-login |
| 5 | Signup page | refactor/phase-5-signup |
| 6a | Menu page | refactor/phase-6-menu |
| 6b | Reservations page | refactor/phase-6-reservations |
| 6c | Gallery page | refactor/phase-6-gallery |
| 6d | Contact page | refactor/phase-6-contact |
| 6e | About Us page | refactor/phase-6-about |
| 7 | AuthContext | refactor/phase-7-context |
| 8 | Final integration | refactor/phase-8-final |
