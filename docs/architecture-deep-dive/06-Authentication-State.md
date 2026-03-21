# Authentication & Global State

## Code Reference
- [src/context/AuthContext.jsx](file:///c:/Programming/C2C/savory-bistro/src/context/AuthContext.jsx)

## The "How" (Technical)
Authentication is managed via a centralized **React Context** (`AuthContext`). It handles user sessions, persistence, and cross-component notifications.

### Functional Breakdown:
1. **Persistence**: The user session is persisted in `localStorage`. On application mount, the `currentUser` state is initialized by reading the `authUser` key.
2. **Asynchronous Operations**: Functions like `registerUser` are `async`. They perform an initial frontend check for duplicates and then communicate with a local Node/Express backend (`http://localhost:3001/api/users`).
3. **Validation logic**: Uses a centralized `src/utils/validation.js` utility for all email, phone, and password checks, ensuring consistent security rules across all forms.
4. **Toast Queueing**: The context manages a `pendingToast` state. This is particularly useful for actions like "Logout" where you redirect the user but still want to show a notification on the destination page.

## الـ "ليه وكيف" (Arabic)
الـ أمان وإدارة بيانات المستخدمين بيتموا في مكان واحد مركزي اسمه `AuthContext`.
بالنسبة لـ الـ **Provider Pattern**، ده اللي بيسمح لأي Component في الموقع إنه يوصل لمعلومات اليوزر الحالي بكلمة واحدة: `useAuth()`.
الـ فكرة في الحفاظ على الجلسة (Persistence) إننا بنخزن بيانات اليوزر في الـ `localStorage` بتاع المتصفح، عشان لو قفل الصفحة وفتحها تاني يفضل مسجل دخول.
بالنسبة لـ الـ **Registration**، العملية دي بتحصل "بشكل متزامن" (Async)، وبنتأكد الأول إن الإيميل مش متكرر قبل ما نبعت البيانات للسيرفر.
الـ `pendingToast` دي حركة ذكية بنستخدمها عشان لما اليوزر يعمل Logout ونحوله للـ Home، تظهر له رسالة وداع لطيفة، والـ Home هي اللي بتعرف إن فيه رسالة مستنية من الـ Context.
بالنسبة لـ لـ **Security**، إحنا بنحاول نفصل كلمة السر عن بيانات اليوزر اللي بتتحرك جوه الأبلكيشن (Safe User Object) عشان نحافظ على الخصوصية.

## Behind the Scenes
### The Context API & Re-rendering
When `setCurrentUser` is called inside the `AuthProvider`, React identifies that the Context value has changed. It then broadcasts this update to every component that has a `useAuth()` hook. Behind the scenes, React optimizes this by not re-rendering components that only use *other* parts of the context, provided the consumption is partitioned correctly (though in simple contexts, the entire tree might re-render).

### Async/Await & Event Loop
The `registerUser` function uses the `fetch` API, which is a **Non-blocking I/O** operation. When a registration request is sent, the JavaScript **Event Loop** continues executing other tasks while waiting for the server's response. This ensures the UI remains responsive and doesn't "freeze" while waiting for the backend.
