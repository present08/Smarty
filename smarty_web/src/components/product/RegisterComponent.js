import React, { useState } from 'react';
import { registerProduct, registerProductAttach } from '../../api/intellijApi';
import FacilitiesHandler from '../../handler/FacilitiesHandler';

const RegisterComponent = () => {
    const initialProductState = {
        facility_id: '',
        product_name: '',
        price: '',
        management_type: '=========',
        size: [],
        stock: '',
        attachments: new FormData()
    };

    const [products, setProducts] = useState([initialProductState]);

    const handleFacilityChange = (index, facilityId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, facility_id: facilityId } : product
            )
        );
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, [name]: value } : product
            )
        );
    };

    const handleSizeChange = (index, sizeValue) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) => {
                if (i === index) {
                    const newSize = product.size.includes(sizeValue)
                        ? product.size.filter((size) => size !== sizeValue)
                        : [...product.size, sizeValue];
                    return { ...product, size: newSize };
                }
                return product;
            })
        );
    };

    const handleFileChange = (index, e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => formData.append("files", file)); // FormData에 파일 즉시 추가

        console.log("FormData with files:", formData.getAll("files")); // FormData에 파일이 있는지 확인

        // products 상태의 attachments를 FormData로 설정
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, attachments: formData } : product
            )
        );
    };

    const handleAddProduct = () => {
        setProducts((prevProducts) => [...prevProducts, { ...initialProductState }]);
    };

    const handleRemoveProduct = (index) => {
        setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        for (let product of products) {
            if (product.management_type === '=========') {
                alert('모든 상품에 대해 관리 방식을 선택해주세요.');
                return;
            }
        }

        const productsToSend = products.map((product) => ({
            ...product,
            size: product.size.join(',')
        }));

        try {
            const productResponse = await registerProduct(productsToSend);
            console.log('상품들이 등록되었습니다. : ', productResponse.data);

            const registeredProducts = productResponse.data;

            for (let i = 0; i < registeredProducts.length; i++) {
                const product = registeredProducts[i];
                const { product_id } = product;

                if (!product_id) {
                    console.warn(`Warning: Product at index ${i} has null product_id. Skipping attachment.`);
                    continue;
                }

                const formData = products[i].attachments; // 상태에서 FormData 가져오기
                console.log("Final FormData for upload:", formData.getAll("files")); // 확인

                if (formData.getAll("files").length === 0) {
                    console.log(`Product ${product_id}에는 첨부파일이 없습니다.`);
                    continue;
                }

                try {
                    await registerProductAttach(product_id, formData);
                    console.log(`첨부 파일이 등록되었습니다. : product_id ${product_id}`);
                } catch (fileError) {
                    console.error(`첨부 파일 등록 실패: product_id ${product_id}`, fileError);
                }
            }

            alert('모든 상품이 성공적으로 등록되었습니다.');
        } catch (error) {
            console.error('상품 등록에 오류 발생. : ', error);
            alert('상품 등록 실패');
        }
    };

    return (
        <form onSubmit={handleProductSubmit}>
            <h2>상품 등록</h2>
            {products.map((product, index) => (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <FacilitiesHandler
                        selectFacility={product.facility_id}
                        onFacilityChange={(facilityId) => handleFacilityChange(index, facilityId)}
                    />
                    <div>
                        <label>상품명 :</label>
                        <input type='text' name='product_name' value={product.product_name} onChange={(e) => handleChange(index, e)} required />
                    </div>
                    <div>
                        <label>가격 :</label>
                        <input type='number' name='price' value={product.price} onChange={(e) => handleChange(index, e)} required />
                    </div>
                    <div>
                        <label>관리 방식 :</label>
                        <select name="management_type" value={product.management_type} onChange={(e) => handleChange(index, e)} required>
                            <option value="=========" disabled>관리 방식을 선택하세요</option>
                            <option value="개별 관리">개별 관리</option>
                            <option value="일괄 관리">일괄 관리</option>
                            <option value="사이즈별 관리">사이즈별 관리</option>
                        </select>
                    </div>
                    {product.management_type === '사이즈별 관리' && (
                        <div>
                            <label>사이즈 :</label>
                            <div>
                                {["S", "M", "L", "XL", "XXL", "240", "250", "260", "270","280"].map((size) => (
                                    <label key={size}>
                                        <input
                                            type="checkbox"
                                            value={size}
                                            checked={product.size.includes(size)}
                                            onChange={() => handleSizeChange(index, size)}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <label>수량 :</label>
                        <input type='number' name='stock' value={product.stock} onChange={(e) => handleChange(index, e)} required />
                    </div>
                    <div>
                        <label>상품 이미지 :</label>
                        <input type='file' multiple onChange={(e) => handleFileChange(index, e)} />
                    </div>
                    {index > 0 && (
                        <button type="button" onClick={() => handleRemoveProduct(index)}>삭제</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAddProduct}>상품 추가</button>
            <button type='submit'>등록</button>
        </form>
    );
};

export default RegisterComponent;
