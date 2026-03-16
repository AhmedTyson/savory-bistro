import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import DishCard from '../../components/DishCard/DishCard';
import data from '../../../mock-data.json';
import './Menu.css';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Hardcode categories based on the design image
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'appetizers', label: 'Appetizers' }, // Adding appetizers to match design
    { id: 'mainCourses', label: 'Main Courses' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'desserts', label: 'Desserts' },     // Adding desserts to match design
    { id: 'drinks', label: 'Drinks' }          // Adding drinks to match design
  ];

  const filteredMenu = activeCategory === 'all'
    ? data.menu
    : data.menu.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-overlay"></div>
        <div className="container relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1 className="hero-title">Our Menu</h1>
          <p className="hero-subtitle">Crafted with passion, served with love</p>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="section-padding bg-[var(--color-bg-page)]">
        <div className="container">
          {/* Categories Filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`menu-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                 {cat.label}
              </button>
            ))}
          </div>

          {/* Dish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
             {filteredMenu.map(dish => (
               <DishCard 
                 key={dish.id}
                 image="/images/placeholder-dish.jpg" // Using placeholder as specific images aren't in mock data for menu
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
      <section className="tasting-menu-section section-padding">
        <div className="container flex justify-center">
            <div className="tasting-menu-card">
              <h2 className="tasting-title">Chef's Tasting Menu</h2>
              
              <div className="tasting-courses">
                {data.tastingMenu.map((course, index) => (
                  <div key={index} className="tasting-course">
                    <span className="course-label">{course.course}. {course.label}</span>
                    <h3 className="course-dish">{course.dish}</h3>
                  </div>
                ))}
              </div>

              <div className="tasting-price-wrapper">
                 <div className="tasting-price">$145 per person</div>
                 <Button variant="primary" className="mt-4">
                     RESERVE THIS EXPERIENCE
                 </Button>
              </div>
            </div>
        </div>
      </section>

      {/* Drinks & Wine Section */}
      <section className="drinks-section section-padding bg-[var(--color-bg-sustainability)]">
         <div className="container">
            <SectionHeader 
               title="Drinks & Wine" 
               align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-12">
               {/* Vintage Cellar */}
               <div>
                  <h3 className="drinks-category-title">Vintage Cellar</h3>
                  <div className="drinks-list">
                     {data.wines.map(wine => (
                        <div key={wine.id} className="drink-item">
                           <div className="drink-info">
                              <h4 className="drink-name">{wine.name}</h4>
                              <span className="drink-origin">{wine.origin}</span>
                           </div>
                           <div className="drink-price">{wine.price}</div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Craft Cocktails */}
               <div>
                  <h3 className="drinks-category-title">Craft Cocktails</h3>
                  <div className="drinks-list">
                     {data.cocktails.map(cocktail => (
                        <div key={cocktail.id} className="drink-item">
                           <div className="drink-info">
                              <h4 className="drink-name">{cocktail.name}</h4>
                              <span className="drink-origin">{cocktail.description}</span>
                           </div>
                           <div className="drink-price">${cocktail.price}</div>
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

export default Menu;
