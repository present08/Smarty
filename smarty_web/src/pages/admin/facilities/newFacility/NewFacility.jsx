import "./newFacility.css"
import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react"
import { postAddFacility } from "../../../../api/admin/facilityApi"
import Modal from "../../../../component/admin/modal/Modal"
import NewCourt from "../newCourt/NewCourt"
import NewProduct from '../../products/newProduct/NewProduct';
import { postAddCourt } from "../../../../api/admin/courtApi"
import { postProductData, uploadProductFiles } from "../../../../api/admin/productApi"
import { useNavigate } from "react-router-dom"
import Price from "../../../../component/admin/price/Price"

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
const initPrice = {
    basic_fee: 0,
    rate_adjustment: 0,
    hot_time: 0
}

export default function NewFacility() {
    const navigate = useNavigate()
    const [facility, setFacility] = useState(initFacility)
    const [price, setPrice] = useState(initPrice)           // facility 가격 항목
    const [courtFlag, setCourtFlag] = useState(false)
    const [productFlag, setProductFlag] = useState(false)   // facility boolean값 상태관리
    const facilityImages = useRef()                         // facility 첨부파일 저장 변수
    const [court, setCourt] = useState([])
    const [product, setProduct] = useState([])     
    const [priceModal, setPriceModal] = useState(false)
    const [courtModal, setCourtModal] = useState(false)
    const [productModal, setProductModal] = useState(false) // 모달창 상태관리       
    const [imageSrc, setImageSrc] = useState([])
    const [updateFile, setUpdateFile] = useState([])        // 첨부파일 미리보기

    //==================================컴포넌트간 객체 전달 함수================================//    
    const pricePass = (price) => {
        setPrice(price)
        setPriceModal(false)
    }
    useEffect(() => {
      facility.basic_fee = price.basic_fee
      facility.rate_adjustment = price.rate_adjustment
      facility.hot_time = price.hot_time
      setFacility({ ...facility })
    }, [price])

    const courtPass = (court) => {
        setCourt(court)
        setCourtModal(false)
    }
   
    const productPass = (productList) => {
        setProduct(productList)
        setProductModal(false)
    }
    //=========================================================================================//

    //==================================이미지 미리보기=========================================//
    const onUpload = (e) => {
        // 이미지 등록 버튼 누를때마다 새로운 이미지 배열 생성, 최종 파일만 저장
        const imageList = Array.from(e.target.files)
        let imageUrlList = []

        imageList.forEach((file) => {
            const currentImageUrl = URL.createObjectURL(file)
            imageUrlList.push(currentImageUrl)
        })
        setImageSrc(imageUrlList)
        setUpdateFile(imageList)
    }

    const handleDeleteImage = (id) => {
        // 이미지 항목 삭제 반영
        setImageSrc(imageSrc.filter((_, index) => index !== id))
        setUpdateFile(updateFile.filter((_, index) => index !== id))
    }
    //============================================================================================//

    //===================================시설 Input Update========================================//
    const handleInput = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({ ...facility })
    }
    //============================================================================================//

    //==========================================MODAL=============================================//
    const handlePriceButton = (e) => {
        setPriceModal(true)
    }
    const handleCourtButton = (e) => {
        setCourtFlag(true)
        facility.court = courtFlag
        setFacility({ ...facility })
        setCourtModal(true)
    }
    const handleProductButton = (e) => {
        setProductFlag(true)
        facility.product = productFlag
        setFacility({ ...facility })
        setProductModal(true)
    }

    // 모달창 닫기 함수
    const closeModal = () => {
        if (courtModal) setCourtModal(false)
        if (productModal) setProductModal(false)
        else setPriceModal(false)
    }

    // 모달창 닫기 함수 (수정)
    //  const closeModal = (modalType) => {
    //     if (modalType === 'court') setCourtModal(false)
    //     else if (modalType === 'product') setProductModal(false)
    //     else if (modalType === 'price') setPriceModal(false)
    // }
    //============================================================================================//
    
    //=========================================API 호출===========================================//
    const handleFacilityAdd = () => {
        const facilityForm = new FormData()

        for (let i = 0; i < updateFile.length; i++) {
            facilityForm.append("files", updateFile[i]);
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

        postAddFacility(facilityForm).then(res => handleSubAdd(res)).catch((error) => console.error("ERROR! : ", error))
    }

    const handleSubAdd = (facilityID) => {
        console.log("시설id : ", facilityID)
        if (court.length > 0) {
            court.map(court => {
                court.facility_id = facilityID
                setCourt({ ...court })
            })
            postAddCourt(court)
        } else {
            const defaultCourt = {
                facility_id: facilityID,
                court_name: facility.facility_name,
                court_status: facility.facility_status
            }
            const courtArray = [defaultCourt]
            console.log("전송하는코트 : ", courtArray)
            postAddCourt(courtArray)
        }

        if (product.length > 0) {
            const productArray = product.map((product) => ({
                facility_id: facilityID,
                product_name: product.product_name,
                stock: product.stock,
                price: product.price,
                management_type: product.management_type,
                size: product.size,
            }));    

            // 상품 등록
            postProductData(productArray).then((productIds) => {
                console.log("등록된 상품 IDs:", productIds);

                // 각 상품에 파일 업로드 처리
                product.forEach((prod, index) => {
                    if (prod.files && prod.files.length > 0) {
                        uploadProductFiles(productIds[index], prod.files);
                    } else {
                        console.log(`상품 ID ${productIds[index]}에 파일 없음. 기본 이미지 처리`);
                        uploadProductFiles(productIds[index], []); // 기본 이미지 처리
                    }
                });
            }).catch((error) => {
                console.error("상품 등록 또는 파일 업로드 실패:", error);
                alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
            });
        }
        alert(`등록된 시설 ID는 ${facilityID} 입니다.`)
        navigate({pathname: `/admin/facilities/read/${facilityID}`})
    }    
    //============================================================================================//

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
                        <div className="leftItem">
                            <label htmlFor="open_time">개장시간 </label>
                            <input
                                name="open_time"
                                id="open_time"
                                type={"time"}
                                min={5}
                                max={23}
                                value={facility.open_time}
                                onChange={handleInput}
                            />
                            <label htmlFor="close_time">폐장시간 </label>
                            <input
                                name="close_time"
                                id="close_time"
                                type={"time"}
                                min={5}
                                max={23}
                                value={facility.close_time}
                                onChange={handleInput}
                            />
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
                        </div>
                        <div className="textItem">
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

                        <div className="textItem">
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
                        {court.length == 0 ?
                        <div className="leftItem">
                            <label>시설 개방</label>
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
                        </div>
                        : <></>}
                    </div>
                </div>
                <div className="addFacilityFormRight">
                    <div className="rightItemTitle">상세 설정</div>

                    <div className="rightItemContent">
                        <div className="rightItem">
                            <button className="subItemButton"
                                onClick={() => handlePriceButton()}>
                                가격 설정
                            </button>
                            <span className="subItemtext">{facility.basic_fee}, {Number(facility.rate_adjustment) * 100 + "%"}, {facility.hot_time}</span>
                            {priceModal ?
                                <Modal
                                    content={<Price pricePass={pricePass} passedPrice={price} />}
                                    callbackFn={closeModal}
                                />
                                : <></>
                            }
                        </div>
                        <div className="rightItem">
                            <button className="subItemButton"
                                onClick={() => handleCourtButton()}>
                                코트 등록
                            </button>
                            <span className="subItemtext">{court.length}개의 코트 등록</span>
                            {courtModal ?
                                <Modal
                                    content={<NewCourt courtPass={courtPass} passedCourt={court} />}
                                    callbackFn={closeModal}
                                />
                                : <></>
                            }
                        </div>
                        <div className="rightItem">
                            <button className="subItemButton"
                                onClick={() => handleProductButton()}>
                                대여물품
                            </button>
                            <span className="subItemtext">{product.length}개의 물품 등록</span>
                            {productModal ?
                                        <Modal
                                            content={<NewProduct productPass={productPass}
                                                context="facility"
                                                onClose={closeModal}/>}
                                            callbackFn={closeModal} />
                                        : <></>
                            }
                        </div>
                        <div className="imageItem">
                            <div className="imageUpload">
                                <input
                                    id="files"
                                    type={"file"}
                                    multiple={true}
                                    ref={facilityImages}
                                    onChange={(e) => onUpload(e)}
                                />
                                <label htmlFor="files" className="subItemButton">이미지 등록</label>
                            </div>
                            <div className="imageContainer">
                                {imageSrc.length > 0? 
                                    imageSrc.map((src, i) => (
                                    <div key={i}>                               
                                        <img src={src} alt={`${src}-${i}`}/>
                                        <DeleteOutline className="imageDeleteButton" onClick={(e) => handleDeleteImage(i, e)} />
                                    </div>))
                                    : <span className="subItemtext">이미지 미리보기</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="facilityButtons">
                        <button className="addFacilityButton" onClick={handleFacilityAdd}>등록</button>
                        <button className="cancelFacilityButton" onClick={() => navigate({pathname: "/admin"})}>취소</button>
                    </div>
                 </div>
            </div>
        </div>
    )
}
