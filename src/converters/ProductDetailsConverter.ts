import { Product as ProductApi } from "../generated/api";

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
    }
}

export default ProductDetailsConverter;







