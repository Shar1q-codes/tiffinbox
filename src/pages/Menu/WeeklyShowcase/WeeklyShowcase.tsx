import React, { useEffect, useState } from 'react'
import styles from './WeeklyShowcase.module.css'

interface WeeklyMeal {
  day: string
  title: string
  description: string
  image: string
  tag: string
  alt: string
}

const WeeklyShowcase: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('weekly-showcase')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const weeklyMeals: WeeklyMeal[] = [
    {
      day: "Mon",
      title: "Rajma + Aloo Gobi",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "Monday Special",
      alt: "Rajma curry with aloo gobi, rice and chapatis"
    },
    {
      day: "Tue",
      title: "Chole + Mixed Veg",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "High Protein",
      alt: "Chole curry with mixed vegetables, rice and chapatis"
    },
    {
      day: "Wed",
      title: "Paneer Masala + Dal",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "Midweek Treat",
      alt: "Paneer masala with dal, rice and chapatis"
    },
    {
      day: "Thu",
      title: "Aloo Tamatar + Beans",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "Balanced Meal",
      alt: "Aloo tamatar with beans curry, rice and chapatis"
    },
    {
      day: "Fri",
      title: "Veg Korma + Cabbage Fry",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "Spice Light",
      alt: "Vegetable korma with cabbage fry, rice and chapatis"
    },
    {
      day: "Sat",
      title: "Dal Tadka + Baingan Bharta",
      description: "Served with rice & 2 soft chapatis",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",
      tag: "Weekend Favorite",
      alt: "Dal tadka with baingan bharta, rice and chapatis"
    }
  ]

  const scrollLeft = () => {
    const container = document.getElementById('weekly-cards-container')
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('weekly-cards-container')
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section id="weekly-showcase" className={styles.weeklyShowcase}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>This Week's Tiffins</h2>
          <p className={styles.subtitle}>
            Here's what your week will taste like…
          </p>
        </div>

        <div className={styles.sliderWrapper}>
          <button 
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <div 
            id="weekly-cards-container"
            className={`${styles.cardsContainer} ${isVisible ? styles.slideIn : ''}`}
          >
            {weeklyMeals.map((meal, index) => (
              <div
                key={meal.day}
                className={`${styles.mealCard} ${isVisible ? styles.fadeIn : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.dayBadge}>
                  {meal.day.toUpperCase()}
                </div>
                
                <div className={styles.imageContainer}>
                  <img
                    src={meal.image}
                    alt={meal.alt}
                    className={styles.mealImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.tagBadge}>
                      {meal.tag}
                    </span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.mealTitle}>{meal.title}</h3>
                  <p className={styles.mealDescription}>{meal.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>

        <div className={`${styles.scrollIndicator} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.scrollText}>
            Swipe to see more meals →
          </span>
        </div>
      </div>
    </section>
  )
}

export default WeeklyShowcase