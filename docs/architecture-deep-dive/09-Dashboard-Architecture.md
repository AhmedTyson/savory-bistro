# Dashboard Architecture: Activity & Reports

## Code Reference
- [src/pages/Dashboard/Dashboard.jsx](file:///c:/Programming/C2C/savory-bistro/src/pages/Dashboard/Dashboard.jsx)
- [src/pages/Dashboard/sections/ReservationHistory/ReservationHistory.jsx](file:///c:/Programming/C2C/savory-bistro/src/pages/Dashboard/sections/ReservationHistory/ReservationHistory.jsx)

## The "How" (Technical)
The Dashboard is built as a modular assembler that aggregates user activity, statistics, and reservation history into a single view.

### Component Breakdown:
1. **Responsive Grid**: Uses a hybrid grid layout (Tailwind for columns, Vanilla for card spacing) to show top-level stats (Total Reservations, Account Status, Active Points).
2. **Receipt-Style List**: The `ReservationHistory` uses a specialized CSS layout with a continuous vertical line (`ReservationHistory__line`) to create a chronological timeline effect.
3. **Scalability Logic**: The list component implements a "Soft Clamp" (3 items default) to prevent page bloat. Full history is fetched but partially rendered.

## الـ "ليه وكيف" (Arabic)
### بالنسبة لـ صفحة الـ Dashboard:
الـ Dashboard معمولة عشان تكون "لوحة تحكم" كاملة لليوزر يتابع منها نشاطه في المطعم.
الـ فكرة في استخدام الـ **DashboardCard** هي إننا بنعرض المعلومات المهمة زي عدد الـ Reservations في كروت واضحة ومنظمة.
بالنسبة لـ الـ **ReservationHistory**، صممناها بشكل "الوصل" (Receipt Style) مع خط رأسي بيربط الأحداث ببعضها، وده بيدي إحساس بالـ Timeline.
الـ ميزة في الـ **Toggle Logic** (إظهار الكل / إخفاء) هي إننا بنحافظ على نظافة الصفحة خصوصاً لو يوزر عنده حجوزات كتير جداً، فبنعرض له آخر 3 بس وبنسيب له خيار إنه يشوف الباقي.

## Behind the Scenes
### List Rendering Optimization
By using `history.slice(0, 3)` instead of hiding extras with `display: none`, React avoids creating fiber nodes for the hidden items entirely. This reduces the memory footprint of the component significantly when in collapsed mode.
