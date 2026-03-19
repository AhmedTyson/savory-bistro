# Home Page Deep Dive

## Code Reference
- [src/pages/Home/Home.jsx](file:///c:/Programming/C2C/savory-bistro/src/pages/Home/Home.jsx)
- [src/pages/Home/sections/](file:///c:/Programming/C2C/savory-bistro/src/pages/Home/sections/)

## The "How" (Technical)
The Home page is a composite component that orchestrates multiple functional sections. It handles global notifications (Toasts) by synchronizing local state with the `AuthContext` and the router's `location.state`.

### Logic Breakdown:
1. **Toast System**: 
    - It checks `location.state` for immediate toasts (e.g., after a successful redirect from Login).
    - It listens to `pendingToast` from `AuthContext` (e.g., for logout events that don't use direct navigation state).
    - It uses `window.history.replaceState` to clear the location state, preventing the toast from reappearing if the user Refreshes the page.
2. **Sectional Composition**: The page is divided into independent components (`Hero`, `InfoBar`, `OurStory`, etc.), making the codebase modular and easier to maintain.
3. **Memoization**: While not explicitly using `useMemo` for sections here, the separation of concerns ensures that a re-render in one section doesn't necessarily trigger expensive logic in others unless props change.

## الـ "ليه وكيف" (Arabic)
الـ صفحة الرئيسية (Home) معمول لها تصميم "Modular"، يعني متقسمة لحتت صغيرة كل حتة مسؤولة عن وظيفة معينة.
بالنسبة لـ الـ **Toast Notifications** (الرسايل اللي بتطلع فوق دي)، الصفحة دي هي اللي بتديرها بذكاء.
الـ فكرة إننا بنشوف لو اليوزر جاي من صفحة تانية ومعاه "رسالة نجاح" (زي لما يسجل دخول)، بنظهرها له فوراً.
بالنسبة لـ الـ `useEffect` اللي موجود في الكود، وظيفته إنه ينظف الـ "History" بتاع المتصفح بعد ما نظهر الرسالة، عشان لو اليوزر عمل Refresh للصحفة، الرسالة ماتظهرش تاني وتزهقه.
الـ تقسيم لـ **Sections** زي `Hero` و `ChefSpecial` ده بيخلي الكود منظم جداً، وأي حد يقدر يعدل في جزء معين من غير ما يبوظ باقي الصفحة.
بالنسبة لـ الـ **Mock Data**، إحنا ساحبين بيانات الأطباق المميزة (Signature Dishes) من ملف `mock-data.json` وبنبعتها للـ Component المسؤول عنها كـ **Props**.

## Behind the Scenes
### State Synchronization & Side Effects
The use of `useEffect` with `window.history.replaceState` is a sophisticated way to handle **Ephemeral UI State**. Behind the scenes, the browser's history stack is modified without a page reload. This ensures that the application state remains "clean" across manual browser refreshes, which is a common challenge in SPA development.

### Composition over Inheritance
The Home page follows the **Composition over Inheritance** principle. instead of having a giant base class, we compose the page by nesting specialized functional components. This allows each section to manage its own styling (via local CSS or Tailwind) and logic independently, adhering to the **Single Responsibility Principle**.
