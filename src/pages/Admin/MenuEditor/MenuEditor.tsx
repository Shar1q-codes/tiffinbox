import React, { useState, useEffect } from 'react'
import styles from './MenuEditor.module.css'

interface Meal {
  id: string
  name: string
  description: string
  tag: string
  category: 'veg' | 'non-veg'
  isSpecial: boolean
}

interface FormData {
  name: string
  description: string
  tag: string
  category: 'veg' | 'non-veg'
  isSpecial: boolean
}

const MenuEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'veg' | 'non-veg'>('veg')
  const [meals, setMeals] = useState<Meal[]>([])
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    tag: '',
    category: 'veg',
    isSpecial: false
  })

  // Initialize with dummy data
  useEffect(() => {
    const dummyMeals: Meal[] = [
      {
        id: '1',
        name: 'Paneer Butter Masala + 2 Rotis + Jeera Rice',
        description: 'Creamy paneer curry with aromatic jeera rice and fresh rotis',
        tag: 'High Protein',
        category: 'veg',
        isSpecial: true
      },
      {
        id: '2',
        name: 'Dal Makhani + Aloo Gobi + Rice',
        description: 'Rich dal makhani with spiced aloo gobi and basmati rice',
        tag: 'Comfort Food',
        category: 'veg',
        isSpecial: false
      },
      {
        id: '3',
        name: 'Rajma Chawal + Mixed Veg',
        description: 'Traditional rajma curry with seasonal mixed vegetables',
        tag: 'Traditional',
        category: 'veg',
        isSpecial: false
      },
      {
        id: '4',
        name: 'Butter Chicken + Basmati Rice + Naan',
        description: 'Creamy tomato-based chicken curry with fragrant rice and naan',
        tag: 'Signature Dish',
        category: 'non-veg',
        isSpecial: true
      },
      {
        id: '5',
        name: 'Chicken Biryani + Raita',
        description: 'Aromatic chicken biryani with cooling raita and boiled egg',
        tag: "Chef's Special",
        category: 'non-veg',
        isSpecial: false
      },
      {
        id: '6',
        name: 'Fish Curry + Coconut Rice',
        description: 'South Indian style fish curry with coconut rice and papad',
        tag: 'Regional Special',
        category: 'non-veg',
        isSpecial: false
      }
    ]
    setMeals(dummyMeals)
  }, [])

  const filteredMeals = meals.filter(meal => meal.category === activeTab)
  const totalMeals = filteredMeals.length
  const specialMeals = filteredMeals.filter(meal => meal.isSpecial).length

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) return

    if (editingMeal) {
      // Update existing meal
      setMeals(prev => prev.map(meal => 
        meal.id === editingMeal.id 
          ? { ...meal, ...formData }
          : meal
      ))
      setEditingMeal(null)
    } else {
      // Add new meal
      const newMeal: Meal = {
        id: Date.now().toString(),
        ...formData,
        category: activeTab
      }
      setMeals(prev => [...prev, newMeal])
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      tag: '',
      category: activeTab,
      isSpecial: false
    })
  }

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal)
    setFormData({
      name: meal.name,
      description: meal.description,
      tag: meal.tag,
      category: meal.category,
      isSpecial: meal.isSpecial
    })
  }

  const handleDelete = (mealId: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      setMeals(prev => prev.filter(meal => meal.id !== mealId))
      if (editingMeal?.id === mealId) {
        setEditingMeal(null)
        setFormData({
          name: '',
          description: '',
          tag: '',
          category: activeTab,
          isSpecial: false
        })
      }
    }
  }

  const handleCancel = () => {
    setEditingMeal(null)
    setFormData({
      name: '',
      description: '',
      tag: '',
      category: activeTab,
      isSpecial: false
    })
  }

  const toggleSpecial = (mealId: string) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, isSpecial: !meal.isSpecial }
        : meal
    ))
  }

  const isFormValid = formData.name.trim().length > 0

  return (
    <div className={styles.menuEditor}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Menu Editor 🍽️</h1>
        <p className={styles.subtitle}>
          Manage your daily menu items and today's specials
        </p>
      </div>

      {/* Menu Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'veg' ? styles.active : ''}`}
            onClick={() => setActiveTab('veg')}
          >
            <span className={styles.tabIcon}>🥬</span>
            Vegetarian
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'non-veg' ? styles.active : ''}`}
            onClick={() => setActiveTab('non-veg')}
          >
            <span className={styles.tabIcon}>🍗</span>
            Non-Vegetarian
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summarySection}>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>📊</span>
            <div className={styles.summaryValue}>{totalMeals}</div>
            <div className={styles.summaryLabel}>Total {activeTab === 'veg' ? 'Veg' : 'Non-Veg'} Meals</div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>⭐</span>
            <div className={styles.summaryValue}>{specialMeals}</div>
            <div className={styles.summaryLabel}>Today's Specials</div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>🍽️</span>
            <div className={styles.summaryValue}>{meals.length}</div>
            <div className={styles.summaryLabel}>Total Menu Items</div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className={styles.contentLayout}>
        {/* Menu List */}
        <div className={styles.menuList}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>
              <span className={styles.listIcon}>
                {activeTab === 'veg' ? '🥬' : '🍗'}
              </span>
              {activeTab === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Menu
            </h2>
          </div>

          <div className={styles.mealsList}>
            {filteredMeals.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🍽️</span>
                <div className={styles.emptyText}>
                  No {activeTab === 'veg' ? 'vegetarian' : 'non-vegetarian'} meals added yet.
                  <br />
                  Add your first meal using the form on the right.
                </div>
              </div>
            ) : (
              filteredMeals.map((meal) => (
                <div key={meal.id} className={styles.mealItem}>
                  <div className={styles.mealHeader}>
                    <div className={styles.mealInfo}>
                      <h3 className={styles.mealName}>{meal.name}</h3>
                      {meal.description && (
                        <p className={styles.mealDescription}>{meal.description}</p>
                      )}
                      <div className={styles.mealTags}>
                        {meal.tag && (
                          <span className={styles.mealTag}>{meal.tag}</span>
                        )}
                        {meal.isSpecial && (
                          <span className={styles.specialBadge}>
                            ⭐ Today's Special
                          </span>
                        )}
                      </div>
                      <div className={styles.specialToggle}>
                        <span className={styles.toggleLabel}>Today's Special:</span>
                        <button
                          className={`${styles.toggleSwitch} ${meal.isSpecial ? styles.active : ''}`}
                          onClick={() => toggleSpecial(meal.id)}
                          aria-label={`Toggle special status for ${meal.name}`}
                        >
                          <div className={styles.toggleKnob}></div>
                        </button>
                      </div>
                    </div>
                    <div className={styles.mealActions}>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => handleEdit(meal)}
                        aria-label={`Edit ${meal.name}`}
                      >
                        🖊️
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(meal.id)}
                        aria-label={`Delete ${meal.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              <span className={styles.formIcon}>
                {editingMeal ? '🖊️' : '➕'}
              </span>
              {editingMeal ? 'Edit Meal' : 'Add New Meal'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.fieldLabel}>
                Dish Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.fieldInput}
                placeholder="e.g., Paneer Butter Masala + 2 Rotis"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="description" className={styles.fieldLabel}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={styles.fieldTextarea}
                placeholder="Brief description of the meal..."
                rows={3}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="tag" className={styles.fieldLabel}>
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                className={styles.fieldSelect}
              >
                <option value="">Select a tag</option>
                <option value="High Protein">High Protein</option>
                <option value="Comfort Food">Comfort Food</option>
                <option value="Traditional">Traditional</option>
                <option value="Signature Dish">Signature Dish</option>
                <option value="Chef's Special">Chef's Special</option>
                <option value="Regional Special">Regional Special</option>
                <option value="Healthy Choice">Healthy Choice</option>
                <option value="Spicy">Spicy</option>
                <option value="Mild">Mild</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="category" className={styles.fieldLabel}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={styles.fieldSelect}
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="isSpecial"
                name="isSpecial"
                checked={formData.isSpecial}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <label htmlFor="isSpecial" className={styles.checkboxLabel}>
                Mark as Today's Special ⭐
              </label>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={!isFormValid}
              >
                {editingMeal ? 'Update Meal' : 'Add Meal'}
              </button>
              {editingMeal && (
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MenuEditor