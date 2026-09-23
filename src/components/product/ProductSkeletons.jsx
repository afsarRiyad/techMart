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
