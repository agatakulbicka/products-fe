import { Link } from 'react-router-dom'

interface ProductRowProps {
    id?: string
    number: string
    name: string
}

const ProductRow = ({ id, number, name }: ProductRowProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="flex flex-col">
                    <Link
                        to={`/products/${id}`}
                        className="block px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {name}
                        </h4>
                    </Link>
                    {number && (
                        <p className="mx-6 my-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit mt-1">
                            Number: {number}
                        </p>
                    )}
                </div>
            </div>
        </div>

    )
};

export default ProductRow;