import "./newCourt.css"
import { useEffect, useState } from "react"
import { postAddCourt } from "../../../../api/admin/courtApi"

export default function NewCourt(courtPass) {
    const [courtNum, setCourtNum] = useState(0)     // 생성할 시설 숫자를 저장할 변수
    const [result, setResult] = useState([])   // 생성된 시설 객체를 저장할 배열

    const onClickSubmit = () => {
        courtPass.courtPass(result)
        // 부모 컴포넌트에서 전달받은 함수에 결과를 실어보냄(실행)
    }

    // step1) 사용자가 생성할 시설의 갯수를 입력하고 생성 버튼 클릭
    //          -> 저장할 객체 배열 생성, 입력폼 출력
    const createForm = () => {
        setResult(Array.from({ length: courtNum }, (_, i) => ({
            facility_id: '',
            court_name: '',
            court_status: ''
        })));
    }

    // step2) input태그에 입력한 값을 결과 배열(result)에 저장
    const handleInputChange = (i, key, value) => {
        setResult((prevResult) => {
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

    return (
        <div className="newCourt">
            <div className="addCourtForm">
                <div className="addCourtFormTop">
                    <span className="addCourtFormTitle">코트 등록</span>
                    <input
                        type="number"
                        className="addCourtNum"
                        placeholder="등록 갯수를 입력하세요"
                        onChange={(e) => setCourtNum(e.target.value)}
                    />
                    <button className="addCourtButton" onClick={createForm}>입력창 생성</button>
                    <button className="saveCourtButton" onClick={() => onClickSubmit()}>등록</button>
                    <button className="saveCourtButton" onClick={() => postAddCourt(result)}>전송</button>
                    <span className="addCourtFormText">*코트명 입력, 개방 여부 선택 후 등록 버튼을 누르면 추가됩니다.</span>
                </div>


                <div className="addCourtFormBody">
                    {result.map((court, i) => (
                        <div key={i} className="addCourtItem">
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
                            <input
                                type="radio"
                                name={`court_status${i}`}
                                id={`open_${i}`}
                                onChange={() => handleInputChange(i, 'court_status', true)}
                            />
                            <label htmlFor={`open_${i}`}> 가능</label>
                            <input
                                type="radio"
                                name={`court_status${i}`}
                                id={`closed_${i}`}
                                onChange={() => handleInputChange(i, 'court_status', false)}
                            />
                            <label htmlFor={`closed_${i}`}> 불가</label>
                        </div>
                    ))}
                </div>
                <div className="addCourtResult">
                    {result.map(item => item.court_name)}
                </div>
            </div>
        </div>
    );
}
