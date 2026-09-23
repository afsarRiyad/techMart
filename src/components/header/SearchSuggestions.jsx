import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

// live results under the search box, the same panel is used on mobile and desktop
const SearchSuggestions = ({ term, products = [], loading, onPick, onSeeAll, className = '' }) => {
  if (!term) return null

  return (
    <div
      className={`absolute left-0 right-0 top-full z-50 mt-2 max-h-[75vh] overflow-y-auto rounded-lg border border-gray-200 bg-white text-left shadow-xl dark:border-gray-700 dark:bg-[#181818] sm:max-h-[540px] ${className}`}
    >
      {loading && <p className='px-5 py-4 text-[15px] text-gray-500 dark:text-gray-400'>Searching...</p>}

      {!loading && products.length === 0 && (
        <p className='px-5 py-4 text-[15px] text-gray-500 dark:text-gray-400'>No products found.</p>
      )}

      {!loading && products.map((product) => (
        <Link
          key={product._id ?? product.slug}
          to={`/products/${product.slug}`}
          onClick={onPick}
          className='flex items-center gap-4 border-b border-b-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50 dark:border-b-white/10 dark:hover:bg-white/5'
        >
          <img src={product.image} alt={product.name} loading='lazy' className='w-14 h-14 shrink-0 object-contain' />
          <span className='flex-1 min-w-0'>
            <span className='block truncate text-[15px] font-medium text-[#333E48] dark:text-gray-100'>
              {product.name}
            </span>
            {product.categories?.length > 0 && (
              <span className='block truncate text-[13px] text-gray-500 dark:text-gray-400'>
                {product.categories.join(', ')}
              </span>
            )}
          </span>
          <span className='shrink-0 text-[16px] font-semibold text-[#333E48] dark:text-gray-100'>${product.price}</span>
        </Link>
      ))}

      {!loading && products.length > 0 && (
        <button
          type='button'
          onClick={onSeeAll}
          className='flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-[15px] font-semibold text-tcolor dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5'
        >
          See all results for "{term}"
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  )
}

export default SearchSuggestions
