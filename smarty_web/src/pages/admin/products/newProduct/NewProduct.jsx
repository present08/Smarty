import "./newProduct.css";
import { useState } from "react";

const initProduct = {
  product_id: "",
  facility_id: "fc_1731390393778", // 기본 시설 ID
  product_name: "",
  stock: "",
  price: "",
  files: [], // 파일 리스트
  management_type: "일괄 관리", // 기본 관리 방식
  size: [], // 사이즈 리스트
};

export default function NewProduct({ productPass }) {
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
    setProduct({ ...initProduct });
};

// 부모 컴포넌트로 데이터 전달
const handleProductSubmit = () => {
  if (productList.length === 0) {
      alert("추가된 상품이 없습니다.");
      return;
  }

  console.log("전송할 상품 리스트:", productList);

  productPass(productList); // 부모 컴포넌트로 상품 리스트 전달
  alert("상품 리스트가 시설 폼에 추가되었습니다.");
  setProductList([]); // 상품 리스트 초기화
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
              {["S", "M", "L", "XL", "XXL", "240", "250", "260", "270", "280"].map(
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
