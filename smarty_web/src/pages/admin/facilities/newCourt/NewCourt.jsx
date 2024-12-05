import "./newCourt.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { putOneCourt } from "../../../../api/admin/courtApi"

export default function NewCourt({ courtPass, passedCourt }) {
    const {facility_id} = useParams()
    const [showButton, setShowButton] = useState(false)
    const [addToggle, setAddToggle] = useState(false)
    const [courtNum, setCourtNum] = useState(0)     // 생성할 시설 숫자를 저장할 변수
    const [court, setCourt] = useState([])   // 생성된 시설 객체를 저장할 배열

    //=============================코트 추가 등록 설정==============================//
    useEffect(() => {
      if(passedCourt) setCourt(passedCourt)
      else setAddToggle(true)
    }, [passedCourt])
    //============================================================================//
    
    //=================================코트 추가==================================//
    const createForm = () => {
        setCourt(Array.from({ length: courtNum }, (_, i) => ({
            facility_id: facility_id || '',
            court_name: '',
            court_status: true
        })));
        setShowButton(true)
    }

    const handleInputChange = (i, key, value) => {
        setCourt((prevResult) => {
            const updateResult = [...prevResult]
            updateResult[i] = { ...updateResult[i], [key]: value }
            return updateResult
        })
    }
    
    const handleReset = () => {
        setCourtNum(0)
        setCourt([])
        console.log("RESET!")
    }
    //============================================================================//

    //=================================POST 요청==================================//
    const onClickSubmit = () => {
        // 최초 등록
        courtPass(court)
    }
    
    const onClickAdd = () => {
        // 추가 등록
        putOneCourt(facility_id, court).then(res => {
            alert("새로운 코트가 등록되었습니다.")
            courtPass(court)
        }).catch((error) => console.error("ERROR! : ", error))
    }   
    //============================================================================//
    
    return (
        <div className="newCourt">
            <div className="addCourtFormTop">
                <span className="addCourtFormTitle">코트 등록</span>
                <input
                    type="number"
                    className="addCourtNum"
                    placeholder="등록 갯수를 입력하세요"
                    min={0}
                    onChange={(e) => setCourtNum(e.target.value)}
                />
                <button className="createCourtButton" onClick={createForm}>입력창 생성</button>
                <span className="addCourtFormText">* 코트명 입력, 개방 여부 선택 후 등록 버튼을 누르면 추가됩니다.</span>
            </div>

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
                    </div>
                ))}
                {showButton?
                <div className="courtItemButton">
                    {addToggle?
                        <button className="saveCourtButton" onClick={onClickAdd}>등록</button> :
                        <button className="saveCourtButton" onClick={onClickSubmit}>등록</button>
                    }
                    <button className="resetCourtButton" onClick={handleReset}>초기화</button>
                </div> : <></>} 
            </div> 

        </div>
    );
}
