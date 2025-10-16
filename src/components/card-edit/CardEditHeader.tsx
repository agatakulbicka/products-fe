import { useFormContext } from "react-hook-form"
import { ProductFormData } from "../../types/forms"

interface CardEditHeaderProps {
    onCancel: () => void;
}

const CardEditHeader = ({ onCancel }: CardEditHeaderProps) => {
    const {
        formState: { isDirty, isValid, isSubmitting },
        reset,
        watch
    } = useFormContext<ProductFormData>()

    const productName = watch('name') || 'Untitled Product'

    const handleReset = () => {
        if (isDirty && window.confirm('Are you sure you want to reset all changes?')) {
            reset()
        }
    }

    return (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit: {productName}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Make changes to product information
                    </p>
                </div>

                <div className="flex space-x-3">
                    {isDirty && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                        className={`px-4 py-2 rounded-md transition-colors ${!isDirty || !isValid || isSubmitting
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>


            {isDirty && (
                <div className="mt-2 text-xs text-amber-600">
                    Unsaved changes
                </div>
            )}
        </div>
    )
}

export default CardEditHeader