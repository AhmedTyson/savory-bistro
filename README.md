# 🍽️ Savory Bistro — Restaurant Website

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13-CA4245?logo=reactrouter&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**A full-featured, modern restaurant website built with React and Vite.**  
Browse the menu, make reservations, explore the gallery, and manage your account — all in one polished experience.

[Live Demo](https://savory-bistro.netlify.app) · [Report a Bug](https://github.com/AhmedTyson/savory-bistro/issues) · [Request a Feature](https://github.com/AhmedTyson/savory-bistro/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Design System](#-design-system)
- [Authentication](#-authentication)
- [Backend API](#-backend-api)
- [Team](#-team)
- [Contributing](#-contributing)
- [Git Workflow](#-git-workflow)

---

## 🌟 Overview

Savory Bistro is a multi-page restaurant website that delivers a complete digital dining experience. It features a visually rich home page, a fully filterable menu, an authenticated reservation system, a video-enabled gallery, a contact page with FAQ, an about us section, and a personal user dashboard.

The project was built collaboratively by a team of 5 developers using an AI-assisted development workflow with strict design-system constraints and BEM-based CSS architecture.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Hero section, info bar, chef's special, signature dish carousel, testimonials, and our story |
| 🍴 **Menu** | Category filter tabs, dish grid with diet indicators, chef's tasting menu, artisan beverages |
| 📅 **Reservations** | Calendar picker, time slot selector, party size, form validation, private dining inquiry modal |
| 🖼️ **Gallery** | Masonry grid with category filters, video playback modal, reservation CTA overlay |
| 📞 **Contact** | Contact form with custom dropdown, Google Maps embed, animated FAQ accordion |
| 👥 **About Us** | Team story, chef profile, sustainability values, press testimonials |
| 🔐 **Auth Pages** | Glassmorphism login & signup with password strength indicator and rate limiting |
| 👤 **Dashboard** | Profile card, name update, password change, full reservation & inquiry history |
| 🔔 **Toast System** | Animated portal-based notifications for login, signup, logout, reservation, and profile updates |
| 📱 **Fully Responsive** | Mobile-first design from 375px through 1280px+ |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19.2 | UI library |
| [Vite](https://vitejs.dev) | 7.3 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Layout & spacing utilities |
| [React Router DOM](https://reactrouter.com) | 7.13 | Client-side routing |
| [Lucide React](https://lucide.dev) | 0.577 | Icon library |
| [Axios](https://axios-http.com) | 1.13 | HTTP client for API calls |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org) + [Express](https://expressjs.com) | 5.2 | REST API server |
| JSON flat-file storage | — | Users & reservations persistence |

### Tooling
| Tool | Purpose |
|---|---|
| ESLint + React Hooks plugin | Linting & code quality |
| CSS Custom Properties | Brand design tokens |
| BEM methodology | CSS class naming convention |

---

## 📁 Project Structure

```
savory-bistro/
│
├── public/
│   └── images/                     # Static assets (WebP optimized)
│       ├── HomePage/
│       ├── menu/
│       ├── gallery/
│       ├── AboutUs/
│       ├── ContactUs/
│       └── Reservations/
│
├── src/
│   ├── App.jsx                     # Root router, Layout, ProtectedRoute, GlobalToast
│   ├── main.jsx                    # React entry point, AuthProvider wrapper
│   ├── index.css                   # Global resets, Google Fonts, Tailwind import
│   │
│   ├── assets/                     # SVG source files
│   │   ├── auth-bg-curve.svg
│   │   ├── auth-leaf-lines.svg
│   │   ├── zigzag.svg
│   │   └── zigzag-orange.svg
│   │
│   ├── components/                 # Shared UI components
│   │   ├── index.js                # Barrel exports
│   │   ├── Button/
│   │   ├── DishCard/
│   │   ├── FloatingReserveBtn/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── SectionHeader/
│   │   ├── SvgAssets/              # AuthBgCurve, AuthLeafLines, ZigZagLightning
│   │   └── Toast/
│   │
│   ├── context/
│   │   ├── index.js
│   │   └── AuthContext.jsx         # Global auth state, user session, toast system
│   │
│   ├── hooks/
│   │   └── useDropdown.js          # Reusable outside-click dropdown hook
│   │
│   ├── pages/
│   │   ├── index.js                # Barrel exports
│   │   ├── Home/
│   │   │   └── sections/           # Hero, InfoBar, ChefSpecial, SignatureDishes,
│   │   │                           # Testimonials, OurStory
│   │   ├── Menu/                   # Menu page (inline sections)
│   │   ├── Reservations/
│   │   │   ├── hooks/              # useReservations.js
│   │   │   ├── utils/              # reservationUtils.js (times, dates, constants)
│   │   │   └── sections/           # ReservationHero, CalendarPicker, TimeSlots,
│   │   │                           # ReservationForm, ReservationSidebar,
│   │   │                           # ReservationReport, PrivateDiningModal
│   │   ├── Gallery/                # Gallery page with video modal
│   │   ├── Contact/
│   │   │   └── sections/           # ContactHero, ContactForm, FAQAccordion, MapEmbed
│   │   ├── AboutUs/
│   │   │   ├── components/         # AboutSection wrapper component
│   │   │   └── sections/           # AboutHero, AboutChef, AboutValues,
│   │   │                           # AboutTeam, AboutTestimonials
│   │   ├── Login/
│   │   │   └── sections/           # LoginPanel (image), LoginForm (glass card)
│   │   ├── Signup/
│   │   │   └── sections/           # SignupPanel (dish slots), SignupForm (glass card)
│   │   └── Dashboard/
│   │       └── sections/           # ProfileCard, ChangeUsername, ChangePassword,
│   │                               # ReservationHistory
│   │
│   └── styles/
│       └── variables.css           # All CSS design tokens (single source of truth)
│
├── mock-data.json                  # App data: menu, gallery, team, FAQs, testimonials
├── server.js                       # Express API server (users + reservations)
├── optimize-images.py              # PNG → WebP batch optimizer script
├── package.json
└── vite.config.js
```

---

## 🗺️ Pages & Routes

| Route | Page | Auth Required | Footer |
|---|---|---|---|
| `/` | Home | No | Full |
| `/menu` | Menu | No | Full |
| `/reservations` | Reservations | **Yes** | Full |
| `/gallery` | Gallery | No | Light |
| `/contact` | Contact | No | Full |
| `/about` | About Us | No | Full |
| `/login` | Login | No | — |
| `/signup` | Signup | No | — |
| `/dashboard` | My Account | **Yes** | Light |

> **Protected routes** redirect unauthenticated users to `/login` with a `state.from` redirect, so they return to their original destination after signing in.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.19.0`
- **npm** `>= 8.0.0`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AhmedTyson/savory-bistro.git
cd savory-bistro

# 2. Install dependencies
npm install

# 3. Start the backend API server (required for auth & reservations)
node server.js

# 4. In a second terminal, start the frontend dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

> **Note:** The backend API runs on `http://localhost:3001`. Both servers must be running simultaneously for full functionality.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server + backend server concurrently |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all source files |
| `node server.js` | Start only the Express API server |

### Image Optimization (Optional)

To optimize PNG assets to WebP format:

```bash
# Requires Python + Pillow (auto-installed on first run)
python optimize-images.py
```

This script compresses all PNGs in `public/` and generates `.webp` versions alongside them.

---

## 🎨 Design System

The entire visual identity is driven by CSS custom properties defined in `src/styles/variables.css`. **Never hardcode color values** — always reference a token.

### Brand Colors

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#E07B39` | Buttons, accents, active states |
| `--color-primary-hover` | `#C96B2A` | Button hover |
| `--color-chef-badge` | `#C8973A` | Chef's Special badge only |
| `--color-gold-accent` | `#C9A84C` | Gold highlights, tasting menu |
| `--color-green-sustain` | `#5A8A5A` | Sustainability section only |

### Background Colors

| Token | Value | Usage |
|---|---|---|
| `--color-bg-page` | `#F5F0EB` | Default page background |
| `--color-bg-hero` | `#111111` | Hero & auth panel backgrounds |
| `--color-bg-chef-special` | `#2B3A42` | Chef's Special section |
| `--color-bg-tasting` | `#1A1200` | Tasting menu section |
| `--color-bg-testimonial` | `#1A1A1A` | Testimonials section |
| `--color-bg-footer` | `#1C1C1C` | Footer |

### Typography

| Token | Font | Used For |
|---|---|---|
| `--font-serif` | Playfair Display | Headings, brand name, quotes |
| `--font-sans` | Inter | Body text, navigation, UI |
| `--font-script` | Dancing Script | Hero subtitle **only** |

### CSS Conventions

- **BEM naming** is mandatory: `.ComponentName__element--modifier`
- **Tailwind CSS** is used for layout, spacing, flex, grid, and responsive breakpoints
- **CSS files** handle colors, fonts, borders, transitions, and brand values
- Breakpoints: `375px` (base) · `768px` (md) · `1024px` (lg) · `1280px` (xl)

---

## 🔐 Authentication

Authentication is powered by `AuthContext` (`src/context/AuthContext.jsx`), which wraps the entire app via `<AuthProvider>` in `main.jsx`.

### Context API

```jsx
const { currentUser, login, logout, registerUser, validateLogin, showToast } = useAuth();
```

| Property / Method | Description |
|---|---|
| `currentUser` | The logged-in user object, or `null` |
| `login(user)` | Persist user to localStorage and set state |
| `logout()` | Clear session, trigger logout toast |
| `registerUser({ firstName, lastName, email, password })` | Async — POSTs to API, auto-logs in on success |
| `validateLogin(email, password)` | Validates credentials against backend users |
| `showToast(config)` | Trigger a global toast notification |

### Auth Flow

- **Guest users** see Login + Sign Up links in the Navbar
- **Logged-in users** see their first name with a dropdown (My Account / Logout)
- The **FloatingReserveBtn** is always visible; guests are redirected to `/login` with `state: { from: '/reservations' }` and returned after login
- Session is persisted in `localStorage` under the key `savory_user`

### Security Features

- Rate limiting on login (5 attempts → 30-second cooldown)
- Rate limiting on signup (5 attempts → 30-second cooldown)
- Password strength indicator with 5-rule checklist
- Password confirmation matching on signup
- RFC 5322 email validation

---

## 🔌 Backend API

The Express server (`server.js`) runs on port **3001** and handles two resources:

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users` | Fetch all users (for login validation) |
| `POST` | `/api/users` | Register a new user |
| `PATCH` | `/api/users/:id` | Update user name or password |

### Reservations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reservations` | Fetch all reservations (supports `?userId=` filter) |
| `POST` | `/api/reservations` | Create a new reservation |

Data is persisted to local JSON files (`users-data.json`, `reservations-data.json`) which are excluded from version control via `.gitignore`.

> **Private dining inquiries** are stored client-side in `localStorage` under the key `sb_inquiries`.

---

## 👥 Team

This project was built by a team of 5 developers, each responsible for specific pages and features:

| Developer | Pages / Responsibility | GitHub |
|---|---|---|
| **Ahmed Tyson (Team Lead)** | Architecture, Home, Login, Signup, Dashboard, Auth System | [@AhmedTyson](https://github.com/AhmedTyson) |
| **Hagar Ashraf** | Gallery, Menu | [@Hagar2005](https://github.com/Hagar2005) |
| **Bassant Hesham** | Reservations | [@bassanthesham2410](https://github.com/bassanthesham2410) |
| **Youssef Elsherif** | Contact | [@yousefsherifchifo-pixel](https://github.com/yousefsherifchifo-pixel) |
| **Ahmed Sorour** | About Us | [@A-udo](https://github.com/A-udo) |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Branch Strategy

```
main          ← stable production
  └── develop ← integration branch
        └── feature/[page]-[section] ← your work branch
```

### Workflow

```bash
# 1. Sync with develop
git checkout develop
git pull origin develop

# 2. Create your feature branch
git checkout -b feature/[page]-[section-name]

# 3. Build your section, then commit
git add .
git commit -m "feat([page]): build [SectionName] section"

# 4. Push and open a PR to develop
git push origin feature/[page]-[section-name]
```

### PR Rules

- PRs go to `develop`, **never directly to `main`**
- Minimum **1 reviewer approval** required
- `npm run build` must pass with zero errors
- Delete your feature branch after merge

### Commit Message Format

```
feat([scope]):     New feature
fix([scope]):      Bug fix
style([scope]):    CSS or formatting changes
refactor([scope]): Code restructure without logic change
chore([scope]):    Dependency or config updates
```

### Code Standards

Before submitting a PR, verify:

- [ ] All CSS classes follow BEM: `.ComponentName__element--modifier`
- [ ] No hardcoded hex colors — use `var(--color-*)` tokens only
- [ ] No `<a href="...">` tags for internal links — use `<Link>` or `<NavLink>`
- [ ] No new `npm install` packages added
- [ ] `npm run build` passes with zero errors
- [ ] All 9 routes render without console errors
- [ ] Responsive at 375px, 768px, 1024px, and 1280px

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by the Savory Bistro team · [AhmedTyson/savory-bistro](https://github.com/AhmedTyson/savory-bistro)

</div>
