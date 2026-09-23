import React from 'react'
import { useSelector } from 'react-redux'
import { useGetCategories } from '@/features/product/hooks/useGetCategories'
import sidebarAd from '@/assets/images/sidebar-ad.webp'
import CategoryList from './CategoryList'
import FilterSection from './FilterSection'
import LatestProducts from './LatestProducts'

const SidebarContent = ({ active, setActive, activeChild, setActiveChild, onClose, classname = '' }) => {
  const { data: cat, isLoading } = useGetCategories()
  const { activeCategory } = useSelector((state) => state.productPage)

  // Use active prop if provided, otherwise fall back to Redux
  const currentActive = active || activeCategory
  const brands = currentActive?.filters?.brands
  const colors = currentActive?.filters?.colors

  if (isLoading) {
    return (
      <div className={`${classname} space-y-4`}>
        {/* Skeleton for categories */}
        <div className="border-[2px] pt-3 border-gray-300 dark:border-[#333333] rounded animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-[#333333] mx-5 mb-4 rounded" />
          <div className="space-y-2 px-5 pb-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-8 bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] rounded" />
            ))}
          </div>
        </div>
        {/* Skeleton for filters */}
        <div className="pt-6 space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-[#333333] rounded w-1/3" />
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-5 bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] rounded w-2/3" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${classname}`}>
      <CategoryList
        categories={cat?.data}
        active={currentActive}
        activeChild={activeChild}
        setActive={setActive}
        setActiveChild={setActiveChild}
        onClose={onClose}
      />
      <FilterSection brands={brands} colors={colors} onClose={onClose} />
      <img src={sidebarAd} alt="sidebar-Ad" className="pt-6 w-full" />
      <LatestProducts />
    </div>
  )
}

export default React.memo(SidebarContent)
