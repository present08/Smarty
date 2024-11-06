import { useEffect, useRef, useState } from "react"
import "./newFacility.css"
import { postAdd } from "../../../api/facilityApi"
import Modal from "../../../components/modal/Modal"
import NewCourt from "../newCourt/NewCourt"

const initState = {
    facility_name: '',
    open_time: '',
    close_time: '',
    default_time: 0,
    basic_fee: 0,
    extra_fee: 0,
    contact: '',
    info: '',
    caution: '',
    court: false,
    product: false,
    facility_status: false,
    files: []
}

export default function NewFacility() {

    // FacilityDTO 구성
    const [facility, setFacility] = useState({...initState})
    // FacilityDTO boolean 필드값 상태관리
    const [courtFlag, setCourtFlag] = useState(false)
    const [productFlag, setProductFlag] = useState(false)
    const [statusFlag, setStatusFlag] = useState(false)
    // FacilityDTO 첨부파일 저장 변수
    const uploadImages = useRef()

    // 코트, 물품등록시 모달창 상태관리
    const [courtModal, setCourtModal] = useState(false)
    const [productModal, setProductModal] = useState(false)

    // 자식 컴포넌트에서 부모 컴포넌트로 props 전달 방법
    // 전달받은 값을 저장할 useState, 값 전달 역할을 할 함수를 선언
    // 자식 컴포넌트로 함수 전달
    // 자식 컴포넌트에서 함수를 실행하면 부모 컴포넌트의 함수가 실행되면서 인자값을 전달받음
    const [courtResult, setCourtResult] = useState(Array.from({length : 0}, (_, i) => ({
        court_name: '',
        court_status: ''
      })))
    const courtPass = (result) => {
        console.log("전달받은결과 " + result)
        setCourtResult(result)
    }

    useEffect(() => {
      console.log("전달받은결과 " + courtResult)
    }, [courtResult])
    
    
    // 시설등록 input value 업데이트 함수
    const handleInput = (e) => {
        facility[e.target.name] = e.target.value
        setFacility({...facility})
        console.log(facility)
    }
    // 시설등록 radio value 업데이트 함수
    const handleRadio = (e) => {
        setStatusFlag(e.target.value)
        facility.facility_status = statusFlag
        setFacility({...facility})
    }

    // 세부시설 등록 버튼 클릭 시 실행 함수
    const handleCourtButton = (e) => {
        setCourtFlag(true)
        facility.court = courtFlag
        setFacility({...facility})
        setCourtModal(true)
        console.log("시설 : ", courtFlag)
    }
    // 대여물품 등록 버튼 클릭 시 실행 함수
    const handleProductButton = (e) => {
        setProductFlag(true)
        facility.product = productFlag
        setFacility({...facility})
        setProductModal(true)
        console.log("물품 : ", productFlag)
    }
    // 모달창 닫기 함수
    const closeModal = () => {
        if(courtModal) setCourtModal(false)
        else setProductModal(false)    
    }


    // facility에 입력된 데이터로 formData 구성하여 API 호출
    const handleFacilityAdd = (e) => {
        const files = uploadImages.current.files
        const facilityForm = new FormData()
   
        for(let i = 0; i < files.length; i++) {
            facilityForm.append("files", files[i]);
        }
        facilityForm.append("facility_name", facility.facility_name)
        facilityForm.append("open_time", facility.open_time)
        facilityForm.append("close_time", facility.close_time)
        facilityForm.append("default_time", facility.default_time)
        facilityForm.append("basic_fee", facility.basic_fee)
        facilityForm.append("extra_fee", facility.extra_fee)
        facilityForm.append("contact", facility.contact)
        facilityForm.append("info", facility.info)
        facilityForm.append("caution", facility.caution)
        facilityForm.append("court", facility.court)
        facilityForm.append("product", facility.product)
        facilityForm.append("facility_status", facility.facility_status)

        postAdd(facilityForm)
        console.log(facility)
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
                            type={"time"} 
                            value={facility.open_time}
                            onChange={handleInput}
                        />
                        <label htmlFor="close_time">폐장시간 </label>
                        <input
                            name="close_time" 
                            id="close_time" 
                            type={"time"} 
                            value={facility.close_time}
                            onChange={handleInput} 
                        />
                    </div>
                    <div className="leftItem">
                        <label htmlFor="default_time">기본 이용시간</label>
                        <input
                            name="default_time" 
                            id="default_time" 
                            type={"text"}
                            value={facility.default_time}
                            onChange={handleInput} 
                            placeholder="ex) 1" 
                        />
                    </div>
                    <div className="leftItem">
                        <label htmlFor="basic_fee">기본요금</label>
                        <input
                            name="basic_fee" 
                            id="basic_fee" 
                            type={"text"}
                            value={facility.basic_fee}
                            onChange={handleInput} 
                            placeholder="ex) 10000" 
                        />
                        <label htmlFor="extra_fee">가격 변동률</label>
                        <input
                            name="extra_fee" 
                            id="extra_fee" 
                            type={"range"}
                            min={0}
                            max={1}
                            step={0.1}
                            value={facility.extra_fee}
                            onChange={handleInput} 
                            placeholder="ex) 13000" 
                        />
                    </div>

                    <div className="addFacilityFormSub">
                        <div className="addFacilityFormSubTitle">추가 등록</div>
                        <div className="subItemContent">
                            <div className="subItem">
                                <button className="subItemButton"
                                onClick={() => handleCourtButton()}>
                                    코트(레일)
                                </button>
                                <span className="subItemtext">{courtResult.length}개의 코트 등록</span>
                                {courtModal?
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
                                <span className="subItemtext">{courtResult.length}개의 물품 등록</span>
                                {productModal?
                                    <Modal 
                                    title={'물픔 등록'}
                                    content={'물품 등록 화면'}
                                    callbackFn={closeModal} />
                                    : <></>
                                }
                            </div>
                            <div className="subItem">
                                <div className="subItemTitle">시설 개방</div>
                                <input
                                    name="facility_status" 
                                    id="true" 
                                    type={"radio"} 
                                    value={true}
                                    onClick={(e) => handleRadio(e)}
                                />
                                <label htmlFor="true"> 가능</label>
                                <input 
                                    name="facility_status" 
                                    id="false" 
                                    type={"radio"} 
                                    value={false} 
                                    onClick={(e) => handleRadio(e)}
                                />
                                <label htmlFor="false"> 불가</label>
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
                            ref={uploadImages}
                        />
                    </div>

                    <div className="facilityButtons">
                        <button className="addFacilityButton" onClick={handleFacilityAdd}>등록</button>
                        <button className="cancelFacilityButton">취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}