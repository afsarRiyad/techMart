import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductSidebar from '@/components/product/ProductSidebar'
import Container from '@/components/layout/Container'
import { ChevronDown, ChevronsUpDown, Grid2X2, Grid3X3, List, MoveLeft, MoveRight, Rows3 } from 'lucide-react'
import { useGetCatProducts } from '@/features/product/hooks/useGetCatProducts'
import Gridview from '@/components/product/Gridview'
import GridExtend from '@/components/product/GridExtend'
import Listview from '@/components/product/ListView'
import ListViewSmall from '@/components/product/ListViewSmall'
import { setPage,  setItemsPerPage,  setSort,  setView,  setSelectedBrands,  setSelectedColors,  setPriceRange,  setActiveCategory,  setActiveChildCategory, resetFilters,} from '@/features/product/productPageSlice'

const SORT_OPTIONS = [{value: 'default', label: 'Default sorting',},
                    { value: 'price-asc', label: 'Price: Low to High', },
                      { value: 'price-desc', label: 'Price: High to Low', },
                      { value: 'rating-desc', label: 'Highest Rated',},
                      { value: 'latest', label: 'Latest Products',},
                    ]

const Products = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState()
  const [inputPage, setInputPage] = useState('1')
  const [activeChild, setActiveChild] = useState()

  const {
    page,
    itemsPerPage,
    sort,
    view,
    selectedBrands,
    selectedColors,
    priceRange,
  } = useSelector((state) => state.productPage)

  const { data, isLoading, isError } = useGetCatProducts({
    category: activeChild ? activeChild : active?.name === 'View All Products' ? undefined : active?.name,
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

  useEffect(() => {
    if (active) {
      dispatch(setActiveCategory(active))
    }
  }, [active, dispatch])

  useEffect(() => {
    if (activeChild) {
      dispatch(setActiveChildCategory(activeChild))
    }
  }, [activeChild, dispatch])
  
  const handleSortChange = (event) => {
    dispatch(setSort(event.target.value))
  }

  const handleLimitChange = (event) => {
    dispatch(setItemsPerPage(Number(event.target.value)))
  }

  const handleViewChange = (viewType) => {
    dispatch(setView(viewType))
  }
  
  const firstResult = products.length ? (page - 1) * itemsPerPage + 1 : 0
  const lastResult = Math.min( page * itemsPerPage, meta.total )

  const formatPrice = (price) => {
    return `${Number(price || 0).toLocaleString()}` 
  }
  const handleGoToPage = (e) => {
    const targetPage = Number(inputPage)
    if (e.key === 'Enter') {
      if (targetPage >= 1 && targetPage <= meta.totalPages) {
        dispatch(setPage(targetPage))
      }
    }
  }
  useEffect(() => {
  setInputPage(String(page))
}, [page])
  
  const getPages = (currentPage, totalPage) =>{
    let pages = []
    if(totalPage <= 7){
      for(let i = 1; i <= totalPage; i++){
        pages.push(i)
      }
      return pages
    }
    pages.push(1)
    if(currentPage >= 4){
      pages.push('...')
    }
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPage - 1 , currentPage + 1)
    
    for(let i = start; i <= end; i++){
      pages.push(i)
    }
    if(currentPage < totalPage - 3){
      pages.push('...')
    }
    pages.push(totalPage)
    return pages
  }
  return (
    <Container className="py-3 font-inter">
      <div className="flex w-full gap-8">
       {/* sidebar  */}
        <div className="w-[20%] shrink-0">
          <ProductSidebar
            active={active}
            setActive={setActive}
            activeChild={activeChild}
            setActiveChild={setActiveChild}
          />
        </div>

       {/* products section  */}
        <div className="w-[79%]">
          {/* header  */} 
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
          {/* grid views icons  */}
           <div className="lg:flex items-center hidden ">
                {/* Columns */}
                <button type="button" aria-label="Columns view"
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

              <button type="button" aria-label="Grid view"
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

              <button type="button"aria-label="List view"
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

              <button type="button" aria-label="List view 2"
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
             <div className='relative'>
               <select id="product-limit"  value={itemsPerPage}
                onChange={handleLimitChange}
                className="cursor-pointer border font-pop appearance-none border-gray-300 bg-white pl-4 pr-7 py-2 text-sm text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white rounded-full "
              >
                <option value={10}>Show 10</option>
                <option value={25}>Show 25</option>
                <option value={35}>Show 35</option>
                <option value={48}>Show 48</option>
                <option value={100}>Show All</option>
              </select>
              <ChevronsUpDown  size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"/>

             </div>
              {/* sort  */}
              <div className="relative">
                <label
                  htmlFor="product-sort"
                  className="sr-only"
                >
                  Sort products
                </label>

                <select  id="product-sort" value={sort} onChange={handleSortChange}
                  className="w-56 cursor-pointer appearance-none rounded-full border  border-gray-300 bg-white py-2 pl-4 pr-9 text-[14px] text-tcolor focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}
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
            <div>
              {meta.totalPages > 1 &&
              <div className='flex'>
                {page !== 1 &&
                 <button onClick={() => dispatch(setPage(Math.max(1, page - 1)))} disabled={page === 1} className={`cursor-pointer text-gray-600`}>
                  <MoveLeft />
                </button>
                }
                  <input value={inputPage} onChange={(e)=> setInputPage(e.target.value)} onKeyDown={handleGoToPage} min="1" max={meta.totalPages}
                   type="number" className='border border-gray-400 rounded-full text-center  w-12 py-1 mx-3 outline-none focus:ring-2 focus:ring-blue-400/20'
                   />
              {page !== meta.totalPages &&
                <button onClick={() => dispatch(setPage(Math.min(meta.totalPages, page + 1)))} disabled={page === meta.totalPages} className={`cursor-pointer text-gray-600`}>
                  <MoveRight />
                </button>
              }
              </div>
              }
            </div>
          </div>
         {/* loading  */}
          {isLoading && (
            <div className="py-16 text-center">
              <p className="text-gray-500">
                Loading products…
              </p>
            </div>
          )}
          {/* error  */}
          {isError && !isLoading && (
            <div className="py-16 text-center">
              <p className="text-red-500">
                Unable to load products. Please try again.
              </p>
            </div>
          )}
          {/* products  */}
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
             {/* pagination  */}
             {meta.totalPages > 1 && (
   <div className="mt-8 flex items-center justify-center gap-2">
    {/* Previous */}
    <button
      type="button"
      onClick={() => dispatch(setPage(page - 1))}
      disabled={page === 1}
      className=" rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5 "
        >
      Previous
    </button>

    {/* Page info */}
    <span className="mx-1 text-sm text-gray-500 dark:text-gray-400">
      Page {page} of {meta.totalPages}
    </span>

    {/* Page numbers */}
    <div className="flex items-center gap-2">
      {getPages(page, meta.totalPages).map((item, index) => {
        if (item === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-6 items-center justify-center text-gray-500"
            >
              ...
            </span>
          );
        }
        return (
          <button
            key={`page-${item}`}
            type="button"
            onClick={() => dispatch(setPage(item))}
            className={`
              h-10 w-10
              rounded-full
              border
              border-gray-300
              text-sm
              transition
              cursor-pointer
              ${
                page === item
                  ? 'bg-yellow-400 text-black'
                  : 'hover:bg-gray-200 dark:hover:bg-white/10'
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
    {/* Next */}
    <button type="button" onClick={() => dispatch(setPage(page + 1))}
      disabled={page >= meta.totalPages}
      className="rounded border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-alloweddisabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5
      "
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