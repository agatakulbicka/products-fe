import ProductList from '../components/ProductList'

function ProductsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Products</h2>
        <p className="text-gray-600">
          Manage your product inventory with ease.
        </p>
      </div>
      <ProductList />
    </div>
  )
}

export default ProductsPage
