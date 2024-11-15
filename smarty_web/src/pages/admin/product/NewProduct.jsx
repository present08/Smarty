import "./newProduct.css";
import { useState } from "react";
import { postProductData, uploadProductFiles } from "../../../api/productApi";

const initProduct = {
    product_id: null, // 초기 상태에 product_id 추가
    facility_id: "fc_1731390393778",
    product_name: "",
    stock: "",
    price: "",
    files: [], // 파일 리스트
    management_type: "일괄 관리", // 기본 관리 방식
    size: [], // 사이즈 리스트
};
  
export default function NewProduct() {
  const [product, setProduct] = useState({ ...initProduct });
  const [productList, setProductList] = useState([]); // 등록할 상품 리스트

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 사이즈 변경 핸들러
  const handleSizeChange = (sizeValue) => {
    setProduct((prev) => ({
      ...prev,
      size: prev.size.includes(sizeValue)
        ? prev.size.filter((size) => size !== sizeValue) // 선택된 사이즈 제거
        : [...prev.size, sizeValue], // 새로운 사이즈 추가
    }));
  };

  // 파일 변경 핸들러
  const handleInputFile = (e) => {
    const files = Array.from(e.target.files); // 파일 리스트로 변환
    setProduct((prev) => ({
      ...prev,
      files: files,
    }));
  };

  // 상품 리스트에 추가
  const onClickUpdate = () => {
    // 유효성 검사
    if (!product.product_name || !product.stock || !product.price) {
      alert("모든 필수 입력값을 채워주세요.");
      return;
    }
    setProductList((prev) => [...prev, product]);
    setProduct({ ...initProduct }); // 입력 폼 초기화
  };

  // 상품 등록 및 파일 업로드 API 호출
  const handleProductSubmit = async () => {
    try {
      for (const product of productList) {
        // `size`가 빈 문자열일 경우 빈 배열로 변환
        const sizeArray = product.size && product.size.length > 0 ? product.size : [];
  
        // JSON 데이터 전송
        const response = await postProductData({
          facility_id: product.facility_id,
          product_name: product.product_name,
          stock: product.stock,
          price: product.price,
          management_type: product.management_type,
          size: sizeArray.join(","), // 배열을 문자열로 변환
        });
  
        const productId = response.productId; // 백엔드에서 반환된 product_id
        console.log("상품 등록 성공, ID:", productId);
  
        // 파일 업로드 처리
        if (product.files && product.files.length > 0) {
          const formData = new FormData();
          product.files.forEach((file) => formData.append("files", file));
  
          await uploadProductFiles(productId, formData);
          console.log("파일 업로드 성공");
        }
      }
      alert("상품이 성공적으로 등록되었습니다.");
      setProductList([]); // 리스트 초기화
    } catch (error) {
      console.error("등록 실패:", error);
      alert("상품 등록 실패");
    }
  };
      
  

  return (
    <div className="newProduct">
      <div className="addProductForm">
        <div className="addProductTitle">물품 등록</div>

        <div className="addProductItem">
          <label>물품명</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            placeholder="ex) 운동복"
            onChange={handleInputChange}
          />
        </div>

        <div className="addProductItem">
          <label>수량</label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            placeholder="ex) 100"
            onChange={handleInputChange}
          />
        </div>

        <div className="addProductItem">
          <label>가격</label>
          <input
            type="text"
            name="price"
            value={product.price}
            placeholder="ex) 10000"
            onChange={handleInputChange}
          />
        </div>

        <div className="addProductItem">
          <label>관리 방식</label>
          <select
            name="management_type"
            value={product.management_type}
            onChange={handleInputChange}
          >
            <option value="일괄 관리">일괄 관리</option>
            <option value="사이즈별 관리">사이즈별 관리</option>
            <option value="개별 관리">개별 관리</option>
          </select>
        </div>

        {product.management_type === "사이즈별 관리" && (
          <div className="addProductItem">
            <label>사이즈 선택</label>
            <div>
              {["S", "M", "L", "XL", "XXL", "240", "250", "260", "270", "280"].map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    value={size}
                    checked={product.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="addProductItem">
          <label>이미지</label>
          <input
            id="files"
            type="file"
            multiple
            onChange={handleInputFile}
          />
        </div>

        <button className="addProductButton" onClick={onClickUpdate}>
          추가
        </button>
      </div>

      <div className="addProductList">
  <h4>등록된 상품 리스트</h4>
  {productList.map((item, index) => (
    <div key={index}>
      <p>상품명: {item.product_name}</p>
      <p>관리 방식: {item.management_type}</p>
      {item.management_type === "사이즈별 관리" && (
        <p>사이즈: {item.size.join(", ")}</p>
      )}
      {item.product_id && <p>등록된 상품 ID: {item.product_id}</p>}
    </div>
  ))}
</div>  

      <div className="addProductListButton">
        <button className="submitProductButton" onClick={handleProductSubmit}>
          등록
        </button>
        <button
          className="resetProductButton"
          onClick={() => {
            setProduct({ ...initProduct });
            setProductList([]);
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
