import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/store'
import { fetchProductById } from '../store/productsSlice'

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector((state) => state.products)
  
  // Find the product in the store or fetch it if not found
  const product = products.find(p => p.id === id)

  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id, product])

  if (loading && !product) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error && !product) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8 text-center">
          <div className="text-red-600 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Error loading product</h3>
          <p className="text-sm text-gray-500">{error}</p>
          <Link 
            to="/products"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Product not found</h3>
          <p className="text-sm text-gray-500">The product you're looking for doesn't exist.</p>
          <Link 
            to="/products"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/products" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Products
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              {product.number && (
                <p className="mt-1 text-sm text-gray-500">SKU: {product.number}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Product
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Delete Product
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {product.description ? (
                      <p className="text-gray-700">{product.description}</p>
                    ) : (
                      <p className="text-gray-500 italic">No description available</p>
                    )}
                  </div>
                </div>

                {/* Images */}
                {product.images && product.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs">{image}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">{product.id}</dd>
                  </div>
                  {product.number && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">SKU/Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.number}</dd>
                    </div>
                  )}
                  {product.createdAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  {product.updatedAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  {product.images && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Images</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.images.length} image(s)</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
