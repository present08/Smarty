import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

const Pagenation = ({ products = [], selectedFacility }) => {  // selectedFacility prop 추가
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // 시설이 변경될 때마다 페이지를 1로 리셋
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFacility]);

    const getPaginatedProducts = () => {
        if (!products || products.length === 0) {
            return [];
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    };

    const getTotalPages = () => {
        if (!products || products.length === 0) {
            return 0;
        }
        return Math.ceil(products.length / itemsPerPage);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <ProductGrid productList={getPaginatedProducts()} />
            {products.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={getTotalPages()}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Pagenation;