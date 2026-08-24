import { createSlice } from '@reduxjs/toolkit'

// Read initial state from URL search params
const getInitialStateFromURL = () => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  console.log(params);
  

  const brands = params.getAll('brand')
  const colors = params.getAll('color')
  const page = parseInt(params.get('page')) || 1
  const sort = params.get('sort') || 'default'
  const limit = parseInt(params.get('limit')) || 10
  const minPrice = parseInt(params.get('minPrice')) || 0
  const maxPrice = parseInt(params.get('maxPrice')) || 10000

  return {
    page,
    itemsPerPage: limit,
    sort,
    selectedBrands: brands,
    selectedColors: colors,
    priceRange: [minPrice, maxPrice],
  }
}

const urlState = getInitialStateFromURL()

const initialState = {
  page: urlState?.page || 1,
  itemsPerPage: urlState?.itemsPerPage || 10,
  sort: urlState?.sort || 'default',
  view: 'grid',
  selectedBrands: urlState?.selectedBrands || [],
  selectedColors: urlState?.selectedColors || [],
  priceRange: urlState?.priceRange || [0, 10000],
  activeCategory: null,
  activeChildCategory: null,
}

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      state.page = 1
    },
    setSort: (state, action) => {
      state.sort = action.payload
      state.page = 1
    },
    setView: (state, action) => {
      state.view = action.payload
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload
      state.page = 1
    },
    setSelectedColors: (state, action) => {
      state.selectedColors = action.payload
      state.page = 1
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
      state.page = 1
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
      state.page = 1
      state.sort = 'default'
      state.itemsPerPage = 10
      state.selectedBrands = []
      state.selectedColors = []
      state.priceRange = [0, 10000]
    },
    setActiveChildCategory: (state, action) => {
      state.activeChildCategory = action.payload
      state.page = 1
    },
    resetFilters: (state) => {
      state.selectedBrands = []
      state.selectedColors = []
      state.priceRange = [0, 10000]
      state.page = 1
      state.sort = 'default'
      state.itemsPerPage = 10
    },
    resetAll: () => initialState,
  },
})

export const {
  setPage,
  setItemsPerPage,
  setSort,
  setView,
  setSelectedBrands,
  setSelectedColors,
  setPriceRange,
  setActiveCategory,
  setActiveChildCategory,
  resetFilters,
  resetAll,
} = productPageSlice.actions

export default productPageSlice.reducer
