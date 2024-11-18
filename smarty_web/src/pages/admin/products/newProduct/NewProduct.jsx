import "./newProduct.css"
import { useState } from "react"

const initProduct = {
    product_id : '',
    facility_id: '',
    product_name : '',
    stock: '',
    price: '',
    files: []
}

  export default function NewProduct(productPass) {
    const [product, setProduct] = useState({...initProduct})
    const [productList, setProductList] = useState([])
  
    const onClickUpdate = () => {
      setProductList((prev) => [...prev, product])
      setProduct({...initProduct})
    }
  
    const handleInputChange = (e) => {
      setProduct({...product, [e.target.name] : e.target.value})
    }
    const handleInputFile = (e) => {
      console.log("e.target.files : ", e.target.files)
      console.log("파일명 : ", e.target.files[0].name)
          
      const productImages = Array.from(e.target.files)
        setProduct((prev) => ({
          ...prev,
          files: [...prev.files, ...productImages]
        }))
    }
    
    return (
      <div className="newProduct">
        <div className="addProductForm">
          <div className="addProductTitle">물품 등록</div>
          <div className="addProductItem">
            <label>물품명</label>
            <input 
              type="text"
              name={"product_name"}
              value={product.product_name}
              placeholder="ex) 운동복"
              onChange={(e) => handleInputChange(e)}
            />
  
          </div>
          <div className="addProductItem">
            <label>수량</label>
            <input 
              type="text"
              name={"stock"}
              value={product.stock}
              placeholder="ex) 100"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="addProductItem">
            <label>가격</label>
            <input 
              type="text"
              name={"price"}
              value={product.price}
              placeholder="ex) 10000"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="addProductItem">
            <label>이미지</label>
            <input
                id="files"                         
                type={"file"}
                multiple={true}
                onChange={(e) => handleInputFile(e)}
            />
          </div>
          <button className="addProductButton" onClick={onClickUpdate}>추가</button>
        </div>
        <div className="addProductList">
          <div className="listItem">
            물품 추가될때마다 여기에 표시
            {productList && productList.map(listItem => (
              <div>{listItem.product_name}</div>
            ))}
          </div>
        </div>
        <div className="addProductListButton">
          <button 
            className="submitProductButton" 
            onClick={() => productPass.productPass(productList)}>
            등록
          </button>
          <button 
            className="resetProductButton" 
            onClick={() => {
              setProduct({...initProduct})
              setProductList([])}}>
              초기화
          </button>
        </div>
      </div>
    )
  }