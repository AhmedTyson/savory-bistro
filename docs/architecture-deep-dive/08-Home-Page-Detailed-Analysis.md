# Home Page: Line-by-Line Breakdown (`Home.jsx`)

## 1. Imports (Lines 1-15)
- **Line 1**: `import { useState, useCallback, useEffect } from "react";`
    - Imports core React hooks. `useState` for simple state, `useCallback` for memoizing functions, and `useEffect` for side effects (like API calls or storage sync).
- **Line 2**: `import { useLocation } from "react-router-dom";`
    - Import the hook that gives access to the current URL's state object.
- **Line 3**: `import { useAuth } from "../../context";`
    - Custom hook to access global Auth state (user details, login/logout functions).
- **Line 4**: `import Toast from "../../components/Toast/Toast";`
    - Import the reusable notification component.
- **Line 5**: `import mockData from "../../../mock-data.json";`
    - Import the static data file used to populate the menu and testimonials.
- **Lines 8-13**: Importing section components (`Hero`, `InfoBar`, `OurStory`, etc.). These are "Organisms" in our Atomic Design.
- **Line 15**: `import "./Home.css";`
    - Importing the page-specific styling.

## 2. Component Logic (Lines 17-41)
- **Line 17**: `function Home() {`
    - The start of the functional component.
- **Line 18**: `const location = useLocation();`
    - Initializing the location object to read data passed from other pages (like a success message after login).
- **Line 19**: `const { pendingToast, clearPendingToast } = useAuth();`
    - Extracting global toast management from the Auth Context.
- **Lines 21-26**: `const [toast, setToast] = useState(() => { ... });`
    - **Initializer Function**: Only runs once on the first mount. It checks if the `location.state` contains a toast from a previous navigation (e.g., coming from the Register page).
- **Lines 28-39**: `useEffect(() => { ... }, [...]);`
    - **Logic 1**: If there's a "pending" toast in the global context (like after a Logout), it sets it to the local state and clears it from the global context to avoid redundant triggers.
    - **Logic 2**: `window.history.replaceState` clears the browser history state so the toast doesn't pop up again if the user Refreshes the page.
- **Line 41**: `const dismissToast = useCallback(() => setToast(null), []);`
    - A memoized function to hide the toast. `useCallback` prevents this function from being recreated on every render, which is a performance optimization for child components.

## 3. Rendering JSX (Lines 43-60)
- **Line 44**: `<div className="home-page overflow-x-hidden">`
    - The wrapper div. `overflow-x-hidden` prevents unwanted horizontal scrolling on mobile.
- **Lines 45-51**: `{toast && ( ... )}`
    - **Short-circuit Evaluation**: Only renders the `Toast` component if the `toast` state is not null.
- **Lines 53-58**: The sequence of sections. 
    - Note **Line 56** and **Line 58**: We are passing data from `mockData` as "props" to `SignatureDishes` and `Testimonials`.

---

## الـ "كلمة كلمة" (Arabic)

### بالنسبة لـ الـ Imports:
الـ سطور الأولى دي بننادي فيها السكرتارية بتوعنا (Hooks) اللي هيساعدونا، وبنجيب المكونات (Components) اللي هنبني بيها الصفحة.
بالنسبة لـ الـ `mockData` ده هو "تلاجة البيانات" اللي فيها الأكلات والآراء بتاعة الناس.

### بالنسبة لـ الـ Logic (إزاي الصفحة بتفكر):
الـ `useLocation` دي عين الموقع، بتراقب إحنا جايين من انهي صفحة ومعانا إيه.
بالنسبة لـ الـ `useState` اللي في السطر 21، دي ذكاء اصطناعي صغير بيشوف إحنا جايين من صفحة الـ Login مثلاً؟ لو أيوة، بيجهز رسالة ترحيب.
بالنسبة لـ الـ `useEffect` ده "مراقب الصفحة"، أول ما الصفحة تفتح بيشوف لو فيه رسالة (Toast) مستنية تظهر، بيظهرها وبعدين بيمسحها من ذاكرة المتصفح عشان ما تظهرش تاني لما تعمل Refresh.
بالنسبة لـ الـ `useCallback` دي بنستخدمها عشان نوفر "بنزين" (أداء)، بنقول للـ React "احفظ الوظيفة دي عندك وما تعملهاش من جديد غير لو طلبت منك".

### بالنسبة لـ الـ JSX (واجهة الموقع):
الـ كود اللي بيبدأ من سطر 43 هو ده اللي اليوزر بيشوفه بعينه.
بالنسبة لـ الـ `{toast && ...}` دي معناها: "لو فيه رسالة، وريهالنا، لو مفيش، كمل طريقك".
الـ صفحات اللي بدأن من سطر 53 زي `Hero` و `InfoBar` دي أقسام الصفحة، بنرصهم تحت بعض زي المكعبات.
بالنسبة لـ الـ `props` (اللي هم `dishes` و `reviews`) دي هي الشنطة اللي بنبعت فيها البيانات لكل قسم عشان يعرضها.

---

## Behind the Scenes
### Functional Initialization
Using a function inside `useState` (`useState(() => { ... })`) is called **Lazy Initialization**. React only executes this function once during the initial mount. If we passed the value directly, the logic would run on **every render**, which is a waste of CPU cycles.

### History API Manipulation
`window.history.replaceState` is a native browser command. By using it, we modify the browser's history entry without triggering a page reload. This is a common pattern in Single Page Applications (SPAs) to clean up navigation state.

### Props Passing & Re-rendering
When `mockData` is passed as a prop, React creates a reference to that object. Since `mockData` is a static import, its reference never changes, which helps React's **Reconciliation** algorithm decide that those components don't need to be updated unless the component itself re-renders for other reasons.
