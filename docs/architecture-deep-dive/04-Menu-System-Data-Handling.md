# Menu System & Data Handling

## Code Reference
- [src/pages/Menu/Menu.jsx](file:///c:/Programming/C2C/savory-bistro/src/pages/Menu/Menu.jsx)
- [mock-data.json](file:///c:/Programming/C2C/savory-bistro/mock-data.json)

## The "How" (Technical)
The Menu page implements a dynamic filtering system based on categories. It consumes a centralized data source (`mock-data.json`) and renders it using reusable components.

### Implementation Details:
1. **State-Driven Filtering**: The `activeCategory` state determines which subset of the menu is displayed. The filtering happens in-memory using the `.filter()` method, providing an instantaneous user experience.
2. **Data Mapping**: The component maps over the `filteredMenu` array to render multiple `DishCard` components. Each card receives its data via **Props**.
3. **Complex Sections**: Beyond the main grid, it includes specialized sections like the "Chef's Tasting Menu" and "Drinks & Wine," which pull from different keys in the JSON data.
4. **Conditional Styling**: Category buttons use Template Literals to apply active states dynamically (`Menu__filter-btn--active`).

## الـ "ليه وكيف" (Arabic)
الـ صفحة بتاعة المنيو (Menu) هي مثال عملي على إزاي بنتعامل مع البيانات الديناميكية في React.
بالنسبة لـ الـ **Categories** (الأقسام)، عندنا "State" اسمها `activeCategory` هي اللي بتتحكم في إيه اللي يظهر قدام المستخدم.
الـ فكرة ببساطة إننا بنفلتر الـ Array اللي جاية من ملف الـ JSON بناءً على القسم اللي اليوزر اختاره، وده بيحصل في جزء من الثانية من غير ما نكلم السيرفر تاني.
بالنسبة لـ الـ **DishCard**، ده Component "reusable" بنستخدمه عشان نرسم كل طبق في الشبكة (Grid)، وده بيوفر علينا كتابة كود كتير مكرر.
الـ بيانات كلها متجمعة في مكان واحد وهو `mock-data.json` عشان لو حبينا نغير سعر طبق أو وصفه، نغيره في حتة واحدة بس.
بالنسبة لـ الـ **Wine List** والـ **Cocktails**، برضه ليهم أقسام خاصة بيهم وبنلف عليهم بـ `map` عشان نطلعهم بشكل احترافي.

## Behind the Scenes
### Declarative Data Rendering
In traditional JavaScript (Vanilla), you would use `for` loops and `document.createElement` to inject items into the DOM. React uses a **Declarative** approach: we describe how each item should look given the data, and React's reconciliation engine handles the creation, updating, and removal of DOM elements efficiently. 

### Array Transformation Patterns
The pattern `data.menu.filter(...).map(...)` is a powerful functional programming technique used in modern frontends. Behind the scenes, this minimizes side effects and makes the UI a "pure function" of your state. When `activeCategory` changes, React re-executes the component function, gets a new filtered list, and calculates the minimum changes needed for the UI.
