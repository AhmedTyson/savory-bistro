# SAVORY BISTRO — TEAM GUIDE
## How Every Developer Uses the PRD System

| Version | 3.1.0 — Polished UI |
| Updated | March 2026 |

> One rule that prevents every known mistake: **paste `00_Session_Opener.md` before every prompt. No exceptions.**

---

## PART 1 — ONBOARDING (All Team Members)

### Day 1 Checklist

**Step 1 — Read these files in order:**
```
00_Session_Opener.md           → paste this before every session (5 min)
01_PRD_Antigravity_Edition.md  → design system + component specs (30 min)
02_Prompt_Library.md           → ready-to-use prompts per section (15 min)
03_Team_Guide.md               → this file (10 min)
04_Changelog.md                → what changed in the refactor (10 min)
```

**Step 2 — Clone and run:**
```bash
git clone https://github.com/AhmedTyson/savory-bistro.git
cd savory-bistro
npm install
npm run dev
```

Open `http://localhost:5173`. All 8 routes must render without crash.

**Step 3 — Verify design tokens are working:**
DevTools → Elements → any element → Computed styles → confirm `--color-primary: #E07B39` is listed.
If not: variables.css import is broken. Check `src/App.jsx` imports `./styles/variables.css`.

**Step 4 — Verify auth is working:**
Navigate to `/reservations` without logging in → must redirect to `/login`.
Navigate to `/login` → page renders with no Navbar or Footer.

**Step 5 — Set up your feature branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/[section-name]
```

**Step 6 — Open Antigravity IDE:**
Open `00_Session_Opener.md`. Copy the entire code block. Paste it first in every session.

---

## PART 2 — CURRENT REPO STATE

The refactor is complete. Here is what exists and what still needs building:

### Fully built and working
- All shared components: Navbar, Footer, Button, DishCard, SectionHeader, FloatingReserveBtn, Toast
- Auth system: AuthContext, ProtectedRoute, Login page, Signup page
- Home page: all 6 sections built
- All page structures: sections/ folders exist for all 8 pages

### Built but sections are placeholders
These pages have their sections/ structure in place but individual sections need content:
- Menu — sections exist, some placeholders
- Reservations — sections exist, some placeholders
- Gallery — sections exist, some placeholders
- Contact — sections exist, some placeholders
- AboutUs — sections exist, some placeholders

**Your job as a developer picking up a section:** open the placeholder file, build the section content following the spec in `01_PRD_Antigravity_Edition.md`. Do not touch any other file.

---

## PART 3 — ROLE ASSIGNMENTS

Work is sequential — whoever is available picks up the next unbuilt section.

**How to claim a section:**
1. Check the project board for unassigned sections
2. Assign it to yourself
3. Create branch: `feature/[page]-[section]` (e.g. `feature/menu-filter-tabs`)
4. Build only that section
5. Open PR when done

**Shared file ownership:**

| File | Owner | Rule |
|---|---|---|
| `src/styles/variables.css` | Project Lead | Never change a token without team agreement |
| `src/App.jsx` | Project Lead | Fully built — do not touch |
| `src/components/index.js` | Project Lead | Add new component exports here only |
| `src/pages/index.js` | Project Lead | Fully built — do not touch |
| `src/context/AuthContext.jsx` | Project Lead | Do not modify without discussion |
| `mock-data.json` | Project Lead | Add your page's data keys, never overwrite others |
| `src/components/*/` | Component owner | Others: use as imports only, never edit |

---

## PART 4 — HOW TO BUILD A SECTION

This is the exact workflow for building any placeholder section.

### Step 1 — Identify the section file
```
src/pages/[PageName]/sections/[SectionName]/[SectionName].jsx
src/pages/[PageName]/sections/[SectionName]/[SectionName].css
```

### Step 2 — Read the spec
Open `01_PRD_Antigravity_Edition.md`. Find the section for your page.
Read the BEM classes, color tokens, and state requirements.

### Step 3 — Build your prompt
```
[PASTE 00_Session_Opener.md BLOCK]

I am building the [SectionName] section.
File: src/pages/[PageName]/sections/[SectionName]/[SectionName].jsx
[paste the relevant spec from 01_PRD_Antigravity_Edition.md]

Rules:
- BEM: all classes prefixed with [SectionName]__
- No hardcoded hex — all var(--color-*)
- No <a> tags for internal links
- Do NOT touch any other file
- Show me the complete .jsx and .css files
```

### Step 4 — Review before accepting
Before pasting Gemini's output into your editor, check:
```
[ ] Every CSS class follows BEM: SectionName__element
[ ] No hardcoded hex anywhere in JSX or CSS
[ ] No <a> tags for internal links
[ ] No new npm installs suggested
[ ] Import paths are correct (count the ../ levels)
[ ] Data imported from correct mock-data.json path
```

### Step 5 — Test in browser
```
[ ] npm run dev → zero terminal errors
[ ] Browser console → zero errors, zero warnings
[ ] Section renders correctly at 1280px
[ ] Responsive: 375px, 768px, 1024px — no broken layouts
```

### Step 6 — Commit
```bash
git add .
git commit -m "feat([page]): build [SectionName] section"
git push origin feature/[page]-[section-name]
```

Open PR: `feature/[page]-[section-name]` → `develop`. Get 1 approval. Merge. Delete branch.

---

## PART 5 — SHARED FILE RULES

### The most common conflict: two developers editing the same file

**Scenario:** Dev A is building Menu FilterTabs. Dev B is building Menu TastingMenu.
Both are on `feature/menu-filter-tabs` and `feature/menu-tasting-menu`.
Neither touches `Menu.jsx` (the assembler) — they only touch their own section files.
This is correct. The assembler already imports all sections.

**If you need a change in a shared component:**
```
[TEAM CHAT MESSAGE]
I need a change in [ComponentName]:
File: src/components/[Name]/[Name].jsx
Problem: [describe exactly what you need]
I have NOT edited the file. Requesting change from component owner.
```

**If you need a new CSS token:**
```
[TEAM CHAT MESSAGE]
I need a new token in variables.css:
Proposed name: --color-[name]
Value: #XXXXXX
Used on: [page/section name]
@ProjectLead approve?
```

---

## PART 6 — GIT WORKFLOW

### Daily start
```bash
git checkout develop
git pull origin develop
git checkout feature/[your-section]
git merge develop
```

### Commit format
```
feat([page]): build [SectionName] section
fix([component]): correct hover state color
style([section]): adjust spacing to match design
refactor([page]): extract inline styles to CSS file
chore(data): add menu items to mock-data.json
```

### PR rules
1. PR: `feature/[name]` → `develop` — never directly to `main`
2. Minimum 1 reviewer approval
3. Zero build errors — `npm run build` must pass
4. Delete feature branch after merge

### Never
- Push directly to `main` or `develop`
- Merge your own PR without a reviewer
- Commit node_modules, .env, or build output
- Use `git push --force` on shared branches

---

## PART 7 — QUICK REFERENCE CARDS

### Card 1 — Import Paths

```
From a PAGE file (src/pages/Menu/Menu.jsx):
  import mockData from '../../../mock-data.json'    ← 3 levels up to root
  import DishCard from '../../components/DishCard/DishCard'

From a SECTION file (src/pages/Menu/sections/FilterTabs/FilterTabs.jsx):
  import mockData from '../../../../mock-data.json'  ← 4 levels up to root
  import DishCard from '../../../../components/DishCard/DishCard'
  import AuthBgCurve from '../../../../components/SvgAssets/AuthBgCurve'

From a COMPONENT file (src/components/Navbar/Navbar.jsx):
  import { AuthContext } from '../../context/AuthContext'
  import Button from '../Button/Button'

In App.jsx ONLY — use barrels:
  import { Navbar, Footer } from './components'
  import { Home, Menu }     from './pages'
  import { AuthContext }    from './context'
```

### Card 2 — Auth Quick Reference

```
Read auth state anywhere:
  import { useContext }  from 'react'
  import { AuthContext } from '../../context/AuthContext'
  const { user } = useContext(AuthContext)

Navigate with auth awareness:
  import { useNavigate } from 'react-router-dom'
  const navigate = useNavigate()
  if (user) navigate('/reservations')
  else navigate('/login', { state: { from: '/reservations' } })

Redirect after login:
  import { useLocation, useNavigate } from 'react-router-dom'
  const location = useLocation()
  const from = location.state?.from || '/'
  navigate(from, { replace: true })
```

### Card 3 — BEM Quick Reference

```
Block:     .Navbar
Element:   .Navbar__link
Modifier:  .Navbar__link--active

Block:     .DishCard
Element:   .DishCard__badge
Modifier:  .DishCard__badge--featured

Block:     .FilterTabs
Element:   .FilterTabs__pill
Modifier:  .FilterTabs__pill--active

NEVER:     .link  .active  .badge  .pill  .container
ALWAYS:    .ComponentName__element  .ComponentName__element--modifier
```

### Card 4 — Routing Quick Reference

```
Internal nav (SPA — no page reload):
  <NavLink to="/menu">    ← for nav items (auto active class)
  <Link to="/menu">       ← for other internal links
  useNavigate()           ← for programmatic navigation

External (opens new tab):
  <a href="https://..." target="_blank" rel="noopener noreferrer">

NEVER for internal:
  <a href="/menu">        ← causes full page reload, breaks SPA
```

### Card 5 — State Quick Reference

```
All interactive state uses useState — never direct DOM:

Navbar mobile:     const [menuOpen, setMenuOpen] = useState(false)
Menu filter:       const [activeCategory, setActiveCategory] = useState('all')
Gallery filter:    const [activeFilter, setActiveFilter] = useState('all')
FAQ accordion:     const [openIndex, setOpenIndex] = useState(null)
Testimonials dot:  const [activeIndex, setActiveIndex] = useState(0)
Form fields:       const [name, setName] = useState('')
Form errors:       const [nameError, setNameError] = useState('')

NEVER:
  document.querySelector() for toggling
  document.getElementById() for form values
  className manipulation directly on DOM nodes
```

---

## PART 8 — QA PROTOCOL

Run before every PR. Every item must pass.

```
[ ] npm run build → zero errors (not just dev, full production build)
[ ] All 8 routes render: / /menu /reservations /gallery /contact /about /login /signup
[ ] /reservations as guest → redirects to /login
[ ] /login and /signup → no Navbar, no Footer, no FloatingReserveBtn
[ ] FloatingReserveBtn → visible on all Layout pages
[ ] Navbar → Login/Signup shown as guest | Avatar shown when logged in
[ ] No Book Table button anywhere in Navbar
[ ] Browser console → zero errors, zero warnings on every page
[ ] Responsive: every page at 375px, 768px, 1024px, 1280px
[ ] No hardcoded hex — search src/ for #E07B39, #1A1A1A, #FFFFFF etc.
[ ] No <a> tags for internal links — search src/ for <a href="/"
[ ] All CSS classes follow BEM
[ ] mock-data.json at root level (not inside src/)
```

---

*Savory Bistro Team Guide v3.0 — March 2026*
