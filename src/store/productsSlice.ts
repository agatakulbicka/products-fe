import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Product, ProductsService } from '../services/productsService'

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
  pagination: null,
}

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: { page?: number; limit?: number }) => {
    const response = await ProductsService.getProducts(params)
    return response
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string) => {
    const response = await ProductsService.getProductById(productId)
    return response
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Omit<Product, 'id'>) => {
    const response = await ProductsService.createProduct(productData)
    return response
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }: { productId: string; productData: Partial<Product> }) => {
    const response = await ProductsService.updateProduct(productId, productData)
    return response
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string) => {
    await ProductsService.deleteProduct(productId)
    return productId
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
    // Fetch products
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

    // Fetch single product
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        // Update the product in the list if it exists
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        } else {
          state.products.push(action.payload)
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create product'
      })

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update product'
      })

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(p => p.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete product'
      })
  },
})

export const { clearError, setProducts } = productsSlice.actions
export default productsSlice.reducer
