# SAVORY BISTRO — SESSION OPENER
## Paste this entire block at the start of every Antigravity IDE session

> One rule: paste this first, then paste your task. Never skip this step.
> This block costs ~600 tokens. It prevents every known AI mistake on this project.

---

```
PROJECT: Savory Bistro restaurant website
REPO: AhmedTyson/savory-bistro
VERSION: 3.2.0 - Hagar's Contributions Integrated
STACK: React + Vite | Tailwind (layout only) + Custom CSS (brand) | React Router DOM v6 | Lucide Icons | Axios
AUTH: AuthContext at src/context/AuthContext.jsx — useContext(AuthContext) gives { user, login, logout }
BUILD: npm run dev → localhost:5173 | npm run build → production
NO INSTALLS: never suggest npm install for any package — everything is pre-installed

──────────────────────────────────────────────
FOLDER RULES — every file must follow this pattern exactly
──────────────────────────────────────────────
COMPONENTS:  src/components/[Name]/[Name].jsx + [Name].css
PAGES:       src/pages/[Name]/[Name].jsx + [Name].css
SECTIONS:    src/pages/[Name]/sections/[Section]/[Section].jsx + [Section].css
SVG ASSETS:  src/components/SvgAssets/[Name].jsx (no CSS file)
CONTEXT:     src/context/AuthContext.jsx (flat file, no folder)
STYLES:      src/styles/variables.css (single source of truth for all tokens)
DATA:        mock-data.json at project ROOT — never inside /src

IMPORTS in App.jsx: use barrel files
  import { Navbar, Footer, FloatingReserveBtn, Button, DishCard, SectionHeader, Toast } from './components'
  import { Home, Menu, Reservations, Gallery, Contact, AboutUs, Login, Signup } from './pages'
  import { AuthContext } from './context'

IMPORTS inside components/pages: use direct paths — never import from barrel inside a component
  import Button from '../../components/Button/Button'
  import mockData from '../../../mock-data.json'  ← from a page file
  import mockData from '../../../../mock-data.json' ← from a section file

──────────────────────────────────────────────
CSS RULES — BEM naming, no exceptions
──────────────────────────────────────────────
Every CSS class: ComponentName__element or ComponentName__element--modifier
  CORRECT: .Navbar__link  .Navbar__link--active  .DishCard__badge--featured
  WRONG:   .link  .active  .badge  .nav-link

Tailwind → REQUIRED for layout-only (containers, spacing, flex, grid, z-index, responsive md: lg: xl:)
CSS file → REQUIRED for brand values (colors var(--), fonts, borders, transitions, hover states)
NEVER: remove Tailwind imports or dependencies — they handle the foundational layout architecture.

──────────────────────────────────────────────
COLORS — always var(--color-NAME), never hardcode
──────────────────────────────────────────────
primary=#E07B39        primary-hover=#C96B2A    chef-badge=#C8973A
gold-accent=#C9A84C    green-sustain=#5A8A5A

bg-page=#F5F0EB        bg-white=#FFFFFF          bg-hero=#111111
bg-chef-special=#2B3A42  bg-testimonial=#1A1A1A  bg-footer=#1C1C1C
bg-tasting=#1A1200     bg-sustain=#F0EFEA        bg-map=#B8D4C8
bg-contact-hero=#3D2B1A

text-heading=#1A1A1A   text-body=#555555         text-muted=#888888
text-white=#FFFFFF     text-placeholder=#AAAAAA
text-nav-default=#2D2D2D  text-nav-active=#E07B39
text-price=#E07B39     text-gold-price=#C9A84C   text-hero-script=#E8C99A

border-card=#E8E2D9    border-input=#D5CFC8      border-error=#E53935
border-gold=#C9A84C    border-quote=#E07B39

diet-vegetarian=#4CAF50  diet-seafood=#2196F3    diet-spicy=#F44336

──────────────────────────────────────────────
CRITICAL COLOR WARNINGS — most common AI mistakes
──────────────────────────────────────────────
Chef's Special bg  → var(--color-bg-chef-special)=#2B3A42  NOT #000 or #1A1A1A
Chef's Special badge → var(--color-chef-badge)=#C8973A     NOT var(--color-primary)
Tasting menu bg    → var(--color-bg-tasting)=#1A1200        NOT #1A1A1A
Tasting menu price → var(--color-text-gold-price)=#C9A84C   NOT orange
Hero subtitle      → var(--color-text-hero-script)=#E8C99A  NOT white #FFFFFF
Hero subtitle font → var(--font-script) Dancing Script       NOT var(--font-serif)
Sustain heading    → var(--color-green-sustain)=#5A8A5A      NOT primary orange

──────────────────────────────────────────────
TYPOGRAPHY
──────────────────────────────────────────────
--font-serif:  'Playfair Display', Georgia, serif    → headings, brand name, quotes
--font-sans:   'Inter', 'Segoe UI', sans-serif       → body, nav, buttons, UI
--font-script: 'Dancing Script', cursive             → Hero subtitle ONLY

──────────────────────────────────────────────
ROUTING RULES
──────────────────────────────────────────────
Internal nav links → <NavLink to="..."> or <Link to="..."> — NEVER <a href="...">
  NavLink → for nav items (gets active class automatically)
  Link    → for other internal links (no active class)
  <a>     → external links ONLY (https://) with target="_blank" rel="noopener noreferrer"

Auth-aware navigation → useNavigate() + useContext(AuthContext)
  FloatingReserveBtn: if user → navigate('/reservations') else → navigate('/login', { state: { from: '/reservations' } })
  LoginForm after login: const from = location.state?.from || '/'; navigate(from, { replace: true })

Protected routes → ProtectedRoute component in App.jsx wraps /reservations
  if no user → <Navigate to="/login" replace />

──────────────────────────────────────────────
ROUTING MAP
──────────────────────────────────────────────
/              → Home       (Layout, footer=full)
/menu          → Menu       (Layout, footer=full)
/reservations  → Reservations (Layout, footer=full) ← PROTECTED — requires login
/gallery       → Gallery    (Layout, footer=light)
/contact       → Contact    (Layout, footer=full)
/about         → AboutUs    (Layout, footer=full)
/login         → Login      (NO Layout — standalone page, polished glass UI)
/signup        → Signup     (NO Layout — standalone page, polished glass UI)

──────────────────────────────────────────────
AUTH SYSTEM
──────────────────────────────────────────────
AuthContext: src/context/AuthContext.jsx
  Provides: { user, login, logout }
  Wraps App in main.jsx via <AuthProvider>

Navbar states:
  Guest  → shows Login + Sign Up NavLinks | NO Book Table button ever
  Logged in → shows UserCircle avatar icon only

FloatingReserveBtn → always visible to ALL users (guest + logged in)
  Guest click → /login with state { from: '/reservations' }
  Logged in click → /reservations directly

──────────────────────────────────────────────
NAVBAR AUTH BEM CLASSES
──────────────────────────────────────────────
.Navbar__auth-guest   → Login + Signup links container (guest state)
.Navbar__auth-user    → Avatar icon container (logged in state)
.Navbar__avatar-btn   → clickable avatar button
.Navbar__auth-link    → Login / Signup individual links

──────────────────────────────────────────────
SECTION SPLITTING RULE
──────────────────────────────────────────────
Any page file over 120 lines → split into sections/
Each section: its own [Name].jsx + [Name].css in sections/[Name]/
Parent page file → thin assembler only, max 35 lines, imports + renders sections

──────────────────────────────────────────────
FORMS
──────────────────────────────────────────────
All forms require full validation — no exceptions
One useState per field + one useState per error field
Show errors below each invalid field using var(--color-border-error)
Never submit if any validation fails

──────────────────────────────────────────────
BREAKPOINTS
──────────────────────────────────────────────
375px = base (mobile)
768px = md:
1024px = lg:
1280px = xl:
Min touch target: 44px height + width on all interactive elements
Z-INDEX: Navbar: var(--z-navbar)=100 | Floating: var(--z-floating)=999

──────────────────────────────────────────────
ICONS
──────────────────────────────────────────────
lucide-react only — import { IconName } from 'lucide-react'
Usage: <IconName size={24} /> — use size prop, never width/height attributes
Never install other icon libraries

──────────────────────────────────────────────
WHAT THE AI MUST NEVER DO
──────────────────────────────────────────────
- Add new npm packages
- Use <a> tags for internal navigation
- Hardcode any hex color value
- Use TypeScript or .ts/.tsx extensions
- Add pages, features, or components not requested
- Change any file not explicitly mentioned in the task
- Use document.querySelector or direct DOM manipulation
- Make design decisions — if something is not specified, ask
- Use CSS class names without BEM prefix
- Import from barrel files inside a component (circular imports)
```

---

## HOW TO USE THIS FILE

Paste the entire code block above (everything between the triple backticks) at the top of every Antigravity IDE session before your task prompt.

Then immediately paste your task below it.

Example session structure:
```
[PASTE THE BLOCK ABOVE]

TASK: Build the FilterTabs section inside src/pages/Menu/sections/FilterTabs/FilterTabs.jsx.
[paste the relevant section from 01_PRD_Antigravity_Edition.md]
```

That is the complete prompt. Nothing else needed.
