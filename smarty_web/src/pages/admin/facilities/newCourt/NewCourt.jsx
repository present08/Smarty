import { useNavigate, useParams } from "react-router-dom"
import "./newCourt.css"
import { useEffect, useState } from "react"
import { postAddCourt, putOneCourt } from "../../../../api/admin/courtApi"

export default function NewCourt({ courtPass, passedCourt }) {
    // 시설 추가시 코트 등록인지 여부 확인 : passedCourt를 이용하지 않고 모달창에서 바로 코트 등록
    const navigate = useNavigate()
    const {facility_id} = useParams()
    const [addToggle, setAddToggle] = useState(false)
    const [courtNum, setCourtNum] = useState(0)     // 생성할 시설 숫자를 저장할 변수
    const [court, setCourt] = useState([])   // 생성된 시설 객체를 저장할 배열

    useEffect(() => {
      if(passedCourt) setCourt(passedCourt)
      else setAddToggle(true)
    }, [passedCourt])

    const onClickSubmit = () => {
        courtPass(court)
    }
    
    const onClickAdd = () => {
        putOneCourt(facility_id, court).then(res => {
            console.log(res)
            alert("새로운 코트가 등록되었습니다.")
            courtPass(court)
        }).catch((error) => console.error("ERROR! : ", error))
    }

    // step1) 사용자가 생성할 시설의 갯수를 입력하고 생성 버튼 클릭
    //          -> 저장할 객체 배열 생성, 입력폼 출력
    const createForm = () => {
        setCourt(Array.from({ length: courtNum }, (_, i) => ({
            facility_id: facility_id || '',
            court_name: '',
            court_status: true
        })));
    }

    // step2) input태그에 입력한 값을 결과 배열(result)에 저장
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

    const handleReset = () => {
        setCourtNum(0)
        setCourt([])
        console.log("RESET!")
    }

    const handleRemove = (i) => {
        setCourt(court.filter((_, index) => index !== i))
    }

    useEffect(() => {
      console.log(court)
    }, [court])
    
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
                    </div>
                ))}
                <div className="courtItemButton">
                    {addToggle?
                        <button className="saveCourtButton" onClick={onClickAdd}>등록</button> :
                        <button className="saveCourtButton" onClick={onClickSubmit}>등록</button>
                    }
                    <button className="resetCourtButton" onClick={handleReset}>초기화</button>
                </div>  
            </div> 

        </div>
    );
}
