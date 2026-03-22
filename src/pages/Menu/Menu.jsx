/** Menu.jsx - Interactive Digital Menu Wrapper **/
import { useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Button from "../../components/Button/Button";
import DishCard from "../../components/DishCard/DishCard";
import data from "../../../data/mock-data.json";
import "./Menu.css";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Category list synced with brand identity
  const categories = [
    { id: "all", label: "All" },
    { id: "appetizers", label: "Appetizers" },
    { id: "mainCourses", label: "Main Courses" },
    { id: "seafood", label: "Seafood" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
  ];

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const filteredMenu =
    activeCategory === "all"
      ? data.menu
      : data.menu.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="Menu">
      <section className="Menu__hero">
        <div className="Menu__hero-overlay"></div>
        <div className="Menu__hero-content container">
          <h1 className="Menu__hero-title">Our Menu</h1>
          <p className="Menu__hero-subtitle">
            Crafted with passion, served with love
          </p>
        </div>
      </section>

      <section className="Menu__main-section">
        <div className="container">
          <div className="Menu__filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`Menu__filter-btn ${activeCategory === cat.id ? "Menu__filter-btn--active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="Menu__dish-grid">
            {paginatedMenu.map((dish) => (
              <DishCard
                key={dish.id}
                image={dish.src || "/images/placeholder-dish.webp"}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                badge={dish.badge}
                dietIcon={dish.dietIcon}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="Menu__pagination">
              <button
                className="Menu__pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="Menu__pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="Menu__pagination-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="Menu__tasting-section">
        <div className="container Menu__tasting-container">
          <div className="Menu__tasting-card">
            <h2 className="Menu__tasting-title">Chef's Tasting Menu</h2>

            <div className="Menu__tasting-courses">
              {data.tastingMenu.map((course) => (
                <div key={course.course} className="Menu__tasting-course">
                  <span className="Menu__course-label">
                    {course.course}. {course.label}
                  </span>
                  <h3 className="Menu__course-dish">{course.dish}</h3>
                </div>
              ))}
            </div>

            <div className="Menu__tasting-footer">
              <div className="Menu__tasting-price">$145 per person</div>
              <Button variant="primary" className="Menu__tasting-btn">
                RESERVE THIS EXPERIENCE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="Menu__drinks-section">
        <div className="container">
          <SectionHeader title="Drinks & Wine" align="center" className="Menu__drinks-header" />

          <div className="Menu__drinks-grid">
            <div className="Menu__drinks-category">
              <h3 className="Menu__drinks-title">Premium Selection</h3>
              <div className="Menu__drinks-list">
                {data.beverages.map((drink) => (
                  <div key={drink.id} className="Menu__drink-item">
                    <div className="Menu__drink-info">
                      <h4 className="Menu__drink-name">{drink.name}</h4>
                      <span className="Menu__drink-origin">{drink.origin}</span>
                    </div>
                    <div className="Menu__drink-price">{drink.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="Menu__drinks-category">
              <h3 className="Menu__drinks-title">Artisan Mocktails</h3>
              <div className="Menu__drinks-list">
                {data.mocktails.map((cocktail) => (
                  <div key={cocktail.id} className="Menu__drink-item">
                    <div className="Menu__drink-info">
                      <h4 className="Menu__drink-name">{cocktail.name}</h4>
                      <span className="Menu__drink-origin">
                        {cocktail.description}
                      </span>
                    </div>
                    <div className="Menu__drink-price">${cocktail.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
