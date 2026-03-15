# SAVORY BISTRO — CHANGELOG
## Complete Record of All Changes Made During Refactor

| Document | Version | Date |
|---|---|---|
| Previously: 04_Refactor_Instructions.md | Renamed to 04_Changelog.md | March 2026 |

> This file documents every structural and code change made across all 8 refactor phases.
> It is a historical record only — no action required from any developer.

---

## PHASE 0 — Base Setup

**Branch:** `refactor/phase-0-base-setup`

Changes made:
- Verified `src/styles/variables.css` — all tokens confirmed present
- Verified `src/index.css` — Google Fonts import + Tailwind directives confirmed
- Added Login and Signup routes to `src/App.jsx`
- Verified `mock-data.json` at root level
- Renamed `src/components/redesign/` → `src/components/SvgAssets/`
- Updated all import paths from `redesign/` to `SvgAssets/` across codebase
- Renamed `src/pages/Home/sections/About/` → `src/pages/Home/sections/OurStory/`
- Renamed component function inside file from `About` to `OurStory`
- Updated import in `src/pages/Home/Home.jsx`

**Auth patch (separate branch):** `refactor/phase-0-auth-patch`
- Added `ProtectedRoute` component to `App.jsx`
- Wrapped `/reservations` route in `ProtectedRoute`
- Added `Navigate` to react-router-dom imports in `App.jsx`
- Updated `App.jsx` imports to grouped comment style (no barrel files at this stage)
- Navbar: removed Book Table button entirely
- Navbar: added guest state (Login + Signup NavLinks)
- Navbar: added logged-in state (UserCircle avatar icon)
- Added new BEM classes: `.Navbar__auth-guest`, `.Navbar__auth-user`, `.Navbar__avatar-btn`, `.Navbar__auth-link`
- FloatingReserveBtn: changed from `<NavLink>` to `<button onClick={handleClick}>`
- FloatingReserveBtn: added auth-aware navigation logic
- FloatingReserveBtn: guest → navigates to `/login` with `state: { from: '/reservations' }`
- FloatingReserveBtn: logged in → navigates directly to `/reservations`
- LoginForm: added `useLocation()` to read `location.state?.from`
- LoginForm: post-login redirect uses `from` state, falls back to `/`

---

## PHASE 1 — Shared Components

**Branch:** `refactor/phase-1-shared-components`

Changes made to all 7 shared components:

**Button:**
- All CSS classes renamed to BEM: `.Button`, `.Button--primary`, `.Button--outlined`, `.Button--outlined-dark`, `.Button--disabled`, `.Button--full-width`
- Hardcoded hex replaced with `var(--color-*)` tokens
- `type` prop default confirmed as `"button"`

**SectionHeader:**
- BEM classes: `.SectionHeader`, `.SectionHeader--center`, `.SectionHeader__label`, `.SectionHeader__title`, `.SectionHeader__subtitle`
- Hardcoded hex replaced

**DishCard:**
- BEM classes: `.DishCard`, `.DishCard__image-wrapper`, `.DishCard__image`, `.DishCard__badge`, `.DishCard__body`, `.DishCard__diet-dot`, `.DishCard__diet-dot--veg`, `.DishCard__diet-dot--seafood`, `.DishCard__diet-dot--spicy`, `.DishCard__name`, `.DishCard__description`, `.DishCard__price`
- Hardcoded hex replaced

**FloatingReserveBtn:**
- BEM classes: `.FloatingReserveBtn`, `.FloatingReserveBtn__icon`, `.FloatingReserveBtn__text`
- Removed `<NavLink>` — replaced with `<button onClick={handleClick}>`
- Auth-aware navigation added (see Phase 0 auth patch above)
- `z-index` changed from hardcoded `999` to `var(--z-floating)`

**Navbar:**
- Full BEM class rename across all elements
- `<a>` tags replaced with `<NavLink>`
- Book Table button removed
- Auth states added (see Phase 0 auth patch)
- `z-index` changed to `var(--z-navbar)`
- Active state detection confirmed using `useLocation()`

**Footer:**
- Full BEM class rename
- `<a>` tags for internal links replaced with `<Link>`
- External links kept as `<a target="_blank">`
- Newsletter email confirmed as controlled `useState`

**Toast:**
- BEM classes: `.Toast`, `.Toast--success`, `.Toast--error`, `.Toast--warning`, `.Toast__message`, `.Toast__close`
- Hardcoded hex replaced

---

## PHASE 2 — SvgAssets Components

**Branch:** `refactor/phase-2-svg-assets`

Changes made:
- `AuthBgCurve.jsx` — function name confirmed as `AuthBgCurve`, inline colors use `var(--color-*)`
- `AuthLeafLines.jsx` — function name confirmed as `AuthLeafLines`, inline colors use `var(--color-*)`
- `ZigZagLightning.jsx` — function name confirmed as `ZigZagLightning`, `variant` prop added for `'default' | 'orange'`
- All import paths from `redesign/` updated to `SvgAssets/` (confirmed across Login and Signup sections)

---

## PHASE 3 — Home Page

**Branch:** `refactor/phase-3-home`

Changes made:
- `Home.jsx` reduced to thin assembler (~25 lines)
- `OurStory` import confirmed (renamed from `About`)
- All section files refactored for BEM

**Hero section:**
- BEM classes applied: `.Hero`, `.Hero__background`, `.Hero__content`, `.Hero__headline`, `.Hero__subtitle`, `.Hero__cta-group`, `.Hero__scroll-arrow`
- Hero subtitle color confirmed as `var(--color-text-hero-script)` not white
- Hero subtitle font confirmed as `var(--font-script)` not `var(--font-serif)`
- CTA links changed to `<Link>` from `<a>`

**ChefSpecial section:**
- BEM classes applied
- Background confirmed as `var(--color-bg-chef-special)` = `#2B3A42` not black
- Badge confirmed as `var(--color-chef-badge)` = `#C8973A` not primary orange

**Testimonials section:**
- BEM classes applied
- `useState(activeIndex)` confirmed present
- Background confirmed as `var(--color-bg-testimonial)` = `#1A1A1A`

**InfoBar, SignatureDishes, OurStory:**
- BEM classes applied to all
- Hardcoded hex replaced in all

---

## PHASE 4 — Login Page

**Branch:** `refactor/phase-4-login`

Changes made:
- `Login.jsx` reduced to thin assembler
- `LoginPanel.jsx` — SvgAssets import paths updated from `redesign/` to `SvgAssets/`
- `LoginForm.jsx` — BEM classes applied
- `LoginForm.jsx` — `<a href="/signup">` replaced with `<Link to="/signup">`
- `LoginForm.jsx` — post-login redirect reads `location.state?.from`
- `LoginForm.jsx` — form validation confirmed: email format + password min length

---

## PHASE 5 — Signup Page

**Branch:** `refactor/phase-5-signup`

Changes made:
- `Signup.jsx` reduced to thin assembler
- `SignupPanel.jsx` — SvgAssets import paths updated
- `SignupForm.jsx` — BEM classes applied
- `SignupForm.jsx` — `<a href="/login">` replaced with `<Link to="/login">`
- `SignupForm.jsx` — validation: name required, email format, password min 8, confirm password match

---

## PHASE 6 — Flat Pages Split into Sections

**Branches:** `refactor/phase-6-menu`, `refactor/phase-6-reservations`, `refactor/phase-6-gallery`, `refactor/phase-6-contact`, `refactor/phase-6-about`

**Menu:**
- `Menu.jsx` → thin assembler
- Created sections/: MenuHero, FilterTabs, MenuGrid, TastingMenu, WineList
- Existing code distributed to correct section files
- Missing sections created as empty placeholders
- BEM applied to all existing code

**Reservations:**
- `Reservations.jsx` → thin assembler
- Created sections/: ReservationHero, CalendarPicker, TimeSlots, ReservationForm
- Existing code distributed
- Missing sections as placeholders
- BEM applied, one useState per field confirmed

**Gallery:**
- `Gallery.jsx` → thin assembler
- Created sections/: GalleryHero, GalleryFilter, MasonryGrid
- BEM applied to existing code

**Contact:**
- `Contact.jsx` → thin assembler
- Created sections/: ContactHero, ContactForm, FAQAccordion, MapEmbed
- BEM applied, FAQ accordion useState confirmed

**AboutUs:**
- `AboutUs.jsx` → thin assembler
- Created sections/: AboutHero, OurStorySection, TeamSection, Sustainability
- Note: section named `OurStorySection` not `OurStory` to avoid name clash with Home section
- Sustainability colors confirmed: `var(--color-bg-sustain)`, `var(--color-green-sustain)`

---

## PHASE 7 — AuthContext

**Branch:** `refactor/phase-7-context`

Changes made:
- `AuthContext.jsx` — exports confirmed: `AuthContext` + `AuthProvider` default
- `main.jsx` — confirmed wraps `<App />` in `<AuthProvider>`
- No hardcoded hex found in context file
- No `<a>` tags found in context file

---

## PHASE 8 — Final Integration

**Branch:** `refactor/phase-8-final`

Global search results — all cleared:
- Hardcoded hex values: 0 remaining
- `<a>` tags for internal links: 0 remaining
- Imports from `redesign/`: 0 remaining
- `sections/About/` references: 0 remaining

All 8 routes verified rendering without crash.
`npm run build` passed with zero errors.
Tagged: `v1.0-refactor`

---

## POST-REFACTOR ADDITIONS

**Barrel files added (after Phase 8):**
- Created `src/components/index.js` — 7 named exports
- Created `src/pages/index.js` — 8 named exports
- Created `src/context/index.js` — AuthContext + AuthProvider exports
- Updated `src/App.jsx` imports to use barrel files with grouped comments

**Session opener created:**
- Created `docs/00_Session_Opener.md` — master context block for Antigravity IDE

**Docs updated to v3.0:**
- `01_PRD_Antigravity_Edition.md` — full rewrite reflecting current state
- `02_Prompt_Library.md` — full rewrite with updated prompts
- `03_Team_Guide.md` — full rewrite reflecting current workflow
- `04_Refactor_Instructions.md` — renamed to `04_Changelog.md` (this file)

---

## KNOWN PENDING WORK

These section files exist as empty placeholders and need to be built:

| Page | Section | File |
|---|---|---|
| Menu | MenuHero | `src/pages/Menu/sections/MenuHero/MenuHero.jsx` |
| Menu | WineList | `src/pages/Menu/sections/WineList/WineList.jsx` |
| Reservations | ReservationHero | `src/pages/Reservations/sections/ReservationHero/ReservationHero.jsx` |
| Reservations | CalendarPicker | `src/pages/Reservations/sections/CalendarPicker/CalendarPicker.jsx` |
| Reservations | TimeSlots | `src/pages/Reservations/sections/TimeSlots/TimeSlots.jsx` |
| Gallery | GalleryHero | `src/pages/Gallery/sections/GalleryHero/GalleryHero.jsx` |
| Gallery | GalleryFilter | `src/pages/Gallery/sections/GalleryFilter/GalleryFilter.jsx` |
| Gallery | MasonryGrid | `src/pages/Gallery/sections/MasonryGrid/MasonryGrid.jsx` |
| Contact | ContactHero | `src/pages/Contact/sections/ContactHero/ContactHero.jsx` |
| Contact | ContactForm | `src/pages/Contact/sections/ContactForm/ContactForm.jsx` |
| Contact | MapEmbed | `src/pages/Contact/sections/MapEmbed/MapEmbed.jsx` |
| AboutUs | AboutHero | `src/pages/AboutUs/sections/AboutHero/AboutHero.jsx` |
| AboutUs | OurStorySection | `src/pages/AboutUs/sections/OurStorySection/OurStorySection.jsx` |
| AboutUs | TeamSection | `src/pages/AboutUs/sections/TeamSection/TeamSection.jsx` |

All placeholder files follow the empty format:
```jsx
export default function SectionName() {
  return <section className="SectionName"></section>;
}
```

To build any section: use `02_Prompt_Library.md` for the prompt template.

---

## PHASE 9 — UI Polish & Final Documentation

**Branch:** `refactor/auth-pages-ui-polish`

Changes made:
- **Login/Signup UI**: Applied glassmorphism, gradient buttons, and focus glow effects.
- **Layout Optimization**: Optimized form containers for compactness (removed vertical scrollbars).
- **Asset Scaling**: Resized SVG assets (leaf, curve) and images for better fit.
- **Z-Index Fix**: Updated `--z-navbar` to `100` to ensure it always stays above page content.
- **BEM Compliance**: Final audit and fix of Footer links and SignatureDishes hardcoded values.
- **Documentation**: All 5 docs (00-04) updated to v3.1.0 reflecting these final polish steps.

---

*Savory Bistro Changelog v1.1 — March 2026*
