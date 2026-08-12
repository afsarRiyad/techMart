import React, { useState } from 'react'
import ProSidebar from '../components/products/ProSidebar'
import Container from '../components/layouts/Container'
import { ChevronDown, Grid2X2, Grid3X3, List, Rows3 } from 'lucide-react'
import { useGetCatProducts } from '../features/products/hooks/useGetCatProducts'
import Gridview from '../components/products/Gridview'
import GridExtend from '../components/products/GridExtend'
import Listview from '../components/products/ListView'
import ListViewSmall from '../components/products/ListViewSmall'

const SORT_OPTIONS = [
  {
    value: 'default',
    label: 'Default sorting',
  },
  {
    value: 'price-asc',
    label: 'Price: Low to High',
  },
  {
    value: 'price-desc',
    label: 'Price: High to Low',
  },
  {
    value: 'rating-desc',
    label: 'Highest Rated',
  },
]

const Products = () => {
  const [active, setActive] = useState()
  const [activeChild, setActiveChild] = useState()

  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])

  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('grid')

  const {
    data,
    isLoading,
    isError,
  } = useGetCatProducts({
    category: activeChild
      ? activeChild
      : active?.name,
    brands: selectedBrands,
    colors: selectedColors,
    priceRange,
    limit: itemsPerPage,
    page,
    sort,
  })

  const products = data?.data || []

  const meta = data?.meta || {
    total: 0,
    totalPages: 1,
  }
  console.log(products);
  
  const handleSortChange = (event) => {
    setSort(event.target.value)
    setPage(1)
  }

  const handleLimitChange = (event) => {
    setItemsPerPage(Number(event.target.value))
    setPage(1)
  }

  const handleViewChange = (viewType) => {
    setView(viewType)
  }

  const isListView =
    view === 'list' || view === 'list2'

  const gridClass = isListView
    ? 'grid grid-cols-1 gap-4'
    : view === 'columns'
      ? 'grid grid-cols-2 gap-4 md:grid-cols-3'
      : 'grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'

  const firstResult = products.length
    ? (page - 1) * itemsPerPage + 1
    : 0
  const lastResult = Math.min(
    page * itemsPerPage,
    meta.total
  )
  const formatPrice = (price) => {
    return `${Number(price || 0).toLocaleString()}`
  }

  return (
    <Container className="py-3">
      <div className="flex w-full gap-8">
       {/* sidebar  */}
        <div className="w-[22%] shrink-0">
          <ProSidebar
            active={active}
            setActive={setActive}
            activeChild={activeChild}
            setActiveChild={setActiveChild}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        </div>

       {/* products section  */}
        <div className="w-[78%]">
          {/* ================= HEADER ================= */}
          <div className="flex items-end justify-between pb-4">
            <h1 className="text-[26px] font-medium text-tcolor dark:text-white">
              {active?.name}
            </h1>
            {!isLoading && (
              <span className="text-[13px] text-gray-500 dark:text-gray-400">
                Showing {firstResult}–{lastResult} of {meta.total} results
              </span>
            )}

          </div>

          <div className="flex flex-col gap-3 rounded bg-gray-100 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between dark:bg-white/5">
           <div className="flex items-center ">
                {/* Columns */}
                <button
                  type="button"
                  aria-label="Columns view"
                  aria-pressed={view === 'columns'}
                  onClick={() => handleViewChange('columns')}
                  className={`rounded p-1 transition-all cursor-pointer duration-300 active:scale-90 ${
                    view === 'columns'
                      ? 'text-tcolor dark:text-white'
                      : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>

              {/* Grid */}

              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                onClick={() => handleViewChange('grid')}
                className={`rounded p-1 transition-all cursor-pointer duration-300 active:scale-90 ${
                  view === 'grid'
                    ? 'text-tcolor dark:text-white'
                    : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'      
                }`}
              >
                <Grid2X2 size={18} />
              </button>



              {/* List */}

              <button
                type="button"
                aria-label="List view"
                aria-pressed={view === 'list'}
                onClick={() => handleViewChange('list')}
                className={`rounded p-1 transition-all cursor-pointer duration-300 active:scale-90 ${
                  view === 'list'
                    ? 'text-tcolor dark:text-white'
                    : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'
                }`}
              >
                <List size={18} />
              </button>


              {/* List 2 */}

              <button
                type="button"
                aria-label="List view 2"
                aria-pressed={view === 'list2'}
                onClick={() => handleViewChange('list2')}
                className={`rounded p-1 transition-all cursor-pointer duration-300 active:scale-90 ${
                  view === 'list2'
                    ? 'text-tcolor dark:text-white'
                    : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'
                }`}
              >
                <Rows3 size={18} />
              </button>
            </div>

              {/* products show and sort  */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="product-limit"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Show
              </label>
              <select
                id="product-limit"
                value={itemsPerPage}
                onChange={handleLimitChange}
                className="cursor-pointer rounded border font-pop border-gray-300 bg-white px-2 py-2 text-sm text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value={12}>12</option>
                <option value={24}> 24</option>
                <option value={36}> 36</option>
                <option value={48}>48</option>
                <option value={100}>All</option>
              </select>

              {/* sort  */}
              <div className="relative">
                <label
                  htmlFor="product-sort"
                  className="sr-only"
                >
                  Sort products
                </label>

                <select
                  id="product-sort"
                  value={sort}
                  onChange={handleSortChange}
                  className="w-56 cursor-pointer appearance-none rounded-full border  border-gray-300 bg-white py-2 pl-4 pr-9 text-[14px] text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>
          {/* ================= LOADING ================= */}

          {isLoading && (
            <div className="py-16 text-center">
              <p className="text-gray-500">
                Loading products…
              </p>
            </div>
          )}
          {/* ================= ERROR ================= */}
          {isError && !isLoading && (
            <div className="py-16 text-center">
              <p className="text-red-500">
                Unable to load products. Please try again.
              </p>
            </div>
          )}
          {/* ================= PRODUCTS ================= */}
          {!isLoading && !isError && (
            <>
              <div >
                {products.length === 0 ? (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No products found.
                    </p>
                  </div>
                ) : (
                   <>
              {view === 'columns' && <Gridview products={products} />}
              {view === 'grid' && <GridExtend products={products} />}
              {view === 'list' && <Listview products={products} />}
              {view === 'list2' && <ListViewSmall products={products} />}
                  </>
                )}

              </div>
              {/* ================= PAGINATION ================= */}

              {meta.totalPages > 1 && (

                <div className="mt-8 flex items-center justify-center gap-3">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() =>
                      setPage(
                        (current) =>
                          current - 1
                      )
                    }
                    disabled={page === 1}
                    className="rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    Previous
                  </button>
                  {/* Current Page */}
                  <span className="self-center text-sm text-gray-500 dark:text-gray-400">
                    Page {page} of {meta.totalPages}
                  </span>
                  {/* Next */}
                  <button
                    type="button"
                    onClick={() =>
                      setPage(
                        (current) =>
                          current + 1
                      )
                    }
                    disabled={
                      page >=
                      meta.totalPages
                    }
                    className="rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Products