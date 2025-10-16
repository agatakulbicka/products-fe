import { describe, it, expect, vi } from 'vitest'
import currentProductDetailsReducer, {
  clearCurrentProductDetailsError,
  setCurrentProductDetails,
  clearCurrentProductDetails,
  fetchProductById,
  updateProduct
} from '../store/currentProductDetailsSlice'
import { ProductDetails } from '../types/product'

vi.mock('../services/productsService', () => ({
  ProductsService: {
    getProductById: vi.fn(),
    updateProduct: vi.fn()
  }
}))

describe('currentProductDetailsSlice', () => {
  const initialState = {
    product: null,
    loading: false,
    error: null
  }

  const mockProduct: ProductDetails = {
    id: '1',
    name: 'Test Product',
    number: 'TEST-001',
    description: 'Test Description',
    images: [{ name: 'test.jpg', url: 'https://example.com/test.jpg' }],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  }

  it('should return the initial state', () => {
    expect(currentProductDetailsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle clearCurrentProductDetailsError', () => {
    const previousState = { ...initialState, error: 'Some error' }
    expect(currentProductDetailsReducer(previousState, clearCurrentProductDetailsError())).toEqual({
      ...previousState,
      error: null
    })
  })

  it('should handle setCurrentProductDetails', () => {
    expect(currentProductDetailsReducer(initialState, setCurrentProductDetails(mockProduct))).toEqual({
      ...initialState,
      product: mockProduct
    })
  })

  it('should handle clearCurrentProductDetails', () => {
    const previousState = {
      product: mockProduct,
      loading: true,
      error: 'Some error'
    }
    expect(currentProductDetailsReducer(previousState, clearCurrentProductDetails())).toEqual(initialState)
  })

  it('should handle fetchProductById.pending', () => {
    const action = { type: fetchProductById.pending.type }
    const state = currentProductDetailsReducer(initialState, action)
    expect(state).toEqual({
      product: null,
      loading: true,
      error: null
    })
  })

  it('should handle fetchProductById.fulfilled', () => {
    const action = { 
      type: fetchProductById.fulfilled.type, 
      payload: mockProduct 
    }
    const state = currentProductDetailsReducer(initialState, action)
    expect(state).toEqual({
      product: mockProduct,
      loading: false,
      error: null
    })
  })

  it('should handle fetchProductById.rejected', () => {
    const action = { 
      type: fetchProductById.rejected.type, 
      error: { message: 'Network error' }
    }
    const state = currentProductDetailsReducer(initialState, action)
    expect(state).toEqual({
      product: null,
      loading: false,
      error: 'Network error'
    })
  })

  it('should handle updateProduct.pending', () => {
    const previousState = { ...initialState, product: mockProduct }
    const action = { type: updateProduct.pending.type }
    const state = currentProductDetailsReducer(previousState, action)
    expect(state).toEqual({
      product: mockProduct,
      loading: true,
      error: null
    })
  })

  it('should handle updateProduct.fulfilled', () => {
    const updatedProduct = { ...mockProduct, name: 'Updated Product' }
    const action = { 
      type: updateProduct.fulfilled.type, 
      payload: updatedProduct 
    }
    const state = currentProductDetailsReducer(initialState, action)
    expect(state).toEqual({
      product: updatedProduct,
      loading: false,
      error: null
    })
  })

  it('should handle updateProduct.rejected', () => {
    const action = { 
      type: updateProduct.rejected.type, 
      error: { message: 'Update failed' }
    }
    const state = currentProductDetailsReducer(initialState, action)
    expect(state).toEqual({
      product: null,
      loading: false,
      error: 'Update failed'
    })
  })
})
