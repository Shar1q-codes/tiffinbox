import React, { useState, useEffect } from 'react'
import { 
  getMenuItems, 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  MenuItem 
} from '../../../services/firestore'
import styles from './MenuEditor.module.css'

interface FormData {
  name: string
  description: string
  tag: string
  category: 'veg' | 'non-veg'
  isSpecial: boolean
}

const MenuEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'veg' | 'non-veg'>('veg')
  const [meals, setMeals] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMeal, setEditingMeal] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    tag: '',
    category: 'veg',
    isSpecial: false
  })

  // Load menu items from Firestore
  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    try {
      setLoading(true)
      const items = await getMenuItems()
      setMeals(items)
    } catch (error) {
      console.error('Error loading menu items:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) return

    try {
      if (editingMeal) {
        // Update existing meal
        await updateMenuItem(editingMeal.id!, formData)
        setEditingMeal(null)
      } else {
        // Add new meal
        await addMenuItem({
          ...formData,
          category: activeTab
        })
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        tag: '',
        category: activeTab,
        isSpecial: false
      })

      // Reload menu items
      await loadMenuItems()
    } catch (error) {
      console.error('Error saving menu item:', error)
    }
  }

  const handleEdit = (meal: MenuItem) => {
    setEditingMeal(meal)
    setFormData({
      name: meal.name,
      description: meal.description,
      tag: meal.tag,
      category: meal.category,
      isSpecial: meal.isSpecial
    })
  }

  const handleDelete = async (mealId: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        await deleteMenuItem(mealId)
        await loadMenuItems()
        
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
      } catch (error) {
        console.error('Error deleting menu item:', error)
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

  const toggleSpecial = async (meal: MenuItem) => {
    try {
      await updateMenuItem(meal.id!, { isSpecial: !meal.isSpecial })
      await loadMenuItems()
    } catch (error) {
      console.error('Error updating special status:', error)
    }
  }

  const isFormValid = formData.name.trim().length > 0

  if (loading) {
    return (
      <div className={styles.menuEditor}>
        <div className={styles.header}>
          <h1 className={styles.title}>Menu Editor 🍽️</h1>
          <p className={styles.subtitle}>
            Loading menu items...
          </p>
        </div>
      </div>
    )
  }

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
                          onClick={() => toggleSpecial(meal)}
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
                        onClick={() => handleDelete(meal.id!)}
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