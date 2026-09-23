import { Link, useLocation } from 'react-router'
import { X } from 'lucide-react'
import Container from '@/components/layout/Container'
import { useCompare } from '@/features/compare/hooks/useCompare'
import { useRemoveCompare } from '@/features/compare/hooks/useRemoveCompare'

// filled products plus dashed placeholders, like the reference tray
const SLOTS = 5

// one slot box, shared by products, empty slots and the "+ more" tile
const SLOT_BOX = 'h-[60px] w-[46px] sm:h-[72px] sm:w-[54px]'

// the tray only gets in the way on these pages
const HIDE_ON = ['/compare', '/cart', '/checkout', '/order-received']

const CompareBar = () => {
  const location = useLocation()
  const removeCompare = useRemoveCompare()
  const { data } = useCompare()
  const items = data?.data ?? []

  const hideHere =
    HIDE_ON.includes(location.pathname) ||
    location.pathname.startsWith('/account') ||
    location.pathname.startsWith('/auth')

  if (items.length === 0 || hideHere) return null

  // past the slot count the last slot turns into a "+N more" tile
  const hasMore = items.length > SLOTS
  const shown = hasMore ? items.slice(0, SLOTS - 1) : items
  const emptySlots = hasMore ? 0 : SLOTS - items.length
  const moreCount = items.length - shown.length
  // the comparison page needs two products to be useful
  const canCompare = items.length >= 2

  return (
    <>
      {/* phones skip the tray, so they skip its spacer too */}
      <div className='hidden h-[112px] sm:block' aria-hidden='true' />

      {/* plain see through fill, no blur, so the page stays visible behind it */}
      {/* hidden on phones: the bar covers too much of a small screen */}
      <div className='fixed inset-x-0 bottom-0 z-40 hidden border-t border-transparent bg-[#333E48]/80 text-white sm:block dark:border-[#333333] dark:bg-[#212121]/95'>
        <Container>
          <div className='mx-auto flex w-full max-w-[1000px] items-center gap-4 py-3.5 sm:gap-10 sm:py-5'>
            {/* on phones the hint only shows while the button is still off */}
            <p
              className={`${canCompare ?'hidden sm:block' : 'block'} w-[104px] shrink-0 font-inter text-[12px] leading-4 sm:w-[176px] sm:text-[15px] sm:leading-7`}
            >
              {canCompare ? `${items.length} products selected` : 'Select at least 2 products to compare'}
            </p>

            {/* the padding gives the remove buttons room so the scroller cannot clip them */}
            <div className='-mx-2.5 -my-3 flex flex-1 items-center justify-between gap-2.5 overflow-x-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4'>
              {shown.map((item) => (
                <div key={item._id} className='relative shrink-0'>
                  {item.pending || !item.image ? (
                    // added but the response is still on its way
                    <span
                      aria-hidden='true'
                      className={`flex shrink-0 items-center justify-center border border-white/50 bg-white/70 animate-pulse ${SLOT_BOX}`}
                    />
                  ) : (
                    <Link
                      to={`/products/${item.slug || item._id}`}
                    className={`flex shrink-0 items-center justify-center border border-white/50 bg-white p-1 ${SLOT_BOX}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading='lazy'
                        className='max-h-full max-w-full object-contain'
                      />
                    </Link>
                  )}

                  <button
                    type='button'
                    aria-label={`Remove ${item.name || 'product'} from compare`}
                    onClick={() => removeCompare.mutate(item._id)}
                    className='absolute -right-2.5 -top-2.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-[#262626] text-[#333E48] shadow-md transition-colors duration-200 hover:bg-black hover:text-white'
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              {Array.from({ length: emptySlots }).map((_, index) => (
                <span
                  key={`compare-slot-${index}`}
                  className={`hidden shrink-0 border border-dashed border-white/60 sm:block ${SLOT_BOX}`}
                />
              ))}

              {hasMore && (
                <Link
                  to='/compare'
                  className={`flex shrink-0 flex-col items-center justify-center border border-dashed border-white/70 text-center text-[12px] font-semibold leading-4 transition-colors duration-200 hover:border-white hover:bg-white/10 sm:text-[14px] sm:leading-5 ${SLOT_BOX}`}
                >
                  <span>+{moreCount}</span>
                  <span>more</span>
                </Link>
              )}
            </div>

            <Link
              to='/compare'
              aria-disabled={!canCompare}
              className={`shrink-0 rounded-full px-5 py-3 text-[13px] font-semibold transition-colors duration-200 sm:px-7 sm:py-4 sm:text-[15px] ${
                canCompare
                  ? 'bg-white text-[#333E48] hover:bg-primary hover:text-tcolor'
                  : 'pointer-events-none bg-white/60 text-[#333E48]/50'
              }`}
            >
              View comparison
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CompareBar
