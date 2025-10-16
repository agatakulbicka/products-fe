import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
