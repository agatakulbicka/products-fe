import { describe, it, expect } from 'vitest'
import settingsReducer, {
  setProductListItemsPerPage,
  setProductListCurrentPage,
  resetProductListPagination
} from '../store/settingsSlice'

describe('settingsSlice', () => {
  const initialState = {
    productList: {
      itemsPerPage: 10,
      currentPage: 1
    }
  }

  it('should return the initial state', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setProductListItemsPerPage', () => {
    const newItemsPerPage = 10
    const action = setProductListItemsPerPage(newItemsPerPage)
    const state = settingsReducer(initialState, action)
    
    expect(state.productList.itemsPerPage).toBe(newItemsPerPage)
    expect(state.productList.currentPage).toBe(1) // Reset to page 1
  })

  it('should handle setProductListCurrentPage', () => {
    const newPage = 3
    const action = setProductListCurrentPage(newPage)
    const state = settingsReducer(initialState, action)
    
    expect(state.productList.currentPage).toBe(newPage)
    expect(state.productList.itemsPerPage).toBe(10)
  })

  it('should handle resetProductListPagination', () => {
    const modifiedState = {
      productList: {
        itemsPerPage: 10,
        currentPage: 5
      }
    }
    
    const action = resetProductListPagination()
    const state = settingsReducer(modifiedState, action)
    
    expect(state.productList.currentPage).toBe(1)
    expect(state.productList.itemsPerPage).toBe(10)
  })

  it('should reset to page 1 when changing items per page from different page', () => {
    const stateOnPage3 = {
      productList: {
        itemsPerPage: 10,
        currentPage: 3
      }
    }
    
    const action = setProductListItemsPerPage(5)
    const state = settingsReducer(stateOnPage3, action)
    
    expect(state.productList.itemsPerPage).toBe(5)
    expect(state.productList.currentPage).toBe(1)
  })
})
