import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import DishCard from '../../components/DishCard/DishCard';
import data from '../../../mock-data.json';
import './Menu.css';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Hardcode categories based on the design image
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'mainCourses', label: 'Main Courses' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];

  const filteredMenu = activeCategory === 'all'
    ? data.menu
    : data.menu.filter(item => item.category === activeCategory);

  return (
    <div className="Menu">
      {/* Hero Section */}
      <section className="Menu__hero">
        <div className="Menu__hero-overlay"></div>
        <div className="Menu__hero-content container">
          <h1 className="Menu__hero-title">Our Menu</h1>
          <p className="Menu__hero-subtitle">Crafted with passion, served with love</p>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="Menu__main-section">
        <div className="container">
          {/* Categories Filter */}
          <div className="Menu__filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`Menu__filter-btn ${activeCategory === cat.id ? 'Menu__filter-btn--active' : ''}`}
              >
                 {cat.label}
              </button>
            ))}
          </div>

          {/* Dish Grid */}
          <div className="Menu__dish-grid">
             {filteredMenu.map(dish => (
               <DishCard 
                 key={dish.id}
                 image="/images/placeholder-dish.jpg" 
                 name={dish.name}
                 description={dish.description}
                 price={dish.price}
                 badge={dish.badge}
                 dietIcon={dish.dietIcon}
               />
             ))}
          </div>
        </div>
      </section>

      {/* Chef's Tasting Menu Section */}
      <section className="Menu__tasting-section">
        <div className="container Menu__tasting-container">
            <div className="Menu__tasting-card">
              <h2 className="Menu__tasting-title">Chef's Tasting Menu</h2>
              
              <div className="Menu__tasting-courses">
                {data.tastingMenu.map((course, index) => (
                  <div key={index} className="Menu__tasting-course">
                    <span className="Menu__course-label">{course.course}. {course.label}</span>
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

      {/* Drinks & Wine Section */}
      <section className="Menu__drinks-section">
         <div className="container">
            <SectionHeader 
               title="Drinks & Wine" 
               align="center"
            />

            <div className="Menu__drinks-grid">
               {/* Vintage Cellar */}
               <div className="Menu__drinks-category">
                  <h3 className="Menu__drinks-title">Vintage Cellar</h3>
                  <div className="Menu__drinks-list">
                     {data.wines.map(wine => (
                        <div key={wine.id} className="Menu__drink-item">
                           <div className="Menu__drink-info">
                              <h4 className="Menu__drink-name">{wine.name}</h4>
                              <span className="Menu__drink-origin">{wine.origin}</span>
                           </div>
                           <div className="Menu__drink-price">{wine.price}</div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Craft Cocktails */}
               <div className="Menu__drinks-category">
                  <h3 className="Menu__drinks-title">Craft Cocktails</h3>
                  <div className="Menu__drinks-list">
                     {data.cocktails.map(cocktail => (
                        <div key={cocktail.id} className="Menu__drink-item">
                           <div className="Menu__drink-info">
                              <h4 className="Menu__drink-name">{cocktail.name}</h4>
                              <span className="Menu__drink-origin">{cocktail.description}</span>
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
