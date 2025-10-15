export interface ProductFormData {
  name: string
  number: string
  description: string
  images: ProductImageFormData[]
  id: string
}

export interface ProductImageFormData {
  name: string
  url: string
}

export const productValidationRules = {
  name: {
    required: 'Product name is required',
    minLength: {
      value: 2,
      message: 'Product name must be at least 2 characters'
    }
  },
  number: {
    required: 'Product number is required',
    pattern: {
      value: /^[A-Z0-9-]+$/i,
      message: 'Product number can only contain letters, numbers, and hyphens'
    }
  },
  description: {
    maxLength: {
      value: 1000,
      message: 'Description cannot exceed 1000 characters'
    }
  },
  imageUrl: {
    required: 'Image URL is required',
    pattern: {
      value: /^https?:\/\/.+/,
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  }
}
