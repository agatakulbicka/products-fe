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
    },
    maxLength: {
      value: 50,
      message: 'Product name cannot exceed 50 characters'
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
    required: 'Product description is required',
    minLength: {
      value: 2,
      message: 'Description must be at least 2 characters'
    },
    maxLength: {
      value: 500,
      message: 'Description cannot exceed 500 characters'
    }
  },
  imageName: {
    required: 'Image name is required',
    minLength: {
      value: 2,
      message: 'Image name must be at least 2 characters'
    },
    maxLength: {
      value: 30,
      message: 'Image name cannot exceed 30 characters'
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
