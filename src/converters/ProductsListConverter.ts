import type { PaginatedProducts as PaginatedProductsApi } from '../services/productsService';

const ProductsListConverter = {
  fromAPI(apiResponse: PaginatedProductsApi) {
    return {
      products: apiResponse?.products?.map(product => ({
        id: product.id || '',
        name: product.number || '', // Fixed mapping
        number: product.name || '', // Fixed mapping
      })) || [],
      pagination: {
        currentPage: apiResponse?.pagination?.currentPage || 1,
        totalPages: apiResponse?.pagination?.totalPages || 1,
        totalProducts: apiResponse?.pagination?.totalProducts || 0,
        hasNext: apiResponse?.pagination?.hasNext || false,
        hasPrev: apiResponse?.pagination?.hasPrev || false,
      },
    };
  },
};

export default ProductsListConverter;
