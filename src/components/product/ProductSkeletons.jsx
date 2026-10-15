import React from 'react'

const ProductCardSkeleton = () => (
  <div className="animate-pulse bg-white dark:bg-[#262626] rounded-lg border border-gray-200 dark:border-[#333333] overflow-hidden">
    <div className="aspect-square bg-gray-200 dark:bg-[#333333] dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-1/2" />
      <div className="h-5 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-1/3" />
    </div>
  </div>
)

const ProductListSkeleton = () => (
  <div className="animate-pulse flex gap-4 p-4 bg-white dark:bg-[#262626] rounded-lg border border-gray-200 dark:border-[#333333]">
    <div className="w-32 h-32 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded shrink-0" />
    <div className="flex-1 space-y-3 py-2">
      <div className="h-5 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-1/4" />
      <div className="h-8 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-28 mt-4" />
    </div>
  </div>
)

const CompactListItemSkeleton = () => (
  <div className="animate-pulse flex gap-4 items-center p-3 bg-white dark:bg-[#262626] rounded-lg border border-gray-200 dark:border-[#333333]">
    <div className="w-16 h-16 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-2/3" />
      <div className="h-3 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-1/3" />
    </div>
    <div className="h-5 bg-gray-200 dark:bg-[#333333] dark:bg-gray-700 rounded w-16" />
  </div>
)

export const ColumnsSkeleton = ({ count = 12 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export const GridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export const ListSkeleton = ({ count = 6 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <ProductListSkeleton key={i} />
    ))}
  </div>
)

export const CompactListSkeleton = ({ count = 8 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }, (_, i) => (
      <CompactListItemSkeleton key={i} />
    ))}
  </div>
)

const bar = 'animate-pulse rounded bg-gray-200 dark:bg-[#333333]'

// one grey block; the product-page skeleton below is composed from these
const Bar = ({ className = '' }) => <div className={`${bar} ${className}`} />

// The single product page. `SidebarLayout` and the sidebar keep their own
// skeletons, so this covers the column beside them: the gallery, the buy panel,
// the tab strip, the panel the tabs swap and the related products row. The blocks
// are the real elements' own sizes (the thumbnail strip is `h-[108px]`, the main
// photo is square, the tab panel floor is `min-h-[300px]`), so the product arrives
// into the space it already had.
export const ProductDetailSkeleton = () => (
  <div role='status' aria-busy='true' aria-live='polite' className='w-full'>
    <span className='sr-only'>Loading product</span>

    {/* Browse Categories, the phone-only way into the sidebar */}
    <div className='pb-4 lg:hidden'>
      <Bar className='h-11 w-44 rounded-lg' />
    </div>

    <div className='flex w-full flex-col gap-6 font-inter lg:flex-row lg:gap-8'>
      {/* gallery */}
      <div className='flex w-full flex-col items-center lg:block lg:w-[320px] lg:shrink-0 xl:w-[395px]'>
        {/* the real photo carries `mb-5`, which is what separates it from the strip */}
        <Bar className='mb-5 aspect-square w-full max-w-[395px] rounded' />
        {/* the strip is a swiper: three thumbs, four from 480px. The fourth is
            scrolled to rather than stacked, so it only shows on the wider strip */}
        <div className='mt-2 grid w-full grid-cols-3 gap-4 min-[480px]:grid-cols-4'>
          {Array.from({ length: 4 }, (_, i) => (
            <Bar
              key={i}
              className={`h-[108px] rounded ${i === 3 ? 'hidden min-[480px]:block' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* buy panel */}
      <div className='w-full min-w-0'>
        <div className='mb-2 border-b border-b-gray-300 pb-3 dark:border-b-[#333333]'>
          <Bar className='h-6 w-3/4' />
        </div>
        <Bar className='h-4 w-44' />
        <div className='flex gap-4 pt-5 pb-4'>
          <Bar className='h-5 w-24' />
          <Bar className='h-5 w-24' />
        </div>
        <div className='flex flex-col gap-2 pt-1'>
          <Bar className='h-3.5 w-full' />
          <Bar className='h-3.5 w-11/12' />
        </div>
        <div className='pt-6 sm:pt-9'>
          <Bar className='h-9 w-44' />
        </div>
        <div className='flex flex-wrap gap-3 pt-6'>
          <Bar className='h-12 w-40 rounded-full' />
          <Bar className='h-12 flex-1 rounded-full' />
        </div>
        <div className='flex flex-col gap-4 pt-5 xl:flex-row'>
          <Bar className='h-12 flex-1 rounded-sm' />
          <Bar className='h-12 flex-1 rounded-sm' />
        </div>
      </div>
    </div>

    {/* the tab strip, and the panel it swaps */}
    <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 pt-12 pb-3 sm:pt-16 lg:pt-32'>
      {Array.from({ length: 5 }, (_, i) => (
        <Bar key={i} className='h-6 w-24' />
      ))}
    </div>
    {/* the panel keeps the `min-h-[300px]` its real counterpart has, and adds the
        shape of the tab it opens on: Accessories, a row of tiles under some copy */}
    <div className='min-h-[300px] w-full rounded-lg border border-gray-300 bg-white px-4 py-6 sm:px-6 md:px-10 md:py-10 dark:border-[#333333] dark:bg-[#262626]'>
      <div className='mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {Array.from({ length: 3 }, (_, i) => (
          <Bar key={i} className='h-48 rounded' />
        ))}
      </div>
      <div className='flex flex-col gap-3'>
        <Bar className='h-4 w-full' />
        <Bar className='h-4 w-5/6' />
        <Bar className='h-4 w-2/3' />
        <Bar className='h-4 w-1/2' />
      </div>
    </div>

    {/* related products: the heading, then the same four-up grid Gridview draws */}
    <div className='pt-10'>
      <div className='mb-8 border-b border-b-gray-300 pb-3 dark:border-b-[#333333]'>
        <Bar className='h-6 w-56' />
      </div>
      <ColumnsSkeleton count={4} />
    </div>
  </div>
)

// Returns the appropriate skeleton based on current view
export const ProductGridSkeleton = ({ view = 'columns', count }) => {
  const counts = { columns: 12, grid: 8, list: 6, list2: 8 }

  switch (view) {
    case 'columns':
      return <ColumnsSkeleton count={count || counts.columns} />
    case 'grid':
      return <GridSkeleton count={count || counts.grid} />
    case 'list':
      return <ListSkeleton count={count || counts.list} />
    case 'list2':
      return <CompactListSkeleton count={count || counts.list2} />
    default:
      return <ColumnsSkeleton count={count || counts.columns} />
  }
}
