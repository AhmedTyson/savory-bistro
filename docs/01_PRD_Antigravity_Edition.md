# SAVORY BISTRO — PRD (Antigravity Edition)
## Living Design Reference for AI-Assisted Development

| Field | Value |
|---|---|
| Version | 3.2.0 — Hagar's Contributions Integrated |
| Updated | March 2024 |
| Status | Phase 10 - Integration Complete |
| Repo | AhmedTyson/savory-bistro |
| Purpose | Single source of truth for every AI prompt |

> **How this document works:** Paste `00_Session_Opener.md` first in every session. Then paste only the section you need from this file. Never paste the whole document — it wastes tokens.

---

## SECTION 0 — MANDATORY CONTEXT HEADER
### Use `00_Session_Opener.md` instead of this section
The session opener replaces the old Section 0. It contains everything this section had plus auth rules, BEM rules, barrel import rules, and all known AI mistake warnings. Always use the session opener.

### STYLING STRATEGY (Hybrid)
- **Vanilla CSS (Primary)**: 90% of the project. Used for all brand-specific components, typography, colors, and premium animations.
- **Tailwind CSS (Layout)**: 10% of the project. Used exclusively for layout architecture (resets, high-level containers, and basic flex/grid utilities).
- **No Utility Overload**: Do NOT use Tailwind for colors, borders, or specific component shapes unless it's a structural layout requirement. Use design tokens from `variables.css`.

---

## SECTION 1 — QUICK LOOKUP TABLE

| I want to build... | Paste Section | Key tokens |
|---|---|---|
| Navbar | 4.1 | auth states, BEM classes, UtensilsCrossed, UserCircle |
| Footer (full 4-col) | 4.2 | `--color-bg-footer`, `--color-text-white`, ArrowRight |
| Footer (light 3-col) | 4.2 | `variant="light"`, `--color-bg-page` |
| Button component | 4.3 | `--color-primary`, `--color-primary-hover`, 3 variants |
| DishCard component | 4.4 | `--color-text-price`, diet dots, badge pill |
| SectionHeader | 4.5 | `--color-primary` for label, `--font-serif` for title |
| FloatingReserveBtn | 4.6 | auth-aware navigation, always visible |
| Toast component | 4.7 | success/error/warning variants |
| SvgAssets components | 4.8 | AuthBgCurve, AuthLeafLines, ZigZagLightning |
| App.jsx routing | 2.0 | ProtectedRoute, barrel imports, 8 routes |
| Home — Hero | 5.1 | `--color-bg-hero`, `--color-text-hero-script`, `--font-script` |
| Home — Chef's Special | 5.2 | `--color-bg-chef-special`, `--color-chef-badge` |
| Home — Testimonials | 5.3 | `--color-bg-testimonial`, `--color-gold-accent` |
| Home — OurStory | 5.4 | section inside Home, not AboutUs |
| Menu — Filter Tabs | 6.1 | `--color-primary`, useState, category array |
| Menu — Tasting Menu | 6.2 | `--color-bg-tasting`, `--color-gold-accent`, `--color-border-gold` |
| Reservations — Form | 7.1 | `--color-border-error`, full validation, useState per field |
| Gallery — Masonry | 8.1 | CSS columns, filter useState |
| Contact — FAQ | 9.1 | Accordion useState, chevron toggle |
| About Us — Sustainability | 10.1 | `--color-green-sustain`, `--color-bg-sustain` |
| Login page | 11.1 | LoginForm, LoginPanel, SvgAssets, redirect on login |
| Signup page | 11.2 | SignupForm, SignupPanel, SvgAssets |
| variables.css (full) | 3.0 | All tokens |

---

## SECTION 2 — ROUTING & APP STRUCTURE

### Current File Tree (post-refactor)

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
    index.js                          ← barrel file
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
    index.js                          ← barrel file
    AuthContext.jsx
  pages/
    index.js                          ← barrel file
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
    Dashboard/
      Dashboard.jsx + Dashboard.css
      sections/
        DashboardOverview/DashboardOverview.jsx + DashboardOverview.css
        ReservationHistory/ReservationHistory.jsx + ReservationHistory.css
        DashboardCard/DashboardCard.jsx + DashboardCard.css
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

### App.jsx — Current State

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext }                              from 'react';

// ── context ───────────────────────────────────
import { AuthContext }                             from './context';

// ── layout components ─────────────────────────
import { Navbar, Footer, FloatingReserveBtn }      from './components';

// ── pages ─────────────────────────────────────
import { Home, Menu, Reservations, Gallery,
         Contact, AboutUs, Login, Signup }         from './pages';

// ── styles ────────────────────────────────────
import './styles/variables.css';
import './index.css';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

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
        <Route path="/reservations" element={
          <ProtectedRoute>
            <Layout><Reservations /></Layout>
          </ProtectedRoute>
        } />
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

### Route Map

| Path | Component | Auth required | Footer variant | Active nav |
|---|---|---|---|---|
| `/` | Home | No | full | Home |
| `/menu` | Menu | No | full | Menu |
| `/reservations` | Reservations | **Yes** | full | Reservations |
| `/gallery` | Gallery | No | **light** | Gallery |
| `/contact` | Contact | No | full | Contact |
| `/about` | AboutUs | No | full | About Us |
| `/login` | Login | No | none | — |
| `/signup` | Signup | No | none | — |
| `/dashboard` | Dashboard | **Yes** | full | — |

---

## SECTION 3 — DESIGN TOKENS (variables.css)

```css
:root {
  --color-primary:           #E07B39;
  --color-primary-hover:     #C96B2A;
  --color-chef-badge:        #C8973A;
  --color-gold-accent:       #C9A84C;
  --color-green-sustain:     #5A8A5A;

  --color-bg-page:           #F5F0EB;
  --color-bg-white:          #FFFFFF;
  --color-bg-hero:           #111111;
  --color-bg-chef-special:   #2B3A42;
  --color-bg-testimonial:    #1A1A1A;
  --color-bg-footer:         #1C1C1C;
  --color-bg-tasting:        #1A1200;
  --color-bg-sustain:        #F0EFEA;
  --color-bg-map:            #B8D4C8;
  --color-bg-contact-hero:   #3D2B1A;

  --color-text-heading:      #1A1A1A;
  --color-text-body:         #555555;
  --color-text-muted:        #888888;
  --color-text-placeholder:  #AAAAAA;
  --color-text-white:        #FFFFFF;
  --color-text-nav-default:  #2D2D2D;
  --color-text-nav-active:   #E07B39;
  --color-text-price:        #E07B39;
  --color-text-gold-price:   #C9A84C;
  --color-text-hero-script:  #E8C99A;

  --color-border-card:       #E8E2D9;
  --color-border-input:      #D5CFC8;
  --color-border-gold:       #C9A84C;
  --color-border-quote:      #E07B39;
  --color-border-error:      #E53935;

  --color-diet-vegetarian:   #4CAF50;
  --color-diet-seafood:      #2196F3;
  --color-diet-spicy:        #F44336;

  --font-serif:   'Playfair Display', Georgia, serif;
  --font-sans:    'Inter', 'Segoe UI', sans-serif;
  --font-script:  'Dancing Script', cursive;

  --space-xs:      4px;
  --space-sm:      8px;
  --space-md:      16px;
  --space-lg:      24px;
  --space-xl:      40px;
  --space-2xl:     64px;
  --space-3xl:     96px;
  --space-section: 100px;
  --container-max: 1200px;

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-pill: 100px;

  --transition-fast:   0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow:   0.3s ease;

  --z-navbar:   100;
  --z-floating: 999;
  --z-modal:    1000;
}
```

---

## SECTION 4 — SHARED COMPONENTS

### 4.1 Navbar

**File:** `src/components/Navbar/Navbar.jsx` + `Navbar.css`
**Auth-aware:** Yes — reads `user` from `AuthContext`

**BEM classes:**
```
.Navbar                    → nav element
.Navbar__brand             → logo + brand name
.Navbar__brand-icon        → UtensilsCrossed icon
.Navbar__brand-name        → "Savory Bistro" text
.Navbar__links             → desktop links container
.Navbar__link              → individual NavLink
.Navbar__link--active      → active route state
.Navbar__auth-guest        → Login + Signup links (guest state)
.Navbar__auth-user         → Avatar icon (logged in state)
.Navbar__avatar-btn        → clickable avatar button
.Navbar__auth-link         → Login / Signup links
.Navbar__hamburger         → mobile hamburger button
.Navbar__mobile-menu       → mobile dropdown
.Navbar__mobile-menu--open → visible state
.Navbar__mobile-link       → link inside mobile menu
```

**Auth logic:**
```jsx
const { user } = useContext(AuthContext);

{user ? (
  <div className="Navbar__auth-user">
    <button className="Navbar__avatar-btn">
      <UserCircle size={32} />
    </button>
  </div>
) : (
  <div className="Navbar__auth-guest">
    <NavLink to="/login"  className="Navbar__auth-link">Login</NavLink>
    <NavLink to="/signup" className="Navbar__auth-link">Sign Up</NavLink>
  </div>
)}
```

**No Book Table button — ever. Not for guests. Not for logged-in users.**

**Antigravity Prompt:**
```
[PASTE 00_Session_Opener.md BLOCK]

Build src/components/Navbar/Navbar.jsx and Navbar.css.

AUTH: import { useContext } from 'react' + import { AuthContext } from '../../context/AuthContext'
  Guest  → show Login + Sign Up as NavLinks — NO Book Table button
  Logged in → show UserCircle icon (32px) in a button — NO Book Table button

DESIGN:
Background: var(--color-bg-white), sticky top, z-index: var(--z-navbar)
Left: UtensilsCrossed icon + "Savory Bistro" in var(--font-serif) weight 600
Center: NavLinks — Home | Menu | Reservations | Gallery | Contact | About Us
  Default: var(--color-text-nav-default) | Active: var(--color-text-nav-active) + underline
  Use useLocation() to detect active route — NOT NavLink className prop
Right: auth state block (see above)
Mobile (<768px): hamburger — Menu icon closed / X icon open
  useState(menuOpen) — closes on any link click

BEM: all classes prefixed with Navbar__
ICONS: import { UtensilsCrossed, Menu, X, UserCircle } from 'lucide-react'
All links: NavLink from react-router-dom — NEVER <a>
```

---

### 4.2 Footer

**File:** `src/components/Footer/Footer.jsx` + `Footer.css`
**Props:** `variant: 'full' | 'light'` (default: `'full'`)

**BEM classes:**
```
.Footer                    .Footer--light
.Footer__container         .Footer__grid
.Footer__brand             .Footer__brand-icon
.Footer__brand-name        .Footer__tagline
.Footer__column-title      .Footer__link
.Footer__newsletter        .Footer__newsletter-input
.Footer__newsletter-btn    .Footer__bottom
.Footer__copyright
```

**Antigravity Prompt:**
```
[PASTE 00_Session_Opener.md BLOCK]

Build src/components/Footer/Footer.jsx and Footer.css.

PROPS: variant = 'full' | 'light' (default: 'full')

FULL (4 columns): Brand + tagline | Quick Links | Contact Us | Newsletter
LIGHT (3 columns): Brand | Visit Us (address, hours) | Newsletter

Background both variants: var(--color-bg-footer)
All internal links: <Link to="..."> — NEVER <a>
Newsletter input: controlled useState email field
Bottom bar: copyright, border-top: 1px solid rgba(255,255,255,0.1)

BEM: all classes prefixed with Footer__
ICONS: import { UtensilsCrossed, ArrowRight } from 'lucide-react'
RESPONSIVE: 1 col mobile → 2 col 768px → 3-4 col 1024px
```

---

### 4.3 Button

**File:** `src/components/Button/Button.jsx` + `Button.css`

**Props:** `children`, `variant ('primary'|'outlined'|'outlined-dark')`, `onClick`, `type ('button'|'submit')`, `disabled`, `fullWidth`

**BEM classes:**
```
.Button  .Button--primary  .Button--outlined  .Button--outlined-dark
.Button--disabled  .Button--full-width
```

| Variant | Background | Border | Text | Hover |
|---|---|---|---|---|
| `primary` | `var(--color-primary)` | same | white | `var(--color-primary-hover)` |
| `outlined` | transparent | `var(--color-primary)` | `var(--color-primary)` | fill primary, text white |
| `outlined-dark` | transparent | white | white | fill white, text heading |

All: `border-radius: var(--radius-md)`, `min-height: 44px`, `transition: var(--transition-normal)`

---

### 4.4 DishCard

**File:** `src/components/DishCard/DishCard.jsx` + `DishCard.css`

**Props:** `image`, `name`, `description`, `price`, `badge (string|null)`, `dietIcon ('vegetarian'|'seafood'|'spicy'|null)`

**BEM classes:**
```
.DishCard                  .DishCard__image-wrapper
.DishCard__image           .DishCard__badge
.DishCard__body            .DishCard__diet-dot
.DishCard__diet-dot--veg   .DishCard__diet-dot--seafood
.DishCard__diet-dot--spicy .DishCard__name
.DishCard__description     .DishCard__price
```

---

### 4.5 SectionHeader

**File:** `src/components/SectionHeader/SectionHeader.jsx` + `SectionHeader.css`

**Props:** `label (string|undefined)`, `title (string)`, `subtitle (string|undefined)`, `align ('left'|'center')`

**BEM classes:**
```
.SectionHeader  .SectionHeader--center
.SectionHeader__label  .SectionHeader__title  .SectionHeader__subtitle
```

---

### 4.6 FloatingReserveBtn

**File:** `src/components/FloatingReserveBtn/FloatingReserveBtn.jsx` + `FloatingReserveBtn.css`
**Auth-aware:** Yes — always visible, navigation depends on auth state

**BEM classes:**
```
.FloatingReserveBtn  .FloatingReserveBtn__icon  .FloatingReserveBtn__text
```

**Auth logic:**
```jsx
const { user } = useContext(AuthContext);
const navigate  = useNavigate();

function handleClick() {
  if (user) {
    navigate('/reservations');
  } else {
    navigate('/login', { state: { from: '/reservations' } });
  }
}
```

**Element:** `<button onClick={handleClick}>` — NOT NavLink or Link
**Always visible** — never hide based on auth state

---

### 4.7 Toast

**File:** `src/components/Toast/Toast.jsx` + `Toast.css`

**BEM classes:**
```
.Toast  .Toast--success  .Toast--error  .Toast--warning
.Toast__message  .Toast__close
```

---

### 4.8 SvgAssets

**Folder:** `src/components/SvgAssets/`
**Files:** `AuthBgCurve.jsx` | `AuthLeafLines.jsx` | `ZigZagLightning.jsx`
**No CSS files** — JSX wrapper components only

`ZigZagLightning` accepts `variant: 'default' | 'orange'` prop.

Import path from Login/Signup sections:
```js
import AuthBgCurve    from '../../../../components/SvgAssets/AuthBgCurve';
import AuthLeafLines  from '../../../../components/SvgAssets/AuthLeafLines';
import ZigZagLightning from '../../../../components/SvgAssets/ZigZagLightning';
```

---

## SECTION 5 — HOME PAGE

**Route:** `/` | **Footer:** `full`
**Thin assembler:** `src/pages/Home/Home.jsx` — imports and renders sections only

**Sections:**
```
Hero/            → HeroSection
InfoBar/         → InfoBar
ChefSpecial/     → ChefSpecial
SignatureDishes/ → SignatureDishes
Testimonials/    → Testimonials
OurStory/        → OurStory  ← named OurStory NOT About (About = full AboutUs page)
```

### 5.1 Hero Section
**File:** `src/pages/Home/sections/Hero/Hero.jsx`

**BEM classes:**
```
.Hero  .Hero__background  .Hero__content
.Hero__headline  .Hero__subtitle  .Hero__cta-group  .Hero__scroll-arrow
```

**Critical:**
- Background: `var(--color-bg-hero)` = `#111111`
- Subtitle: `var(--color-text-hero-script)` = `#E8C99A` — NOT white
- Subtitle font: `var(--font-script)` Dancing Script — NOT Playfair
- CTA 1: `<Link to="/menu">` View Menu
- CTA 2: `<Link to="/reservations">` Reserve a Table

### 5.2 ChefSpecial Section
**File:** `src/pages/Home/sections/ChefSpecial/ChefSpecial.jsx`

**Critical colors — most commonly wrong:**
- Background: `var(--color-bg-chef-special)` = `#2B3A42` — NOT black
- Badge: `var(--color-chef-badge)` = `#C8973A` — NOT `var(--color-primary)`

### 5.3 Testimonials Section
**File:** `src/pages/Home/sections/Testimonials/Testimonials.jsx`

**State:** `const [activeIndex, setActiveIndex] = useState(0)`
- Background: `var(--color-bg-testimonial)` = `#1A1A1A`
- Quote marks: `var(--color-gold-accent)`

### 5.4 OurStory Section
**File:** `src/pages/Home/sections/OurStory/OurStory.jsx`

Note: This is a brand story section inside Home page only.
The full About Us page is at `src/pages/AboutUs/`.

---

## SECTION 6 — MENU PAGE

**Route:** `/menu` | **Footer:** `full`
**Thin assembler:** `src/pages/Menu/Menu.jsx`

**Sections:** MenuHero | FilterTabs | MenuGrid | TastingMenu | WineList

### 6.1 FilterTabs Section
**File:** `src/pages/Menu/sections/FilterTabs/FilterTabs.jsx`

**BEM classes:**
```
.FilterTabs  .FilterTabs__list
.FilterTabs__pill  .FilterTabs__pill--active
```

**State:** `const [activeCategory, setActiveCategory] = useState('all')`
**Categories:** `['all', 'appetizers', 'mainCourses', 'seafood', 'vegetarian', 'desserts', 'drinks']`
**Data import:** `import mockData from '../../../../mock-data.json'`

### 6.2 TastingMenu Section
**File:** `src/pages/Menu/sections/TastingMenu/TastingMenu.jsx`

**Critical colors:**
- Background: `var(--color-bg-tasting)` = `#1A1200` — NOT `#1A1A1A`
- Border box: `var(--color-border-gold)` = `#C9A84C`
- Course labels: `var(--color-gold-accent)`
- Price: `var(--color-text-gold-price)` = `#C9A84C` — NOT orange

---

## SECTION 7 — RESERVATIONS PAGE

**Route:** `/reservations` | **Protected:** Yes — requires login
**Footer:** `full`
**Thin assembler:** `src/pages/Reservations/Reservations.jsx`

**Sections:** ReservationHero | CalendarPicker | TimeSlots | ReservationForm

### 7.1 ReservationForm Section
**File:** `src/pages/Reservations/sections/ReservationForm/ReservationForm.jsx`

**BEM classes:**
```
.ReservationForm             .ReservationForm__container
.ReservationForm__group      .ReservationForm__label
.ReservationForm__input      .ReservationForm__input--error
.ReservationForm__error      .ReservationForm__submit
```

**State — one useState per field:**
```jsx
const [name, setName]           = useState('');
const [email, setEmail]         = useState('');
const [phone, setPhone]         = useState('');
const [partySize, setPartySize] = useState('2');
const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [phoneError, setPhoneError] = useState('');
```

**Validation:**
- name: required, min 2 chars
- phone: regex `/^[\d\s\-\+\(\)]{7,}$/`
- email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- selectedDate: required
- selectedTime: required

---

## SECTION 8 — GALLERY PAGE

**Route:** `/gallery` | **Footer:** `light` variant
**Thin assembler:** `src/pages/Gallery/Gallery.jsx`

**Sections:** GalleryHero | GalleryFilter | MasonryGrid

### 8.1 MasonryGrid Section
**File:** `src/pages/Gallery/sections/MasonryGrid/MasonryGrid.jsx`

**BEM classes:**
```
.MasonryGrid             .MasonryGrid__container
.MasonryGrid__grid       .MasonryGrid__item
.MasonryGrid__item--tall .MasonryGrid__item--medium
.MasonryGrid__image
```

**State:** `const [activeFilter, setActiveFilter] = useState('all')`
**CSS:** `column-count` approach — NOT CSS grid
**Data:** `mockData.gallery` — `{ id, src, alt, category, type, size }`

---

## SECTION 9 — CONTACT PAGE

**Route:** `/contact` | **Footer:** `full`
**Thin assembler:** `src/pages/Contact/Contact.jsx`

**Sections:** ContactHero | ContactForm | FAQAccordion | MapEmbed

**ContactHero background:** `var(--color-bg-contact-hero)` = `#3D2B1A`

### 9.1 FAQAccordion Section
**File:** `src/pages/Contact/sections/FAQAccordion/FAQAccordion.jsx`

**BEM classes:**
```
.FAQAccordion                .FAQAccordion__container
.FAQAccordion__item          .FAQAccordion__question
.FAQAccordion__question-text .FAQAccordion__icon
.FAQAccordion__icon--open    .FAQAccordion__answer
.FAQAccordion__answer--open
```

**State:** `const [openIndex, setOpenIndex] = useState(null)`
**Toggle:** `setOpenIndex(prev => prev === index ? null : index)`
**Data:** `mockData.faqs` — `{ id, question, answer }`

---

## SECTION 10 — ABOUT US PAGE

**Route:** `/about` | **Footer:** `full`
**Thin assembler:** `src/pages/AboutUs/AboutUs.jsx`

**Sections:** AboutHero | OurStorySection | TeamSection | Sustainability

Note: section is named `OurStorySection` to avoid confusion with `Home/sections/OurStory/`.

### 10.1 Sustainability Section
**File:** `src/pages/AboutUs/sections/Sustainability/Sustainability.jsx`

**Critical colors — unique to this section:**
- Background: `var(--color-bg-sustain)` = `#F0EFEA`
- Heading: `var(--color-green-sustain)` = `#5A8A5A` — used nowhere else

### 10.2 TeamSection
**File:** `src/pages/AboutUs/sections/TeamSection/TeamSection.jsx`

**BEM classes:**
```
.TeamSection  .TeamSection__container  .TeamSection__grid
.TeamSection__card  .TeamSection__avatar
.TeamSection__name  .TeamSection__role  .TeamSection__bio
```

**Data:** `mockData.team` — `{ id, name, role, bio }`

---

## SECTION 11 — AUTH PAGES

### 11.1 Login Page
**Route:** `/login` | **No Layout** — standalone page, no Navbar/Footer/FloatingReserveBtn

**Thin assembler:** `src/pages/Login/Login.jsx`
**Sections:** LoginPanel | LoginForm

**LoginPanel:** uses SvgAssets — import from `../../../../components/SvgAssets/`
**LoginForm post-login redirect:**
```jsx
const location = useLocation();
const navigate  = useNavigate();
const from = location.state?.from || '/';
navigate(from, { replace: true });
```

**LoginForm BEM classes:**
```
.LoginForm               .LoginForm__title
.LoginForm__subtitle     .LoginForm__field
.LoginForm__label        .LoginForm__input
.LoginForm__input--error .LoginForm__error
.LoginForm__submit       .LoginForm__footer
.LoginForm__link
```

**"Sign up" link:** `<Link to="/signup">` — NOT `<a>`

### 11.2 Signup Page
**Route:** `/signup` | **No Layout** — standalone page

**Thin assembler:** `src/pages/Signup/Signup.jsx`
**Sections:** SignupPanel | SignupForm

**SignupForm validation:**
- name: required
- email: valid format
- password: min 8 chars
- confirmPassword: must match password

**"Log in" link:** `<Link to="/login">` — NOT `<a>`

---

## SECTION 12 — COMMON MISTAKES & PREVENTION

### Color Mistakes

| Mistake | Wrong | Correct |
|---|---|---|
| Chef's Special badge | `#E07B39` orange | `var(--color-chef-badge)` = `#C8973A` |
| Chef's Special bg | `#1A1A1A` or `#000` | `var(--color-bg-chef-special)` = `#2B3A42` |
| Tasting menu price | `#E07B39` orange | `var(--color-text-gold-price)` = `#C9A84C` |
| Tasting menu bg | `#1A1A1A` | `var(--color-bg-tasting)` = `#1A1200` |
| Hero subtitle color | `#FFFFFF` white | `var(--color-text-hero-script)` = `#E8C99A` |
| Hero subtitle font | Playfair Display | `var(--font-script)` Dancing Script |
| Sustain heading | any other color | `var(--color-green-sustain)` = `#5A8A5A` |
| Any color hardcoded | `color: #E07B39` | `color: var(--color-primary)` |

### Routing Mistakes

| Mistake | Fix |
|---|---|
| `<a href="/menu">` | `<NavLink to="/menu">` or `<Link to="/menu">` |
| `useHistory()` | `useNavigate()` — React Router v6 |
| FloatingReserveBtn as NavLink | `<button onClick={handleClick}>` with auth logic |
| Login redirect to fixed route | Read `location.state?.from` first |

### Import Mistakes

| Mistake | Fix |
|---|---|
| Import from barrel inside a component | Use direct path: `import Button from '../Button/Button'` |
| Import mock-data from wrong depth | Count `../` levels from file to root |
| Import SvgAssets from `redesign/` | `../../../../components/SvgAssets/AuthBgCurve` |
| Import AuthContext with wrong path | `../../context/AuthContext` from a component |

### Structure Mistakes

| Mistake | Fix |
|---|---|
| Page logic in assembler file | Move to section file — assembler is imports only |
| Section named `About` in Home | Must be `OurStory` — `About` is reserved for AboutUs page |
| CSS class without BEM prefix | Rename: `.title` → `.ComponentName__title` |
| New component without own folder | Every component: own folder + `.jsx` + `.css` |

---

## SECTION 13 — USER DASHBOARD

**Route:** `/dashboard` | **Protected:** Yes — requires login
**Thin assembler:** `src/pages/Dashboard/Dashboard.jsx`

**Sections:** DashboardOverview | ReservationHistory

### 13.1 DashboardCard
**File:** `src/pages/Dashboard/components/DashboardCard/DashboardCard.jsx`
**Props:** `icon`, `label`, `value`, `trend`, `trendValue`

**BEM classes:**
```
.DashboardCard            .DashboardCard__icon-box
.DashboardCard__content    .DashboardCard__label
.DashboardCard__value      .DashboardCard__trend
.DashboardCard__trend--up  .DashboardCard__trend--down
```

### 13.2 ReservationHistory
**File:** `src/pages/Dashboard/sections/ReservationHistory/ReservationHistory.jsx`

**Key Features:**
- **Reports Toggle**: Displays 3 items by default. "Show All" / "Show Less" toggle state.
- **Receipt Style**: Uses `ReservationHistory__card-sidebar` with a connecting line for a vertical timeline/receipt look.

**BEM classes:**
```
.ReservationHistory           .ReservationHistory__list
.ReservationHistory__card     .ReservationHistory__card-sidebar
.ReservationHistory__line     .ReservationHistory__footer
.ReservationHistory__toggle-btn
```

---

## SECTION 14 — UTILITIES & LOGIC

### 14.1 Validation Utility
**File:** `src/utils/validation.js`
**Functions:** `validateEmail`, `validatePhone`, `validatePassword`, `validateName`

Standardized validation used across `SignupForm`, `LoginForm`, and `ReservationForm`.

---

*Savory Bistro PRD — Antigravity Edition v3.3.0 — March 2024*
