import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const useSyncFiltersToUrl = () => {
  const navigate = useNavigate()
  const {
    page,
    itemsPerPage,
    sort,
    selectedBrands,
    selectedColors,
    priceRange,
  } = useSelector((state) => state.productPage)

  useEffect(() => {
    const params = new URLSearchParams()

    // Page
    if (page > 1) params.set('page', String(page))

    // Sort
    if (sort !== 'default') params.set('sort', sort)

    // Limit
    if (itemsPerPage !== 10) params.set('limit', String(itemsPerPage))

    // Brands
    selectedBrands.forEach((b) => params.append('brand', b))

    // Colors
    selectedColors.forEach((c) => params.append('color', c))

    // Price range (only if not default)
    if (priceRange[0] !== 0 || priceRange[1] !== 10000) {
      params.set('minPrice', String(priceRange[0]))
      params.set('maxPrice', String(priceRange[1]))
    }

    const queryString = params.toString()
    const currentSearch = window.location.search.slice(1)

    // Avoid unnecessary navigation if URL hasn't changed
    if (queryString !== currentSearch) {
      const basePath = window.location.pathname
      navigate(`${basePath}${queryString ? `?${queryString}` : ''}`, { replace: true })
    }
  }, [page, itemsPerPage, sort, selectedBrands, selectedColors, priceRange, navigate])
}
