# SAVORY BISTRO — TEAM GUIDE
## How Every Developer Uses the PRD System

> This guide tells each team member exactly what to do, in what order, 
> so no one ever has to guess — and no AI ever gets to make a design decision.

---

## THE FUNDAMENTAL PROBLEM THIS SOLVES

When 6 developers build 6 pages with an AI assistant, without a shared reference system you get:
- Dev A uses `#ff6b35` for orange, Dev B uses `#e07b39`, Dev C uses `var(--primary)` — 3 different oranges
- Dev A puts Navbar in `components/navbar.jsx`, Dev B puts it in `components/Navbar/index.jsx` — import paths break
- Dev C uses `<a href="/menu">` — full page refreshes kill the SPA
- Dev D asks the AI to "make the tasting menu look good" — the AI generates its own design
- Dev E commits directly to `main` — overwrites Dev F's work

The PRD system eliminates all of these with one rule: **every prompt is constrained, not open-ended.**

---

## PART 1 — ONBOARDING (All Team Members)

### Day 1 Checklist

**Step 1: Read these files in order**
```
01_PRD_Antigravity_Edition.md  → understand the design system (30 min)
02_Prompt_Library.md           → understand how to write prompts (15 min)
03_Team_Guide.md               → this file (10 min)
Savory_Bistro_PRD.md           → full spec for your assigned page (20 min)
```

**Step 2: Clone the repo**
```bash
git clone https://github.com/AhmedTyson/savory-bistro.git
cd savory-bistro
npm install
npm run dev
# → http://localhost:5173 should load (placeholder pages)
```

**Step 3: Verify variables.css is working**
Open `http://localhost:5173` in browser.
Open DevTools → Elements → select any element → check Computed styles.
You should see `--color-primary: #E07B39` listed.
If CSS variables don't show, the import is broken — see Recovery Prompt R-06.

**Step 4: Set up your feature branch**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/[your-page-name]
# e.g.: feature/home-page, feature/menu-page, feature/reservations-page
```

**Step 5: Open Antigravity IDE**
Bookmark `01_PRD_Antigravity_Edition.md` — you will copy from it in every session.

---

## PART 2 — ROLE ASSIGNMENTS

| Role | Page/Components | Branch name | Files owned |
|---|---|---|---|
| Project Lead | Review, merge, QA | `develop`, `main` | App.jsx, mock-data.json |
| Developer A | Home page + Shared Components | `feature/home-page` | Navbar, Footer, Button, DishCard, SectionHeader, FloatingReserveBtn, Home page |
| Developer B | Menu page | `feature/menu-page` | Menu.jsx, Menu.css, DishCard (read-only consumer) |
| Developer C | Reservations page | `feature/reservations-page` | Reservations.jsx, Reservations.css |
| Developer D | Gallery page | `feature/gallery-page` | Gallery.jsx, Gallery.css |
| Developer E | Contact page | `feature/contact-page` | Contact.jsx, Contact.css |
| Developer F | About Us page | `feature/about-page` | AboutUs.jsx, AboutUs.css |

---

## PART 3 — DEVELOPER A: SHARED COMPONENTS GUIDE

Developer A has the most critical job — you build the components everyone else depends on.
**Build in this order. Do not skip steps.**

### Order of Work

**Phase A1 — Build components (no page yet)**
1. `Button` → test: does it render all 3 variants correctly?
2. `SectionHeader` → test: does `label`, `title`, `subtitle`, `align` all work?
3. `DishCard` → test: does badge show/hide? Does diet dot color correctly?
4. `FloatingReserveBtn` → test: does it stick to bottom-right? Does it link to /reservations?
5. `Navbar` → test: does active link show orange? Does hamburger open/close on mobile?
6. `Footer` — `full` variant first → test: does newsletter email field work?
7. `Footer` — `light` variant → test: is it 3 columns, not 4?

**Phase A2 — Home page (after all components pass)**
Use Prompt P2-A from the prompt library (Chapter 3).
Build sections in order: Hero → Info Strip → Our Story → Signature Dishes → Chef's Special → Testimonials

### Critical Design Contracts

These are the component APIs that every other developer depends on.
**Do not change these props after announcing components are ready.**

```jsx
// Button — agreed API
<Button
  variant="primary" | "outlined" | "outlined-dark"
  onClick={fn}
  type="button" | "submit"
  disabled={bool}
  fullWidth={bool}
>
  Label text
</Button>

// SectionHeader — agreed API
<SectionHeader
  label="OPTIONAL LABEL"    // orange uppercase, omit for no label
  title="Required Title"    // H2
  subtitle="Optional body"  // omit for no subtitle
  align="left" | "center"  // default: left
/>

// DishCard — agreed API
<DishCard
  image="/images/dish.webp"
  name="Dish Name"
  description="Short description"
  price={28}
  badge="POPULAR"           // omit or pass null for no badge
  dietIcon="vegetarian" | "seafood" | "spicy" | null
/>

// Footer — agreed API
<Footer variant="full" | "light" />
// Default: full (omit prop for full footer)
// Gallery uses: <Footer variant="light" />
```

**After A1 is complete:** Announce in team chat: "Shared components ready on `feature/home-page`. PR to develop."
Everyone else: do `git pull origin develop` after the PR merges before writing any component imports.

---

## PART 4 — ALL DEVELOPERS: DAILY WORKFLOW

### Start of Day

```bash
# ALWAYS start here — never skip this
git checkout develop
git pull origin develop
git checkout feature/[your-page]
git merge develop
# If conflicts: resolve them, then git add . && git commit -m "chore: merge develop"
```

### During Development

**Opening Antigravity IDE prompt session:**
1. Open `01_PRD_Antigravity_Edition.md`
2. Copy Section 0 (Context Header)
3. Copy the specific section for what you're building (e.g. Section 7.1 for Reservations form)
4. Paste both into Antigravity IDE
5. The AI now has your full design contract — never ask it to "make it look good"

**After each AI-generated code block:**
Before pasting into your editor, verify:
- [ ] Are there any hardcoded hex values? (replace with var())
- [ ] Are there any `<a href="/...">` tags? (replace with NavLink/Link)
- [ ] Are there any extra npm install instructions? (ignore — everything is pre-installed)
- [ ] Does it import from the correct paths?
- [ ] Does it follow the folder structure?

**Committing:**
```bash
git add .
git commit -m "feat([scope]): [what you built]"
git push origin feature/[your-page]
```

### End of Day

```bash
git push origin feature/[your-page]
# Post in team chat: "Pushed [what you built] to feature/[your-page] — ready for review? Y/N"
```

---

## PART 5 — SHARED FILE RULES

These files are shared across all developers. **Coordinate before editing.**

| File | Owner | Rule |
|---|---|---|
| `src/styles/variables.css` | Developer A / Project Lead | Never change a token without team agreement. Adding a new token: propose in team chat first. |
| `src/App.jsx` | Project Lead | Only touch routes. Adding a new import: announce in chat first. |
| `mock-data.json` | Project Lead | Commit base data in Phase 0. Others: only add their page's data keys, never overwrite. |
| `src/index.css` | Developer A | Only the Google Fonts import and Tailwind directives. Nothing else. |
| `src/components/*/` | Developer A | All other developers: use these as imports only. Never edit shared components without asking Dev A first. |

### Merge Conflict Prevention

The biggest source of conflicts:
```
Developer A: edits Footer.jsx
Developer B: also edits Footer.jsx for their page
→ Merge conflict on a shared file
```

**The rule:** If you need a change in a shared component, open a GitHub Issue or message Dev A.
Dev A makes the change. It flows to everyone via `git merge develop`.

---

## PART 6 — COMMUNICATION TEMPLATES

### "I found a bug in a shared component"

```
[TEAM CHAT MESSAGE]
@DevA Bug found in [ComponentName]:
File: src/components/[Name]/[Name].jsx
Problem: [describe]
Page where I see it: [my page]
I did NOT edit the file. Needs fix from Dev A.
```

### "I need a new token in variables.css"

```
[TEAM CHAT MESSAGE]
I need a new CSS token for [what + why]:
Proposed name: --color-[name]
Proposed value: #XXXXXX
Used on: [my page, section name]
@ProjectLead approve? @DevA can you add it?
```

### "My PR is ready for review"

```
[TEAM CHAT MESSAGE]
PR ready: feature/[my-page] → develop
Page: [page name]
Tested at: 375px ✓ | 768px ✓ | 1024px ✓ | 1280px ✓
Forms validated: [yes/no — which forms]
QA checklist: all passed ✓
Link: [GitHub PR URL]
@[reviewer] please review
```

---

## PART 7 — QUICK REFERENCE CARDS

Cut these out and keep them beside your screen.

---

### CARD 1: Color Quick Reference

```
ORANGE (primary): var(--color-primary) = #E07B39
  → Buttons, active nav links, prices on dish cards, icons, pill badges

AMBER (chef badge): var(--color-chef-badge) = #C8973A
  → ONLY on Chef's Special pill badge — NOT on buttons or other things

GOLD: var(--color-gold-accent) = #C9A84C
  → Tasting menu labels, wine headings, testimonial quote marks, tasting price

PAGE BG: var(--color-bg-page) = #F5F0EB
  → Every page's warm cream background

DARK SECTIONS:
  Hero overlay:     #111111 = var(--color-bg-hero)
  Chef's Special:   #2B3A42 = var(--color-bg-chef-special) ← NOT black
  Testimonials:     #1A1A1A = var(--color-bg-testimonial)
  Tasting menu:     #1A1200 = var(--color-bg-tasting) ← brown-black, NOT same as testimonials
  Footer:           #1C1C1C = var(--color-bg-footer)

HERO SUBTITLE: var(--color-text-hero-script) = #E8C99A ← warm cream NOT white
GREEN (sustain): var(--color-green-sustain) = #5A8A5A ← About Us sustainability ONLY

ERRORS: var(--color-border-error) = #E53935 ← form validation borders and text
```

---

### CARD 2: Routing Quick Reference

```
✓ Internal navigation (use always):
  import { NavLink, Link } from 'react-router-dom'
  <NavLink to="/menu">Menu</NavLink>   ← for nav items (gets active class)
  <Link to="/menu">View Menu</Link>   ← for other internal links
  <NavLink to="/reservations">        ← for FloatingReserveBtn

✗ Never for internal links:
  <a href="/menu">Menu</a>   ← causes full page refresh

✓ External links only:
  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
```

---

### CARD 3: State Quick Reference

```
useState is required for:
  Navbar hamburger:    const [menuOpen, setMenuOpen] = useState(false)
  Menu filter:         const [activeCategory, setActiveCategory] = useState('all')
  Gallery filter:      const [activeFilter, setActiveFilter] = useState('all')
  FAQ accordion:       const [openIndex, setOpenIndex] = useState(null)
  Date picker:         const [selectedDate, setSelectedDate] = useState(null)
  Time slots:          const [selectedTime, setSelectedTime] = useState(null)
  Form fields:         const [name, setName] = useState('')
  Form errors:         const [nameError, setNameError] = useState('')
  Testimonial dots:    const [activeQuote, setActiveQuote] = useState(0)
  Newsletter email:    const [email, setEmail] = useState('')

Never:
  document.querySelector() for toggling
  document.getElementById() for reading form values
  Direct DOM manipulation of class names
```

---

### CARD 4: Import Quick Reference

```
Icons:        import { IconName } from 'lucide-react'
Router:       import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
Data:         import data from '../../../mock-data.json'   ← from a page file
              import data from '../../../../mock-data.json' ← from a component file
Components:   import Button from '../../components/Button/Button'
              import SectionHeader from '../../components/SectionHeader/SectionHeader'
              import DishCard from '../../components/DishCard/DishCard'
              import Navbar from '../../components/Navbar/Navbar'
              import Footer from '../../components/Footer/Footer'
CSS:          import './[ComponentName].css'  ← inside the component .jsx file itself
Variables:    ← DO NOT import variables.css in individual components
              ← It's loaded globally in App.jsx and index.css
```

---

### CARD 5: Commit Message Reference

```
FORMAT: type(scope): short description

feat(home): add hero section with CTAs
feat(menu): implement category filter tabs
feat(reservations): add inline calendar date picker
feat(gallery): build masonry grid with filter
feat(contact): add FAQ accordion with useState
feat(about): complete sustainability section
fix(navbar): correct active link detection on /gallery
fix(button): missing hover state on outlined-dark variant
style(dishcard): adjust badge position to top-left of image
refactor(footer): extract newsletter form into sub-component
chore(data): populate mock-data.json with menu items
docs: update README with team assignments

Types: feat | fix | style | refactor | chore | docs | test
```

---

## PART 8 — QA PROTOCOL (Before Any PR)

Run this before opening a PR. Every item must pass.

### Self-Review (developer)

**Design:**
- [ ] Zero hardcoded hex values in any JSX or CSS file
- [ ] All colors from `var(--color-*)` tokens in variables.css
- [ ] Correct section backgrounds (especially Chef's Special, Tasting Menu)
- [ ] Correct badge colors (Chef's Special badge ≠ primary orange)
- [ ] All fonts from `var(--font-*)` tokens
- [ ] Hero subtitle uses `var(--font-script)` Dancing Script

**Code:**
- [ ] No `<a>` tags for internal links
- [ ] All state managed with `useState`
- [ ] All event handlers named `handleX` (handleSubmit, handleFilter, etc.)
- [ ] No direct DOM manipulation
- [ ] mock-data.json imported from correct path

**Responsive:**
- [ ] DevTools at 375px — no horizontal scroll, no overflow
- [ ] DevTools at 768px — 2-column layouts visible where designed
- [ ] DevTools at 1024px — full desktop layout
- [ ] Hamburger menu opens and closes on mobile
- [ ] All interactive elements have min-height: 44px

**Forms (if your page has a form):**
- [ ] Empty submit shows error messages below each invalid field
- [ ] Error border color is `#E53935` (var(--color-border-error))
- [ ] Email validation rejects "abc" (no @domain)
- [ ] Form does NOT submit when validation fails
- [ ] Errors clear on typing

### Peer Review (reviewer)

When reviewing someone's PR, check these in addition to the above:

- [ ] PR is pointed to `develop`, not `main`
- [ ] No changes to shared component files without announcement
- [ ] No changes to variables.css without team agreement
- [ ] No new npm packages added (check package.json diff)
- [ ] Commit messages follow the format
- [ ] Build passes: `npm run build` completes without errors

---

*Savory Bistro Team Guide v1.0 — March 2026*
