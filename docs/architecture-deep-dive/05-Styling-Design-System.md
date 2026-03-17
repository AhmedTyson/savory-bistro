# Styling & Design System

## Code Reference
- [src/index.css](file:///c:/Programming/C2C/savory-bistro/src/index.css)
- [src/styles/variables.css](file:///c:/Programming/C2C/savory-bistro/src/styles/variables.css)

## The "How" (Technical)
The project employs a hybrid styling strategy combining **CSS Custom Properties** (Variables), **Tailwind CSS 4**, and the **BEM** (Block Element Modifier) naming convention.

### Technical Architecture:
1. **Design Tokens**: `variables.css` acts as the single source of truth for the design system. It defines colors, spacing, typography, and transitions using standard CSS variables.
2. **Tailwind 4 Integration**: By importing `tailwindcss` in `index.css`, the project gains access to utility classes. Since Tailwind 4 natively supports CSS variables, there's a seamless bridge between the custom tokens and utility-first styling.
3. **BEM Methodology**: Components like the Menu use BEM (e.g., `.Menu__hero`, `.Menu__filter-btn--active`). This ensures high specificity safely and makes the CSS predictable and scalable.
4. **Responsive Strategy**: A centralized `.container` class with variable padding and `max-width` ensures consistent layout across mobile, tablet, and desktop viewports.

## الـ "ليه وكيف" (Arabic)
الـ تصميم بتاع الموقع مش مجرد ألوان، ده نظام كامل (Design System) معمول بدقة.
بالنسبة لـ ملف الـ `variables.css` ده هو "دستور الألوان" بتاعنا، أي لون أو مسافة (Spacing) بنستخدمها في الموقع لازم تكون متعرفة فيه الأول، وده بيسهل جداً لو فكرنا نغير الهوية البصرية للموقع في المستقبل.
الـ ميكس اللي عاملينه بين **Tailwind 4** والـ CSS العادي بيدينا قوة جبارة؛ بناخد سرعة الـ Utility Classes وفي نفس الوقت بنحافظ على نظافة الكود بتاعنا.
بالنسبة لـ لـ **BEM**، دي طريقة بنسمي بيها الـ Classes (زي `Menu__hero`) عشان مانتوهش لما الموقع يكبر، وكمان عشان الـ Styles ما تدخلش في بعضها (CSS Conflict).
بالنسبة لـ الفرق بين `Menu__filter-btn--active` و الـ `:active` العادي:
    - الـ `:active` ده "حالة لحظية" بتحصل بس وأنت دايس بالماوس على الزرار (بين الضغطة والرفعة).
    - الـ `--active` ده "حالة منطقية" (State)، يعني الزرار بيفضل منور طول ما القسم ده هو اللي معروض، وده اللي بنتحكم فيه بالكود بتاع الـ React.
    - الـ BEM بيخلينا نفصل بين "تفاعل الماوس" وبين "حالة التطبيق" بوضوح.
الـ خطوط مستوردة من **Google Fonts** زي `Inter` و `Playfair Display` عشان ندي إحساس بالفخامة والاحترافية.
بالنسبة لـ الـ **Responsive Design**، إحنا مستخدمين "CSS Variables" برضه عشان نتحكم في عرض الـ Container بناءً على حجم الشاشة، وده بيضمن إن الموقع يظهر بشكل مثالي على أي موبايل أو كمبيوتر.

## Behind the Scenes
### CSS Variable Performance
Browser hardware acceleration handles CSS variable updates very efficiently. when a variable is modified at the `:root` level, the browser only recalculates the styles for elements that actually use that variable. This is more performant than rewriting entire CSS classes via JavaScript.

### Atomic CSS vs. Semantic CSS
The project balances **Atomic CSS** (Tailwind) for rapid UI building and **Semantic CSS** (BEM) for complex, stateful components. Behind the scenes, Tailwind 4's engine scans your files to generate the minimum necessary CSS, while the BEM classes provide a stable structural foundation that is easy to debug in the browser's developer tools.
