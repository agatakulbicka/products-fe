import { PaginatedProducts as PaginatedProductsApi } from "../generated/api";
// import { Product, ProductDetails, ProductsPagination } from "../types/product";


const ProductsListConverter = {
  fromAPI(apiResponse: PaginatedProductsApi) {
    return {
      products: apiResponse?.products?.map(product => ({
        id: product.id,
        name: product.number,
        number: product.name,
  
      })),
      pagination: {
        currentPage: apiResponse?.pagination?.currentPage,
        totalPages: apiResponse?.pagination?.totalPages,
        totalProducts: apiResponse?.pagination?.totalProducts,
        hasNext: apiResponse?.pagination?.hasNext,
        hasPrev: apiResponse?.pagination?.hasPrev,
      },
    };
  },

  // toAPI(products: ProductDetails[]) {
  //   return products.map(product => ({
  //     id: product.id,
  //     name: product.number,
  //     number: product.name,
  //     description: product.description,
  //     images: product.images?.length ? product.images.map(image => ({
  //       name: image?.name,
  //       url: image?.url,
  //     })) :  [],
  //   }))
  // },
};

export default ProductsListConverter;
