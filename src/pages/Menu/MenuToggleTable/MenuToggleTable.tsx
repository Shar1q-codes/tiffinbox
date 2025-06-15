import React, { useState, useEffect } from 'react'
import styles from './MenuToggleTable.module.css'

interface Meal {
  id: number
  title: string
  description: string
  tag?: string
  image: string
  spicy: boolean
  alt: string
}

interface MenuData {
  type: 'veg' | 'non-veg'
  meals: Meal[]
}

const MenuToggleTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'veg' | 'non-veg'>('veg')
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

    const section = document.getElementById('menu-toggle-table')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const menuData: Record<'veg' | 'non-veg', MenuData> = {
    veg: {
      type: 'veg',
      meals: [
        {
          id: 1,
          title: 'Paneer Butter Masala + Jeera Rice',
          description: 'Includes 2 flavorful curries, rice, and 2 soft chapatis',
          tag: 'High Protein',
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: false,
          alt: 'Paneer butter masala with jeera rice and chapatis'
        },
        {
          id: 2,
          title: 'Dal Makhani + Aloo Gobi + Rice',
          description: 'Creamy dal makhani, spiced aloo gobi, basmati rice, and fresh roti',
          tag: "Today's Special",
          image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: false,
          alt: 'Dal makhani with aloo gobi and basmati rice'
        },
        {
          id: 3,
          title: 'Rajma Chawal + Mixed Veg',
          description: 'Traditional rajma curry, seasonal mixed vegetables, and steamed rice',
          tag: 'Comfort Food',
          image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Rajma chawal with mixed vegetables'
        },
        {
          id: 4,
          title: 'Chole Bhature + Pickle',
          description: 'Spicy chickpea curry with fluffy bhature bread and tangy pickle',
          tag: 'Weekend Special',
          image: 'https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Chole bhature with pickle and onions'
        },
        {
          id: 5,
          title: 'Palak Paneer + Garlic Naan',
          description: 'Fresh spinach curry with cottage cheese, served with garlic naan',
          tag: 'Healthy Choice',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: false,
          alt: 'Palak paneer with garlic naan bread'
        },
        {
          id: 6,
          title: 'Baingan Bharta + Tawa Roti',
          description: 'Smoky roasted eggplant curry with freshly made tawa roti',
          tag: 'Traditional',
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Baingan bharta with tawa roti'
        }
      ]
    },
    'non-veg': {
      type: 'non-veg',
      meals: [
        {
          id: 7,
          title: 'Butter Chicken + Basmati Rice',
          description: 'Creamy tomato-based chicken curry with fragrant basmati rice and naan',
          tag: 'Signature Dish',
          image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: false,
          alt: 'Butter chicken with basmati rice and naan'
        },
        {
          id: 8,
          title: 'Chicken Biryani + Raita',
          description: 'Aromatic chicken biryani with boiled egg, served with cooling raita',
          tag: "Chef's Special",
          image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Chicken biryani with raita and boiled egg'
        },
        {
          id: 9,
          title: 'Fish Curry + Coconut Rice',
          description: 'South Indian style fish curry with coconut rice and papad',
          tag: 'Regional Special',
          image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Fish curry with coconut rice and papad'
        },
        {
          id: 10,
          title: 'Mutton Curry + Jeera Rice',
          description: 'Tender mutton curry slow-cooked with spices, served with jeera rice',
          tag: 'Premium',
          image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Mutton curry with jeera rice'
        },
        {
          id: 11,
          title: 'Chicken Tikka Masala + Roti',
          description: 'Grilled chicken tikka in rich masala gravy with butter roti',
          tag: 'Popular Choice',
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: false,
          alt: 'Chicken tikka masala with butter roti'
        },
        {
          id: 12,
          title: 'Egg Curry + Paratha',
          description: 'Spiced egg curry with onions and tomatoes, served with flaky paratha',
          tag: 'Budget Friendly',
          image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600',
          spicy: true,
          alt: 'Egg curry with paratha bread'
        }
      ]
    }
  }

  const currentMenu = menuData[activeTab]
  const currentPrice = activeTab === 'veg' ? '₹181.99' : '₹259.99'

  return (
    <section id="menu-toggle-table" className={styles.menuToggleTable}>
      <div className={styles.container}>
        {/* Toggle Tabs */}
        <div className={`${styles.toggleSection} ${isVisible ? styles.fadeIn : ''}`}>
          <div className={styles.toggleTabs}>
            <button
              className={`${styles.tab} ${activeTab === 'veg' ? styles.active : ''}`}
              onClick={() => setActiveTab('veg')}
            >
              🥬 Vegetarian
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'non-veg' ? styles.active : ''}`}
              onClick={() => setActiveTab('non-veg')}
            >
              🍗 Non-Vegetarian
            </button>
          </div>
        </div>

        {/* Daily Menu Display */}
        <div className={`${styles.menuDisplay} ${isVisible ? styles.slideUp : ''}`}>
          <div className={styles.mealsGrid}>
            {currentMenu.meals.map((meal, index) => (
              <div
                key={meal.id}
                className={`${styles.mealCard} ${isVisible ? styles.fadeIn : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={meal.image}
                    alt={meal.alt}
                    className={styles.mealImage}
                  />
                  {meal.tag && (
                    <div className={styles.tagBadge}>
                      {meal.tag}
                    </div>
                  )}
                  {meal.spicy && (
                    <div className={styles.spicyIndicator}>
                      🌶️
                    </div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.mealTitle}>{meal.title}</h3>
                  <p className={styles.mealDescription}>{meal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Banner */}
        <div className={`${styles.pricingBanner} ${isVisible ? styles.fadeIn : ''}`}>
          <div className={styles.pricingContent}>
            <h3 className={styles.pricingTitle}>Today's Price</h3>
            <div className={styles.priceDisplay}>
              <span className={styles.currentPrice}>
                {activeTab === 'veg' ? 'Veg' : 'Non-Veg'} {currentPrice}/day
              </span>
              <span className={styles.alternatePrice}>
                {activeTab === 'veg' ? 'Non-Veg ₹259.99' : 'Veg ₹181.99'}
              </span>
            </div>
          </div>
        </div>

        {/* Student Discount CTA */}
        <div className={`${styles.studentDiscountCta} ${isVisible ? styles.fadeIn : ''}`}>
          <div className={styles.discountCard}>
            <div className={styles.discountHeader}>
              <h3 className={styles.discountTitle}>🎓 Student Special</h3>
            </div>
            <p className={styles.discountText}>
              Get 20% off your monthly plan. Just verify your student ID during signup.
            </p>
            <button className={styles.discountButton}>
              Claim Student Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuToggleTable