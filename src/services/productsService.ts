import ProductsConverter from '../converters/ProductsListConverter'
import { 
  Configuration, 
  ProductsApi, 
  Product, 
  ProductUpdate, 
  PaginatedProducts
} from '../generated/api'

// API Configuration
const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  // Add authentication headers if needed
  // apiKey: (name: string) => `Bearer ${getAuthToken()}`,
})

// Create API client instance
export const productsApi = new ProductsApi(apiConfig)

// Products Service - Higher level abstraction over the generated API
export class ProductsService {
  /**
   * Get all products with pagination
   */
  static async getProducts(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedProducts> {
    try {
      const response = await productsApi.apiProductsGet(
        params?.page,
        params?.limit
      )
      return ProductsConverter.fromAPI(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      
      // Return mock data for development when API is not available
      if (import.meta.env.DEV) {
        console.warn('API not available, returning mock data...')
        return this.getMockProducts(params)
      }
      
      throw error
    }
  }

  /**
   * Mock data for development
   */
  private static getMockProducts(params?: { page?: number; limit?: number }): PaginatedProducts {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'MacBook Pro 16"',
        number: 'MBP-16-001',
        description: 'High-performance laptop for professionals',
        images: ['macbook-1.jpg', 'macbook-2.jpg'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2', 
        name: 'iPhone 15 Pro',
        number: 'IP15P-001',
        description: 'Latest iPhone with titanium design',
        images: ['iphone-1.jpg'],
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        name: 'iPad Air',
        number: 'IPA-001',
        description: 'Lightweight tablet for creativity and productivity',
        images: ['ipad-1.jpg', 'ipad-2.jpg', 'ipad-3.jpg'],
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000).toISOString()
      }
    ]

    const page = params?.page || 1
    const limit = params?.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = mockProducts.slice(startIndex, endIndex)

    return {
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockProducts.length / limit),
        totalProducts: mockProducts.length,
        hasNext: endIndex < mockProducts.length,
        hasPrev: page > 1
      }
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProductById(productId: string): Promise<Product> {
    try {
      const response = await productsApi.apiProductsIdGet(productId)
      return response.data
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      throw error
    }
  }

  /**
   * Update an existing product (partial update)
   */
  static async updateProduct(productId: string, productData: ProductUpdate): Promise<Product> {
    try {
      const response = await productsApi.apiProductsIdPatch(productId, productData)
      return response.data
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
