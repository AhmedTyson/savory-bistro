# Project Overview: Savory Bistro

## Code Reference
- [package.json](file:///c:/Programming/C2C/savory-bistro/package.json)
- [vite.config.js](file:///c:/Programming/C2C/savory-bistro/vite.config.js)

## The "How" (Technical)
The application is a modern single-page application (SPA) built using **React 19** and **Vite 7**. It utilizes **Tailwind CSS 4** for styling and **React Router DOM 7** for client-side routing. The backend is partially mocked or assisted by a simple **Express** server in `server.js` for handling specific requests like dynamic routing or local data serving.

### Dependency Mapping:
- **Core Engine**: `react`, `react-dom` (The Virtual DOM reconciliation engine).
- **Build Tool**: `vite` (ESM-based HMR and bundling).
- **Routing**: `react-router-dom` (History API management).
- **Icons**: `lucide-react` (SVG-based icon library).
- **Communication**: `axios` (Promise-based HTTP client).
- **Styling**: **Hybrid Strategy** — `tailwindcss` (Layout architecture, spacing, grid) + **Custom CSS** (Brand identity, components, BEM).

## الـ "ليه وكيف" (Arabic)
الـ مشروع ده عبارة عن موقع لمطعم (Savory Bistro) معمول بأحدث تكنولوجيا في عالم الـ Web Development.
الفكرة كلها إننا بنستخدم **React 19** عشان نبني واجهة مستخدم سريعة وبترد على المستخدم في لحظتها من غير ما نحتاج نحمل الصفحة من جديد كل شوية.
بالنسبة لـ **Vite**، فده هو "المحرك" اللي بيشغل الكود بتاعنا وقت التطوير، وميزته إنه طيارة في الـ Hot Module Replacement، يعني أي تغيير بتعمله في الكود بيظهر قدامك في المتصفح في أقل من ثانية.
الـ **Tailwind CSS** هو اللي شايل حمل التصميم كله، وده بيخلينا نكتب التنسيقات (Styles) بتاعتنا بسرعة جداً ومن غير ما نضيع وقت في ملفات CSS ضخمة وتايهة.
بالنسبة لـ **React Router**، فده هو المسؤول عن التنقل بين الصفحات زي الـ Home والـ Menu من غير ما المتصفح يبعت Request كامل للسيرفر، وده اللي بنسميه Single Page Application.

## Behind the Scenes
### Virtual DOM & Reconciliation
React doesn't update the actual Browser DOM immediately. instead, it maintains a **Virtual DOM** in memory. When a component's state changes, React creates a new Virtual DOM tree. It then performs a process called **Reconciliation** (or "diffing") to compare the new tree with the old one. Only the specific differences are applied to the real DOM, which significantly boosts performance.

### Vite's ESM-based Development
Conventional build tools (like Webpack) bundle the entire application before serving it. Vite takes a different approach by serving source code over **Native ESM**. The browser takes over part of the job of a bundler: Vite only transforms and serves source code on demand, as the browser requests it. This makes the dev server start-up time independent of the application size.
