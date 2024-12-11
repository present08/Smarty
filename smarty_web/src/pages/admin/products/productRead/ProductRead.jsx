import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    getOneProduct,
    getProductFiles,
    deleteProductFile,
    uploadProductFiles,
    fetchLogsByProductId,
} from "../../../../api/admin/productApi";
import { getRentalsByProduct } from "../../../../api/admin/rentalApi";
import "./productRead.css";

export default function ProductRead() {
    const { product_id } = useParams();
    const [productData, setProductData] = useState(null);
    const [statusLogs, setStatusLogs] = useState([]);
    const [files, setFiles] = useState([]);
    const [rentals, setRentals] = useState([]);
    const facility_id = productData?.facility_id; // 상품 데이터에서 facility_id 가져오기


    useEffect(() => {
        fetchProductDetails();
        fetchFiles();
        fetchRentals();
        fetchStatusLogs();
    }, [product_id]);

    // 상품 상세 정보 가져오기
    const fetchProductDetails = async () => {
        try {
            const data = await getOneProduct(product_id);
            console.log("상품 정보:", data);
            setProductData(data);
        } catch (error) {
            console.error("상품 조회 실패:", error.response?.data || error.message);
        }
    };

    // 상태 로그 가져오기
    const fetchStatusLogs = async () => {
        try {
            const data = await fetchLogsByProductId(product_id);
            console.log("상태 로그 데이터 확인:", data);
            setStatusLogs(data);
        } catch (error) {
            console.error("상태 로그 조회 실패:", error.message);
        }
    };

    // 첨부파일 가져오기
    const fetchFiles = async () => {
        try {
            const data = await getProductFiles(product_id);
            setFiles(data);
        } catch (error) {
            console.error("첨부파일 조회 실패:", error.response?.data || error.message);
        }
    };

    // 대여 정보 가져오기
    const fetchRentals = async () => {
        try {
            const data = await getRentalsByProduct(product_id);
            setRentals(data);
        } catch (error) {
            console.error("대여 정보 조회 실패:", error.response?.data || error.message);
        }
    };

    const handleFileUpload = async () => {
        if (!files || files.length === 0) {
            alert("첨부파일을 선택해주세요.");
            return;
        }

        try {
            await uploadProductFiles(product_id, files);
            fetchFiles();
        } catch (error) {
            console.error("파일 업로드 실패:", error.response?.data || error.message);
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

    // 재고량 및 상태 계산
    const totalStock = productData.stock || 0;

    // 상태별 수량 요약
    const statusSummary = statusLogs.reduce((acc, log) => {
        const status = log.changed_status; // 로그의 상태 ('대여 중', '손상', '수리 필요', 등)
        const quantity = log.change_quantity || 0;

        if (!acc[status]) {
            acc[status] = 0;
        }
        acc[status] += quantity; // 상태별 수량 합산
        return acc;
    }, {});

    // 대여 가능 수량: 총량 - 로그에서 감소된 총 수량
    const availableStock = totalStock - Object.values(statusSummary).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className="productRead">
            <div className="productTitleContainer">
                <div className="productTitle">상품 상세 정보</div>
                <Link to={`/admin/products/${facility_id}`} className="backButton">
                    전체 물품 리스트로 돌아가기
                </Link>
            </div>

            <div className="productTop">
                {/* 상품 정보 */}
                <div className="productInfo">
                    <h2>상품 정보</h2>
                    <p><strong>상품 ID:</strong> {productData.product_id}</p>
                    <p><strong>상품 이름:</strong> {productData.product_name}</p>
                    <p><strong>가격:</strong> {productData.price} ₩</p>
                    <p>
                        <strong>총량:</strong> {totalStock} (
                        <span>대여 가능: {availableStock}</span>
                        {Object.entries(statusSummary).map(([status, quantity]) => (
                            <span key={status}>, {status}: {quantity}개</span>
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

                {/* 첨부파일 관리 */}
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
                        onChange={(e) => setFiles([...e.target.files])}
                    />
                    <button onClick={handleFileUpload}>이미지 업로드</button>
                </div>
            </div>

            {/* 대여 정보 */}
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
