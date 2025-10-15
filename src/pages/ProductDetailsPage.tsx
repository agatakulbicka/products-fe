import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/store'
import { fetchProductById } from '../store/currentProductDetails'
import Loader from '../components/Loader'
import ProductDetailsError from '../components/ProductDetailsError'
import ProductNotFound from '../components/ProductNotFound'
import Breadcrumb from '../components/Breadcrumb'
import Card from '../components/card/Card'

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { product, loading, error } = useAppSelector((state) => state.currentProductDetails)

  const state = useAppSelector((state) => state)
  console.log('Current State::::', state)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [id])

  if (loading && !product) {
    return (
      <Loader />
    )
  }

  if (error && !product) {
    return (
      <ProductDetailsError error={error} />
    )
  }

  if (!product) {
    return (
      <ProductNotFound />
    )
  }

  return (
    <div>
      <Breadcrumb redirectLink="/products" name={product.name} section="Products" />
      <Card product={product} />
    </div>
  )
}

export default ProductDetailsPage
