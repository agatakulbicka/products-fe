import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/store'
import { fetchProducts } from '../store/productsSlice'
import { setProductListItemsPerPage, setProductListCurrentPage } from '../store/settingsSlice'
import ProductRow from './ProductRow'
import Loader from './Loader'

function ProductList() {
  const dispatch = useAppDispatch()
  const { products, loading, error, pagination } = useAppSelector((state) => state.products)
  const { itemsPerPage, currentPage } = useAppSelector((state) => state.settings.productList)

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }))
  }, [dispatch, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    dispatch(setProductListCurrentPage(page))
    dispatch(fetchProducts({ page, limit: itemsPerPage }))
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    dispatch(setProductListItemsPerPage(newLimit))
    dispatch(fetchProducts({ page: 1, limit: newLimit }))
  }

  const renderPaginationButtons = () => {
    if (!pagination) return null

    const { currentPage, totalPages } = pagination
    const buttons = []

    if (currentPage > 3) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          1
        </button>
      )
      if (currentPage > 4) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        )
      }
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm border ${i === currentPage
              ? 'border-blue-500 bg-blue-600 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          {i}
        </button>
      )
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        )
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      )
    }

    return buttons
  }

  if (loading && products.length === 0) {
    return (
      <Loader />
    )
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8 text-center">
          <div className="text-red-600 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Error loading products</h3>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts({ page: 1, limit: 20 }))}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Products</h3>
            <p className="text-sm text-gray-500">
              {pagination ? `${pagination.totalProducts} products total` : 'Manage your product inventory'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            {pagination && (
              <div className="text-sm text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {products.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <ProductRow key={product.id} name={product.name} number={product.number} id={product.id} />
            ))}

            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((pagination.currentPage - 1) * itemsPerPage) + 1} to{' '}
                    {Math.min(pagination.currentPage * itemsPerPage, pagination.totalProducts)} of{' '}
                    {pagination.totalProducts} results
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1 || loading}
                      className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md"
                    >
                      Previous
                    </button>
                    {renderPaginationButtons()}

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages || loading}
                      className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductList
