import React from 'react'
import { useDispatch } from 'react-redux'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router'
import Dropdown from '@/components/ui/Dropdown'
import { setSelectedBrands, setSelectedColors, setActiveCategory, setActiveChildCategory } from '@/features/product/productPageSlice'

const CategoryList = ({ categories, active, activeChild, setActive, setActiveChild, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCategoryClick = (cat) => {
    setActive(cat)
    setActiveChild(undefined)
    dispatch(setSelectedBrands([]))
    dispatch(setSelectedColors([]))
    dispatch(setActiveCategory(cat))
    if (cat.slug) {
      navigate(`/category/${cat.slug}`)
    }
    onClose?.()
  }

  const handleChildClick = (child) => {
    setActiveChild(child.name)
    dispatch(setSelectedBrands([]))
    dispatch(setActiveChildCategory(child.name))
    if (active?.slug && child.slug) {
      navigate(`/category/${active.slug}/${child.slug}`)
    }
    
    onClose?.()
  }

  return (
    <div className="border-[2px] pt-3 border-gray-300 dark:border-[#333333] rounded">
      <Dropdown
        title="Show All Categories"
        icon={<ChevronDown size={20} />}
        icon2={<ChevronUp size={20} />}
        duration="duration-400"
        titleCls="text-tcolor dark:text-gray-100 font-pop pl-5 pb-4 font-medium"
      >
        <hr className="text-gray-300" />
        <div className="px-3">
          {categories
            ?.filter((category) => category.name !== active?.name)
            .map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleCategoryClick(cat)}
                className="font-pop flex text-[15px] items-center gap-2 text-tcolor dark:text-gray-100 border-b border-b-gray-200 dark:border-b-[#333333] pl-6 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
              >
                {cat.name}
                <span className="font-pop text-[12px] text-gray-400 dark:text-gray-500 font-normal">({cat.count})</span>
              </div>
            ))}
        </div>
      </Dropdown>

      {active && (
        <>
          <div className="border-t border-t-gray-300 font-semibold pl-6 font-pop border-b border-b-gray-300 dark:border-b-[#333333] pt-4 pb-2">
            {active.name}
            <span className="font-pop text-[12px] text-gray-400 dark:text-gray-500 font-normal pl-2">({active.count})</span>
          </div>
          {active.children?.map((child) => (
            <div
              key={child._id}
              onClick={() => handleChildClick(child)}
              className={`font-pop flex text-[15px] items-center gap-2 border-b mx-3 border-b-gray-200 dark:border-b-[#333333] pl-7 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] ${
                activeChild === child.name ? 'text-black dark:text-gray-100 font-medium' : 'text-tcolor dark:text-gray-100'
              }`}
            >
              {child.name}
              <span className="font-pop text-[12px] text-gray-400 dark:text-gray-500 font-normal pl-2">({child.count})</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default React.memo(CategoryList)
