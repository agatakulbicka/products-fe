import { 
  Configuration, 
  ProductsApi,
  ProductUpdate
} from '../generated/api'
import { ProductDetails, ProductsList } from '../types/product'
import ProductsListConverter from '../converters/ProductsListConverter'
import ProductDetailsConverter from '../converters/ProductDetailsConverter'

const apiConfig = new Configuration({
  basePath: 'http://localhost:8000',
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
      throw error;
    }
  }

  static async getProductById(productId: string): Promise<ProductDetails> {
    try {
      const response = await productsApi.apiProductsIdGet(productId)
      const apiProduct = response.data
      return ProductDetailsConverter.fromAPI(apiProduct)
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      throw error;
    }
  }

  static async updateProduct(productId: string, productData: Partial<ProductDetails>): Promise<ProductDetails> {
    try {
      const updatePayload: ProductUpdate = {}
      
      if (productData.name !== undefined) {
        updatePayload.name = productData.name
      }
      if (productData.number !== undefined) {
        updatePayload.number = productData.number
      }
      if (productData.description !== undefined) {
        updatePayload.description = productData.description
      }
      if (productData.images !== undefined) {
        updatePayload.images = productData.images.map(image => ({
          name: image.name,
          url: image.url
        }))
      }

      const response = await productsApi.apiProductsIdPatch(productId, ProductDetailsConverter.toAPI(updatePayload));
      const apiProduct = response.data
      return ProductDetailsConverter.fromAPI(apiProduct)
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error)
      throw error
    }
  }
}

export type { 
  Product, 
  ProductUpdate,
  PaginatedProducts
} from '../generated/api'
