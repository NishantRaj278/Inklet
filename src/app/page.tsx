import Categories from '@/components/categories';
import Featured from '@/components/featured';
import React from 'react'

function HomePage() {
  return (
    <div>
      <Featured />
      <Categories />
    </div>
  )
}

export default HomePage;