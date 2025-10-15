interface PaginationButtonsProps {
    pagination: {
        currentPage: number
        totalPages: number
    }
    onPageChange: (page: number) => void
}

const PaginationButtons = ({ pagination, onPageChange }: PaginationButtonsProps) => {
    if (!pagination) return null

    const { currentPage, totalPages } = pagination
    const buttons = []

    if (currentPage > 3) {
        buttons.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
                1
            </button>
        )
        if (currentPage > 4) {
            buttons.push(
                <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-500">
                    ...
                </span>
            )
        }
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        buttons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`px-3 py-2 text-sm border ${i === currentPage
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                {i}
            </button>
        )
    }

    if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
            buttons.push(
                <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-500">
                    ...
                </span>
            )
        }
        buttons.push(
            <button
                key={totalPages}
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
                {totalPages}
            </button>
        )
    }

    return buttons
}

export default PaginationButtons;