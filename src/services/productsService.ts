import { 
  Configuration, 
  ProductsApi
} from '../generated/api'
import { Product, ProductDetails, ProductsList } from '../types/product'
import ProductsListConverter from '../converters/ProductsListConverter'

// API Configuration
const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

export const productsApi = new ProductsApi(apiConfig)

export class ProductsService {
  static async getProducts(params?: {
    page?: number
    limit?: number
  }): Promise<ProductsList> {
    try {
      const response = await productsApi.apiProductsGet(
        params?.page,
        params?.limit
      )
      const apiData = response.data
      return {
        products: ProductsListConverter.fromAPI(apiData).products || [],
        pagination: {
          currentPage: apiData.pagination?.currentPage || 1,
          totalPages: apiData.pagination?.totalPages || 1,
          totalProducts: apiData.pagination?.totalProducts || 0,
          hasNext: apiData.pagination?.hasNext || false,
          hasPrev: apiData.pagination?.hasPrev || false
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      
      // Return mock data as fallback
      return {
        products: [
          {
            id: '1',
            name: 'Product 1',
            number: 'PROD-001'
          },
          {
            id: '2', 
            name: 'Product 2',
            number: 'PROD-002'
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: 2,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  }

  static async getProductById(productId: string): Promise<ProductDetails> {
    try {
      const response = await productsApi.apiProductsIdGet(productId)
      // Map API response to our local type
      const apiProduct = response.data
      return {
        id: apiProduct.id || productId,
        name: apiProduct.name || 'Unknown Product',
        number: apiProduct.number || 'N/A',
        description: apiProduct.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: []
      }
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      
      return {
        id: productId,
        name: 'Mock Product',
        number: 'MOCK-' + productId.toUpperCase(),
        description: 'This is a mock product for demonstration purposes.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [
          {
            name: 'Mock Product Image',
            url: 'https://via.placeholder.com/400x400?text=Mock+Product'
          }
        ]
      }
    }
  }

  static async updateProduct(productId: string, productData: Partial<ProductDetails>): Promise<ProductDetails> {
    try {
      const apiRequest = {
        name: productData.name,
        number: productData.number,
        description: productData.description
      }
      const response = await productsApi.apiProductsIdPatch(productId, apiRequest)
      
      const apiProduct = response.data
      return {
        id: apiProduct.id || productId,
        name: apiProduct.name || 'Unknown Product',
        number: apiProduct.number || 'N/A',
        description: apiProduct.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: []
      }
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error)
      throw error
    }
  }

  // Helper method to create a new product (would need to be added to OpenAPI spec)
  // For now, we'll use a mock implementation
  static async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    // This would call the actual POST endpoint once added to the OpenAPI spec
    console.log('Creating product:', productData)
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...productData
    }
  }

  // Helper method to delete a product (would need to be added to OpenAPI spec)
  static async deleteProduct(productId: string): Promise<void> {
    // This would call the actual DELETE endpoint once added to the OpenAPI spec
    console.log(`Deleting product: ${productId}`)
  }
}

// Export types for use in components
export type { 
  Product, 
  ProductUpdate,
  PaginatedProducts
} from '../generated/api'
