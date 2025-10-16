import { useFormContext } from "react-hook-form"
import CardEditContent from "./CardEditContent"
import CardEditHeader from "./CardEditHeader"
import { ProductFormData } from "../../types/forms"

interface CardEditProps {
  product: {
    id: string
    name: string
    number: string
    description?: string
    images?: { name: string; url: string }[]
    createdAt?: string
    updatedAt?: string
  }
  onCancel?: () => void
  onSave?: (data: ProductFormData) => void
}

const CardEdit = ({ product, onCancel, onSave }: CardEditProps) => {
  const { handleSubmit } = useFormContext<ProductFormData>()

  const onSubmit = (data: ProductFormData) => {
    onSave && onSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <CardEditHeader 
          name={product.name} 
          number={product.number}
          onCancel={onCancel}
        />
        <CardEditContent 
          description={product.description || ''}
          images={product.images}
          number={product.number}
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          id={product.id}
        />
      </div>
    </form>
  )
}

export default CardEdit