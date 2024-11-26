import "./facilityModify.css"
import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react"
import { API_SERVER_HOST, getOneFacility, postAddFacility, putOneFacility } from "../../../../api/admin/facilityApi"
import Modal from "../../../../component/admin/modal/Modal"
import NewCourt from "../newCourt/NewCourt"
import NewProduct from '../../products/newProduct/NewProduct';
import { getListCourt, postAddCourt, putOneCourt } from "../../../../api/admin/courtApi"
import { postAddProduct, postProductData, uploadProductFiles } from "../../../../api/admin/productApi"
import { useNavigate, useParams } from "react-router-dom"
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
    rate_adjustment : 0,
    hot_time : 0
}

export default function FacilityModify() {
    const navigate = useNavigate()
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState(initFacility)
    const [facility, setFacility] = useState(initFacility)
    const [price, setPrice] = useState(initPrice)
    const [court, setCourt] = useState(Array.from({ length: 0 }, (_, i) => ({
        facility_id: '',
        court_name: '',
        court_status: ''
    })))

  // 기존 시설 정보 -> 초기값 복원을 위해 기존값, 변경값 두 가지 상태 관리
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
        console.log("then-1")
      setFacility(res)          // 변경값
      setCurrentFacility(res)   // 기존값
    }).catch((error) => console.error("ERROR!", error))
    getListCourt(facility_id).then(res => {
        console.log(res)
        setCourt(res)
    })
  }, [facility_id])



  useEffect(() => {
    console.log(facility)
    // 기존값이 저장되면 price 객체를 구성하여 priceModal로 전달
    setPrice({
        basic_fee: facility.basic_fee,
        rate_adjustment : facility.rate_adjustment,
        hot_time : facility.hot_time
    })
  }, [currentFacility])

    // FacilityDTO boolean 필드값 상태관리
    const [courtFlag, setCourtFlag] = useState(false)
    const [productFlag, setProductFlag] = useState(false)

    // FacilityDTO 첨부파일 저장 변수
    const facilityImages = useRef()
    
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

    // 첨부파일 미리보기
    const [imageSrc, setImageSrc] = useState([])
    const [updateFile, setUpdateFile] = useState([])
    
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
        setImageSrc(imageSrc.filter((_, index) => index !== id))
        setUpdateFile(updateFile.filter((_, index) => index !== id))
    }

    // useEffect(() => {
    //     console.log(updateFile)
    //     console.log(imageSrc)
    // }, [onUpload, handleDeleteImage])
    

    // 가격변동률, 코트 모달창 상태관리
    const [priceModal, setPriceModal] = useState(false)
    const [courtModal, setCourtModal] = useState(false)

    // 시설등록 input value 업데이트 함수
    const handleInput = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({ ...facility })
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

    // 모달창 닫기 함수
    const closeModal = () => {
        if (courtModal) setCourtModal(false)
        else setPriceModal(false)
    }

     // 모달창 닫기 함수 (수정)
    //  const closeModal = (modalType) => {
    //     if (modalType === 'court') setCourtModal(false)
    //     else if (modalType === 'product') setProductModal(false)
    //     else if (modalType === 'price') setPriceModal(false)
    // }
    
    // 입력된 데이터로 API 호출
    // const handleFacilityAdd = () => {
    //     // const facilityFiles = facilityImages.current.files
    //     const facilityForm = new FormData()

    //     for (let i = 0; i < updateFile.length; i++) {
    //         facilityForm.append("files", updateFile[i]);
    //     }
    //     facilityForm.append("facility_name", facility.facility_name)
    //     facilityForm.append("open_time", facility.open_time + ":00")
    //     facilityForm.append("close_time", facility.close_time + ":00")
    //     facilityForm.append("default_time", facility.default_time)
    //     facilityForm.append("basic_fee", facility.basic_fee)
    //     facilityForm.append("rate_adjustment", facility.rate_adjustment)
    //     facilityForm.append("hot_time", facility.hot_time)
    //     facilityForm.append("contact", facility.contact)
    //     facilityForm.append("info", facility.info)
    //     facilityForm.append("caution", facility.caution)
    //     if (court.length > 0) {
    //         facilityForm.append("court", true)
    //         // 코트 활성화 상태에 따라 시설 활성화 상태를 변경할 수 있는 로직 추가
    //         const courtActive = court.some(court => court.court_status === true)
    //         facilityForm.append("facility_status", courtActive)
    //     } else {
    //         facilityForm.append("facility_status", facility.facility_status)
    //         facilityForm.append("court", false)
    //     }

    //     postAddFacility(facilityForm).then(id => {
    //         console.log(id)
    //         // 시설 등록에 성공하고 나면 facility_id를 반환받음
    //         // 이후 코트, 물품등록 여부에 따라 아래 코드 실행
    //         if (court.length > 0) {
    //             court.map(court => {
    //                 court.facility_id = id
    //                 setCourt({ ...court })
    //             })
    //             postAddCourt(court)
    //         } else {
    //             const defaultCourt = {
    //                 facility_id: id,
    //                 court_name: facility.facility_name,
    //                 court_status: facility.facility_status
    //             }
    //             const courtArray = [defaultCourt]
    //             console.log("전송하는코트 : ", courtArray)
    //             postAddCourt(courtArray)
    //         }
    //         alert("등록된 시설 ID는 " + id + " 입니다.")
    //         navigate({pathname: "/admin/facilities"})
    //     })
    // }

    const handleFacilityModify = () => {
        putOneFacility(facility_id, facility).then(res => console.log(res))
        .catch((error) => console.error(error))
        putOneCourt(facility_id, court).then(res => console.log(res))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
      console.log(facility)
    }, [facility])
    
    return (
        <div className="newFacility">
            <div className="addFacilityTitle">시설 수정</div>
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
                                defaultValue={currentFacility.facility_name}
                                onChange={handleInput}
                                placeholder="ex) 수영장"
                            />
                            <label htmlFor="contact">연락처</label>
                            <input
                                name="contact"
                                id="contact"
                                type={"text"}
                                defaultValue={currentFacility.contact}
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
                                defaultValue={currentFacility.open_time}
                                onChange={handleInput}
                            />
                            <label htmlFor="close_time">폐장시간 </label>
                            <input
                                name="close_time"
                                id="close_time"
                                type={"time"}
                                min={5}
                                max={23}
                                defaultValue={currentFacility.close_time}
                                onChange={handleInput}
                            />
                            <label htmlFor="default_time">기본 이용시간</label>
                            <input
                                name="default_time"
                                id="default_time"
                                type={"number"}
                                min={0}
                                defaultValue={currentFacility.default_time}
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
                                defaultValue={currentFacility.info}
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
                                defaultValue={currentFacility.caution}
                                onChange={handleInput}
                                placeholder="시설 이용 시 주의해야할 사항을 입력해주세요."
                            />
                        </div>
                        <div className="leftItem">
                            <label>시설 개방</label>
                            {currentFacility.facility_status?
                            <>
                                <input
                                    name="facility_status"
                                    id="true"
                                    type={"radio"}
                                    defaultValue={true}
                                    checked
                                    onClick={(e) => handleInput(e)}
                                />
                                <label htmlFor="true"> 가능</label>
                                <input
                                    name="facility_status"
                                    id="false"
                                    type={"radio"}
                                    defaultValue={false}
                                    onClick={(e) => handleInput(e)}
                                />
                                <label htmlFor="false"> 불가</label>
                            </>:
                            <>
                                <input
                                    name="facility_status"
                                    id="true"
                                    type={"radio"}
                                    value={true}
                                    onClick={(e) => handleInput(e)}
                                />
                                <label htmlFor="true"> 가능</label>
                                <input
                                    name="facility_status"
                                    id="false"
                                    type={"radio"}
                                    value={false}
                                    checked
                                    onClick={(e) => handleInput(e)}
                                />
                                <label htmlFor="false"> 불가</label>
                            </>}
                        </div>
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
                                    content={<Price pricePass={pricePass} passedPrice={price} facility_id={facility_id} />}
                                    callbackFn={closeModal}
                                />
                                : <></>
                            }
                        </div>
                        <div className="rightItem">
                            <button className="subItemButton"
                                onClick={() => handleCourtButton()}>
                                코트(레일)
                            </button>
                            <span className="subItemtext">{court && court.length}개의 코트 등록</span>
                            {courtModal ?
                                <Modal
                                    content={<NewCourt courtPass={courtPass} passedCourt={court} />}
                                    callbackFn={closeModal}
                                />
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
                                {currentFacility.file_name? 
                                    currentFacility.file_name.map((file, i) => (
                                    <div key={i}>                               
                                        <img src={`${API_SERVER_HOST}/api/admin/facilities/images/s_${file}`} alt={`${i}`}/>
                                        <DeleteOutline className="imageDeleteButton" onClick={(e) => handleDeleteImage(i, e)} />
                                    </div>))
                                    : <span className="subItemtext">이미지 미리보기</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="facilityButtons">
                        <button className="addFacilityButton" onClick={handleFacilityModify}>수정</button>
                        <button className="cancelFacilityButton" onClick={() => navigate({pathname: `/admin/facilities/read/${facility_id}`})}>취소</button>
                    </div>
                 </div>
            </div>
        </div>
    )
}