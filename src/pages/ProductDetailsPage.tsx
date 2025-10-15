import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../store/store'
import { fetchProductById, updateProduct } from '../store/currentProductDetails'
import { ProductFormData } from '../types/forms'
import Loader from '../components/Loader'
import ProductDetailsError from '../components/ProductDetailsError'
import ProductNotFound from '../components/ProductNotFound'
import Breadcrumb from '../components/Breadcrumb'
import Card from '../components/card/Card'
import CardEdit from '../components/card-edit/CardEdit'

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { product, loading, error } = useAppSelector((state) => state.currentProductDetails)
  const [isEditing, setIsEditing] = useState(false)

  // Initialize form methods for product editing
  const methods = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      number: product?.number || '',
      description: product?.description || '',
      images: product?.images?.map(img => ({
        name: img.name || '',
        url: img.url || ''
      })) || []
    },
    mode: 'onChange'
  })

  const state = useAppSelector((state) => state)
  console.log('Current State::::', state)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [id])

  const handleOnSave = async (data: ProductFormData) => {
    //save await
    if (!id) return
    await dispatch(updateProduct({productId: id, productData: data}))
    await dispatch(fetchProductById(id))
    setIsEditing(false)

  }

  useEffect(() => {
    if (product) {
      methods.reset({
        name: product.name || '',
        number: product.number || '',
        description: product.description || '',
        images: product.images?.map(img => ({
          name: img.name || '',
          url: img.url || ''
        })) || []
      })
    }
  }, [product, methods])

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
      {isEditing ? (
        <FormProvider {...methods}>
          <CardEdit 
            product={product} 
            onCancel={() => setIsEditing(false)}
            onSave={handleOnSave}
          />
        </FormProvider>
      ) : (
        <Card product={product} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  )
}

export default ProductDetailsPage
