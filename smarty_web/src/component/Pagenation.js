import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='flex justify-center mt-4 gap-2'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
            >
                이전
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === index + 1
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                다음
            </button>
        </div>
    )
}

export default Pagination