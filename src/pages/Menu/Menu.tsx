import React from 'react'
import MenuToggleTable from './MenuToggleTable/MenuToggleTable'
import MenuTable from '../../components/MenuTable/MenuTable'
import WeeklyShowcase from './WeeklyShowcase/WeeklyShowcase'

const Menu: React.FC = () => {
  return (
    <div>
      <MenuToggleTable />
      <WeeklyShowcase />
      <MenuTable />
    </div>
  )
}

export default Menu