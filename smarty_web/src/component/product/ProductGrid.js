import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProductGrid = ({ productList, selectedFacility }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleProduct = (product_id) => {
        console.log("선택된 ID: ", product_id)
        navigate(`detail/${product_id}`, {
            state: {
                from: location,
                selectedFacility: selectedFacility
            }
        })
    }

    return (
        <div className='product-container'>
            <h2 className='product-title'>대여 가능한 물품</h2>
            <div className='products-grid'>
                {productList.map((item) => (
                    <div
                        key={item.product_id}
                        className="product-card"
                        onClick={() => handleProduct(item.product_id)}
                    >
                        <div className='product-image-container'>
                            {item.attachFiles?.length > 0 ? (
                                <img
                                    src={`http://localhost:8080/api/products/images/${item.attachFiles[0].fileName}`}
                                    alt={item.product_name}
                                    className='product-image'
                                    onError={(e) => {
                                        e.target.src = '/no-image.png'
                                        e.target.onerror = null
                                    }}
                                />
                            ) : (
                                <div className="no-image">
                                    <span className="text-gray-400">이미지 없음</span>
                                </div>
                            )}
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{item.product_name}</h3>
                            <p className='product-size'>{item.size}</p>
                            <p className="product-price">{item.price.toLocaleString()} 원</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;