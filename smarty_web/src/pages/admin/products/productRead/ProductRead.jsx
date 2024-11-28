import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getOneProduct,
    getProductFiles,
    deleteProductFile,
    uploadProductFiles,
    fetchStatusCountsByProduct, // 새로운 API 함수
} from "../../../../api/admin/productApi";
import { getRentalsByProduct } from "../../../../api/admin/rentalApi";
import "./productRead.css";

export default function ProductRead() {
    const { product_id } = useParams();
    const [productData, setProductData] = useState(null);
    const [statusCounts, setStatusCounts] = useState({});
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rentals, setRentals] = useState([]);

    // Fetch product details, rentals, and files
    useEffect(() => {
        fetchProductDetails();
        fetchStatusCounts();
        fetchFiles();
        fetchRentals(); // 대여 정보 가져오기
    }, [product_id]);

    const fetchProductDetails = async () => {
        try {
            const data = await getOneProduct(product_id);
            setProductData(data);
        } catch (error) {
            console.error("상품 조회 실패:", error.response?.data || error.message);
            alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
        }
    };

    const fetchStatusCounts = async () => {
        try {
            const data = await fetchStatusCountsByProduct(product_id);
            const counts = data.reduce((acc, item) => {
                acc[item.product_status] = item.count;
                return acc;
            }, {});
            setStatusCounts(counts);
        } catch (error) {
            console.error("상태별 수량 조회 실패:", error.response?.data || error.message);
        }
    };

    const fetchFiles = async () => {
        try {
            const data = await getProductFiles(product_id);
            setFiles(data);
        } catch (error) {
            console.error("첨부파일 조회 실패:", error.response?.data || error.message);
        }
    };

    const fetchRentals = async () => {
        try {
            const data = await getRentalsByProduct(product_id);
            setRentals(data);
        } catch (error) {
            console.error("대여 정보 조회 실패:", error.response?.data || error.message);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            alert("첨부파일을 선택해주세요.");
            return;
        }

        try {
            await uploadProductFiles(product_id, selectedFiles);
            setSelectedFiles([]);
            fetchFiles();
        } catch (error) {
            console.error("파일 업로드 실패:", error.response?.data || error.message);
            alert("파일 업로드 중 오류가 발생했습니다.");
        }
    };

    const handleFileDelete = async (fileName) => {
        try {
            await deleteProductFile(product_id, fileName);
            fetchFiles();
        } catch (error) {
            console.error("파일 삭제 실패:", error.response?.data || error.message);
        }
    };

    if (!productData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="productRead">
            <div className="productTitleContainer">
                <div className="productTitle">상품 상세 정보</div>
            </div>

            <div className="productTop">
                {/* 상단 좌측: 상품 정보 */}
                <div className="productInfo">
                    <h2>상품 정보</h2>
                    <p><strong>상품 ID:</strong> {productData.product_id}</p>
                    <p><strong>상품 이름:</strong> {productData.product_name}</p>
                    <p><strong>가격:</strong> {productData.price} ₩</p>
                    <p>
                        <strong>재고량:</strong> {productData.stock} (
                        {Object.entries(statusCounts).map(([status, count]) => (
                            <span key={status}>{status}: {count} </span>
                        ))}
                        )
                    </p>
                    <p><strong>관리 방식:</strong> {productData.management_type}</p>
                    {productData.size ? (
                        <p><strong>사이즈:</strong> {productData.size}</p>
                    ) : (
                        <p><strong>사이즈:</strong> 없음</p>
                    )}
                </div>

                {/* 상단 우측: 첨부파일 관리 */}
                <div className="fileManagement">
                    <h2>이미지 관리</h2>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <img
                                    src={`http://localhost:8080/api/admin/products/images/s_${file}`}
                                    alt={`file-${index}`}
                                    style={{ width: "100px" }}
                                />
                                <button onClick={() => handleFileDelete(file)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setSelectedFiles([...e.target.files])}
                    />
                    <button onClick={handleFileUpload}>이미지 업로드</button>
                </div>
            </div>

            {/* 하단: 대여 정보 */}
            <div className="rentalInfo">
                <h2>대여 정보</h2>
                <table>
                    <thead>
                        <tr>
                            <th>사용자 ID</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>전화번호</th>
                            <th>대여 수량</th>
                            <th>대여 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental, index) => (
                            <tr key={index}>
                                <td>{rental.user_id}</td>
                                <td>{rental.user_name}</td>
                                <td>{rental.email}</td>
                                <td>{rental.phone}</td>
                                <td>{rental.count}</td>
                                <td>{rental.rental_status ? "대여 중" : "반납 완료"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
