interface CardContentProps {
    description: string;
    images?: { name: string; url: string }[];
    number?: string;
    createdAt?: string;
    updatedAt?: string;
    id: string;
}

const CardContent = ({ description, images, number, createdAt, updatedAt, id }: CardContentProps) => (
    <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
                <div className="space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            {description ? (
                                <p className="text-gray-700">{description}</p>
                            ) : (
                                <p className="text-gray-500 italic">No description available</p>
                            )}
                        </div>
                    </div>

                    {/* Images */}
                    {images && images.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map((image) => (
                                    <div key={image.url} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            {image.url ? (
                                                <img
                                                    src={image.url}
                                                    alt={image?.name}
                                                    className="object-cover w-full h-full rounded-lg"
                                                />
                                            ) : (
                                                <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>

                                            )}
                                            <p className="text-xs">{image?.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
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
                                <dt className="text-sm font-medium text-gray-500">SKU/Number</dt>
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
                        {images && (
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Images</dt>
                                <dd className="mt-1 text-sm text-gray-900">{images.length} image(s)</dd>
                            </div>
                        )}
                    </dl>
                </div>
            </div>
        </div>
    </div>
);

export default CardContent;
