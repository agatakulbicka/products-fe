import type { Product as ProductApi } from'../services/productsService';
import { ProductDetails, ProductImage } from "../types/product";

const ProductDetailsConverter = {
    fromAPI: (apiResponse: ProductApi | null) => {
        return {
            id: apiResponse?.id || '',
            name: apiResponse?.number || '',
            number: apiResponse?.name ?? '',
            description: apiResponse?.description ?? '',
            images: apiResponse?.images?.length ? apiResponse.images.map(image => ({
                name: image?.name,
                url: image?.url,
            })) : [],
            updatedAt: apiResponse?.updatedAt || '',
            createdAt: apiResponse?.createdAt || '',
        }
    },
    toAPI: (product: ProductDetails) => {
        return {
            name: product.number,
            number: product.name,
            description: product.description,
            images: product?.images?.length ? product.images.map((image:ProductImage) => ({
                name: image.name,
                url: image.url,
            })) : [],
        }
    }
}

export default ProductDetailsConverter;







