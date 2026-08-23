import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'

const Accessories = ({ data = [] }) => {
  const addTocart = useAddToCart()
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(data.map((item) => item._id))
  )

  const getId = (item) => item._id
  const getPrice = (item) => item.salePrice ?? item.price

  const toggleItem = (item, index) => {
    if (index === 0) return 

    const id = getId(item)
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectedItems = data.filter((item) => selectedIds.has(getId(item)))
  const total = selectedItems.reduce((sum, item) => sum + getPrice(item), 0)
  const itemCount = selectedItems.length
  const isAddToCartDisabled = itemCount === 0

  const handleAddAllToCart = async(id) => {
    const arr = [...selectedIds]
  await  Promise.all(
      arr.map(id => addTocart.mutate({product: id}))
    )
  }

  return (
    <div className="w-full font-pop">
      <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-6 lg:gap-10">
        {/* Product row */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center w-full lg:w-auto lg:max-w-[70%]">
          {data.map((item, index) => {
            const displayPrice = getPrice(item)
            const hasSale =
              item.regularPrice &&
              item.salePrice &&
              item.regularPrice > item.salePrice
            const id = getId(item)
            const isSelected = selectedIds.has(id)

            return (
              <React.Fragment key={id}>
                {index !== 0 && (
                  <div className="relative flex sm:flex-col items-center justify-center w-full sm:w-10 h-10 sm:h-auto shrink-0 my-1 sm:my-0">
                    <div className="absolute inset-x-6 top-1/2 h-px bg-gray-300 sm:inset-x-0 sm:inset-y-6 sm:w-px sm:h-auto sm:left-1/2" />
                    <span className="relative z-10 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 text-lg shrink-0">
                      +
                    </span>
                  </div>
                )}

                <div
                  className={`flex flex-col items-center sm:items-start w-full sm:w-[150px] lg:w-[170px] shrink-0 transition-opacity ${
                    !isSelected ? 'opacity-40' : ''
                  }`}
                >
                  {/* Categories */}
                  <div className="flex gap-1 flex-nowrap min-w-0 overflow-hidden w-full justify-center sm:justify-start">
                    {item.categories?.map((cat) => (
                      <span
                        key={cat}
                        className="whitespace-nowrap text-[12px] font-medium text-gray-500"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Product name */}
                  <Link
                    to={`/products/${item.slug || id}`}
                    className="text-[#0062BD] text-[15px] sm:text-[16px] min-h-fit sm:min-h-12 leading-tight pt-2 font-semibold line-clamp-2 cursor-pointer text-center sm:text-left"
                  >
                    {item.name}
                  </Link>

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain cursor-pointer"
                  />

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pb-3">
                    <p className={` font-medium text-[18px] sm:text-[20px] ${index === 0 ? 'text-gray-400' : 'text-tcolor'}`}>
                      ${displayPrice.toFixed(2)}
                    </p>
                    {hasSale && (
                      <p className="text-red-400 font-medium text-[12px] sm:text-[13px] line-through">
                        ${item.regularPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* Price summary + Add all to cart */}
        <div className="flex flex-col items-start sm:items-center lg:items-start gap-1 pt-1 shrink-0 w-full lg:w-auto">
          <p className="text-red-600 font-semibold text-[24px] sm:text-[28px]">
            ${total.toFixed(2)}
          </p>
          <p className="text-gray-500 text-sm">for {itemCount} item(s)</p>
          <button
            onClick={handleAddAllToCart}
            disabled={isAddToCartDisabled}
            className="mt-2 w-full sm:w-auto px-6 py-2 rounded-full bg-gray-100 cursor-pointer hover:bg-black hover:text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 transition-colors"
          >
            Add all to cart
          </button>
        </div>
      </div>

      {/* Checkbox list */}
      <div className="flex flex-col gap-3 mt-6">
        {data.map((item, index) => {
          const displayPrice = getPrice(item)
          const id = getId(item)
          const isSelected = selectedIds.has(id)

          if (index === 0) {
            return (
              <div key={id} className="flex items-start sm:items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="accent-gray-400 cursor-not-allowed mt-0.5 sm:mt-0 shrink-0"
                />
                <span className="text-gray-500 font-medium">
                  This product: {item.name} -{' '}
                  <span className="text-red-600 font-semibold">
                    ${displayPrice.toFixed(2)}
                  </span>
                </span>
              </div>
            )
          }

          return (
            <label
              key={id}
              className="flex items-start sm:items-center gap-2 text-sm cursor-pointer w-fit"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItem(item, index)}
                className="accent-[#0062BD] cursor-pointer mt-0.5 sm:mt-0 shrink-0"
              />
              <span>
                <Link
                  to={`/products/${item.slug || id}`}
                  className="text-[#0062BD] font-medium underline hover:text-[#004a94]"
                >
                  {item.name}
                </Link>{' '}
                -{' '}
                <span className="text-red-600 font-semibold">
                  ${displayPrice.toFixed(2)}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default Accessories