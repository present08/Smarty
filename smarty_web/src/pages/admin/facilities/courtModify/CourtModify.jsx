import "./courtModify.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteOneCourt, postAddCourt } from "../../../../api/admin/courtApi"
import { getOneFacility, putOneFacility } from "../../../../api/admin/facilityApi"

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

export default function CourtModify({ courtPass, passedCourt }) {
    const navigate = useNavigate()
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState(initFacility)
    const [court, setCourt] = useState([])
    const [removeToggle, setRemoveToggle] = useState(false)
    const [lastCheck, setLastCheck] = useState(false)

    useEffect(() => {
        getOneFacility(facility_id).then(res => {
            setCurrentFacility(res)
        }).catch((error) => console.error("ERROR!", error))
    }, [])
       
    useEffect(() => {
        if(passedCourt){
          setCourt(passedCourt)
        }
    }, [passedCourt]) 
      
    const handleInputChange = (i, key, value) => {
        setCourt((prevResult) => {
            const updateResult = [...prevResult]
            updateResult[i] = { ...updateResult[i], [key]: value }
            return updateResult
        })
    }
    
    const handleRedirect = () => {
        if(window.confirm("추가 수정을 원하십니까?")) navigate({pathname: `/admin/facilities/modify/${facility_id}`})
        else navigate({pathname: `/admin/facilities/read/${facility_id}`})
    }
    const handleModify = () => {
        if(window.confirm("수정하시겠습니까?")) {
            alert("시설 수정 페이지의 수정 버튼을 클릭하면\n시설, 코트 수정 사항이 반영됩니다.")
            courtPass(court)
        } else navigate({pathname: `/admin/facilities/modify/${facility_id}`})
    }
    const handleRemove = (item, i) => {
        if(window.confirm("해당 코트의 예약 내역이 함께 삭제됩니다.\n계속 진행하시겠습니까?")) {
            if(lastCheck && window.confirm("마지막 코트를 삭제하시겠습니까?")) {
                deleteOneCourt(item.court_id).then(res => alert(res)).catch((error) => ("ERROR! : ", error))
                // 1. facility의 court 값 false로 전환 (수정)
                currentFacility.court = false
                setCurrentFacility({...currentFacility})
                putOneFacility(facility_id, currentFacility).then(res => console.log(res)).catch((error) => ("ERROR! : ", error))
                // 2. 기본 코트 등록
                const defaultCourt = {
                    facility_id: facility_id,
                    court_name: currentFacility.facility_name,
                    court_status: currentFacility.facility_status
                }
                const courtArray = [defaultCourt]
                postAddCourt(courtArray).then(res => console.log(res)).catch((error) => ("ERROR! : ", error))
                // 3. 조회 페이지로 이동
                navigate({pathname: `/admin/facilities/read/${facility_id}`})
            } else navigate({pathname: `/admin/facilities/modify/${facility_id}`})
            setCourt(court.filter((_, idx) => idx != i))
            deleteOneCourt(item.court_id).then(res => alert(res)).catch((error) => ("ERROR! : ", error))
        } else navigate({pathname: `/admin/facilities/modify/${facility_id}`})
    }

    useEffect(() => {
        if(court.length == 1) {
            setLastCheck(true)
        }
    }, [court])
    
    return (
        <div className="newCourt">
            <div className="addCourtFormBody">
                {court.map((court, i) => (
                    <div key={i} className="addCourtItem">
                        <label>코트명</label>
                        <input
                            type="text"
                            name={`court_name${i}`}
                            value={court.court_name || ""}
                            placeholder={`코트명 ${i + 1}`}
                            onChange={(e) => handleInputChange(i, 'court_name', e.target.value)}
                        />
                        <label>개방 여부</label>
                        <input
                            type="radio"
                            name={`court_status${i}`}
                            id={`open_${i}`}
                            onChange={() => handleInputChange(i, 'court_status', true)}
                            checked={court.court_status? true : false}
                        />
                        <label htmlFor={`open_${i}`}> 가능</label>
                        <input
                            type="radio"
                            name={`court_status${i}`}
                            id={`closed_${i}`}
                            onChange={() => handleInputChange(i, 'court_status', false)}
                            checked={court.court_status? false : true}
                        />
                        <label htmlFor={`closed_${i}`}> 불가</label>
                        {removeToggle?
                        <button className="resetCourtButton" onClick={() => handleRemove(court, i)}>삭제</button> : <></>}
                    </div>
                ))}
                {removeToggle? 
                <div className="courtItemButton">
                    <button className="saveCourtButton" onClick={handleRedirect}>완료</button>
                </div> : 
                <div className="courtItemButton">
                    <button className="saveCourtButton" onClick={handleModify}>수정</button>
                    <button className="resetCourtButton" onClick={() => setRemoveToggle(true)}>삭제</button>
                </div>}
            </div>
        </div>
    );
}
