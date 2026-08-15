import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  itemsPerPage: 10,
  sort: 'default',
  view: 'grid',
  selectedBrands: [],
  selectedColors: [],
  priceRange: [0, 10000],
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
    },
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
} = productPageSlice.actions

export default productPageSlice.reducer
