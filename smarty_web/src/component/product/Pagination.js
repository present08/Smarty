import React from 'react';
import '../../css/productPage.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='pagination-container'>
            {/* 이전 페이지 버튼 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='pagination-nav-button'
            >
                이전
            </button>

            {/* 페이지 번호 버튼들 */}
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`pagination-button ${
                        currentPage === index + 1 ? 'active' : ''
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-nav-button"
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;