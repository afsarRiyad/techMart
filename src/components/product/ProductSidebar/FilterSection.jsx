import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedBrands, setSelectedColors, setPriceRange, resetFilters } from '@/features/product/productPageSlice'
import { X } from 'lucide-react'

const CheckBox = React.memo(({ filter, selectedItems, isBrand = true, onClose }) => {
  const filterName = typeof filter === 'string' ? filter : filter?.name || ''
  const filterId = filterName.replace(/\s+/g, '-').toLowerCase()
  const dispatch = useDispatch()
  const isChecked = selectedItems.includes(filterName)

  const handleChange = useCallback(() => {
    const newItems = isChecked
      ? selectedItems.filter((item) => item !== filterName)
      : [...selectedItems, filterName]

    if (isBrand) {
      dispatch(setSelectedBrands(newItems))
    } else {
      dispatch(setSelectedColors(newItems))
    }
    onClose?.()
  }, [isChecked, selectedItems, filterName, isBrand, dispatch, onClose])

  return (
    <div className="flex items-center gap-2 group">
      <input onChange={handleChange} type="checkbox" id={filterId} className="peer hidden" />
      <label
        htmlFor={filterId}
        className={`w-4 h-4 border-1 rounded-sm cursor-pointer flex items-center justify-center transition-all duration-200 ${
          isChecked
            ? 'bg-primary text-tcolor border-primary'
            : 'bg-white dark:bg-[#212121] text-transparent border-gray-400 dark:border-[#444444] group-hover:text-primary group-hover:border-primary'
        }`}
      >
        ✓
      </label>
      <label htmlFor={filterId} className="cursor-pointer select-none text-tcolor dark:text-gray-100 transition-colors duration-200">
        {filterName}
      </label>
    </div>
  )
})

CheckBox.displayName = 'CheckBox'

const FilterSection = ({ brands, colors, onClose }) => {
  const [expandedBrands, setExpandedBrands] = useState(false)
  const [expandedColors, setExpandedColors] = useState(false)
  const dispatch = useDispatch()
  const { selectedBrands, selectedColors, priceRange } = useSelector((state) => state.productPage)
  const isPriceDefault = priceRange[0] === 0 && priceRange[1] === 10000

  const visibleBrands = expandedBrands ? brands : brands?.slice(0, 5)
  const visibleColors = expandedColors ? colors : colors?.slice(0, 5)

  const activeFilters = useMemo(() => {
    const chips = []
    selectedBrands.forEach((b) => chips.push({ type: 'brand', value: b }))
    selectedColors.forEach((c) => chips.push({ type: 'color', value: c }))
    if (!isPriceDefault) chips.push({ type: 'price', value: `$${priceRange[0]} – $${priceRange[1]}` })
    return chips
  }, [selectedBrands, selectedColors, isPriceDefault, priceRange])

  const removeFilter = useCallback((type, value) => {
    if (type === 'brand') dispatch(setSelectedBrands(selectedBrands.filter((b) => b !== value)))
    else if (type === 'color') dispatch(setSelectedColors(selectedColors.filter((c) => c !== value)))
    else dispatch(setPriceRange([0, 10000]))
  }, [selectedBrands, selectedColors, dispatch])

  if (!brands) return null

  return (
    <>
      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="pt-6 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map(({ type, value }) => (
              <button
                key={`${type}-${value}`}
                onClick={() => removeFilter(type, value)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100 transition-colors cursor-pointer animate-chip-in"
              >
                {value} <X size={12} className="text-red-500" />
              </button>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="mt-2 text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <>
          <div className="border-b border-b-gray-300 dark:border-b-[#333333] pb-3 pt-8 mb-5">
            <span className="font-medium text-[18px] text-tcolor dark:text-gray-100 border-b-[2px] border-b-primary pb-[13px]">
              Filters
            </span>
          </div>

          <div className="pb-4">
            <h2 className="font-bold font-pop text-tcolor dark:text-gray-100 text-[14px] pb-2">Brands</h2>

            {visibleBrands?.map((filter) => (
              <CheckBox
                key={filter.name || filter}
                filter={filter}
                selectedItems={selectedBrands}
                isBrand={true}
                onClose={onClose}
              />
            ))}

            {brands.length > 5 && (
              <button
                type="button"
                className="cursor-pointer pt-3 font-semibold font-pop pb-3"
                onClick={() => setExpandedBrands((prev) => !prev)}
              >
                {expandedBrands ? '− Show less' : '+ Show more'}
              </button>
            )}
          </div>
        </>
      )}

      {/* Colors */}
      {colors && colors.length > 0 && (
        <div className={`border-t border-t-gray-300 pb-5 ${colors.length > 0 ?'border-b border-b-gray-300 dark:border-b-[#333333]' : ''}`}>
          <h2 className="font-bold font-pop text-tcolor dark:text-gray-100 text-[14px] pb-2 pt-4">Colors</h2>

          {visibleColors?.map((color) => (
            <CheckBox
              key={color.name || color}
              filter={color}
              selectedItems={selectedColors}
              isBrand={false}
              onClose={onClose}
            />
          ))}

          {colors.length > 5 && (
            <button
              type="button"
              className="cursor-pointer pt-3 font-semibold font-pop"
              onClick={() => setExpandedColors((prev) => !prev)}
            >
              {expandedColors ? '− Show less' : '+ Show more'}
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default React.memo(FilterSection)
