import { useRef, useState } from "react"
import "./newFacility.css"
import { postAdd } from "../../../api/facilityApi"
import { useNavigate } from "react-router-dom"

const initState = {
    facility_id: '',
    facility_name: '',
    quantity: 0,
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

    const [data, setData] = useState({...initState})
    const [courtFlag, setCourtFlag] = useState(null)
    const [productFlag, setProductFlag] = useState(null)
    const [statusFlag, setStatusFlag] = useState(null)
    const uploadImages = useRef()
    const navigate = useNavigate()
    
    const handleInput = (e) => {
        data[e.target.name] = e.target.value
        data.court = courtFlag
        data.product = productFlag
        data.facility_status = statusFlag
        setData({...data})
    }
    const handleClick = (e) => {
        const files = uploadImages.current.files
        const formData = new FormData()
        
        for(let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("facility_name", data.facility_name)
        formData.append("quantity", data.quantity)
        formData.append("open_time", data.open_time)
        formData.append("close_time", data.close_time)
        formData.append("default_time", data.default_time)
        formData.append("basic_fee", data.basic_fee)
        formData.append("extra_fee", data.extra_fee)
        formData.append("contact", data.contact)
        formData.append("info", data.info)
        formData.append("caution", data.caution)
        formData.append("court", data.court)
        formData.append("product", data.product)
        formData.append("facility_status", data.facility_status)

        console.log(formData)
        postAdd(formData)
        navigate({path: "/facilities"})
    }

  return (
    <div className="newFacility">
        <h2 className="addFacilityTitle">Facility Registration</h2>
        <div className="addFacilityContent">           
            <form 
                action="#" 
                method="post"
                encType="multipart/form-data"
                className="addFacilityForm"
            >
                <div className="addFacilityFormLeft">
                    <div className="leftItem">
                        <label htmlFor="facility_name">시설명</label>
                        <input 
                            name="facility_name"
                            id="facility_name"
                            type={"text"} 
                            value={data.facility_name}
                            onChange={handleInput}
                            placeholder="ex) 수영장" 
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="quantity">수용가능 인원</label>
                        <input 
                            name="quantity" 
                            id="quantity" 
                            type={"text"}
                            value={data.quantity} 
                            onChange={handleInput}
                            placeholder="ex) 500" 
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="open_time">개장 </label>
                        <input
                            name="open_time"
                            id="open_time" 
                            type={"time"} 
                            value={data.open_time}
                            onChange={handleInput}
                        />
                        <label htmlFor="close_time">폐장 </label>
                        <input
                            name="close_time" 
                            id="close_time" 
                            type={"time"} 
                            value={data.close_time}
                            onChange={handleInput} 
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="default_time">기본시간</label>
                        <input
                            name="default_time" 
                            id="default_time" 
                            type={"text"}
                            value={data.default_time}
                            onChange={handleInput} 
                            placeholder="ex) 1" 
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="basic_fee">일반 가격</label>
                        <input
                            name="basic_fee" 
                            id="basic_fee" 
                            type={"text"}
                            value={data.basic_fee}
                            onChange={handleInput} 
                            placeholder="ex) 10000" 
                        />
                        <label htmlFor="extra_fee">할증 가격</label>
                        <input
                            name="extra_fee" 
                            id="extra_fee" 
                            type={"text"}
                            value={data.extra_fee}
                            onChange={handleInput} 
                            placeholder="ex) 13000" 
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="contact">연락처</label>
                        <input
                            name="contact" 
                            id="contact" 
                            type={"text"}
                            value={data.contact}
                            onChange={handleInput} 
                            placeholder="ex) 070-XXXX-XXXX"
                        />
                    </div>

                    <div className="leftItem">
                        <label htmlFor="info">이용안내</label>
                        <textarea
                            name="info" 
                            id="info" 
                            cols="70" 
                            rows="5"
                            value={data.info}
                            onChange={handleInput} 
                            placeholder="시설 이용에 관한 안내 사항을 입력해주세요." 
                        />                        
                    </div>

                    <div className="leftItem">
                        <label htmlFor="caution">주의사항</label>
                        <textarea
                            name="caution" 
                            id="caution" 
                            cols="70" 
                            rows="5"
                            value={data.caution}
                            onChange={handleInput} 
                            placeholder="시설 이용 시 주의해야할 사항을 입력해주세요." 
                        />                        
                    </div>
                </div>
                {/* boolean값 서버로 전달 실패중, 해결 필요!! */}
                <div className="addFacilityFormRight">
                    <div className="rightItem">
                        <label>세부 시설</label>
                        <input 
                            name="court" 
                            id="true" 
                            type={"radio"} 
                            value="true"
                            onClick={(e) => setCourtFlag(true)}                            
                        />
                        <label htmlFor="true"> 등록</label>
                        <input 
                            name="court" 
                            id="false"
                            type={"radio"} 
                            value="false"
                            onClick={(e) => setCourtFlag(false)}                            
                        />
                        <label htmlFor="false"> 미등록</label>
                    </div>
                    <div className="rightItem">
                        <div className="addCourt">
                            
                        </div>
                    </div>
                    <div className="rightItem">
                        <label>물품</label>
                        <input 
                            name="product" 
                            id="true" 
                            type={"radio"} 
                            value="true"
                            onClick={(e) => setProductFlag(true)}                            
                        />
                        <label htmlFor="true"> 등록</label>
                        <input 
                            name="product" 
                            id="false"
                            type={"radio"} 
                            value="false"
                            onClick={(e) => setProductFlag(false)}                            
                        />
                        <label htmlFor="false"> 미등록</label>
                    </div>
                    <div className="rightItem option">
                        
                    </div>

                    <div className="rightItem">
                        <label>시설 개방</label>
                        <input 
                            name="facility_status" 
                            id="true" 
                            type={"radio"} 
                            value="true"
                            onClick={(e) => setStatusFlag(true)} 
                        />
                        <label htmlFor="true"> 가능</label>
                        <input 
                            name="facility_status" 
                            id="false" 
                            type={"radio"} 
                            value="false" 
                            onClick={(e) => setStatusFlag(false)} 
                        />
                        <label htmlFor="false"> 불가</label>
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
                        <button className="addFacilityButton" onClick={handleClick}>등록</button>
                        <button className="cancelFacilityButton">취소</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
