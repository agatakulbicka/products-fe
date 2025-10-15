import PaginationButtons from "./PaginationButtons"

interface PaginationProps {
    pagination: {
        currentPage: number
        totalPages: number
        totalProducts: number
    }
    itemsPerPage: number
    loading: boolean
    handlePageChange: (page: number) => void
}

const Pagination = ({ pagination, itemsPerPage, loading, handlePageChange }: PaginationProps) =>
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
                Showing {((pagination.currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(pagination.currentPage * itemsPerPage, pagination.totalProducts)} of{' '}
                {pagination.totalProducts} results
            </div>

            <div className="flex items-center space-x-1">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1 || loading}
                    className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md"
                >
                    Previous
                </button>
                <PaginationButtons pagination={pagination} onPageChange={handlePageChange} />

                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages || loading}
                    className="px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md"
                >
                    Next
                </button>
            </div>
        </div>
    </div>

export default Pagination