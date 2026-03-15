# SAVORY BISTRO — PROMPT LIBRARY
## Ready-to-Use Prompts for Every Section

| Version | 3.2.0 — Hagar's Contributions Integrated |
| Updated | March 2024 |
| Status | Phase 10 - Integration Complete |

> **How to use:** Paste `00_Session_Opener.md` first. Then paste the prompt for the section you need. Replace only `[BRACKETED]` placeholders. Never remove the session opener.

---

## HOW TO BUILD A SECTION — THE PATTERN

Every prompt follows this structure:
```
[PASTE 00_Session_Opener.md BLOCK]

TASK: Build [SectionName] section.
FILE: src/pages/[PageName]/sections/[SectionName]/[SectionName].jsx
CSS:  src/pages/[PageName]/sections/[SectionName]/[SectionName].css

[spec from 01_PRD_Antigravity_Edition.md]

Show me the complete .jsx and .css files.
Do NOT touch any other file.
```

---

## CHAPTER 1 — SHARED COMPONENTS

### P1-A: Navbar (auth-aware)

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/components/Navbar/Navbar.jsx and Navbar.css.
The Navbar already exists — this prompt rebuilds it following all current rules.

AUTH:
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const { user } = useContext(AuthContext)

Guest state (no user):
  Show Login + Sign Up as NavLinks in .Navbar__auth-guest container
  NO Book Table button — ever

Logged in state (user exists):
  Show UserCircle icon (32px) in .Navbar__avatar-btn button inside .Navbar__auth-user container
  NO Book Table button — ever

DESIGN:
Background: var(--color-bg-white), sticky top, z-index: var(--z-navbar)=100
Left: UtensilsCrossed icon + "Savory Bistro" in var(--font-serif), weight 600, color: var(--color-text-heading)
Center desktop: NavLinks — Home | Menu | Reservations | Gallery | Contact | About Us
  Default: var(--color-text-nav-default) | Active: var(--color-text-nav-active) + underline
  Active detection: useLocation() from react-router-dom
Right: auth state block (see above)
Mobile (<768px): hamburger toggle — Menu icon closed / X icon open
  const [menuOpen, setMenuOpen] = useState(false)
  Close menu on any link click

BEM classes (all required):
.Navbar .Navbar__brand .Navbar__brand-icon .Navbar__brand-name
.Navbar__links .Navbar__link .Navbar__link--active
.Navbar__auth-guest .Navbar__auth-user .Navbar__avatar-btn .Navbar__auth-link
.Navbar__hamburger .Navbar__mobile-menu .Navbar__mobile-menu--open .Navbar__mobile-link

ICONS: import { UtensilsCrossed, Menu, X, UserCircle } from 'lucide-react'
All links: NavLink from react-router-dom — NEVER <a>
```

---

### P1-B: FloatingReserveBtn (auth-aware)

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/components/FloatingReserveBtn/FloatingReserveBtn.jsx and FloatingReserveBtn.css.

ALWAYS VISIBLE — never hide based on auth state.

AUTH NAVIGATION:
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const { user } = useContext(AuthContext)
const navigate  = useNavigate()

function handleClick() {
  if (user) {
    navigate('/reservations')
  } else {
    navigate('/login', { state: { from: '/reservations' } })
  }
}

Element: <button className="FloatingReserveBtn" onClick={handleClick}>
NOT NavLink. NOT Link. NOT <a>. A plain <button>.

DESIGN:
Position: fixed, bottom: 32px, right: 32px, z-index: var(--z-floating)
background: var(--color-primary)
color: var(--color-text-white)
border-radius: var(--radius-pill)
padding: 14px 24px, min-height: 44px
display: flex, align-items: center, gap: 8px
hover: background var(--color-primary-hover), transition: var(--transition-normal)
box-shadow: 0 4px 16px rgba(224,123,57,0.3)
Mobile: bottom: 24px, right: 16px

Contains: CalendarDays icon (18px) + "Reserve Now" text (font-weight: 600)

BEM: .FloatingReserveBtn .FloatingReserveBtn__icon .FloatingReserveBtn__text
ICON: import { CalendarDays } from 'lucide-react'
```

---

### P1-C: Footer

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/components/Footer/Footer.jsx and Footer.css.

PROPS: variant = 'full' | 'light' (default: 'full')

FULL variant (4 columns):
  Col 1: Brand — UtensilsCrossed icon + "Savory Bistro" in var(--font-serif) + tagline
  Col 2: Quick Links — Home, Menu, Reservations, Gallery, Contact, About Us
  Col 3: Contact Us — address, phone, email with icons
  Col 4: Newsletter — label, email input (useState), ArrowRight button

LIGHT variant (3 columns):
  Col 1: Brand
  Col 2: Visit Us — address + hours
  Col 3: Newsletter

BOTH variants:
  background: var(--color-bg-footer) = #1C1C1C
  Headings: var(--color-text-white) | Body: var(--color-text-muted)
  Bottom bar: copyright text, border-top: 1px solid rgba(255,255,255,0.1)

Internal links: <Link to="..."> — NEVER <a>
External links: <a target="_blank" rel="noopener noreferrer">

BEM classes (required):
.Footer .Footer--light .Footer__container .Footer__grid
.Footer__brand .Footer__brand-icon .Footer__brand-name .Footer__tagline
.Footer__column-title .Footer__link
.Footer__newsletter .Footer__newsletter-input .Footer__newsletter-btn
.Footer__bottom .Footer__copyright

RESPONSIVE: 1 col mobile → 2 col 768px → 3-4 col 1024px
ICONS: import { UtensilsCrossed, ArrowRight } from 'lucide-react'
```

---

## CHAPTER 2 — HOME PAGE SECTIONS

### P2-A: Hero Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Home/sections/Hero/Hero.jsx and Hero.css.

DESIGN:
Section: min-height: 100vh, position: relative, overflow: hidden
Background: background-color: var(--color-bg-hero)
  Overlay: background: linear-gradient(rgba(17,17,17,0.65), rgba(17,17,17,0.65)), url('/images/hero-food.webp')
  background-size: cover, background-position: center

Content: centered vertically + horizontally, text-align: center
  max-width: var(--container-max), margin: 0 auto, padding: 0 var(--space-md)

Headline: "Savory Bistro"
  font-family: var(--font-serif), color: var(--color-text-white)
  font-size: 48px (base) → 64px (lg:), font-weight: 700

Subtitle: "Authentic Flavors, Unforgettable Moments"
  font-family: var(--font-script) ← Dancing Script — NOT Playfair
  color: var(--color-text-hero-script) = #E8C99A ← warm cream — NOT white #FFFFFF
  font-size: 20px (base) → 26px (lg:), margin-bottom: 40px

CTA buttons (flex row, gap: 16px, wrap mobile):
  <Link to="/menu"><Button variant="primary">View Menu</Button></Link>
  <Link to="/reservations"><Button variant="outlined-dark">Reserve a Table</Button></Link>

Scroll arrow: ChevronDown icon, position: absolute bottom: 32px, centered
  color: var(--color-text-white), opacity: 0.6

BEM: .Hero .Hero__background .Hero__content .Hero__headline
     .Hero__subtitle .Hero__cta-group .Hero__scroll-arrow

ICONS: import { ChevronDown } from 'lucide-react'
```

---

### P2-B: ChefSpecial Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Home/sections/ChefSpecial/ChefSpecial.jsx and ChefSpecial.css.

CRITICAL COLORS — do NOT substitute:
  Section bg: var(--color-bg-chef-special) = #2B3A42  ← dark slate NOT black
  Badge bg:   var(--color-chef-badge) = #C8973A        ← amber NOT var(--color-primary)

DESIGN:
Section: background: var(--color-bg-chef-special), padding: var(--space-section) var(--space-md)
Container: max-width: var(--container-max), margin: 0 auto, text-align: center

Badge "CHEF'S SPECIAL":
  background: var(--color-chef-badge), color: var(--color-text-white)
  border-radius: var(--radius-pill), padding: 6px 20px
  font-size: 11px, font-weight: 700, letter-spacing: 0.12em, text-transform: uppercase

Dish name: var(--font-serif), var(--color-text-white), 36px→48px, bold
Description: var(--color-text-muted), var(--font-sans), 16px
Price: var(--color-primary), font-size: 24px, font-weight: 700
CTA: <Button variant="primary">Order Now</Button>

BEM: .ChefSpecial .ChefSpecial__container .ChefSpecial__badge
     .ChefSpecial__dish-name .ChefSpecial__description .ChefSpecial__price .ChefSpecial__cta
```

---

### P2-C: Testimonials Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Home/sections/Testimonials/Testimonials.jsx and Testimonials.css.

STATE: const [activeIndex, setActiveIndex] = useState(0)

DESIGN:
Section: background: var(--color-bg-testimonial) = #1A1A1A
  padding: var(--space-section) var(--space-md)
Container: max-width: 760px, margin: 0 auto, text-align: center

Quote mark: large " character, font-size: 80px, color: var(--color-gold-accent)
Quote text: var(--font-serif), font-style: italic, var(--color-text-white)
  font-size: 20px→24px, line-height: 1.6

Reviewer row: flex, centered, gap: 16px
  Avatar: 48x48 circle, border: 2px solid var(--color-gold-accent)
  Name: var(--color-text-white), font-weight: 600
  Label "FOOD CRITIC": var(--color-primary), 11px, uppercase, letter-spacing: 0.1em

Dots: flex row, gap: 8px, margin-top: var(--space-xl)
  Active: background: var(--color-primary), 10px circle
  Inactive: background: var(--color-text-muted), 8px circle
  onClick: setActiveIndex(index)

BEM: .Testimonials .Testimonials__container .Testimonials__quote-mark
     .Testimonials__quote-text .Testimonials__reviewer .Testimonials__avatar
     .Testimonials__reviewer-name .Testimonials__reviewer-label
     .Testimonials__dots .Testimonials__dot .Testimonials__dot--active
```

---

## CHAPTER 3 — MENU PAGE SECTIONS

### P3-A: FilterTabs Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Menu/sections/FilterTabs/FilterTabs.jsx and FilterTabs.css.

STATE: const [activeCategory, setActiveCategory] = useState('all')
CATEGORIES: ['all', 'appetizers', 'mainCourses', 'seafood', 'vegetarian', 'desserts', 'drinks']
LABELS: { all: 'All', mainCourses: 'Main Courses' } — others: capitalize first letter

DATA: import mockData from '../../../../mock-data.json'
This component renders the filter pills only — MenuGrid handles the card rendering.
Pass activeCategory up via an onCategoryChange prop or lift state to Menu.jsx assembler.

DESIGN:
Container: flex, flex-wrap: wrap, gap: 8px, padding: var(--space-lg) 0

Each pill button:
  Active: background: var(--color-primary), color: var(--color-text-white), border: none
  Inactive: background: transparent, color: var(--color-text-muted), border: 1px solid var(--color-border-card)
  ALL: border-radius: var(--radius-pill), padding: 8px 20px, font-size: 14px
  min-height: 44px, cursor: pointer, transition: var(--transition-normal)

BEM: .FilterTabs .FilterTabs__list .FilterTabs__pill .FilterTabs__pill--active
```

---

### P3-B: TastingMenu Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Menu/sections/TastingMenu/TastingMenu.jsx and TastingMenu.css.

CRITICAL COLORS — do NOT substitute:
  Section bg:     var(--color-bg-tasting) = #1A1200      ← dark brown NOT #1A1A1A
  Gold border:    var(--color-border-gold) = #C9A84C
  Course labels:  var(--color-gold-accent) = #C9A84C
  Price "$145":   var(--color-text-gold-price) = #C9A84C  ← gold NOT orange

DATA: import mockData from '../../../../mock-data.json' — use mockData.tastingMenu
  Each item: { course, label, dish }

DESIGN:
Section: background: var(--color-bg-tasting), padding: var(--space-section) var(--space-md)
Inner box: max-width: 700px, margin: 0 auto
  border: 1px solid var(--color-border-gold), padding: var(--space-2xl)

Title "Chef's Tasting Menu": var(--font-serif), var(--color-text-white), 32px, centered
Course list:
  Row: padding: var(--space-md) 0, border-bottom: 1px solid rgba(201,168,76,0.2)
  Course label: var(--color-gold-accent), 12px, uppercase, letter-spacing: 0.12em
  Dish name: var(--font-serif), var(--color-text-white), 18px

Price block (centered, margin-top: var(--space-xl)):
  "$145": 40px, font-weight: 700, var(--color-text-gold-price)
  "per person": var(--color-text-muted), 14px

CTA: <Button variant="primary" fullWidth>RESERVE THIS EXPERIENCE</Button>

BEM: .TastingMenu .TastingMenu__container .TastingMenu__box .TastingMenu__title
     .TastingMenu__course-row .TastingMenu__course-label .TastingMenu__course-name
     .TastingMenu__price-block .TastingMenu__price .TastingMenu__price-label
```

---

## CHAPTER 4 — RESERVATIONS PAGE SECTIONS

### P4-A: ReservationForm Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Reservations/sections/ReservationForm/ReservationForm.jsx and ReservationForm.css.

STATE (one useState per field — do NOT group):
const [name, setName]             = useState('')
const [email, setEmail]           = useState('')
const [phone, setPhone]           = useState('')
const [partySize, setPartySize]   = useState('2')
const [specialRequests, setSpecialRequests] = useState('')
const [nameError, setNameError]   = useState('')
const [emailError, setEmailError] = useState('')
const [phoneError, setPhoneError] = useState('')

VALIDATION (runs on submit — do NOT submit if any fail):
  name: required, min 2 chars → "Full name is required"
  phone: /^[\d\s\-\+\(\)]{7,}$/ → "Please enter a valid phone number"
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ → "Please enter a valid email address"
  selectedDate: required → "Please select a date"
  selectedTime: required → "Please select a time slot"

INPUT DESIGN:
  Default: border: 1px solid var(--color-border-input), border-radius: var(--radius-md), padding: 12px 16px
  Focus: border-color: var(--color-primary), outline: none
  Error: border-color: var(--color-border-error)
  Error message: color: var(--color-border-error), font-size: 12px, margin-top: 4px

FIELDS: Party Size (select) | Occasion (select, optional) | Full Name | Phone | Email | Special Requests (textarea)

SUBMIT: <Button variant="primary" type="submit" fullWidth>Confirm Reservation</Button>
  On valid submit → console.log('Reservation submitted', formData)

BEM: .ReservationForm .ReservationForm__container .ReservationForm__group
     .ReservationForm__label .ReservationForm__input .ReservationForm__input--error
     .ReservationForm__error .ReservationForm__submit
```

---

## CHAPTER 5 — GALLERY PAGE SECTIONS

### P5-A: MasonryGrid Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Gallery/sections/MasonryGrid/MasonryGrid.jsx and MasonryGrid.css.

STATE: const [activeFilter, setActiveFilter] = useState('all')
FILTERS: ['all', 'food', 'interior', 'events', 'chefsCreations']
DATA: import mockData from '../../../../mock-data.json' — use mockData.gallery
  Each item: { id, src, alt, category, type: 'photo'|'video', size: 'tall'|'medium' }

MASONRY CSS: column-count approach — NOT CSS grid
  column-count: 1 (base) → 2 (768px) → 3 (1024px+)
  column-gap: var(--space-md)
  Each item: display: inline-block, width: 100%, margin-bottom: var(--space-md)
    break-inside: avoid, position: relative, overflow: hidden, border-radius: var(--radius-md)

VIDEO overlay (type === 'video'):
  'VIDEO' badge: position absolute top-left, background: var(--color-primary)
    color: var(--color-text-white), border-radius: var(--radius-sm), 10px, font-weight: 700
  Play button: centered circle, background: rgba(255,255,255,0.9), Play icon 24px

BEM: .MasonryGrid .MasonryGrid__container .MasonryGrid__grid
     .MasonryGrid__item .MasonryGrid__item--tall .MasonryGrid__item--medium .MasonryGrid__image

ICON: import { Play } from 'lucide-react'
```

---

## CHAPTER 6 — CONTACT PAGE SECTIONS

### P6-A: FAQAccordion Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Contact/sections/FAQAccordion/FAQAccordion.jsx and FAQAccordion.css.

STATE: const [openIndex, setOpenIndex] = useState(null)
TOGGLE: setOpenIndex(prev => prev === index ? null : index)
DATA: import mockData from '../../../../mock-data.json' — use mockData.faqs
  Each item: { id, question, answer }

DESIGN:
Each FAQ item container: border-bottom: 1px solid var(--color-border-card), padding: var(--space-lg) 0

Question row (clickable):
  display: flex, justify-content: space-between, align-items: center
  cursor: pointer, min-height: 44px
  Text: var(--font-sans), font-weight: 600, var(--color-text-heading), 16px
  Chevron: ChevronDown 20px
    Open: rotate 180deg, color: var(--color-primary)
    Closed: rotate 0deg, color: var(--color-text-muted)
    transition: var(--transition-normal)

Answer (render only when openIndex === index):
  padding-top: var(--space-sm)
  color: var(--color-text-body), font-size: 15px, line-height: 1.7

BEM: .FAQAccordion .FAQAccordion__container .FAQAccordion__item
     .FAQAccordion__question .FAQAccordion__question-text .FAQAccordion__icon
     .FAQAccordion__icon--open .FAQAccordion__answer .FAQAccordion__answer--open

ICON: import { ChevronDown } from 'lucide-react'
```

---

## CHAPTER 7 — ABOUT US PAGE SECTIONS

### P7-A: Sustainability Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/AboutUs/sections/Sustainability/Sustainability.jsx and Sustainability.css.

UNIQUE COLORS — used nowhere else in the project:
  Section bg:     var(--color-bg-sustain) = #F0EFEA   ← NOT var(--color-bg-page)
  Heading color:  var(--color-green-sustain) = #5A8A5A ← forest green, ONLY here

DESIGN:
Section: background: var(--color-bg-sustain), padding: var(--space-section) var(--space-md)
Container: max-width: var(--container-max), margin: 0 auto

Heading "Good for the Plate, Good for the Planet":
  var(--font-serif), color: var(--color-green-sustain), 28px→36px, font-weight: 700, text-align: center

4-column grid (1→2→4 responsive), gap: var(--space-xl):
  Icon circle: 56px, background: rgba(90,138,90,0.1), border-radius: 50%
    Icon in var(--color-green-sustain)
  Title: font-weight: 600, var(--color-text-heading)
  Body: var(--color-text-body), 14px, line-height: 1.6

Partner logos row: flex, wrap, centered, margin-top: var(--space-2xl)
  Each badge: background: var(--color-bg-white), border: 1px solid var(--color-border-card)
    border-radius: var(--radius-pill), padding: 6px 20px
    Text: var(--color-text-muted), 13px, font-weight: 500
  Labels: 'GREEN FARM' | 'ROOTS CO.' | 'URBAN SOIL' | 'ECO-VALLEY'

BEM: .Sustainability .Sustainability__container .Sustainability__heading
     .Sustainability__grid .Sustainability__item .Sustainability__icon-circle
     .Sustainability__item-title .Sustainability__item-body .Sustainability__partners

ICONS: import { Leaf, Recycle, Sprout, Users } from 'lucide-react'
```

---

### P7-B: TeamSection

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/AboutUs/sections/TeamSection/TeamSection.jsx and TeamSection.css.

DATA: import mockData from '../../../../mock-data.json' — use mockData.team
  Each item: { id, name, role, bio }

DESIGN:
Section: background: var(--color-bg-page), padding: var(--space-section) var(--space-md)
Container: max-width: var(--container-max), margin: 0 auto

Grid: 1 col (base) → 2 col (768px) → 3 col (1024px+), gap: var(--space-lg)

Each card:
  background: var(--color-bg-white), border: 1px solid var(--color-border-card)
  border-radius: var(--radius-lg), overflow: hidden
  Avatar: circular image, 80x80, border: 2px solid var(--color-border-card)
  Name: var(--font-sans), font-weight: 600, var(--color-text-heading), 16px
  Role: var(--color-primary), 13px, text-transform: uppercase, letter-spacing: 0.05em
  Bio: var(--color-text-body), 14px, line-height: 1.6

BEM: .TeamSection .TeamSection__container .TeamSection__grid
     .TeamSection__card .TeamSection__avatar .TeamSection__name
     .TeamSection__role .TeamSection__bio
```

---

## CHAPTER 8 — AUTH PAGES

### P8-A: LoginForm Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Login/sections/LoginForm/LoginForm.jsx and LoginForm.css.

AUTH CONTEXT: import { AuthContext } from '../../../../context/AuthContext'
REDIRECT: after successful login, read location.state?.from
  import { useLocation, useNavigate } from 'react-router-dom'
  const from = location.state?.from || '/'
  navigate(from, { replace: true })

STATE:
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError]    = useState('')
  const [passwordError, setPasswordError] = useState('')

VALIDATION:
  email: required + valid format /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  password: required, min 6 chars

"Sign up" link: <Link to="/signup"> — NEVER <a>

BEM: .LoginForm .LoginForm__title .LoginForm__subtitle .LoginForm__field
     .LoginForm__label .LoginForm__input .LoginForm__input--error
     .LoginForm__error .LoginForm__submit .LoginForm__footer .LoginForm__link
```

---

### P8-B: SignupForm Section

```
[PASTE 00_Session_Opener.md BLOCK]

Build src/pages/Signup/sections/SignupForm/SignupForm.jsx and SignupForm.css.

STATE:
  const [name, setName]                   = useState('')
  const [email, setEmail]                 = useState('')
  const [password, setPassword]           = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError]         = useState('')
  const [emailError, setEmailError]       = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError]   = useState('')

VALIDATION:
  name: required
  email: required + valid format
  password: min 8 chars
  confirmPassword: must match password → "Passwords do not match"

"Log in" link: <Link to="/login"> — NEVER <a>

BEM: .SignupForm .SignupForm__title .SignupForm__subtitle .SignupForm__field
     .SignupForm__label .SignupForm__input .SignupForm__input--error
     .SignupForm__error .SignupForm__submit .SignupForm__footer .SignupForm__link
```

---

## CHAPTER 9 — RECOVERY PROMPTS

Use these when Gemini output has a specific problem.

### R-01: Fix BEM Violation

```
[PASTE 00_Session_Opener.md BLOCK]

In the file [FILE PATH], CSS classes do not follow BEM naming.

RULE: every class must be prefixed with the component name.
  CORRECT: .Navbar__link  .DishCard__badge--featured
  WRONG:   .link  .badge  .active

Find every CSS class in [FILE PATH] that does not start with [ComponentName]__.
Rename each one using BEM. Update both the .css file and every className in the .jsx file.
Show me the complete updated .jsx and .css files.
Do NOT change any logic, structure, or styling values.
```

---

### R-02: Fix Hardcoded Hex

```
[PASTE 00_Session_Opener.md BLOCK]

In the file [FILE PATH], there are hardcoded hex color values.

RULE: every color must use var(--color-*) from src/styles/variables.css.

Color map — replace each hex with its variable:
#E07B39 → var(--color-primary)
#C96B2A → var(--color-primary-hover)
#C8973A → var(--color-chef-badge)
#C9A84C → var(--color-gold-accent)
#F5F0EB → var(--color-bg-page)
#111111 → var(--color-bg-hero)
#2B3A42 → var(--color-bg-chef-special)
#1A1A1A → var(--color-bg-testimonial)
#1C1C1C → var(--color-bg-footer)
#1A1200 → var(--color-bg-tasting)
#1A1A1A (text) → var(--color-text-heading)
#555555 → var(--color-text-body)
#888888 → var(--color-text-muted)
#FFFFFF → var(--color-text-white) or var(--color-bg-white)
#E8C99A → var(--color-text-hero-script)
#E8E2D9 → var(--color-border-card)
#D5CFC8 → var(--color-border-input)
#E53935 → var(--color-border-error)

Find and replace every hardcoded hex in [FILE PATH].
Show me the complete updated file.
Do NOT change any other values.
```

---

### R-03: Fix Internal `<a>` Tags

```
[PASTE 00_Session_Opener.md BLOCK]

In the file [FILE PATH], internal navigation uses <a> tags.

RULE:
  Internal links → <NavLink to="..."> for nav items | <Link to="..."> for other internal links
  External links → keep as <a href="https://..." target="_blank" rel="noopener noreferrer">

1. Add to imports: import { NavLink, Link } from 'react-router-dom' (if not already there)
2. Replace every internal <a href="/..."> with the correct component
3. Keep all className, style, and children exactly as they were

Show me the complete updated file.
Do NOT change external links. Do NOT change anything else.
```

---

### R-04: Fix Wrong Section Structure

```
[PASTE 00_Session_Opener.md BLOCK]

The file [FILE PATH] contains section JSX directly instead of importing from sections/.

RULE: the parent page file must be a thin assembler only — max 35 lines.
All section content belongs in src/pages/[PageName]/sections/[SectionName]/[SectionName].jsx

1. Identify each distinct section in the current [FILE PATH]
2. For each section: create [SectionName].jsx and [SectionName].css in sections/[SectionName]/
3. Move the section JSX to the correct file
4. Reduce [FILE PATH] to imports + one render per section
5. Show me every file that was created or changed
```

---

### R-05: Fix Wrong Import Path for mock-data.json

```
[PASTE 00_Session_Opener.md BLOCK]

The import for mock-data.json in [FILE PATH] is incorrect.

mock-data.json is at the project ROOT (same level as package.json — NOT inside src/).

Correct import paths:
  From src/pages/[Page]/[Page].jsx       → import data from '../../../mock-data.json'
  From src/pages/[Page]/sections/[S]/[S].jsx → import data from '../../../../mock-data.json'
  From src/components/[Name]/[Name].jsx  → import data from '../../../mock-data.json'

Count ../ levels: each ../ goes up one folder.
  sections/[S]/[S].jsx → up: [S]/ → sections/ → [Page]/ → pages/ → src/ → root = 5 levels
  Wait — that is 5 levels but the correct path above shows 4. Let me recount:
  src/pages/[Page]/sections/[S]/[S].jsx
  Going up: [S]/ = 1, sections/ = 2, [Page]/ = 3, pages/ = 4 → reach src/ not root
  One more: src/ = 5 → wait, mock-data.json is at root not inside src.
  Correct count: [S]/ → sections/ → [Page]/ → pages/ → src/ → root = 5 levels = ../../../../../
  
  VERIFY: count the folders between your file and the project root.

Fix the import path in [FILE PATH]. Show me only the corrected import line.
```

---

### R-06: Fix Auth Import Path

```
[PASTE 00_Session_Opener.md BLOCK]

The AuthContext import in [FILE PATH] is incorrect.

AuthContext is at: src/context/AuthContext.jsx (flat file, no folder)

Correct import paths:
  From src/components/[Name]/[Name].jsx → import { AuthContext } from '../../context/AuthContext'
  From src/pages/[Page]/[Page].jsx      → import { AuthContext } from '../../context/AuthContext'
  From src/pages/[Page]/sections/[S]/[S].jsx → import { AuthContext } from '../../../../context/AuthContext'

Fix the import in [FILE PATH]. Show me only the corrected import line.
```

---

*Savory Bistro Prompt Library v3.2.0 — March 2024*
