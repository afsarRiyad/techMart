import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SidebarContent from '@/components/product/ProductSidebar/index'
import Container from '@/components/layout/Container'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ProductGridSkeleton } from '@/components/product/ProductSkeletons'
import { useSyncFiltersToUrl } from '@/hooks/useSyncFiltersToUrl'
import { ChevronDown, ChevronsUpDown, Grid2X2, Grid3X3, List, MoveLeft, MoveRight, Rows3, SlidersHorizontal, X } from 'lucide-react'
import { useGetCatProducts } from '@/features/product/hooks/useGetCatProducts'
import Gridview from '@/components/product/Gridview'
import GridExtend from '@/components/product/GridExtend'
import Listview from '@/components/product/ListView'
import ListViewSmall from '@/components/product/ListViewSmall'
import { setPage, setItemsPerPage, setSort, setView,
  setSelectedBrands, setSelectedColors, setPriceRange,
  setActiveCategory, setActiveChildCategory, resetFilters,
} from '@/features/product/productPageSlice'
import useScrollBlocker from '@/hooks/useScrollBlocker'

const ActiveFilterChips = React.memo(({ selectedBrands, selectedColors, priceRange, dispatch }) => {
  const isPriceDefault = priceRange[0] === 0 && priceRange[1] === 10000

  const activeFilters = useMemo(() => {
    const chips = []
    selectedBrands.forEach((b) => chips.push({ type: 'brand', value: b }))
    selectedColors.forEach((c) => chips.push({ type: 'color', value: c }))
    if (!isPriceDefault) chips.push({ type: 'price', value: `$${priceRange[0]} – $${priceRange[1]}` })
    return chips
  }, [selectedBrands, selectedColors, isPriceDefault, priceRange])

  if (activeFilters.length === 0) return null

  const removeFilter = (type) => {
    if (type === 'brand') dispatch(setSelectedBrands([]))
    else if (type === 'color') dispatch(setSelectedColors([]))
    else dispatch(setPriceRange([0, 10000]))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pb-3">
      {activeFilters.map(({ type, value }) => (
        <button key={`${type}-${value}`} onClick={() => removeFilter(type)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100 transition-colors cursor-pointer animate-chip-in">
          {value} <X size={12} className="text-red-500" />
        </button>
      ))}          {activeFilters.length > 1 && (
        <button onClick={() => dispatch(resetFilters())} className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer animate-chip-in">
          Clear all
        </button>
      )}
    </div>
  )
})
ActiveFilterChips.displayName = 'ActiveFilterChips'

const SORT_OPTIONS = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'latest', label: 'Latest Products' },
]

const Pagination = React.memo(({ page, totalPages, inputPage, setInputPage, dispatch }) => {
  const handleGoToPage = useCallback((e) => {
    if (e.key === 'Enter') {
      const targetPage = Number(inputPage)
      if (targetPage >= 1 && targetPage <= totalPages) {
        dispatch(setPage(targetPage))
      }
    }
  }, [inputPage, totalPages, dispatch])

  const getPages = useMemo(() => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }
    pages.push(1)
    if (page >= 4) pages.push('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 3) pages.push('...')
    pages.push(totalPages)
    return pages
  }, [page, totalPages])

  useEffect(() => {
    setInputPage(String(page))
  }, [page, setInputPage])

  if (totalPages <= 1) return null

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button type="button" onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}
        className="rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5">
        Previous
      </button>
      <span className="mx-1 text-sm text-gray-500 dark:text-gray-400">Page {page} of {totalPages}</span>
      <div className="flex items-center gap-2">
        {getPages.map((item, index) => {
          if (item === '...') return <span key={`e-${index}`} className="flex h-10 w-6 items-center justify-center text-gray-500">...</span>
          return (
            <button key={`p-${item}`} type="button" onClick={() => dispatch(setPage(item))}
              className={`h-10 w-10 rounded-full border border-gray-300 text-sm transition cursor-pointer ${page === item ? 'bg-yellow-400 text-black' : 'hover:bg-gray-200 dark:hover:bg-white/10'}`}>
              {item}
            </button>
          )
        })}
      </div>
      <button type="button" onClick={() => dispatch(setPage(page + 1))} disabled={page >= totalPages}
        className="rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5">
        Next
      </button>
    </div>
  )
})
Pagination.displayName = 'Pagination'

const Products = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState()
  const [inputPage, setInputPage] = useState('1')
  const [activeChild, setActiveChild] = useState()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useSyncFiltersToUrl()

  const { page, itemsPerPage, sort, view, selectedBrands, selectedColors, priceRange, activeCategory } = useSelector((state) => state.productPage)

  // Restore saved page and reset filters when returning from product detail
  useEffect(() => {
    const savedPage = localStorage.getItem('productsPage')
    if (savedPage) {
      localStorage.removeItem('productsPage')
      dispatch(resetFilters())
      dispatch(setPage(Number(savedPage)))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Save page when navigating away (e.g. to product detail) and clear URL params
  useEffect(() => {
    return () => {
      if (page > 1) {
        localStorage.setItem('productsPage', String(page))
      }
      // Clear filter params from URL so they don't persist on return
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [page])

  const currentActive = active || activeCategory

  const { data, isLoading, isError } = useGetCatProducts({
                                    category: activeChild ? activeChild : currentActive?.name === 'View All Products' ? undefined : currentActive?.name,
                                    brands: selectedBrands,
                                     colors: selectedColors,
                                     priceRange, limit: itemsPerPage,
                                     page,
                                    sort,
                                  })

  const products = data?.data || []
  const meta = data?.meta || { total: 0, totalPages: 1 }

  useEffect(() => { if (active) dispatch(setActiveCategory(active)) }, [active, dispatch])
  useEffect(() => { if (activeChild) dispatch(setActiveChildCategory(activeChild)) }, [activeChild, dispatch])

  const handleSortChange = useCallback((e) => dispatch(setSort(e.target.value)), [dispatch])
  const handleLimitChange = useCallback((e) => dispatch(setItemsPerPage(Number(e.target.value))), [dispatch])
  const handleViewChange = useCallback((type) => dispatch(setView(type)), [dispatch])

  const handleMobileGoToPage = useCallback((e) => {
    if (e.key === 'Enter') {
      const targetPage = Number(inputPage)
      if (targetPage >= 1 && targetPage <= meta.totalPages) dispatch(setPage(targetPage))
    }
  }, [inputPage, meta.totalPages, dispatch])

   useScrollBlocker(sidebarOpen)
  const firstResult = products.length ? (page - 1) * itemsPerPage + 1 : 0
  const lastResult = Math.min(page * itemsPerPage, meta.total)
  const activeFilterCount = selectedBrands.length + selectedColors.length
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const InlinePagination = useMemo(() => (
    <div className="flex items-center">
      {page !== 1 && <button onClick={() => dispatch(setPage(Math.max(1, page - 1)))} className="cursor-pointer text-gray-600"><MoveLeft /></button>}
      <input value={inputPage} onChange={(e) => setInputPage(e.target.value)} onKeyDown={handleMobileGoToPage} min="1" max={meta.totalPages} type="number"
        className="border border-gray-400 rounded-full text-center w-12 py-1 mx-3 outline-none focus:ring-2 focus:ring-blue-400/20" />
      {page !== meta.totalPages && <button onClick={() => dispatch(setPage(Math.min(meta.totalPages, page + 1)))} className="cursor-pointer text-gray-600"><MoveRight /></button>}
    </div>
  ), [page, inputPage, meta.totalPages, dispatch, handleMobileGoToPage])

  const viewButtons = [
    { type: 'columns', Icon: Grid3X3, label: 'Columns view' },
    { type: 'grid', Icon: Grid2X2, label: 'Grid view' },
    { type: 'list', Icon: List, label: 'List view' },
    { type: 'list2', Icon: Rows3, label: 'List view 2' },
  ]

  const limitOptions = [10, 25, 35, 48, 100]

  return (
    <Container className="py-3 font-inter">
      <div className="flex w-full gap-8">
        <aside className="hidden lg:block w-[20%] shrink-0">
          <SidebarContent active={currentActive} setActive={setActive} activeChild={activeChild} setActiveChild={setActiveChild} onClose={closeSidebar} />
        </aside>

        <div className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeSidebar} />

        <div className={`fixed inset-y-0 left-0 z-[70] w-[300px] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-gray-900 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <span className="font-medium text-tcolor dark:text-white">Filters</span>
            <button onClick={closeSidebar} className="cursor-pointer rounded p-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"><X size={20} /></button>
          </div>
          <div className="p-4">
            <SidebarContent active={currentActive} setActive={setActive} activeChild={activeChild} setActiveChild={setActiveChild} onClose={closeSidebar} />
          </div>
        </div>

        <main className="w-full lg:w-[79%]">
          <div className="flex items-end justify-between pb-4">
            <h1 className="text-[26px] font-medium text-tcolor dark:text-white">{currentActive?.name}</h1>
            {!isLoading && <span className="text-[13px] text-gray-500 dark:text-gray-400">Showing {firstResult}–{lastResult} of {meta.total} results</span>}
          </div>

          {/* Active filter chips */}
          <div className="lg:hidden pb-3">
            <ActiveFilterChips selectedBrands={selectedBrands} selectedColors={selectedColors} priceRange={priceRange} dispatch={dispatch} />
          </div>

          {/* Mobile controls */}
          <div className="flex flex-col gap-2 rounded bg-gray-100 px-4 py-2.5 lg:hidden dark:bg-white/5">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 cursor-pointer rounded p-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
                <SlidersHorizontal size={18} />
                <span className="text-sm font-medium">Filters</span>
                {activeFilterCount > 0 && <span className="bg-primary text-black text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>}
              </button>
              {InlinePagination}
            </div>
            <div className="flex items-center justify-between">
              <div className="relative">
                <select id="product-limit-m" value={itemsPerPage} onChange={handleLimitChange}
                  className="cursor-pointer border font-pop appearance-none border-gray-300 bg-white pl-4 pr-7 py-2 text-sm text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white rounded-full">
                  {limitOptions.map((n) => <option key={n} value={n}>{n === 100 ? 'Show All' : `Show ${n}`}</option>)}
                </select>
                <ChevronsUpDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <label htmlFor="product-sort-m" className="sr-only">Sort products</label>
                <select id="product-sort-m" value={sort} onChange={handleSortChange}
                  className="cursor-pointer appearance-none rounded-full border border-gray-300 bg-white py-2 pl-4 pr-9 text-[14px] text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop controls — three groups justify-between */}
          <div className="hidden lg:flex items-center justify-between rounded bg-gray-100 px-4 py-2.5 dark:bg-white/5">
            <div className="flex items-center gap-2">
              {viewButtons.map(({ type, Icon, label }) => (
                <button key={type} type="button" aria-label={label} aria-pressed={view === type} onClick={() => handleViewChange(type)}
                  className={`rounded p-1 transition-all cursor-pointer duration-300 active:scale-90 ${view === type ? 'text-tcolor dark:text-white' : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'}`}>
                  <Icon size={18} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select id="product-limit" value={itemsPerPage} onChange={handleLimitChange}
                  className="cursor-pointer border font-pop appearance-none border-gray-300 bg-white pl-4 pr-7 py-2 text-sm text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white rounded-full">
                  {limitOptions.map((n) => <option key={n} value={n}>{n === 100 ? 'Show All' : `Show ${n}`}</option>)}
                </select>
                <ChevronsUpDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <label htmlFor="product-sort" className="sr-only">Sort products</label>
                <select id="product-sort" value={sort} onChange={handleSortChange}
                  className="w-56 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white py-2 pl-4 pr-9 text-[14px] text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              {page !== 1 && <button onClick={() => dispatch(setPage(Math.max(1, page - 1)))} className="cursor-pointer text-gray-600 dark:text-gray-400"><MoveLeft /></button>}
              <input value={inputPage} onChange={(e) => setInputPage(e.target.value)} onKeyDown={handleMobileGoToPage} min="1" max={meta.totalPages} type="number"
                className="border border-gray-400 rounded-full text-center w-12 py-1 mx-3 outline-none focus:ring-2 focus:ring-blue-400/20" />
              {page !== meta.totalPages && <button onClick={() => dispatch(setPage(Math.min(meta.totalPages, page + 1)))} className="cursor-pointer text-gray-600 dark:text-gray-400"><MoveRight /></button>}
            </div>
          </div>

          <ErrorBoundary>
            {isLoading && <div className="py-6"><ProductGridSkeleton view={view} /></div>}
            {isError && !isLoading && <div className="py-16 text-center"><p className="text-red-500">Unable to load products. Please try again.</p></div>}
            {!isLoading && !isError && (
              <>
                {products.length === 0 ? (
                  <div className="py-16 text-center"><p className="text-gray-500 dark:text-gray-400">No products found.</p></div>
                ) : (
                  <div>
                    {view === 'columns' && <Gridview products={products} />}
                    {view === 'grid' && <GridExtend products={products} />}
                    {view === 'list' && <Listview products={products} />}
                    {view === 'list2' && <ListViewSmall products={products} />}
                  </div>
                )}
                <Pagination page={page} totalPages={meta.totalPages} inputPage={inputPage} setInputPage={setInputPage} dispatch={dispatch} />
              </>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </Container>
  )
}

export default Products
