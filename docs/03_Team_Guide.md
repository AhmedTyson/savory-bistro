# SAVORY BISTRO — TEAM GUIDE (v2.0)
## Multi-Developer Implementation Strategy & AI Workflow

> **The Zero-Conflict Promise:** This guide establishes a strict operational protocol for 6 developers building 6 pages simultaneously. Follow these rules to ensure zero merge conflicts and total design consistency.

---

## 1. THE ANTIGRAVITY WORKFLOW (Daily Routine)

To keep your code in sync and your AI assistant aligned, follow this loop EVERY day:

### Step 1: Sync with Headquarters
Before writing a single line of code, pull the latest changes from the team.
```bash
git checkout develop
git pull origin develop
git checkout feature/your-page-name
git merge develop
```

### Step 2: Prompting with Precision
Never ask the AI to "Design a page." It will drift from the PRD.
1. Open `docs/01_PRD_Antigravity_Edition.md`.
2. **Copy Section 0 (Mandatory Header)** — this sets the color tokens and libraries.
3. **Copy your specific page section** (e.g., Section 7.1 for Reservations).
4. Paste both into the IDE. 
5. The AI is now bound to our design tokens and structural rules.

### Step 3: The "Post-Paste" Audit
Before saving AI-generated code, check for three common AI mistakes:
- [ ] **Hardcoded Hex?** (Replace `#E07B39` with `var(--color-primary)`)
- [ ] **Extra Installs?** (If it says `npm install ...`, it's wrong. We already have everything.)
- [ ] **Internal Links?** (Verify it used `<NavLink>` or `<Link>` and never `<a href>`)

---

## 2. AIR TRAFFIC CONTROL (Shared File Rules)

To prevent merge conflicts, we use an **Owner/Consumer** model for shared files.

| Shared File | Owner | Developer Access |
|---|---|---|
| `src/styles/variables.css` | Dev A / Lead | **Read-Only.** Ask Dev A to add new tokens. |
| `src/App.jsx` | Project Lead | **Read-Only.** Adding a route? Ask the Lead. |
| `mock-data.json` | Project Lead | **Write-Allowed.** Append your key only. Never edit others. |
| `src/components/*` | Dev A | **Consumer.** Import into your page, never edit the component. |

### How to request a change in a shared file:
1. Don't edit it locally. Your push will fail or create a nightmare conflict.
2. Send a message in Discord/Slack: *"@DevA I need a new variant for Button component. Can you add `variant='ghost-gold'`? Here is the CSS..."*
3. Dev A pushes the change to `develop`.
4. You pull it down (Step 1 above).

---

## 3. GIT HYGIENE & COMMITS

### Branch Naming
- Components/Layout: `feature/layout-shared`
- Pages: `feature/[page-name]` (e.g., `feature/reservations`)
- Bug Fixes: `fix/[issue-name]`

### Commit Conventions
We use **Semantic Commits**. This makes the history readable.
- `feat(reservations): add date picker validation`
- `fix(navbar): center logo on mobile screens`
- `style(menu): update card spacing to match Section 4.4`
- `refactor(footer): move newsletter to sub-component`

---

## 4. COLLABORATION QUICK REFERENCE CARDS

### Card A: The Brand Color Check
*If your UI looks "different" from the team's, check these vars first.*
- **Primary Orange:** `var(--color-primary)`
- **Chef Gold:** `var(--color-chef-badge)` (Special badge only)
- **Tasting Gold:** `var(--color-gold-accent)` (Tasting menu labels)
- **Error Red:** `var(--color-border-error)` (Form errors)

### Card B: The SPA Rule
*Never cause a full page refresh.*
```jsx
// WRONG
<a href="/menu">Menu</a>

// RIGHT
import { NavLink } from 'react-router-dom';
<NavLink to="/menu">Menu</NavLink>
```

### Card C: Touch Target Rule
*We are a mobile-first premium brand.*
- All buttons, links, and inputs **must be 44px minimum** in height and width.
- Use `min-h-[44px]` or verify in CSS.

---

## 5. QA PROTOCOL (The "Is it Done?" Check)

A page is only "Done" when:
1. [ ] **Responsive:** 375px, 768px, 1024px, 1280px all look perfect.
2. [ ] **Tokenized:** ZERO hex codes in the file.
3. [ ] **Validated:** Forms show red errors before submitting empty.
4. [ ] **Synced:** You have merged `develop` into your branch one last time.

---
*Savory Bistro Team Guide • Rev 2.0 • Antigravity Ecosystem*
