import "./newFacility.css"
import { useRef, useState } from "react"
import { postAddFacility } from "../../../../api/admin/facilityApi"
import Modal from "../../../../component/admin/modal/Modal"
import NewCourt from "../newCourt/NewCourt"
import NewProduct from '../../products/newProduct/NewProduct';
import { postAddCourt } from "../../../../api/admin/courtApi"
import { postAddProduct } from "../../../../api/admin/productApi"
import { useNavigate } from "react-router-dom"

const initFacility = {
    facility_name: '',
    open_time: '',
    close_time: '',
    default_time: 0,
    basic_fee: 0,
    rate_adjustment: 0,
    hot_time: 0,
    contact: '',
    info: '',
    caution: '',
    court: false,
    product: false,
    facility_status: false,
}

export default function NewFacility() {
    const navigate = useNavigate()

    // FacilityDTO 구성
    const [facility, setFacility] = useState({ ...initFacility })

    // FacilityDTO boolean 필드값 상태관리
    const [courtFlag, setCourtFlag] = useState(false)
    const [productFlag, setProductFlag] = useState(false)

    // FacilityDTO 첨부파일 저장 변수
    const facilityImages = useRef()

    // 자식 컴포넌트에서 부모 컴포넌트로 props 전달 방법
    // 전달받은 값을 저장할 useState, 값 전달 역할을 할 함수를 선언
    // 자식 컴포넌트로 함수 전달
    // 자식 컴포넌트에서 함수를 실행하면 부모 컴포넌트의 함수가 실행되면서 인자값을 전달받음

    // CourtDTO 구성
    const [court, setCourt] = useState(Array.from({ length: 0 }, (_, i) => ({
        facility_id: '',
        court_name: '',
        court_status: ''
    })))
    const courtPass = (court) => {
        setCourt(court)
        setCourtModal(false)
    }

    // ProductDTO 구성
    const [product, setProduct] = useState(Array.from({ length: 0 }, (_, i) => ({
        product_id: '',
        facility_id: '',
        product_name: '',
        stock: '',
        price: '',
        files: []
    })))
    const productPass = (productList) => {
        console.log("전달받은 리스트 : ", productList)
        setProduct(productList)
        setProductModal(false)
    }

    // 가격변동률, 코트, 물품등록시 모달창 상태관리
    const [priceModal, setPriceModal] = useState(false)
    const [courtModal, setCourtModal] = useState(false)
    const [productModal, setProductModal] = useState(false)


    // 시설등록 input value 업데이트 함수
    const handleInput = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({ ...facility })
    }

    // 가격 변동률 radio value 업데이트 함수
    const handlePrice = (e) => {
        facility.hot_time = Number(e.target.value)
        setFacility({ ...facility })
        console.log(facility.hot_time)
    }
    const handlePriceCancle = (e) => {
        facility.rate_adjustment = 0
        facility.hot_time = 0
        setFacility({ ...facility })
        console.log(facility)
    }

    // 코트 등록 버튼 클릭 시 실행 함수
    const handlePriceButton = (e) => {
        setPriceModal(true)
    }
    const handleCourtButton = (e) => {
        setCourtFlag(true)
        facility.court = courtFlag
        setFacility({ ...facility })
        setCourtModal(true)
        console.log("시설 : ", courtFlag)
    }
    // 물품 등록 버튼 클릭 시 실행 함수
    const handleProductButton = (e) => {
        setProductFlag(true)
        facility.product = productFlag
        setFacility({ ...facility })
        setProductModal(true)
        console.log("물품 : ", productFlag)
    }
    // 모달창 닫기 함수
    const closeModal = () => {
        if (courtModal) setCourtModal(false)
        if (productModal) setProductModal(false)
        else setPriceModal(false)
    }

    // 입력된 데이터로 API 호출
    const handleFacilityAdd = () => {
        const facilityFiles = facilityImages.current.files
        const facilityForm = new FormData()

        for (let i = 0; i < facilityFiles.length; i++) {
            facilityForm.append("files", facilityFiles[i]);
        }
        facilityForm.append("facility_name", facility.facility_name)
        facilityForm.append("open_time", facility.open_time + ":00")
        facilityForm.append("close_time", facility.close_time + ":00")
        facilityForm.append("default_time", facility.default_time)
        facilityForm.append("basic_fee", facility.basic_fee)
        facilityForm.append("rate_adjustment", facility.rate_adjustment)
        facilityForm.append("hot_time", facility.hot_time)
        facilityForm.append("contact", facility.contact)
        facilityForm.append("info", facility.info)
        facilityForm.append("caution", facility.caution)
        if (court.length > 0) {
            facilityForm.append("court", true)
            // 코트 활성화 상태에 따라 시설 활성화 상태를 변경할 수 있는 로직 추가
            const courtActive = court.some(court => court.court_status === true)
            facilityForm.append("facility_status", courtActive)
        } else {
            facilityForm.append("facility_status", facility.facility_status)
            facilityForm.append("court", false)
        }
        if (product.length > 0) {
            facilityForm.append("product", true)
        } else facilityForm.append("product", false)

        postAddFacility(facilityForm).then(id => {
            console.log(id)
            // 시설 등록에 성공하고 나면 facility_id를 반환받음
            // 이후 코트, 물품등록 여부에 따라 아래 코드 실행
            if (court.length > 0) {
                court.map(court => {
                    court.facility_id = id
                    setCourt({ ...court })
                })
                postAddCourt(court)
            } else {
                const defaultCourt = {
                    facility_id: id,
                    court_name: facility.facility_name,
                    court_status: facility.facility_status
                }
                const courtArray = [defaultCourt]
                console.log("전송하는코트 : ", courtArray)
                postAddCourt(courtArray)
            }

            if (product.length > 0) {
                product.map((product, i) => {
                    // product_id 생성
                    let idx = "";
                    if ((i + 1) - 10 < 0) idx = "0" + (i + 1);
                    else idx = "i+1";
                    const product_id = "p_" + id.substring(12) + idx;

                    // 폼데이터 생성
                    const productForm = new FormData()

                    productForm.append("product_id", product_id)
                    productForm.append(`facility_id`, id)
                    productForm.append(`product_name`, product.product_name)
                    productForm.append(`stock`, product.stock)
                    productForm.append(`price`, product.price)

                    product.files.forEach((file) => {
                        productForm.append("files", file)
                    })
                    // for (let [key, value] of productForm.entries()) {
                    //     console.log(`${key}: ${value}`);
                    // }
                    postAddProduct(productForm)
                })
                // 이후 폼데이터 배열로 만들어 한번에 전송 시도
            }
            alert("등록된 시설 ID는 " + id + " 입니다.")
            navigate({pathname: "/admin/facilities"})
        })
    }

    return (
        <div className="newFacility">

            <div className="addFacilityTitle">시설 등록</div>
            <div className="addFacilityForm">
                <div className="addFacilityFormLeft">
                    <div className="leftItemTitle">기본 정보</div>
                    <div className="leftItemContent">
                        <div className="leftItem">
                            <label htmlFor="facility_name">시설명</label>
                            <input
                                name="facility_name"
                                id="facility_name"
                                type={"text"}
                                value={facility.facility_name}
                                onChange={handleInput}
                                placeholder="ex) 수영장"
                            />
                        </div>
                        <div className="leftItem">
                            <label htmlFor="open_time">개장시간 </label>
                            <input
                                name="open_time"
                                id="open_time"
                                type={"number"}
                                min={5}
                                max={23}
                                value={facility.open_time}
                                onChange={handleInput}
                            />
                            <label htmlFor="close_time">폐장시간 </label>
                            <input
                                name="close_time"
                                id="close_time"
                                type={"number"}
                                min={5}
                                max={23}
                                value={facility.close_time}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="leftItem">
                            <label htmlFor="default_time">기본 이용시간</label>
                            <input
                                name="default_time"
                                id="default_time"
                                type={"number"}
                                min={0}
                                value={facility.default_time}
                                onChange={handleInput}
                                placeholder="ex) 1"
                            />
                            <label htmlFor="basic_fee">기본 요금</label>
                            <input
                                name="basic_fee"
                                id="basic_fee"
                                type={"text"}
                                value={facility.basic_fee}
                                onChange={handleInput}
                                placeholder="ex) 10000"
                            />
                        </div>

                        <div className="addFacilityFormSub">
                            <div className="addFacilityFormSubTitle">옵션 등록</div>
                            <div className="subItemContent">
                                <div className="subItem">
                                    <button className="subItemButton"
                                        onClick={() => handlePriceButton()}>
                                        가격 변동률
                                    </button>
                                    <span className="subItemtext">{Number(facility.rate_adjustment) * 100 + "%"}, {facility.hot_time}</span>
                                    {priceModal ?
                                        <Modal
                                            content={
                                                <>
                                                    <div className="priceModal_box">
                                                        <div className="modalleftItem">
                                                            <label htmlFor="rate_adjustment">가격 변동률</label>
                                                            <input
                                                                name="rate_adjustment"
                                                                id="rate_adjustment"
                                                                type={"range"}
                                                                min={0}
                                                                max={1}
                                                                step={0.05}
                                                                value={facility.rate_adjustment}
                                                                onChange={handleInput}
                                                                placeholder="ex) 13000"
                                                            />
                                                            {Number(facility.rate_adjustment) * 100 + "%"}
                                                        </div>
                                                        <div className="modal_cont">
                                                            <div className="modalshowPrice">
                                                                <div>
                                                                    <p>기본 요금 </p>
                                                                    <div className="price_box">
                                                                        {facility.basic_fee}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p>할인 요금 </p>
                                                                    <div className="price_box">
                                                                        {Number(facility.basic_fee) * (1 - Number(facility.rate_adjustment))}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p>할증 요금 </p>
                                                                    <div className="price_box">
                                                                        {Number(facility.basic_fee) * (1 + Number(facility.rate_adjustment))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modalshowInfo">
                                                                <div>
                                                                    <p>
                                                                        가격 변동률을 적용할 항목 선택 후<br />
                                                                        적용 버튼을 클릭해주세요.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h3>체크박스</h3>
                                                                    <div>
                                                                        <input
                                                                            name="hot_time"
                                                                            id="discount"
                                                                            type={"radio"}
                                                                            value={1}
                                                                            onClick={(e) => handlePrice(e)}
                                                                        />
                                                                        <label htmlFor="discount"> 조조할인 (첫 타임)</label>
                                                                    </div>
                                                                    <div>
                                                                        <input
                                                                            name="hot_time"
                                                                            id="surcharge"
                                                                            type={"radio"}
                                                                            value={2}
                                                                            onClick={(e) => handlePrice(e)}
                                                                        />
                                                                        <label htmlFor="surcharge"> 야간할증 (마지막 타임)</label>
                                                                    </div>
                                                                    <div>
                                                                        <input
                                                                            name="hot_time"
                                                                            id="all"
                                                                            type={"radio"}
                                                                            value={3}
                                                                            onClick={(e) => handlePrice(e)}
                                                                        />
                                                                        <label htmlFor="all"> 모두 (할인, 할증 적용)</label>
                                                                    </div>
                                                                </div>
                                                                <div className="modalshowInfoButton">
                                                                    <button className="addPirceButton" onClick={closeModal}>적용</button>
                                                                    <button className="canclePirceButton" onClick={handlePriceCancle}>취소</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            callbackFn={closeModal}
                                        />
                                        : <></>
                                    }
                                </div>
                                <div className="subItem">
                                    <button className="subItemButton"
                                        onClick={() => handleCourtButton()}>
                                        코트(레일)
                                    </button>
                                    <span className="subItemtext">{court.length}개의 코트 등록</span>
                                    {courtModal ?
                                        <Modal
                                            content={<NewCourt courtPass={courtPass} />}
                                            callbackFn={closeModal}
                                        />
                                        : <></>
                                    }
                                </div>
                                <div className="subItem">
                                    <button className="subItemButton"
                                        onClick={() => handleProductButton()}>
                                        대여물품
                                    </button>
                                    <span className="subItemtext">{product.length}개의 물품 등록</span>
                                    {productModal ?
                                        <Modal
                                            content={<NewProduct productPass={productPass} />}
                                            callbackFn={closeModal} />
                                        : <></>
                                    }
                                </div>
                                <div className="subItem">
                                    {court.length == 0 ?
                                        <>
                                            <div className="subItemTitle">시설 개방</div>
                                            <input
                                                name="facility_status"
                                                id="true"
                                                type={"radio"}
                                                value={true}
                                                onClick={(e) => handleInput(e)}
                                            // onClick={(e) => console.log(e.target.name, e.target.value)}
                                            />
                                            <label htmlFor="true"> 가능</label>
                                            <input
                                                name="facility_status"
                                                id="false"
                                                type={"radio"}
                                                value={false}
                                                onClick={(e) => handleInput(e)}
                                            // onClick={(e) => console.log(e.target.name, e.target.value)}
                                            />
                                            <label htmlFor="false"> 불가</label>
                                        </>
                                        : <></>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="addFacilityFormRight">
                    <div className="rightItemTitle">세부 사항</div>
                    <div className="rightItemContent">

                        <div className="rightItem">
                            <label htmlFor="contact">연락처</label>
                            <input
                                name="contact"
                                id="contact"
                                type={"text"}
                                value={facility.contact}
                                onChange={handleInput}
                                placeholder="ex) 070-XXXX-XXXX"
                            />
                        </div>

                        <div className="rightItem">
                            <label htmlFor="info">이용안내</label>
                            <textarea
                                name="info"
                                id="info"
                                cols="70"
                                rows="7"
                                value={facility.info}
                                onChange={handleInput}
                                placeholder="시설 이용에 관한 안내 사항을 입력해주세요."
                            />
                        </div>

                        <div className="rightItem">
                            <label htmlFor="caution">주의사항</label>
                            <textarea
                                name="caution"
                                id="caution"
                                cols="70"
                                rows="7"
                                value={facility.caution}
                                onChange={handleInput}
                                placeholder="시설 이용 시 주의해야할 사항을 입력해주세요."
                            />
                        </div>

                        <div className="rightItem">
                            <label htmlFor="files">이미지</label>
                            <input
                                id="files"
                                type={"file"}
                                multiple={true}
                                ref={facilityImages}
                            />
                        </div>

                        <div className="facilityButtons">
                            <button className="addFacilityButton" onClick={handleFacilityAdd}>등록</button>
                            <button className="cancelFacilityButton" onClick={() => navigate({pathname: "/admin/facilities"})}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}