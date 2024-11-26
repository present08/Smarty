import "./facilityRead.css"
import { useEffect, useState } from "react"
import { API_SERVER_HOST, getOneFacility } from "../../../../api/admin/facilityApi"
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
    facility_status: false,
    file_name : []
}

export default function FacilityRead() {
    const navigate = useNavigate()
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState(initFacility)
    const [currentCourt, setCurrentCourt] = useState([])
    const [showHotTime, setShowHotTime] = useState()
    const [courtModal, setCourtModal] = useState(false)
    const [newCourt, setNewCourt] = useState([])

  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
      getListCourt(facility_id)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id])

  useEffect(() => {
    if(currentFacility.hot_time == 0) setShowHotTime("기본 요금")
    else if(currentFacility.hot_time == 1) setShowHotTime("조조 할인")
    else if(currentFacility.hot_time == 2) setShowHotTime("야간 할증")
    else setShowHotTime("모두 적용")
    getListCourt(facility_id).then(res => {
        setCurrentCourt(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [currentFacility])

  const courtPass = (court) => {
    setNewCourt(court)
    setCourtModal(false)
}
useEffect(() => {
  console.log(newCourt)
}, [newCourt])

  const handleCourtButton = (e) => {
    // currentFacility.court = true
    // setCurrentCourt({ ...currentFacility })
    setCourtModal(true)
}
const closeModal = () => {
    setCourtModal(false)
}

const handleCourtAdd = () => {
    putOneCourt(facility_id, newCourt).then(res => {
        console.log(res)
        navigate(0)
    })
}
  

    return (
        <div className="facilityRead">
            <div className="facilityReadTitle">시설 조회</div>
            <div className="facilityReadForm">
                <div className="facilityReadFormLeft">
                    <div className="leftItemTitle">기본 정보</div>
                    <div className="leftItemContent">
                        <div className="leftItem">
                            <label htmlFor="facility_name">시설명</label>
                            <input
                                name="facility_name"
                                id="facility_name"
                                type={"text"}
                                value={currentFacility.facility_name}
                                readOnly
                            />
                            <label htmlFor="contact">연락처</label>
                            <input
                                name="contact"
                                id="contact"
                                type={"text"}
                                value={currentFacility.contact}
                                readOnly
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
                                value={currentFacility.open_time}
                                readOnly
                            />
                            <label htmlFor="close_time">폐장시간 </label>
                            <input
                                name="close_time"
                                id="close_time"
                                type={"time"}
                                min={5}
                                max={23}
                                value={currentFacility.close_time}

                                readOnly
                            />
                            <label htmlFor="default_time">기본 이용시간</label>
                            <input
                                name="default_time"
                                id="default_time"
                                type={"text"}
                                min={0}
                                value={currentFacility.default_time + "시간"}
                                readOnly
                            />                       
                        </div>
                        <div className="textItem">
                            <label htmlFor="info">이용안내</label>
                            <textarea
                                name="info"
                                id="info"
                                cols="70"
                                rows="7"
                                value={currentFacility.info}
                                readOnly
                            />
                        </div>
                        <div className="textItem">
                            <label htmlFor="caution">주의사항</label>
                            <textarea
                                name="caution"
                                id="caution"
                                cols="70"
                                rows="7"
                                value={currentFacility.caution}
                                readOnly
                            />
                        </div>
                        <div className="leftItem">
                            <label>시설 개방</label>
                            {currentFacility.facility_status?
                                <div style={{fontWeight: "300"}}> 가능</div>
                                :<div style={{fontWeight: "300"}}> 불가</div>
                            }
                        </div>
                        <div className="leftItem">
                            <span className="facilityReadText">  * 코트가 존재하는 경우 시설 개방은 코트 개방 여부에 따라 자동으로 설정됩니다.</span>
                        </div>
                    </div>
                </div>
                <div className="facilityReadFormRight">
                    <div className="rightItemTitle">상세 설정</div>
                    <div className="rightItemContent">
                        <div className="rightItem">
                            <label htmlFor="basic_fee">기본 요금</label>
                            <input
                                name="basic_fee"
                                id="basic_fee"
                                type={"text"}
                                value={currentFacility.basic_fee.toLocaleString('ko-KR') + "원"}
                            />
                            <label htmlFor="rate_adjustment">가격 변동률</label>
                            <input
                                name="rate_adjustment"
                                id="rate_adjustment"
                                type={"text"}
                                value={Number(currentFacility.rate_adjustment) * 100 + "%"}
                            />
                            <label htmlFor="rate_adjustment">적용 방식</label>
                            <input
                                name="hot_time"
                                type={"text"}
                                value={showHotTime}
                            />
                        </div>
                        <div className="courtItem">
                            <div className="courtItemTitle">코트 정보</div>
                            {currentFacility.court?
                            <div className="courtContainer">                        
                                {currentCourt && currentCourt.map((court, i) => (
                                <div className="court" key={i}>
                                    <label htmlFor="court_name">코트명</label>
                                    <input
                                        name="court_name"
                                        id="court_name"
                                        type={"text"}
                                        value={court.court_name}
                                    />
                                    <label htmlFor="court_name">코트 개방</label>
                                    {court.court_status?
                                        <div style={{fontWeight: "300"}}> 가능</div>
                                        :<div style={{fontWeight: "300"}}> 불가</div>}
                                </div>))}
                            </div> :
                            <div className="courtContainer">
                                <button className="subItemButton"
                                    onClick={() => handleCourtButton()}>
                                    코트 추가
                                </button>
                                <span className="subItemtext">{newCourt.length}개의 코트 등록</span>
                                {courtModal ?
                                    <Modal
                                        content={<NewCourt courtPass={courtPass}/>}
                                        callbackFn={closeModal}
                                    />
                                    : <></>
                                }
                                {newCourt.length > 0 ?
                                <button className="addFacilityButton" onClick={handleCourtAdd}>등록</button> : <></>
                                }
                            </div>
                        }
                        </div>
                        <div className="imageItem">
                            <div className="imageItemTitle">첨부 파일</div>
                            <div className="imageContainer">
                                {currentFacility? currentFacility.file_name.map((file, i) => (
                                    <div key={i}>                               
                                        <img src={`${API_SERVER_HOST}/api/admin/facilities/images/s_${file}`} alt={`${i}`}/>
                                    </div>)) : (<></>)
                                }
                            </div>
                        </div>
                        <button className="facilityModifyButton" onClick={() => navigate({pathname: `/admin/facilities/modify/${facility_id}`})}>수정</button>
                    </div>
                 </div>
            </div>
        </div>
    )
}