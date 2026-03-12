# SAVORY BISTRO — PROMPT LIBRARY
## Complete Prompt Templates for Every Phase, Every Scenario

> **Instructions:** Every prompt in this library includes the mandatory context header inline.
> Copy the entire box. Replace only the `[BRACKETED]` placeholders.
> Never remove the context header — it's what prevents AI from making design decisions.

---

## CHAPTER 1 — PHASE 0: PROJECT SETUP PROMPTS

### P0-A: Initialize Project Structure

```
PROJECT: Savory Bistro restaurant website
STACK: React + vrtw (pre-installs React, Tailwind, React Router DOM, Lucide Icons, Axios)
FOLDER: src/components/[Name]/[Name].jsx+css | src/pages/[Name]/[Name].jsx+css
TOKENS: All colors in src/styles/variables.css — NEVER hardcode hex
ICONS: lucide-react only | ROUTING: NavLink/Link only — never <a> tags

After running `npm create vrtw` and naming the project "savory-bistro", do the following:

1. CREATE folder structure exactly as below — do not add or remove any paths:
src/
  components/
    Navbar/       → Navbar.jsx  Navbar.css
    Footer/       → Footer.jsx  Footer.css
    Button/       → Button.jsx  Button.css
    DishCard/     → DishCard.jsx  DishCard.css
    SectionHeader/→ SectionHeader.jsx  SectionHeader.css
    FloatingReserveBtn/ → FloatingReserveBtn.jsx  FloatingReserveBtn.css
  pages/
    Home/         → Home.jsx  Home.css
    Menu/         → Menu.jsx  Menu.css
    Reservations/ → Reservations.jsx  Reservations.css
    Gallery/      → Gallery.jsx  Gallery.css
    Contact/      → Contact.jsx  Contact.css
    AboutUs/      → AboutUs.jsx  AboutUs.css
  styles/
    variables.css → paste the full CSS token file (provided separately)
  App.jsx
  index.css       → replace App.css — add @tailwind directives + Google Fonts import
  main.jsx        → no changes needed

ROOT level (outside src/):
  mock-data.json  → create empty structure with keys: menu, tastingMenu, wines, cocktails, signatureDishes, gallery, team, faqs

2. App.jsx: set up BrowserRouter with all 6 routes:
  / → Home | /menu → Menu | /reservations → Reservations
  /gallery → Gallery | /contact → Contact | /about → AboutUs
  All routes wrapped in a Layout component containing Navbar + FloatingReserveBtn + Footer
  Gallery route passes footerVariant="light" to Layout

3. index.css: 
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap');
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

4. Each .jsx file: just export a default function returning <div className="[page-name]-page">Page placeholder</div>
5. Each .css file: just a comment /* [ComponentName] styles */
6. variables.css: paste the full design tokens (separate document)

DO NOT install any additional npm packages.
DO NOT add any styling yet — only structure.
```

---

### P0-B: Populate mock-data.json

```
PROJECT: Savory Bistro restaurant website
STACK: React + vrtw | DATA: mock-data.json at project root

Create realistic mock data for mock-data.json at the project root (NOT inside src/).
Generate content appropriate for a fine-dining Mediterranean/Italian restaurant called Savory Bistro.

STRUCTURE (follow exactly):
{
  "menu": [
    { "id": 1, "name": "", "description": "", "price": 0, "category": "mainCourses|seafood|vegetarian|appetizers|desserts|drinks", "badge": "POPULAR|null", "dietIcon": "vegetarian|seafood|spicy|null" }
    // Generate 18-24 items across all categories
  ],
  "tastingMenu": [
    { "course": "I", "label": "AMUSE-BOUCHE", "dish": "" },
    { "course": "II", "label": "APPETIZER", "dish": "" },
    { "course": "III", "label": "PALATE CLEANSER", "dish": "" },
    { "course": "IV", "label": "MAIN COURSE", "dish": "" },
    { "course": "V", "label": "DESSERT", "dish": "" }
  ],
  "wines": [
    { "id": 1, "name": "", "origin": "", "price": 0 }
    // 6 wines
  ],
  "cocktails": [
    { "id": 1, "name": "", "description": "", "price": 0 }
    // 6 cocktails
  ],
  "signatureDishes": [
    { "id": 1, "name": "", "description": "", "price": 0, "badge": "POPULAR|null" }
    // 4-6 dishes for Home page hero carousel
  ],
  "gallery": [
    { "id": 1, "src": "/images/gallery/[name].webp", "alt": "", "category": "food|interior|events|chefsCreations", "type": "photo|video", "size": "tall|medium" }
    // 12 items — mix of categories and sizes, one with type:video
  ],
  "team": [
    { "id": 1, "name": "Maria Garcia",  "role": "General Manager",  "bio": "" },
    { "id": 2, "name": "Julian Smith",  "role": "Head Sommelier",   "bio": "" },
    { "id": 3, "name": "Sarah Chen",    "role": "Pastry Chef",      "bio": "" },
    { "id": 4, "name": "Marcus Thorne", "role": "Sous Chef",        "bio": "" }
  ],
  "faqs": [
    { "id": 1, "question": "Do you accommodate dietary restrictions?", "answer": "" },
    { "id": 2, "question": "Is there parking available?", "answer": "" },
    { "id": 3, "question": "Do you accept walk-ins?", "answer": "" },
    { "id": 4, "question": "Can I bring my own wine?", "answer": "" },
    { "id": 5, "question": "Do you offer gift certificates?", "answer": "" }
  ]
}

Output valid JSON only. No comments. No trailing commas. Keep image paths as /images/[category]/[name].webp.
```

---

## CHAPTER 2 — PHASE 1: SHARED COMPONENT PROMPTS

### P1-A: Build All Shared Components in One Session

```
PROJECT: Savory Bistro restaurant website
STACK: React + vrtw | Tailwind (layout) + Custom CSS (brand) | React Router DOM | Lucide Icons | No extra installs
TOKENS: All colors → var(--color-*) in src/styles/variables.css — NEVER hardcode hex
ICONS: lucide-react | ROUTING: NavLink/Link only — never <a> tags
TOUCH: min 44px on all interactive elements

Build these 6 components one at a time. For each: create the .jsx AND the .css file.

[COMPONENT ORDER — build in this order, as later ones depend on earlier ones]:

1. Button (no dependencies)
   File: src/components/Button/Button.jsx + Button.css
   Props: children, variant='primary'|'outlined'|'outlined-dark', onClick, type='button', disabled, fullWidth
   primary: bg=var(--color-primary), color=white, hover=var(--color-primary-hover)
   outlined: transparent, border+color=var(--color-primary), hover=fill orange
   outlined-dark: transparent, border+color=white, hover=fill white text dark
   All: border-radius=var(--radius-md), min-height=44px, transition=var(--transition-normal)

2. SectionHeader (no dependencies)
   File: src/components/SectionHeader/SectionHeader.jsx + SectionHeader.css
   Props: label (optional), title, subtitle (optional), align='left'|'center'
   label: var(--color-primary), 12px, uppercase, letter-spacing:0.1em
   title: var(--font-serif), var(--color-text-heading), 28px→32px→36px
   subtitle: var(--font-sans), var(--color-text-body), 16px, max-width:560px

3. DishCard (depends on: none — standalone)
   File: src/components/DishCard/DishCard.jsx + DishCard.css
   Props: image, name, description, price, badge (optional), dietIcon (optional)
   Card: bg=var(--color-bg-white), border=var(--color-border-card), radius=var(--radius-lg)
   Price: color=var(--color-text-price), bold 18px
   Badge: bg=var(--color-primary), text white, radius=var(--radius-pill), absolute top-left
   Diet dot: 8px circle — vegetarian=#4CAF50, seafood=#2196F3, spicy=#F44336
   Use CSS variables, NOT hardcoded hex for the diet dots — use var(--color-diet-vegetarian) etc.

4. FloatingReserveBtn (depends on: react-router-dom NavLink)
   File: src/components/FloatingReserveBtn/FloatingReserveBtn.jsx + FloatingReserveBtn.css
   Fixed bottom-right, z-index=var(--z-floating)=999, radius=var(--radius-pill)
   bg=var(--color-primary), hover=var(--color-primary-hover), text white
   Icon: CalendarDays from lucide-react, text="Reserve Now"
   Mobile: bottom:24px right:16px | Desktop 1024px+: bottom:32px right:32px
   Link: <NavLink to="/reservations"> — never <a>

5. Navbar (depends on: Button, react-router-dom NavLink+useLocation)
   File: src/components/Navbar/Navbar.jsx + Navbar.css
   No props — uses useLocation() for active detection
   bg=var(--color-bg-white), sticky top, z-index=var(--z-navbar)=50
   Logo: UtensilsCrossed icon + "Savory Bistro" in var(--font-serif)
   Links: Home|Menu|Reservations|Gallery|Contact|About Us
     Default: var(--color-text-nav-default), Active: var(--color-text-nav-active) + underline
     Use useLocation().pathname to compare to each route path
   CTA: <Button variant="primary"> "Book Table" → /reservations
   Mobile: useState(menuOpen), hamburger Menu/X icon, dropdown with all 6 links
   Tailwind: hidden md:flex for desktop links, flex md:hidden for hamburger

6. Footer (depends on: react-router-dom Link)
   File: src/components/Footer/Footer.jsx + Footer.css
   Props: variant='full'|'light' (default:'full')
   Both: bg=var(--color-bg-footer)=#1C1C1C, text=var(--color-text-white)
   full: 4 cols — Brand | Quick Links | Contact Us | Newsletter
   light: 3 cols — Brand | Visit Us | Newsletter
   Newsletter: useState(email), ArrowRight icon button in var(--color-primary)
   Responsive: 1col mobile → 2col 768px → 3-4col 1024px
   Icons: UtensilsCrossed, ArrowRight from lucide-react
```

---

## CHAPTER 3 — PHASE 2–4: PAGE-LEVEL PROMPTS

### P2-A: Home Page — Full Build

```
PROJECT: Savory Bistro | ROUTE: / | ACTIVE NAV: Home | FOOTER: full
STACK: React + vrtw | Tailwind (layout) + CSS (brand) | TOKENS: var(--color-*) only
IMPORTS AVAILABLE: Button, SectionHeader, DishCard from components/
DATA: signatureDishes from mock-data.json (root) | ICONS: lucide-react
NO <a> tags for internal links

Build src/pages/Home/Home.jsx and Home.css with these sections in order:

══ SECTION 1: HERO ══
min-height:100vh, position:relative, overflow:hidden
Background: var(--color-bg-hero) + rgba(17,17,17,0.65) overlay + /images/hero-food.webp
Content centered (vertical + horizontal), max-width:var(--container-max)
  Headline "Savory Bistro": var(--font-serif), white, 48px→64px, bold
  Subtitle "Authentic Flavors, Unforgettable Moments":
    var(--font-script) ← Dancing Script
    var(--color-text-hero-script) = #E8C99A ← warm cream NOT white
    20px→26px, italic
  CTAs (flex row, gap:16px, wrap mobile):
    <Button variant="primary">View Menu</Button> → Link /menu
    <Button variant="outlined-dark">Reserve a Table</Button> → Link /reservations
Scroll arrow: ChevronDown icon, absolute bottom:32px centered, white opacity:0.6, bob animation

══ SECTION 2: INFO STRIP ══
Background: var(--color-bg-white), padding:var(--space-xl) var(--space-md)
3-column flex (stack mobile → row 768px+)
  Clock icon + "HOURS" label + "Mon–Thu 12–10pm, Fri–Sat 12–11pm, Sun 12–9pm"
  MapPin icon + "ADDRESS" + "45 Gastro Lane, New York, NY 10001"
  Phone icon + "PHONE" + "(212) 555-0192"
  Labels: var(--color-text-muted), icons: var(--color-primary)

══ SECTION 3: OUR STORY ══
<SectionHeader label="OUR STORY" title="From Humble Beginnings to Culinary Excellence" />
2-column layout 1024px+: text left, chef photo right (stack mobile)
Body text: var(--color-text-body), 16px, 2 paragraphs
<Button variant="outlined"> "Meet the Chef" → /about

══ SECTION 4: SIGNATURE DISHES ══
<SectionHeader label="SIGNATURE DISHES" title="Hand-crafted culinary masterpieces" />
Horizontal scroll row of <DishCard> components
  useState(scrollIndex), ChevronLeft/ChevronRight nav arrows
  Arrow buttons: circular 44px, bg:var(--color-bg-white), border:var(--color-border-card)
Data: import { signatureDishes } from '../../../mock-data.json'
Map each to <DishCard image name description price badge />

══ SECTION 5: CHEF'S SPECIAL ══
⚠️ CRITICAL: bg=var(--color-bg-chef-special)=#2B3A42 (NOT black, NOT #1A1A1A)
⚠️ CRITICAL: badge color=var(--color-chef-badge)=#C8973A (NOT primary orange #E07B39)
Centered content, padding:var(--space-section)
Badge "CHEF'S SPECIAL": var(--color-chef-badge), radius:var(--radius-pill), uppercase 11px
Dish name: var(--font-serif), white, 36px→48px
Description: var(--color-text-muted), 16px
Price: var(--color-primary), 24px bold
<Button variant="primary"> "Order Now"

══ SECTION 6: TESTIMONIALS ══
bg=var(--color-bg-testimonial)=#1A1A1A, padding:var(--space-section)
Quote mark: color:var(--color-gold-accent)=#C9A84C, 80px
Quote text: var(--font-serif) italic, white, 20px→24px
Reviewer: circular avatar + name white + "FOOD CRITIC" in var(--color-primary)
Dot pagination: useState(activeQuote), active=var(--color-primary) dot

══ RESPONSIVE ══
Mobile first. Container: max-width:var(--container-max), padding:0 var(--space-md), margin:0 auto
Section padding: var(--space-section) top and bottom on each section
All images: object-fit:cover, no overflow
```

---

### P3-A: Reservations Page — Full Build

```
PROJECT: Savory Bistro | ROUTE: /reservations | ACTIVE NAV: Reservations
STACK: React + vrtw | TOKENS: var(--color-*) | ICONS: lucide-react
IMPORTS: Button, SectionHeader from components/

Build src/pages/Reservations/Reservations.jsx and Reservations.css.

══ BREADCRUMB ══
Home > Reservations — Link to / for "Home", current "Reservations" in var(--color-primary)

══ PAGE HEADER ══
<SectionHeader title="Book Your Table" subtitle="We can't wait to host you at Savory Bistro." align="center" />

══ MAIN LAYOUT ══
2 columns 1024px+ (stack mobile): form 60% left, sidebar 40% right

══ FORM (left) — ALL with validation ══
STATE:
  const [partySize, setPartySize] = useState('2')
  const [selectedDate, setSelectedDate] = useState(null)  
  const [dateError, setDateError] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [timeError, setTimeError] = useState('')
  const [name, setName] = useState('') 
  const [nameError, setNameError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

FORM FIELDS:
  Party Size: <select> options 1–10 people, styled to match inputs
  Occasion: <select> optional — Birthday, Anniversary, Business, Date Night, Other
  
  Date Picker: 
    Display current month/year, prev/next month arrows (ChevronLeft/ChevronRight)
    Grid of day numbers, week headers (Su Mo Tu We Th Fr Sa)
    Selected day: circular bg:var(--color-primary), text:white
    Today: underline or ring in var(--color-primary)
    Past dates: opacity:0.3, cursor:not-allowed
    Unavailable (e.g. Mondays): opacity:0.3, cursor:not-allowed, line-through

  Time Slots pills: ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30']
    Default: border:1px solid var(--color-border-input), color:var(--color-text-body)
    Selected: bg:var(--color-primary), color:white, border:var(--color-primary)
    All: border-radius:var(--radius-pill), min-height:44px, transition:var(--transition-fast)

  Full Name: input type=text, placeholder="John Doe", required
  Phone Number: input type=tel, placeholder="(555) 000-0000", required
  Email Address: input type=email, placeholder="john@example.com", required
  Special Requests: textarea, placeholder="Dietary restrictions, seating preferences...", 4 rows

INPUT STYLES:
  border:1px solid var(--color-border-input), border-radius:var(--radius-md), padding:12px 16px
  focus → border-color:var(--color-primary), outline:none
  error state → border-color:var(--color-border-error)
  Error message: color:var(--color-border-error), font-size:12px, margin-top:4px, display:block

VALIDATION (runs on submit button click):
  name: trim().length < 2 → "Full name is required"
  phone: !/^[\d\s\-\+\(\)]{7,}$/.test(phone) → "Please enter a valid phone number"  
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) → "Please enter a valid email"
  selectedDate: !selectedDate → setDateError("Please select a date")
  selectedTime: !selectedTime → setTimeError("Please select a time slot")
  If ANY error: set all errors, DO NOT proceed

SUBMIT: <Button variant="primary" type="submit" fullWidth> "Confirm Reservation"

══ SIDEBAR (right) ══
Four cards (bg:var(--color-bg-white), border:var(--color-border-card), radius:var(--radius-lg), padding:var(--space-lg)):

Card 1 — Today's Hours:
  Clock icon (var(--color-primary)) + "Today's Hours" heading
  Lunch: 12:00 PM – 3:00 PM
  Dinner: 5:00 PM – 10:00 PM
  "Kitchen closes 30 minutes before closing" in var(--color-text-muted)

Card 2 — Contact Us:
  Phone icon + "(212) 555-0192"
  Mail icon + "hello@savorybistro.com"
  "For large parties (8+) contact us directly" in var(--color-primary)

Card 3 — Private Dining:
  Small restaurant image (aspect 16:9, object-fit:cover, radius:var(--radius-md))
  "Private Dining" heading, short description
  <Button variant="outlined"> "Inquire Now"

Card 4 — Location:
  Map area: bg:var(--color-bg-map)=#B8D4C8, height:140px, radius:var(--radius-md)
    MapPin icon centered in var(--color-primary)
  "45 Gastro Lane, New York, NY 10001"
  <a href="https://maps.google.com" target="_blank"> "Get Directions →" in var(--color-primary)
```

---

## CHAPTER 4 — PHASE 5: QA & RECOVERY PROMPTS

### P5-A: Full Responsive Audit & Fix

```
PROJECT: Savory Bistro | STACK: React + vrtw | TOKENS: var(--color-*) only

I need you to audit and fix all responsive issues across the project.

BREAKPOINTS TO TEST:
  375px → base (no Tailwind prefix)
  768px → md: prefix
  1024px → lg: prefix  
  1280px → xl: prefix

FOR EACH FILE LISTED, identify and fix:

FILE: [src/pages/[PageName]/[PageName].jsx and [PageName].css]

CHECK 1 — No horizontal scroll:
  Does any element have a fixed width wider than the viewport?
  Does any element overflow its container?
  Fix: add max-width:100%, overflow-x:hidden where needed

CHECK 2 — Navbar mobile:
  Is the hamburger menu visible below 768px? (flex md:hidden)
  Are the nav links hidden below 768px? (hidden md:flex)
  Does the dropdown close on link click?
  Fix if broken.

CHECK 3 — Grid layouts:
  Are all CSS grids using mobile-first? (1 col base, then md:2 cols, lg:3 cols)
  Is grid-template-columns using minmax(0, 1fr) to prevent overflow?
  Fix any grid that breaks at small screens.

CHECK 4 — Form on mobile:
  Does the Reservations form sidebar stack below the form on mobile?
  Are time slot pills wrapping correctly?
  Is the calendar date picker fitting inside the viewport?

CHECK 5 — Touch targets:
  All buttons, links, and clickable elements: min-height AND min-width: 44px?
  Fix any that are smaller.

CHECK 6 — Typography:
  Are font-sizes readable at 375px? (no text smaller than 14px)
  Are headings not too large on mobile? (max 36px on mobile)

CHECK 7 — Images:
  All images using object-fit:cover?
  No images wider than their containers?
  Are alt attributes present on all img tags?

OUTPUT: List each issue found as "FILE: issue" then provide the fix using str_replace format.
DO NOT change any colors, component APIs, or folder structure.
DO NOT add new npm packages.
```

---

### P5-B: Design Consistency Audit

```
PROJECT: Savory Bistro | TOKENS: var(--color-*) in src/styles/variables.css

Audit all JSX and CSS files for design consistency violations.

SCAN FOR:
1. Hardcoded hex colors — any color value that is NOT using var(--color-*)
   REPORT: file name, line, the hardcoded value, and what var() it should be
   
2. Wrong color for these specific elements:
   - Chef's Special section background — must be var(--color-bg-chef-special)=#2B3A42 (not #000, not #1A1A1A)
   - Chef's Special badge — must be var(--color-chef-badge)=#C8973A (not var(--color-primary))
   - Tasting menu price — must be var(--color-text-gold-price)=#C9A84C (not var(--color-primary))
   - Hero subtitle text — must be var(--color-text-hero-script)=#E8C99A (not white, not #fff)
   - Sustainability heading — must be var(--color-green-sustain)=#5A8A5A (not var(--color-primary))
   - Tasting menu section bg — must be var(--color-bg-tasting)=#1A1200 (not var(--color-bg-testimonial))

3. Incorrect font usage:
   - Hero subtitle (only one place): must use var(--font-script) = Dancing Script
   - All other headings: must use var(--font-serif) = Playfair Display
   - Body text and UI elements: must use var(--font-sans) = Inter

4. Internal <a> tag links:
   - Any <a href="/..."> that navigates internally must be changed to <NavLink> or <Link>

5. Components missing their paired CSS file:
   - Every .jsx in components/ must have a matching .css file imported

6. Missing min-height:44px on interactive elements

REPORT: 
  ✓ Pass / ✗ Fail for each check
  For failures: exact file, exact element, exact fix
  Apply all fixes using str_replace — do not ask for permission
```

---

### P5-C: Form Validation Completeness Check

```
PROJECT: Savory Bistro | STACK: React

Check and fix form validation across all pages.

FORMS TO CHECK:
1. Reservations form (src/pages/Reservations/Reservations.jsx)
2. Contact form (src/pages/Contact/Contact.jsx)
3. Newsletter in Footer (src/components/Footer/Footer.jsx)

FOR EACH FORM, verify ALL of the following:
□ Each required field has a corresponding error state: const [fieldError, setFieldError] = useState('')
□ handleSubmit function runs all validations BEFORE proceeding
□ Form does NOT submit (no API call, no success state) when validation fails
□ Each error message appears BELOW the invalid field
□ Error message color is var(--color-border-error) = #E53935
□ Input border changes to var(--color-border-error) when field has error
□ Error clears when user starts typing (onChange clears the error state)
□ Email fields use regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
□ Phone field uses regex: /^[\d\s\-\+\(\)]{7,}$/
□ Required text fields check: value.trim().length >= 2

SPECIFIC REQUIREMENTS:
Reservations: partySize + selectedDate + selectedTime + name + phone + email all required
Contact: name + email + subject + message all required
Newsletter: email required + valid format

If any check fails, fix it immediately with str_replace.
Show me a summary of what was fixed.
```

---

## CHAPTER 5 — MISTAKE RECOVERY PROMPTS

### R-01: Fix — Wrong Colors Applied

```
PROJECT: Savory Bistro | TOKENS: var(--color-*) in src/styles/variables.css

I found wrong colors in [FILE PATH]. Fix them:

PROBLEM: [describe what color is wrong and where]

CORRECT MAPPING:
- Chef's Special section background → MUST be var(--color-bg-chef-special) = #2B3A42
- Chef's Special badge              → MUST be var(--color-chef-badge) = #C8973A
- Tasting menu background           → MUST be var(--color-bg-tasting) = #1A1200
- Tasting menu price color          → MUST be var(--color-text-gold-price) = #C9A84C
- Hero subtitle color               → MUST be var(--color-text-hero-script) = #E8C99A
- Sustainability heading             → MUST be var(--color-green-sustain) = #5A8A5A
- Map thumbnail background          → MUST be var(--color-bg-map) = #B8D4C8
- Any button hover                  → MUST be var(--color-primary-hover) = #C96B2A
- Any price on a dish card          → MUST be var(--color-text-price) = #E07B39

Apply fix using str_replace on the affected file only.
DO NOT change anything else in the file.
DO NOT add new variables — only use what already exists in variables.css.
```

---

### R-02: Fix — <a> Tags Used for Internal Links

```
PROJECT: Savory Bistro | ROUTING: React Router DOM (pre-installed by vrtw)

Replace all internal <a> tags with proper React Router components.

RULE:
  Internal link (goes to /, /menu, /reservations, /gallery, /contact, /about):
    → Use <NavLink to="..."> (for navigation items — gets active class)
    → Use <Link to="..."> (for other internal links — no active class)
    
  External link (goes to https:// URL):
    → Keep as <a href="..." target="_blank" rel="noopener noreferrer">

In the file [FILE PATH], find all <a href="/..."> and replace:
  1. Add import { NavLink, Link } from 'react-router-dom' at the top (if not already imported)
  2. Replace each internal <a> with the correct component
  3. Keep all className, style, and children exactly as they were

DO NOT change external links. DO NOT change anything else.
```

---

### R-03: Fix — Component Folder Structure Wrong

```
PROJECT: Savory Bistro
CORRECT FOLDER STRUCTURE:
  src/components/Navbar/Navbar.jsx + Navbar.css
  src/components/Footer/Footer.jsx + Footer.css
  [etc — each component in its OWN folder]

Problem: [describe what's wrong — e.g. "Footer.jsx is in src/components/ directly, not src/components/Footer/"]

Fix:
1. Move the file to its correct location
2. Update any import statements in other files that reference the old path
3. Verify App.jsx, index.css, and all page files import from the correct new path

Show me every import statement that needs updating.
```

---

### R-04: Fix — Tailwind and Custom CSS Conflict

```
PROJECT: Savory Bistro
STYLING RULE: 
  Tailwind → layout, spacing, flex, grid, responsive prefixes (md:, lg:)
  Custom CSS → colors (always var(--)), fonts, border-radius, transitions, states

Problem: In [FILE PATH], there is a conflict between Tailwind classes and CSS:
[DESCRIBE THE CONFLICT]

RESOLUTION APPROACH:
1. If it's a LAYOUT issue (display, flex, grid, padding, margin, width) → use Tailwind class, remove CSS rule
2. If it's a BRAND VALUE (color, font-family, border-radius, transition) → use CSS var(), remove Tailwind class
3. If Tailwind class is overriding a CSS variable → add the CSS rule with higher specificity or use inline style

NEVER use:
  text-[#E07B39] in Tailwind (hardcoded hex in Tailwind)
  bg-[#1C1C1C] in Tailwind (use Tailwind only for layout, not brand colors)
  !important to fix specificity wars (it's a red flag — restructure instead)

Fix the specific conflict in [FILE PATH]. Show only the changed lines.
```

---

### R-05: Fix — useState Not Used for Interactive State

```
PROJECT: Savory Bistro | STACK: React (hooks required)

Problem: In [FILE PATH], [DESCRIBE: e.g. "the FAQ accordion is using document.querySelector to toggle content"] instead of React useState.

REACT RULES FOR THIS PROJECT:
  Filter tabs (Menu, Gallery) → useState(activeCategory/activeFilter)
  Accordion open/close (Contact FAQ) → useState(openIndex)
  Form fields → useState(fieldValue) + useState(fieldError) for each field
  Hamburger menu (Navbar) → useState(menuOpen)
  Testimonial/Gallery carousel → useState(activeIndex)
  Date picker → useState(selectedDate)
  Time slots → useState(selectedTime)
  Newsletter input → useState(email)

Fix [FILE PATH] to replace DOM manipulation with proper useState.
DO NOT use useRef for toggling visibility.
DO NOT use document.querySelector or document.getElementById.
All interactive state must live in React useState.
```

---

### R-06: Fix — Missing Variables.css Import

```
PROJECT: Savory Bistro
PROBLEM: CSS variables (var(--color-*)) are not working in [FILE PATH] — they show as unset/transparent.

CAUSE: variables.css is not imported in the component chain.

FIX:
1. Check src/index.css — it must have: @import './styles/variables.css';
2. Check src/App.jsx — it must have: import './styles/variables.css';
   (Both are needed — index.css for Tailwind, App.jsx for runtime)
3. Individual component .css files should NOT import variables.css directly (it causes duplication)
   They work because index.css/App.jsx loads it globally.

If the issue is in [FILE]: check if the component is rendered inside the App component tree.
If it's a standalone test, add: import '../../styles/variables.css'; to the component's CSS file temporarily.
```

---

### R-07: Fix — lucide-react Icon Not Found

```
PROJECT: Savory Bistro | ICONS: lucide-react (pre-installed by vrtw)

Problem: Icon [ICON NAME] is throwing "not found" or rendering nothing.

CHECK:
1. Verify exact icon name at https://lucide.dev/icons/ — names are case-sensitive PascalCase
2. Common correct names:
   ✓ UtensilsCrossed (not Utensils or UtensilCross)
   ✓ CalendarDays (not Calendar)
   ✓ ChevronDown/Up/Left/Right (not Arrow)
   ✓ MapPin (not Map or Location)
   ✓ ArrowRight (not Arrow)
   ✓ Phone, Mail, Clock, Menu, X, Search, ShoppingCart
   ✓ Leaf, Recycle, Sprout, Users (for sustainability section)
   ✓ Play (for video overlay)
   ✓ Star (for ratings)
   ✓ Quote (for large quote marks — alternative to text character)

3. Correct import syntax:
   import { UtensilsCrossed, CalendarDays, Menu, X } from 'lucide-react'
   (one import statement, multiple icons destructured)

4. Usage: <UtensilsCrossed size={24} /> (size prop, not width/height)

Fix the import in [FILE PATH] with the correct icon name.
```

---

### R-08: Fix — mock-data.json Import Path Wrong

```
PROJECT: Savory Bistro | DATA: mock-data.json at project ROOT (outside /src)

Problem: Data import is failing or returning undefined.

CORRECT IMPORT PATHS:
  From a PAGE component:   import data from '../../../mock-data.json'
  From a COMPONENT:        import data from '../../../../mock-data.json'
  
  Count the ../ levels:
    src/pages/Home/Home.jsx → go up: Home/ → pages/ → src/ → root = 3 levels = ../../../
    src/components/Footer/Footer.jsx → go up: Footer/ → components/ → src/ → root = 3 levels = ../../../

DESTRUCTURED IMPORTS:
  import { menu, tastingMenu } from '../../../mock-data.json'
  // OR
  import mockData from '../../../mock-data.json'
  const { menu, tastingMenu } = mockData

VERIFY:
  1. mock-data.json exists at the project root (same level as package.json, vite.config.js)
  2. NOT at src/mock-data.json (wrong)
  3. NOT at src/data/mock-data.json (wrong)
  4. The JSON is valid (no trailing commas, no comments)

Fix the import in [FILE PATH].
```

---

## CHAPTER 6 — GITHUB WORKFLOW PROMPTS

### G-01: First Push (Phase 0 Complete)

```
I've completed Phase 0 setup (folder structure, variables.css, App.jsx routing, placeholder pages).
Help me push this to GitHub.

COMMANDS TO RUN:
git init
git remote add origin https://github.com/AhmedTyson/savory-bistro.git
git add .
git commit -m "chore: initial project setup with vrtw"
git branch -M main
git push -u origin main

Then create develop branch:
git checkout -b develop
git push -u origin develop

RULES:
- I will never push directly to main again after this
- All feature branches push to: feature/[name] → develop → main
```

---

### G-02: Start Feature Branch

```
I'm starting work on [PAGE/COMPONENT NAME].

RUN:
git checkout develop
git pull origin develop
git checkout -b feature/[page-name]

COMMIT MESSAGE FORMAT:
feat([scope]): [description]
Examples:
  feat(navbar): build navbar with hamburger menu
  feat(home): add hero section and info strip
  feat(menu): implement category filter with useState
  fix(button): correct hover state color on outlined-dark variant
  style(dishcard): adjust badge position to top-left
```

---

### G-03: Open Pull Request Checklist

```
I'm ready to merge feature/[PAGE-NAME] → develop.

Before opening the PR, verify this checklist:
□ Colors: no hardcoded hex values — all use var(--color-*)
□ Routing: no <a> tags for internal links — all use NavLink or Link
□ Responsive: tested at 375px, 768px, 1024px, 1280px — no horizontal scroll
□ Touch targets: all interactive elements have min-height:44px min-width:44px
□ Forms: full validation on all required fields, errors display below fields
□ State: all interactive state uses useState — no document.querySelector
□ Imports: mock-data.json imported from correct path (../../../mock-data.json from pages)
□ Components: all shared components imported from src/components/, not copied inline
□ Icons: only lucide-react icons used
□ CSS: component CSS files imported inside the component .jsx files

If all pass: git push origin feature/[page-name]
Then open PR on GitHub: feature/[page-name] → develop (NOT main)
PR title: feat: [Page Name] page implementation
Requires 1 team member review before merge.
```

---

## CHAPTER 7 — CREDIT-EFFICIENT PROMPT PATTERNS

### How to maximize Antigravity IDE credits

**Rule 1: Paste only what's needed**
- The context header (Section 0) = ~500 tokens — always paste it
- One component spec = ~300 tokens — paste only the one you're building
- Full PRD = ~8,000 tokens — never paste the whole thing in one prompt

**Rule 2: Chain prompts for large tasks**
Instead of: "Build the entire Menu page"
Do this:
```
Prompt 1: Build Menu hero + filter tabs (P2-Menu-A)
Prompt 2: Build dish grid section (P2-Menu-B)  
Prompt 3: Build tasting menu section (P2-Menu-C)
Prompt 4: Build wines + cocktails section (P2-Menu-D)
```

**Rule 3: Fix before building**
If the previous prompt output has errors, use a recovery prompt (R-01 through R-08) with `str_replace` format before moving to the next section. Each `str_replace` call costs ~100–200 tokens vs. regenerating an entire component (~2,000 tokens).

**Rule 4: Use str_replace for edits, not full regeneration**
- Tell AI: "Use str_replace to change only the price color in DishCard.css"
- Avoid: "Rewrite DishCard.css" (wastes all tokens on unchanged lines)

**Rule 5: Name files explicitly**
Always say "output goes in src/components/Navbar/Navbar.jsx" — without this the AI might generate the code without the path, requiring a follow-up.

**Rule 6: One concern per prompt**
- ✓ "Fix the FAQ accordion to use useState"
- ✗ "Fix the FAQ accordion, also make the gallery responsive, and update the footer colors"
Mixing concerns = AI fixes one and breaks another = more correction prompts = more credits wasted.

---

*Savory Bistro Prompt Library v1.0 — March 2026*
