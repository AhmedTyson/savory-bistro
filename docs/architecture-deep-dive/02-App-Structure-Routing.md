# App Structure & Routing Logic

## Code Reference
- [src/App.jsx](file:///c:/Programming/C2C/savory-bistro/src/App.jsx)
- [src/main.jsx](file:///c:/Programming/C2C/savory-bistro/src/main.jsx)

## The "How" (Technical)
The application uses a **Component-Based Architecture**. The entry point is `main.jsx`, which wraps the `App` component with an `AuthProvider` and `StrictMode`. The `App.jsx` file contains the primary routing configuration using `react-router-dom`. It defines various routes and layouts to ensure consistent UI across different sections.

### Logic Flow:
1. **Entry**: `main.jsx` initializes the React root and renders the `AuthProvider`.
2. **Context**: `AuthProvider` (from `src/context`) wraps the entire app to provide global authentication state.
3. **Router**: `BrowserRouter` wraps the `Routes` container.
4. **Layouts**: Three distinct layout types are used:
    - `Layout`: Default layout with Navbar, Footer, and Floating Reserve Button.
    - `AuthLayout`: Minimal layout for Login/Signup (no footer).
    - `ProtectedRoute`: A wrapper component that checks for an active user session before granting access to specific routes (e.g., `/reservations`).

## الـ "ليه وكيف" (Arabic)
الـ هيكل بتاع الأبلكيشن متقسم لقطع صغيرة بنسميها **Components**، والـ `App.jsx` هو المايسترو اللي بينظمهم.
بالنسبة لـ `main.jsx` ده هو الباب اللي بندخل منه، وبنستخدم فيه `createRoot` عشان نربط الـ React بالـ HTML الحقيقي بتاع المتصفح.
الـ `AuthProvider` اللي هتلاقيه محوط الـ `App` كلها، ده شغال كـ "مخزن معلومات" للـ Login والـ Authentication، بحيث أي صفحة في الموقع تعرف اليوزر ده مسجل دخول ولا لأ.
بالنسبة لـ الـ **Routing**، إحنا مستخدمين نظام متطور بيقسم الموقع لصفحات وهمية، كل صفحة ليها "Layout" معين.
الـ `ProtectedRoute` دي بقى هي "بودي جارد" الموقع، بتمنع أي حد يدخل صفحة الحجوزات (Reservations) غير لما يكون عامل Login الأول.
الـ فكرة في استخدام الـ Layouts إننا نوحد شكل الموقع، يعني الـ Navbar والـ Footer يفضلوا ثابتين مكانهم والصفحة بس هي اللي تتغير في النص، وده بيحسن تجربة المستخدم جداً.

## Behind the Scenes
### Component Lifecycle & State Injection
When `AuthProvider` wraps the `App`, it uses the **React Context API**. Behind the scenes, React sets up a Provider-Consumer pattern. When the state inside `AuthProvider` changes, React triggers a re-render for all components that "consume" this context (via `useContext(AuthContext)`). This avoids "Prop Drilling" where you'd have to pass the user object down through every single component level.

### Declarative Routing
React Router 7 follows a **Declarative Programming** approach. instead of imperatively telling the browser to "go to this URL," we declare the relationship between a URL path and a Component. The `BrowserRouter` listens to the browser's `popstate` event to detect URL changes and matching the current location against the defined `<Route>` paths.
