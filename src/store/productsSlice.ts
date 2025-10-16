import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/product'
import { ProductsService } from '../services/productsService'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
    hasNext: boolean
    hasPrev: boolean
  } | null
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  pagination: null
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: { page?: number; limit?: number }) => {
    const response = await ProductsService.getProducts(params)
    return response
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products || []
        if (action.payload.pagination) {
          state.pagination = {
            currentPage: action.payload.pagination.currentPage || 1,
            totalPages: action.payload.pagination.totalPages || 1,
            totalProducts: action.payload.pagination.totalProducts || 0,
            hasNext: action.payload.pagination.hasNext || false,
            hasPrev: action.payload.pagination.hasPrev || false,
          }
        } else {
          state.pagination = null
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export const { clearError, setProducts } = productsSlice.actions
export default productsSlice.reducer
