import { Link } from 'react-router'
import { GitCompareArrows, Heart } from 'lucide-react'
import { useCompare } from '@/features/compare/hooks/useCompare'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'

// the header icons are lg only, so touch screens get these two instead,
// stacked bottom right and clear of the compare bar
const MobileQuickActions = () => {
  const { data: compareData } = useCompare()
  const { data: wishlistData } = useWishlist()
  const compareCount = compareData?.data?.length ?? 0
  const wishlistCount = wishlistData?.data?.length ?? 0

  const actions = [
    { to: '/compare', label: 'Compare products', Icon: GitCompareArrows, count: compareCount },
    { to: '/wishlist', label: 'Browse wishlist', Icon: Heart, count: wishlistCount },
  ]

  return (
    <div className='fixed bottom-5 right-3 z-40 flex flex-col gap-3 sm:bottom-32 lg:hidden'>
      {actions.map(({ to, label, Icon, count }) => (
        <Link
          key={to}
          to={to}
          aria-label={label}
          className='relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-tcolor shadow-lg transition-colors duration-200 hover:bg-primary dark:border-gray-700 dark:bg-neutral-900 dark:text-gray-200'
        >
          <Icon size={20} />
          {count > 0 && (
            <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-black'>
              {count}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default MobileQuickActions
