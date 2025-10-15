import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  productList: {
    itemsPerPage: number
    currentPage: number
  }
}

const initialState: SettingsState = {
  productList: {
    itemsPerPage: 10, 
    currentPage: 1
  }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProductListItemsPerPage: (state, action: PayloadAction<number>) => {
      state.productList.itemsPerPage = action.payload
      state.productList.currentPage = 1
    },
    setProductListCurrentPage: (state, action: PayloadAction<number>) => {
      state.productList.currentPage = action.payload
    },
    resetProductListPagination: (state) => {
      state.productList.currentPage = 1
    }
  }
})

export const {
  setProductListItemsPerPage,
  setProductListCurrentPage,
  resetProductListPagination
} = settingsSlice.actions

export default settingsSlice.reducer
