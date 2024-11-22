import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getOneProduct,
    uploadProductFiles,
    getProductFiles,
    deleteProductFile,
} from "../../../../api/admin/productApi";
import { getRentalsByProduct } from "../../../../api/admin/rentalApi";
import "./productRead.css";

export default function ProductRead() {
    const { product_id } = useParams();
    const [productData, setProductData] = useState(null);
    const [rentals, setRentals] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Fetch product details, rentals, and files
    useEffect(() => {
        console.log("요청된 product_id:", product_id); // 디버깅 로그 추가
        fetchProductDetails();
        fetchRentals();
        fetchFiles();
    }, [product_id]);

    const fetchProductDetails = async () => {
        try {
            const data = await getOneProduct(product_id);
            setProductData(data);
        } catch (error) {
            if (error.response?.status === 404) {
                console.error("상품 정보가 존재하지 않습니다.");
                alert("해당 상품 정보를 찾을 수 없습니다.");
            } else {
                console.error("상품 조회 실패:", error.response?.data || error.message);
                alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
            }
        }
    };

    const fetchRentals = async () => {
        try {
            const data = await getRentalsByProduct(product_id);
            setRentals(data);
        } catch (error) {
            console.error("대여 정보 조회 실패:", error);
        }
    };

    const fetchFiles = async () => {
        try {
            const data = await getProductFiles(product_id);
            console.log("첨부파일 데이터:", data); // 디버깅 로그 추가
            setFiles(data);
        } catch (error) {
            console.error("첨부파일 조회 실패:", error.response?.data || error.message);
        }
    };
    

    const handleFileUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            // 첨부파일이 없을 경우 알림창 표시
            alert("첨부파일을 선택해주세요.");
            return;
        }
    
        try {
            await uploadProductFiles(product_id, selectedFiles);
            setSelectedFiles([]); // 선택된 파일 초기화
            fetchFiles(); // 업로드 후 파일 목록 갱신
        } catch (error) {
            console.error("파일 업로드 실패:", error);
            alert("파일 업로드 중 오류가 발생했습니다.");
        }
    };
    

    const handleFileDelete = async (fileName) => {
        try {
            await deleteProductFile(product_id, fileName);
            fetchFiles(); // 삭제 후 파일 목록 갱신
        } catch (error) {
            console.error("파일 삭제 실패:", error);
        }
    };

    if (!productData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="product">
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
                    <p><strong>재고량:</strong> {productData.stock}</p>
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
                                src={`http://localhost:8080/api/admin/products/images/s_${file}`} // 썸네일 경로
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
