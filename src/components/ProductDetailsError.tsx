import { Link } from 'react-router-dom'

interface ProductDetailsErrorProps {
  error: string
}

const ProductDetailsError = ({ error }: ProductDetailsErrorProps) => (
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

export default ProductDetailsError