import { useParams } from "react-router-dom"
import "./courtModify.css"
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
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState(initFacility)
    const [court, setCourt] = useState([])   // 생성된 시설 객체를 저장할 배열
    const [removeToggle, setRemoveToggle] = useState(false)

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

    const onClickSubmit = () => {
        courtPass(court)
    }

    const handleInputChange = (i, key, value) => {
        setCourt((prevResult) => {
            const updateResult = [...prevResult]
            // prevResult를 복사하여 updateResult라는 새 배열 생성
            // -> 불변성 유지, 기존 배열을 수정하지 않고 새로운 배열을 생성
            updateResult[i] = { ...updateResult[i], [key]: value }
            // updateResult의 i번째 요소를 복사하여 새로운 객체 생성
            // [key]: value 로 특정 속성만 업데이트
            return updateResult
            // 최종 수정된 updateResult 배열을 반환하여 result의 새 상태로 설정
        })
    }

    const handleRemove = (item, i) => {
        // if(window.confirm("해당 코트의 예약 내역이 함께 삭제됩니다.\n계속 진행하시겠습니까?")) {
        //     setCourt(court.filter((_, idx) => idx != i))
        //     deleteOneCourt(item.court_id).then(res => {
        //         if(i == 0 && court.length == 0) {
        //             currentFacility.court = false
        //             setCurrentFacility({...currentFacility})
        //             putOneFacility(facility_id, currentFacility)
        //             const defaultCourt = {
        //                 facility_id: facility_id,
        //                 court_name: currentFacility.facility_name,
        //                 court_status: currentFacility.facility_status
        //             }
        //             const courtArray = [defaultCourt]
        //             postAddCourt(courtArray)
        //         }
        //         alert(res)
        //     }).catch((error) => ("ERROR! : ", error))
        // } 
        setCourt(court.filter((_, idx) => idx != i))
        
    }


    useEffect(() => {
        // if(court.length == 0) {
        //     const defaultCourt = {
        //         facility_id: facility_id,
        //         court_name: currentFacility.facility_name,
        //         court_status: currentFacility.facility_status
        //     }
        //     const courtArray = [defaultCourt]
        //     postAddCourt(courtArray)
        // }
        console.log("코트 길이", court.length)
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
                            // 옵셔널 체이닝 '?.'
                            // result[i]가 존재하는 경우 속성을 가져오고 그렇지 않으면 undefined 반환
                            // undefined를 반환하면 경우 ""빈 문자열을 대신 사용
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
                    <button className="saveCourtButton" onClick={onClickSubmit}>완료</button>
                </div> : 
                <div className="courtItemButton">
                    <button className="saveCourtButton" onClick={onClickSubmit}>수정</button>
                    <button className="resetCourtButton" onClick={() => setRemoveToggle(true)}>삭제</button>
                </div>}
            </div> 

        </div>
    );
}
