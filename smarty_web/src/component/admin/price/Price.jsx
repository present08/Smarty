import { useEffect, useState } from 'react'
import './price.css'

export default function Price({pricePass, passedPrice}) {
    console.log("HERE!!", passedPrice)
    const [price, setPrice] = useState({
        basic_fee: 0,
        rate_adjustment: 0,
        hot_time: 0
    })

    useEffect(() => {
      if(passedPrice){
        console.log("설정값 있음")
        setPrice(passedPrice)
      }
    }, [passedPrice])
    
    useEffect(() => {
      console.log("현재 price : ", price)
    }, [price])
    

    const onClickSubmit = () => {
        pricePass(price)
    }

    const handleInput = (e) => {
        price[e.target.name] = e.target.value
        setPrice({ ...price })
    }

    // 가격 변동률 radio value 업데이트 함수
    const handlePrice = (e) => {
        if(e.target.value === 0) {
            // 기본 요금 적용하는 경우 가격 변동률 0으로 조정
            price.rate_adjustment = 0
            setPrice({ ...price })
        } else if(price.rate_adjustment === 0) {
            alert("가격 변동률 설정이 필요합니다.")
        }
        price.hot_time = Number(e.target.value)
        setPrice({ ...price })
    }
    const handlePriceCancle = (e) => {
        price.basic_fee = 0
        price.rate_adjustment = 0
        price.hot_time = 0
        setPrice({ ...price })
    }
    
  return (
    <div className="priceModal_box">
        <div className="modalleftItem">
            <label htmlFor="basic_fee">기본 요금</label>
            <input
                name="basic_fee"
                id="basic_fee"
                type={"text"}
                value={price.basic_fee}
                onChange={handleInput}
                placeholder="ex) 10000"
            />
            <label htmlFor="rate_adjustment">가격 변동률</label>
            <input
                name="rate_adjustment"
                id="rate_adjustment"
                type={"range"}
                min={0}
                max={1}
                step={0.05}
                value={price.rate_adjustment}
                onChange={handleInput}
                placeholder="ex) 13000"
            />
            {Number(price.rate_adjustment) * 100 + "%"}
        </div>

        <div className="modal_cont">
            <div className="modalshowPrice">
                <div>
                    <p>기본 요금 </p>
                    <div className="price_box">
                        {price.basic_fee}                      
                    </div>
                </div>
                <div>
                    <p>할인 요금 </p>
                    <div className="price_box">
                        {Number(price.basic_fee) * (1 - Number(price.rate_adjustment))}
                    </div>
                </div>
                <div>
                    <p>할증 요금 </p>
                    <div className="price_box">
                        {Number(price.basic_fee) * (1 + Number(price.rate_adjustment))}
                    </div>
                </div>
            </div>
            <div className="modalshowInfo">
                <div>
                    <p>
                        기본 요금, 가격 변동률 설정 후<br />
                        적용 항목을 선택해주세요.
                    </p>
                </div>
                <div>
                    <h3>체크박스</h3>
                    <div>
                        <input
                            name="hot_time"
                            id="basic"
                            type={"radio"}
                            value={0}
                            onClick={(e) => handlePrice(e)}
                            checked={price.hot_time == 0? true : false}                            
                        />
                        <label htmlFor="basic"> 기본 요금</label>
                    </div>
                    <div>
                        <input
                            name="hot_time"
                            id="discount"
                            type={"radio"}
                            value={1}
                            onClick={(e) => handlePrice(e)}
                            checked={price.hot_time == 1? true : false}
                        />
                        <label htmlFor="discount"> 조조 할인 (첫 타임)</label>
                    </div>
                    <div>
                        <input
                            name="hot_time"
                            id="surcharge"
                            type={"radio"}
                            value={2}
                            onClick={(e) => handlePrice(e)}
                            checked={price.hot_time == 2? true : false}
                        />
                        <label htmlFor="surcharge"> 야간 할증 (마지막 타임)</label>
                    </div>
                    <div>
                        <input
                            name="hot_time"
                            id="all"
                            type={"radio"}
                            value={3}
                            onClick={(e) => handlePrice(e)}
                            checked={price.hot_time == 3? true : false}
                        />
                        <label htmlFor="all"> 모두 적용 (할인, 할증)</label>
                    </div>
                </div>
                <div className="modalshowInfoButton">
                    <button className="addPirceButton" onClick={onClickSubmit}>적용</button>
                    <button className="canclePirceButton" onClick={handlePriceCancle}>초기화</button>
                </div>
            </div>
        </div>
    </div>
  )
}
