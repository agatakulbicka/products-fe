import { Link } from 'react-router-dom'

const ProductNotFound = () => (
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

export default ProductNotFound;