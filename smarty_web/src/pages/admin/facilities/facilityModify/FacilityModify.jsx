import "./facilityModify.css"
import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react"
import { API_SERVER_HOST, getOneFacility, putOneFacility } from "../../../../api/admin/facilityApi"
import Modal from "../../../../component/admin/modal/Modal"
import { getListCourt, putOneCourt } from "../../../../api/admin/courtApi"
import { useNavigate, useParams } from "react-router-dom"
import Price from "../../../../component/admin/price/Price"
import CourtModify from "../courtModify/CourtModify";

const initFacility = {
    facility_name: '',
    open_time: '',
    close_time: '',
    default_time: '',
    basic_fee: '',
    rate_adjustment: '',
    hot_time: '',
    contact: '',
    info: '',
    caution: '',
    court: '',
    product: '',
    facility_status: '',
    facility_images: '',
    file_name: []
}
const initPrice = {
    basic_fee: '',
    rate_adjustment : '',
    hot_time : ''
}

export default function FacilityModify() {
    const navigate = useNavigate()
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState(initFacility)    // 시설 기본값
    const [facility, setFacility] = useState(initFacility)                  // 변경값 반영, 무한 렌더링 방지
    const [facilityStatus, setFacilityStatus] = useState()
    const [price, setPrice] = useState(initPrice)
    const [currentCourt, setCurrentCourt] = useState([])
    const [priceModal, setPriceModal] = useState(false)
    const [courtModal, setCourtModal] = useState(false)
    const facilityImages = useRef()
    const [imageSrc, setImageSrc] = useState([])
    const [updateFile, setUpdateFile] = useState([])
    const [imageUpdate, setImageUpdate] = useState(false)

//=============================GET 요청===============================// 

    useEffect(() => {
    getOneFacility(facility_id).then(res => {
        setCurrentFacility(res)
        setFacility(res)
    }).catch((error) => console.error("ERROR!", error))
    getListCourt(facility_id).then(res => setCurrentCourt(res)).catch((error) => console.error("ERROR!", error))
    }, [facility_id])

//====================================================================//

//==============================Price=================================//

    useEffect(() => {
    // 시설 기본값 저장되면 priceModal로 전달할 price 객체 생성
    setPrice({
        basic_fee: currentFacility.basic_fee,
        rate_adjustment : currentFacility.rate_adjustment,
        hot_time : currentFacility.hot_time
    })
    // facility_status 값 추출하여 저장
    setFacilityStatus(currentFacility.facility_status)
    }, [currentFacility])

    const pricePass = (price) => {
        // priceModal에서 전달된 값으로 price객체의 값 변경(최신화)
        setPrice(price)
        setPriceModal(false)
    }
    useEffect(() => {
        // priceModal에서 전달된 값으로 currentFacility객체의 값 변경(최신화)
        facility.basic_fee = price.basic_fee
        facility.rate_adjustment = price.rate_adjustment
        facility.hot_time = price.hot_time
        setFacility({ ...facility })
    }, [price])

//====================================================================//

//==============================Court=================================//

    const courtPass = (court) => {
        // courtModal에서 전달된 값으로 court객체의 값 변경(최신화)
        setCurrentCourt(court)
        setCourtModal(false)
    }
    useEffect(() => {
        // court_status 값에 따라 facility_status 값 변경
        const facilityActive = currentCourt.some(court => court.court_status === true)
        facility.facility_status = facilityActive
        setFacility({ ...facility })
        if(currentCourt.length == 0) {
            facility.court = false
            setFacility({ ...facility })
        }
        console.log(currentCourt)
    }, [currentCourt])
    
//====================================================================//

//===============================Modal================================//

    const handlePriceButton = () => {
        setPriceModal(true)
    }
    const handleCourtButton = () => {
        setCourtModal(true)
    }  
    const closeModal = () => {
        if (courtModal) setCourtModal(false)
        else setPriceModal(false)
    }
//====================================================================//

//===============================Files================================//

    const onUpload = (e) => {
        // 이미지 수정 버튼 클릭
        facility.facility_images = true
        setFacility({ ...facility })
        setImageUpdate(true)
        const imageList = Array.from(e.target.files)
        let imageUrlList = []

        imageList.forEach((file) => {
            const currentImageUrl = URL.createObjectURL(file)
            imageUrlList.push(currentImageUrl)
        })
        setImageSrc(imageUrlList)
        setUpdateFile(imageList)
    }

    const handleRemoveImage = () => {
        // 기존 이미지 삭제
        facility.facility_images = false
        setFacility({ ...facility })
        setImageUpdate(true)
    }

    const handleDeleteImage = (id) => {
        // 이미지 미리보기 삭제
        setImageSrc(imageSrc.filter((_, index) => index !== id))
        setUpdateFile(updateFile.filter((_, index) => index !== id))
    }
    
//====================================================================//

//==============================PUT 요청==============================//

    const handleInput = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({ ...facility })
    }
    const handleCheck = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({ ...facility })
        setFacilityStatus(!facilityStatus)
    }
    useEffect(() => {
      console.log(facility)
    }, [facility])
    

    const handleFacilityModify = () => {
        if(imageUpdate && updateFile.length > 0) {
            // 새로운 이미지 파일
            const facilityForm = new FormData()

            for (let i = 0; i < updateFile.length; i++) {
                facilityForm.append("files", updateFile[i]);
            }
            facilityForm.append("facility_name", facility.facility_name)
            facilityForm.append("open_time", facility.open_time)
            facilityForm.append("close_time", facility.close_time)
            facilityForm.append("default_time", facility.default_time)
            facilityForm.append("basic_fee", facility.basic_fee)
            facilityForm.append("rate_adjustment", facility.rate_adjustment)
            facilityForm.append("hot_time", facility.hot_time)
            facilityForm.append("contact", facility.contact)
            facilityForm.append("info", facility.info)
            facilityForm.append("caution", facility.caution)
            facilityForm.append("court", facility.court)
            facilityForm.append("product", facility.product)
            facilityForm.append("facility_status", facility.facility_status)
            facilityForm.append("facility_images", facility.facility_images)

            putOneFacility(facility_id, facilityForm).then(res => console.log(res)).catch((error) => console.error("ERROR! : ", error))
        } else if(imageUpdate && updateFile.length == 0) {
            // 기존 이미지 삭제
            facility.facility_images = false
            setFacility({ ...facility })
            putOneFacility(facility_id, facility).then(res => console.log(res)).catch((error) => console.error("ERROR! : ", error))
        } else {
            // 이미지 수정 없음
            putOneFacility(facility_id, facility).then(res => console.log(res)).catch((error) => console.error("ERROR! : ", error))
        }
        putOneCourt(facility_id, currentCourt).then(res => console.log(res)).catch((error) => console.error("ERROR! : ", error))
        navigate({pathname: `/admin/facilities/read/${facility_id}`})
    }
//====================================================================//
    
    return (
        <div className="facilityModify">
            <div className="facilityModifyTitle">시설 수정</div>
            <div className="facilityModifyForm">
                <div className="facilityModifyFormLeft">
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
                                <input
                                    className="radio"
                                    name="facility_status"
                                    id="true"
                                    type={"radio"}
                                    value={true}
                                    checked={facilityStatus? true : false}
                                    onChange={(e) => handleCheck(e)}
                                />
                                <label htmlFor="true"> 가능</label>
                                <input
                                    className="radio"
                                    name="facility_status"
                                    id="false"
                                    type={"radio"}
                                    value={false}
                                    checked={facilityStatus? false : true}
                                    onChange={(e) => handleCheck(e)}
                                />
                                <label htmlFor="false"> 불가</label>
                        </div>
                        <div className="leftItem">
                            <span className="facilityReadText">  * 코트가 존재하는 경우 시설 개방은 코트 개방 여부에 따라 자동으로 설정됩니다.</span>
                        </div>
                    </div>
                </div>
                <div className="facilityModifyFormRight">
                    <div className="rightItemTitle">상세 설정</div>

                    <div className="rightItemContent">
                        <div className="rightItem">
                            <button className="subItemButton"
                                onClick={handlePriceButton}>
                                가격 변경
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
                        <div className="courtItem">
                            <div className="courtUpload">
                                <button className="subItemButton"
                                    onClick={handleCourtButton}>
                                    코트 변경
                                </button>
                                {courtModal ?
                                <Modal
                                    content={<CourtModify courtPass={courtPass} passedCourt={currentCourt} />}
                                    callbackFn={closeModal}
                                /> : <></>}
                            </div>
                            {currentFacility.court?                            
                            <div className="courtContainer">                        
                                {currentCourt && currentCourt.map((court, i) => (
                                <div className="court" key={i}>
                                    <label htmlFor="court_name">코트명</label>
                                    <input
                                        name="court_name"
                                        id="court_name"
                                        type={"text"}
                                        defaultValue={court.court_name}
                                        readOnly
                                    />
                                    <label htmlFor="court_name">코트 개방</label>
                                    {court.court_status?
                                        <div style={{fontWeight: "300"}}> 가능</div>
                                        :<div style={{fontWeight: "300"}}> 불가</div>}
                                </div>))}
                            </div> :
                            <div className="courtContainer">
                                <label htmlFor="court_name">등록된 코트가 존재하지 않습니다.</label>
                            </div>}
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
                                <label htmlFor="files" className="subItemButton">이미지 변경</label>
                                <label className="removeButton" onClick={handleRemoveImage}>이미지 삭제</label>
                            </div>
                            {imageUpdate?
                                (<div className="imageContainer">
                                    {imageSrc.length > 0?
                                    <>
                                    {imageSrc.map((src, i) => (
                                        <div key={i}>                               
                                            <img src={src} alt={`${src}-${i}`}/>
                                            <DeleteOutline className="imageDeleteButton" onClick={(e) => handleDeleteImage(i, e)} />
                                        </div>))}
                                    </> : <span className="subItemtext">이미지 미리보기</span>
                                    }
                                </div>):
                                (<div className="imageContainer">
                                    {facility && facility.file_name.map((file, i) => (
                                        <div key={i}>                               
                                            <img src={`${API_SERVER_HOST}/api/admin/facilities/images/s_${file}`} alt={`${i}`}/>
                                        </div>))}
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="facilityModifyButtons">
                        <button className="modifyButton" onClick={handleFacilityModify}>수정</button>
                        <button className="cancleButton" onClick={() => navigate({pathname: `/admin/facilities/read/${facility_id}`})}>취소</button>
                    </div>
                 </div>
            </div>
        </div>
    )
}