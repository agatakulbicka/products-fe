import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ProductsService } from '../services/productsService'
import { ProductDetails } from '../types/product'

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId: string) => {
        const response = await ProductsService.getProductById(productId)
        return response
    }
)

export const updateProduct = createAsyncThunk(
  'currentProductDetails/updateProduct',
  async ({ productId, productData }: { productId: string; productData: Partial<ProductDetails> }) => {
    const response = await ProductsService.updateProduct(productId, productData)
    return response
  }
)

interface ProductDetailsState {
    product: ProductDetails | null
    loading: boolean
    error: string | null
}

const initialState: ProductDetailsState = {
    product: null,
    loading: false,
    error: null,
}

const setCurrentProductDetailsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearCurrentProductDetailsError: (state) => {
            state.error = null
        },
        setCurrentProductDetails: (state, action: PayloadAction<ProductDetails | null>) => {
            state.product = action.payload
        },
    },
    extraReducers: (builder) => {
        // Fetch single product
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.product = {
                    id: action.payload.id || '',
                    name: action.payload.name ?? '',
                    number: action.payload.number ?? '',
                    updatedAt: action.payload.updatedAt || new Date().toISOString(),
                    createdAt: action.payload.createdAt || new Date().toISOString(),
                    description: action.payload.description ?? '',
                    images: action.payload.images ?? []
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch product'
            })

        // Update product
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = {
                    id: action.payload.id || '',
                    name: action.payload.name ?? '',
                    number: action.payload.number ?? '',
                    updatedAt: action.payload.updatedAt || new Date().toISOString(),
                    createdAt: action.payload.createdAt || new Date().toISOString(),
                    description: action.payload.description ?? '',
                    images: action.payload.images ?? []
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to update product'
            })
    },
})

export const { clearCurrentProductDetailsError, setCurrentProductDetails } = setCurrentProductDetailsSlice.actions
export default setCurrentProductDetailsSlice.reducer