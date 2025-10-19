import type { Product as ProductApi } from'../services/productsService';
import { ProductDetails, ProductImage } from "../types/product";

const ProductDetailsConverter = {
    fromAPI: (apiResponse: ProductApi | null): ProductDetails => {
        return {
            id: apiResponse?.id || '',
            name: apiResponse?.number || '', // Fixed mapping
            number: apiResponse?.name || '', // Fixed mapping
            description: apiResponse?.description ?? '',
            images: apiResponse?.images?.length ? apiResponse.images.map(image => ({
                name: image?.name || '',
                url: image?.url || '',
            })) : [],
            updatedAt: apiResponse?.updatedAt || new Date().toISOString(),
            createdAt: apiResponse?.createdAt || new Date().toISOString(),
        }
    },
    toAPI: (product: ProductDetails): ProductApi => {
        return {
            name: product.number,   // Fixed mapping
            number: product.name,   // Fixed mapping
            description: product.description,
            images: product?.images?.length ? product.images.map((image: ProductImage) => ({
                name: image.name,
                url: image.url,
            })) : []
        }
    }
}

export default ProductDetailsConverter;







