import React, { useEffect, useState } from 'react'
import styles from './MenuTable.module.css'

interface WeeklyMeal {
  day: string
  vegCurry: string
  vegDry: string
  nonVegCurry: string
  rice: string
  bread: string
  dips: string
}

const MenuTable: React.FC = () => {
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

    const section = document.getElementById('menu-table')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Fixed weekly meal data as specified
  const weeklyMeals: WeeklyMeal[] = [
    {
      day: "MONDAY",
      vegCurry: "TADKA DAL",
      vegDry: "MUTTER",
      nonVegCurry: "CHICKEN KARAHI",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    },
    {
      day: "TUESDAY",
      vegCurry: "BLACK EYE DAL",
      vegDry: "ALOO MUTTER",
      nonVegCurry: "CHICKEN TIKKA MASALA",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    },
    {
      day: "WEDNESDAY",
      vegCurry: "RAJMA",
      vegDry: "DUM ALOO",
      nonVegCurry: "BUTTER CHICKEN",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    },
    {
      day: "THURSDAY",
      vegCurry: "MIX DAL",
      vegDry: "MUTTER PANEER",
      nonVegCurry: "LAMB BIRYANI",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    },
    {
      day: "FRIDAY",
      vegCurry: "CHANA MASALA",
      vegDry: "MIX VEG",
      nonVegCurry: "LAMB KARAHI",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    },
    {
      day: "SATURDAY",
      vegCurry: "BUTTER PANEER",
      vegDry: "SWEET",
      nonVegCurry: "CHICKEN BIRYANI",
      rice: "BOILED RICE",
      bread: "CHAPATI",
      dips: "RAITA"
    }
  ]

  return (
    <section id="menu-table" className={styles.menuTable}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Weekly Menu Plan</h2>
          <p className={styles.subtitle}>
            Your complete weekly tiffin schedule with fresh, home-cooked meals
          </p>
        </div>

        {/* Table Container */}
        <div className={`${styles.tableContainer} ${isVisible ? styles.slideUp : ''}`}>
          {/* Desktop Table */}
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableHeadCell}>DAY</th>
                <th className={styles.tableHeadCell}>DISH 1 (VEG CURRY)</th>
                <th className={styles.tableHeadCell}>DISH 2 (VEG DRY)</th>
                <th className={styles.tableHeadCell}>DISH 1 (NONVEG CURRY)</th>
                <th className={styles.tableHeadCell}>RICE</th>
                <th className={styles.tableHeadCell}>BREAD</th>
                <th className={styles.tableHeadCell}>DIPS</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {weeklyMeals.map((meal, index) => (
                <tr key={meal.day} className={styles.tableRow}>
                  <td className={styles.tableCell}>{meal.day}</td>
                  <td className={styles.tableCell}>{meal.vegCurry}</td>
                  <td className={styles.tableCell}>{meal.vegDry}</td>
                  <td className={styles.tableCell}>{meal.nonVegCurry}</td>
                  <td className={styles.tableCell}>{meal.rice}</td>
                  <td className={styles.tableCell}>{meal.bread}</td>
                  <td className={styles.tableCell}>{meal.dips}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Scrollable Table */}
          <div className={styles.mobileScrollContainer}>
            <table className={`${styles.table} ${styles.mobileTable}`}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.tableHeadCell}>DAY</th>
                  <th className={styles.tableHeadCell}>DISH 1 (VEG CURRY)</th>
                  <th className={styles.tableHeadCell}>DISH 2 (VEG DRY)</th>
                  <th className={styles.tableHeadCell}>DISH 1 (NONVEG CURRY)</th>
                  <th className={styles.tableHeadCell}>RICE</th>
                  <th className={styles.tableHeadCell}>BREAD</th>
                  <th className={styles.tableHeadCell}>DIPS</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {weeklyMeals.map((meal, index) => (
                  <tr key={meal.day} className={styles.tableRow}>
                    <td className={styles.tableCell}>{meal.day}</td>
                    <td className={styles.tableCell}>{meal.vegCurry}</td>
                    <td className={styles.tableCell}>{meal.vegDry}</td>
                    <td className={styles.tableCell}>{meal.nonVegCurry}</td>
                    <td className={styles.tableCell}>{meal.rice}</td>
                    <td className={styles.tableCell}>{meal.bread}</td>
                    <td className={styles.tableCell}>{meal.dips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className={`${styles.scrollIndicator} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.scrollText}>
            Swipe to see all menu items
            <span className={styles.scrollArrow}>→</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default MenuTable