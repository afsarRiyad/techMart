import { Check, GitCompareArrows, Heart } from 'lucide-react'
import { Link } from 'react-router'

const ALIGN = {
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
  between: 'justify-between',
}


const CardActions = ({
  productId,
  inWishlist = false,
  inCompare = false,
  onWishlist,
  onCompare,
  align = 'center',
  layout = 'auto',
  accent,
  className = '',
  overlayClassName = '',
  rowClassName = '',
}) => {
  
  // What shows is decided by the bar's own width, not the viewport's (`@container`
  // on the bar, further down): the same card measures 137px in a 4-up grid and
  // 224px on a tablet, and the row has to fit both. The icons only join the labels
  // when there is room for two icon+label pairs (~150px of content) — a phone card
  // has that, that narrow grid card does not.
  // the thresholds are the bar's *content* box, which is what a container query
  // measures: 154px on a phone, 120px in that narrow grid, 186px on a wide grid
  const icon = 'hidden h-3.5 w-3.5 shrink-0 @[150px]:block @[180px]:h-4 @[180px]:w-4'
  const label = 'text-[12px] @[180px]:text-[13px]'
  const control = 'tapTarget min-w-11 shrink-0 gap-1 px-1 font-medium whitespace-nowrap @[180px]:gap-1.5'

  // "saved" is the icon filling in (and a tick replacing the arrows on compare)
  // plus the text going solid, not a longer sentence: "Added to Wishlist" next to
  // "Added to Compare" is 340px of text, more than any of these bars has.
  const done = 'text-tcolor dark:text-gray-100'

  const wishlistControl = inWishlist ? (
    <Link to='/wishlist' aria-label='In your wishlist' className={`${control} ${done}`}>
      <Heart size={16} className={`${icon} ${done}`} fill='currentColor' />
      <span className={label}>Wishlist</span>
    </Link>
  ) : (
    <button
      type='button'
      aria-label='Add to wishlist'
      onClick={() => onWishlist?.(productId)}
      className={control}
    >
      <Heart size={16} className={icon} />
      <span className={label}>Wishlist</span>
    </button>
  )

  // added to compare swaps the arrows for a tick, so the state reads at a glance
  // even where the icon is the only thing visible
  const compareControl = inCompare ? (
    <Link to='/compare' aria-label='In your compare list' className={`${control} ${done}`}>
      <Check size={16} className={`${icon} ${done}`} strokeWidth={3} />
      <span className={label}>Compare</span>
    </Link>
  ) : (
    <button
      type='button'
      aria-label='Add to compare'
      onClick={() => onCompare?.(productId)}
      className={control}
    >
      <GitCompareArrows size={16} className={icon} />
      <span className={label}>Compare</span>
    </button>
  )

  // the row stays full width on every layout, otherwise justify-* has nothing
  // to push against and the controls collapse into the middle of the bar
  const row = (
    <div className={`flex w-full flex-wrap items-center gap-1 ${ALIGN[align] || ALIGN.center} ${rowClassName}`}>
      {wishlistControl}
      {compareControl}
    </div>
  )

  if (layout === 'inline') {
    return <div className={`cardActions @container ${className}`}>{row}</div>
  }

  return (
    <div
      className={`cardActions @container invisible absolute left-0 right-0 bottom-4 z-50 translate-y-full px-2 py-3 opacity-0 shadow-xl transition-all duration-200 group-hover/card:visible group-hover/card:opacity-100 ${
        accent ? `before:absolute before:top-0 before:content-[''] before:border-t-2 before:border-primary ${accent}` : ''
      } ${className} ${overlayClassName}`}
    >
      {row}
    </div>
  )
}

export default CardActions
