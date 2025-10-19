import { useFormContext, useFieldArray } from "react-hook-form"
import { ProductFormData, productValidationRules } from "../../types/forms"

interface CardContentProps {
    number?: string;
    createdAt?: string;
    updatedAt?: string;
    id: string;
}

const CardContent = ({ number, createdAt, updatedAt, id }: CardContentProps) => {
    const { 
        register, 
        formState: { errors },
        control 
    } = useFormContext<ProductFormData>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "images"
    })

    return (
        <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                {...register('name', productValidationRules.name)}
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter product name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Number*
                            </label>
                            <input
                                {...register('number', productValidationRules.number)}
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.number ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter product number"
                            />
                            {errors.number && (
                                <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register('description', productValidationRules.description)}
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.description ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter product description"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product Images
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum 12 images ({fields.length}/12)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ name: '', url: '' })}
                                    disabled={fields.length >= 12}
                                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                        fields.length >= 12
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    Add Image
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-medium text-gray-700">Image {index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Image Name
                                                </label>
                                                <input
                                                    {...register(`images.${index}.name` as const)}
                                                    type="text"
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Image name or alt text"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Image URL *
                                                </label>
                                                <input
                                                    {...register(`images.${index}.url` as const, productValidationRules.imageUrl)}
                                                    type="url"
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                                {errors.images?.[index]?.url && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {errors.images[index]?.url?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {fields.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No images added yet</p>
                                        <button
                                            type="button"
                                            onClick={() => append({ name: '', url: '' })}
                                            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Add your first image
                                        </button>
                                    </div>
                                )}
                                
                                {fields.length >= 12 && (
                                    <div className="text-center py-4 px-4 bg-amber-50 border border-amber-200 rounded-md">
                                        <p className="text-sm text-amber-700">
                                            Maximum number of images reached (12/12). Remove an image to add a new one.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-mono">{id}</dd>
                            </div>
                            {number && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Number</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{number}</dd>
                                </div>
                            )}
                            {createdAt && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(createdAt).toLocaleDateString()}
                                    </dd>
                                </div>
                            )}
                            {updatedAt && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(updatedAt).toLocaleDateString()}
                                    </dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Images</dt>
                                <dd className="mt-1 text-sm text-gray-900">{fields.length} image(s)</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardContent
