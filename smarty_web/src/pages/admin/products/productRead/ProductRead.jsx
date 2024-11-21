import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productRead.css";
import Chart from "../../../../component/admin/chart/Chart";
import { Publish } from "@mui/icons-material";
import { getOneProduct } from "../../../../api/admin/productApi";

export default function ProductRead() {
    const { product_id } = useParams(); // URL에서 product_id 추출
    // 디버깅용 로그 추가
    console.log("디버깅: URL에서 추출한 product_id : ", product_id);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        if (product_id) {
        console.log("API 호출 전 product_id 확인:", product_id); // API 호출 전 product_id 확인
        getOneProduct(product_id)
            .then((data) => {
            console.log("API 응답 데이터:", data); // API 호출 성공 시 데이터 확인
            setProductData(data);
            })
            .catch((error) => {
            console.error("API 호출 실패:", error.message); // API 호출 실패 시 에러 확인
            console.error("API 호출 경로:", `/api/admin/products/${product_id}`);
            });
        } else {
        console.error("product_id가 useParams에서 undefined로 확인되었습니다.");
        }
    }, [product_id]);

    // 로딩 상태 처리
    if (!productData) {
        return <div>Loading...</div>;
    }

    // 최종 렌더링
    return (
        <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/products/add">
            <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
            {/* 차트 데이터를 실제 상품 판매 데이터로 대체 */}
            <Chart
                data={productData.salesData || []}
                dataKey="sales"
                title="Sales Performance"
            />
            </div>
            <div className="productTopRight">
            <div className="productInfoTop">
                <img
                src={productData.image || ""}
                alt="Product"
                className="productInfoImg"
                />
                <span className="productName">{productData.name}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                <span className="productInfoKey">ID:</span>
                <span className="productInfoValue">{productData.product_id}</span>
                </div>
                <div className="productInfoItem">
                <span className="productInfoKey">Sales:</span>
                <span className="productInfoValue">{productData.sales || 0}</span>
                </div>
                <div className="productInfoItem">
                <span className="productInfoKey">Active:</span>
                <span className="productInfoValue">
                    {productData.active ? "Yes" : "No"}
                </span>
                </div>
                <div className="productInfoItem">
                <span className="productInfoKey">In Stock:</span>
                <span className="productInfoValue">
                    {productData.inStock ? "Yes" : "No"}
                </span>
                </div>
            </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={productData.name} />
                <label>In Stock</label>
                <select
                name="inStock"
                id="inStock"
                defaultValue={productData.inStock ? "yes" : "no"}
                >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
                <label>Active</label>
                <select
                name="active"
                id="active"
                defaultValue={productData.active ? "yes" : "no"}
                >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                <img
                    src={productData.image || ""}
                    alt="Upload Preview"
                    className="productUploadImg"
                />
                <label htmlFor="file">
                    <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
            </div>
            </form>
        </div>
        </div>
    );
    }
