interface CardHeaderProps {
    name: string;
    number?: string;
    onClick?: () => void;
}

const CardHeader = ({ name, number, onClick }: CardHeaderProps) => <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            {number && (
                <p className="mt-1 text-sm text-gray-500">SKU: {number}</p>
            )}
        </div>
        <div className="flex space-x-2">
            <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Product
            </button>
        </div>
    </div>
</div>

export default CardHeader