import "./newProduct.css";
import { useState } from "react";
import { postProductData, uploadProductFiles } from "../../../../api/admin/productApi"; // 백엔드 API 호출

const initProduct = {
  product_id: "",
  facility_id: "",
  product_name: "",
  stock: "",
  price: "",
  files: [], // 파일 리스트
  management_type: "일괄 관리", // 기본 관리 방식
  size: [], // 사이즈 리스트
};

export default function NewProduct({ productPass, facilityId, context, onClose }) {
  const [product, setProduct] = useState({ ...initProduct, facility_id: facilityId || "" });
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
    if (!product.product_name || !product.stock || !product.price) {
      alert("모든 필수 입력값을 채워주세요.");
      return;
    }

    const updatedProduct = {
      ...product,
      price: parseInt(product.price, 10), // 숫자로 변환
      stock: parseInt(product.stock, 10), // 숫자로 변환
      files: product.files || [], // files 초기화
    };

    setProductList((prev) => [...prev, updatedProduct]);
    setProduct({ ...initProduct, facility_id: facilityId || "" });
  };

  // 부모 컴포넌트로 데이터 전달 또는 백엔드 전송
  const handleProductSubmit = async () => {
    if (productList.length === 0) {
      alert("추가된 상품이 없습니다.");
      return;
    }

    if (context === "productList") {
      // 상품 리스트 페이지: JSON 데이터 전송
      try {
        const productData = productList.map(({ files, ...rest }) => rest); // 파일 제외
        const productIds = await postProductData(productData); // JSON 전송

        // 파일 업로드 처리
        productList.forEach((productItem, index) => {
          if (productItem.files && productItem.files.length > 0) {
            uploadProductFiles(productIds[index], productItem.files); // 파일 전송
          }
        });

        alert("상품 등록 성공!");
        setProductList([]); // 리스트 초기화
        onClose(); // 모델창 닫기
        window.location.reload(); // 강력하고 간단한 해결

      } catch (error) {
        console.error("상품 등록 실패:", error);
        alert("상품 등록 중 오류가 발생했습니다.");
      }
    } else if (context === "facility") {
      // 시설 등록 페이지: 리스트에 저장
      productPass(productList); // 부모 컴포넌트로 리스트 전달
      alert("상품 리스트가 시설 폼에 추가되었습니다.");
      setProductList([]); // 리스트 초기화
      onClose(); // 모델창 닫기
    }
  };

  return (
    <div className="newProduct">
      <div className="addProductForm">
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
            <span className="addSizeFromText">* 사이즈 선택 시, 입력한 갯수만큼 각 사이즈 별로 해당 수량이 부여됩니다.</span>
            <div className="sizeOptions">
            {["S", "M", "L", "XL", "XXL",
                "240", "250", "260", "270", "280"].map(
                (size) => (
                  <label key={size}>
                    <input
                      type="checkbox"
                      value={size}
                      checked={product.size.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    {size}
                  </label>
                )
              )}
            </div>
          </div>
        )}

        <div className="addProductItem">
          <label>이미지</label>
          <input id="files" type="file" multiple onChange={handleInputFile} />
        </div>

        <button className="addProductButton" onClick={onClickUpdate}>
          추가
        </button>
      </div>

      <div className="addProductList">
        <h4 style={{fontFamily: 'inherit'}}>등록된 상품 리스트</h4>
        <h5>=========================</h5>
        {productList.map((item, index) => (
          <div key={index}>
            <p>상품명: {item.product_name}</p>
            <p>관리 방식: {item.management_type}</p>
            {item.management_type === "사이즈별 관리" && (
              <p>사이즈: {item.size.join(", ")}</p>
            )}
        <h5>=========================</h5>
          </div>
        ))}
      </div>
      <div className="addProductListButton">
        <button className="submitProductButton" onClick={handleProductSubmit}>
          {context === "facility" ? "폼에 추가" : "등록"}
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
