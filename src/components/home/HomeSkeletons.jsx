// Home page skeletons.

import Container from '@/components/layout/Container'

const block = 'animate-pulse rounded bg-gray-200 dark:bg-[#333333]'

// everything below is composed from these two
const Bar = ({ className = '' }) => <div className={`${block} ${className}`} />

// the heading rule every showcase shares: a 22px title over a full-width
// hairline, with the navigation arrows sitting at the right end
const SectionHeadingSkeleton = ({ arrows = false }) => (
  <div className='relative mb-5 border-b border-b-gray-300 dark:border-b-[#333333]'>
    <div className='pb-3'>
      <Bar className='h-6 w-52 max-w-full' />
    </div>
    {arrows && (
      <div className='absolute top-1 right-2 flex gap-4'>
        <Bar className='h-6 w-6 rounded-full' />
        <Bar className='h-6 w-6 rounded-full' />
      </div>
    )}
  </div>
)

// a screen reader still has to be told the page is loading rather than broken
const Loading = ({ children, label }) => (
  <div role='status' aria-busy='true' aria-live='polite'>
    <span className='sr-only'>{label}</span>
    {children}
  </div>
)
const slideVisibility = {
  featured: (i) => (i < 2 ? '' : i < 4 ? 'hidden md:block' : 'hidden xl:block'),
  // Trending puts four cards in one row on a wide screen, so only four of the six
  // are ever visible there, and three of them on a phone
  trending: (i) => (i < 3 ? '' : i === 3 ? 'hidden md:block' : 'hidden md:block xl:hidden'),
  showcase: (i) => (i < 3 ? '' : 'hidden md:block'),
  promo: (i) => (i < 2 ? '' : i === 2 ? 'block md:hidden xl:block' : 'hidden xl:block'),
}
// Only the photo box and the title floor differ between them, so they are props.
const TallCardSkeleton = ({
  imageClassName = 'h-50',
  titleClassName = 'min-h-[45px]',
  actionsSpacing = 'pb-1',
  className = '',
}) => (
  <div className={`cardSurface border-r border-r-gray-300 px-4 py-2 dark:border-r-[#333333] ${className}`}>
    <div className='pt-1'>
      <Bar className='h-3 w-2/3' />
    </div>
    <div className={`flex items-center pt-1 ${titleClassName}`}>
      <div className='w-full'>
        <Bar className='h-4 w-full' />
        <Bar className='mt-1.5 h-4 w-3/4' />
      </div>
    </div>
    <div className={`mt-1 flex items-center justify-center ${imageClassName}`}>
      <Bar className='h-full w-3/4 rounded-md' />
    </div>
    <div className='flex items-center justify-between pb-2'>
      <Bar className='h-5 w-16' />
      <Bar className='h-10 w-10 rounded-full' />
    </div>
    <div
      className={`flex items-center justify-between border-t border-gray-200 pt-3 dark:border-t-[#333333] ${actionsSpacing}`}
    >
      <Bar className='h-4 w-16' />
      <Bar className='h-4 w-16' />
    </div>
  </div>
)

const WideCardSkeleton = ({
  imageClassName = 'h-36',
  textMinHeight = 'min-h-[147px]',
  className = '',
}) => (
  <div className={`cardSurface flex py-3 ${className}`}>
    <div className='flex w-[35%] items-center'>
      <Bar className={`ml-2 w-full rounded-md ${imageClassName}`} />
    </div>
    <div className={`flex w-[65%] flex-col gap-2 px-5 ${textMinHeight}`}>
      <Bar className='h-3 w-2/3' />
      <Bar className='h-4 w-full' />
      <Bar className='h-4 w-1/2' />
      <div className='mt-1 flex items-center justify-between py-1'>
        <Bar className='h-5 w-14' />
        <Bar className='h-10 w-10 rounded-full' />
      </div>
    </div>
  </div>
)

// one row of tall cards, the layout both carousels below end with
const TALL_CARDS = 6

const TallCardGrid = ({ imageClassName }) => (
  <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
    {Array.from({ length: TALL_CARDS }, (_, i) => (
      <TallCardSkeleton key={i} className={slideVisibility.featured(i)} imageClassName={imageClassName} />
    ))}
  </div>
)

// Featured: the tab row over the carousel. The cards keep the fixed-height
// `h-50` photo box their real counterpart uses.
export const FeaturedSkeleton = () => (
  <Loading label='Loading products'>
    <Container className='font-inter'>
      <div className='mb-8 flex items-center justify-center gap-5 border-b border-b-gray-200 pt-6 pb-2'>
        {Array.from({ length: 3 }, (_, i) => (
          <Bar key={i} className='h-5 w-24' />
        ))}
      </div>
      <div className='pb-12'>
        <TallCardGrid />
      </div>
    </Container>
  </Loading>
)

// Recommendation: the same row under its own heading, with the photo left to
// the column width so it stays square as the cards narrow
export const RecommendationSkeleton = () => (
  <Loading label='Loading recommendations'>
    <Container>
      <div className='flex py-2 pt-8'>
        <div className='w-full'>
          <SectionHeadingSkeleton arrows />
          <div className='pb-15'>
            <TallCardGrid imageClassName='aspect-square' />
          </div>
        </div>
      </div>
    </Container>
  </Loading>
)

// Laptops & Computers / Trending Products: heading + wide cards, three to a row
// on a wide screen and one per row on a phone, which is how the swiper lays them
// out. `pb-15` is the room the real swiper keeps under the cards for its bullets.
export const ShowcaseSkeleton = ({ trending = false, label = 'Loading products' }) => (
  <Loading label={label}>
    <Container>
      <div className='flex pt-8'>
        <div className='w-full'>
          <SectionHeadingSkeleton arrows />
          <div
            className={`grid grid-cols-1 pt-3 pb-15 md:grid-cols-2 ${
              trending ? 'mb-6 xl:grid-cols-4' : 'xl:grid-cols-3'
            }`}
          >
            {Array.from({ length: TALL_CARDS }, (_, i) => (
              // the visibility class sits on a wrapper: the card itself is a flex
              // row, and `md:block` on it would stack the photo over the text
              <div key={i} className={trending ? slideVisibility.trending(i) : slideVisibility.showcase(i)}>
                <WideCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </Loading>
)

// Television & Entertainment: the promo band with the photo panel on the left
// and a grid of wide cards beside it
export const PromoShowcaseSkeleton = () => (
  <Loading label='Loading deals'>
    <div className='my-5 min-h-[554px] w-full bg-white dark:bg-[#181818]'>
      <Container>
        <div className='z-50 flex py-15'>
          <div className='hidden w-[50%] items-center justify-center md:flex'>
            <Bar className='h-80 w-130 max-w-full rounded-lg' />
          </div>
          <div className='w-full md:w-[50%]'>
            <SectionHeadingSkeleton arrows />
            <div className='grid grid-cols-1 gap-1 pt-3 pb-16 xl:grid-cols-2'>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className={slideVisibility.promo(i)}>
                  <WideCardSkeleton imageClassName='h-28' textMinHeight='min-h-[131px]' className='mb-2' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Loading>
)

// Best Sellers: the six-card grid next to the framed special offer panel
export const BestSellersSkeleton = () => (
  <Loading label='Loading best sellers'>
    <div className='bg-[#F4F4F4] dark:bg-[#181818]'>
      <Container>
        <div className='flex pt-12 pb-6'>
          <div className='w-full'>
            <SectionHeadingSkeleton />
            <div className='flex flex-col gap-1 pb-3 lg:flex-row'>
              <div className='grid grid-cols-2 gap-x-1 md:grid-cols-3 lg:w-[60%]'>
                {Array.from({ length: 6 }, (_, i) => (
                  <TallCardSkeleton
                    key={i}
                    imageClassName='h-30 w-30 md:h-42 md:w-42'
                    titleClassName='min-h-12'
                    actionsSpacing='pb-2'
                  />
                ))}
              </div>
              {/* the offer panel is the tallest thing in this section below lg,
                  where it stacks under the grid instead of sitting beside it:
                  300px of photo, a price line and the four countdown boxes */}
              <div className='mb-2 rounded-xl border-3 border-primary bg-white px-10 py-5 lg:w-[40%] dark:bg-[#262626]'>
                <div className='flex items-center justify-between'>
                  <Bar className='h-9 w-36' />
                  <Bar className='h-18 w-18 rounded-full' />
                </div>
                <Bar className='mx-auto mt-5 h-56 w-56 rounded-md md:h-75 md:w-75' />
                <Bar className='mx-auto mt-4 h-4 w-2/3' />
                <Bar className='mx-auto mt-4 h-8 w-40' />
                <Bar className='mx-auto mt-5 h-4 w-36' />
                <div className='mt-3 flex justify-center gap-3'>
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className='flex flex-col items-center'>
                      <Bar className='h-14 w-14 rounded-lg' />
                      <Bar className='mt-1 h-3 w-10' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Loading>
)

// Top Categories: ten tiles of a small square photo and a two-line label
export const TopCategoriesSkeleton = () => (
  <Loading label='Loading categories'>
    <div className='bg-[#F4F4F4] dark:bg-[#141414]'>
      <Container>
        <div className='flex pt-6 pb-8 md:pt-12 md:pb-14'>
          <div className='w-full'>
            <SectionHeadingSkeleton />
            <div className='grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 xl:grid-cols-5'>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className='cardSurface flex items-center gap-3 rounded-sm px-1 py-1'>
                  <Bar className='h-16 w-16 shrink-0 sm:h-25 sm:w-25' />
                  <div className='flex min-w-0 flex-1 flex-col gap-2'>
                    <Bar className='h-3.5 w-full' />
                    <Bar className='h-3.5 w-2/3' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Loading>
)
