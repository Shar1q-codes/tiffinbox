import React from 'react'
import MenuToggleTable from './MenuToggleTable/MenuToggleTable'
import WeeklyShowcase from './WeeklyShowcase/WeeklyShowcase'

const Menu: React.FC = () => {
  return (
    <div>
      <MenuToggleTable />
      <WeeklyShowcase />
    </div>
  )
}

export default Menu