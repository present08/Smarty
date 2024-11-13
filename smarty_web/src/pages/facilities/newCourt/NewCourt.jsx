import { useEffect, useState } from "react"
import "./newCourt.css"

export default function NewCourt(courtPass) {

    useEffect(() => {
        console.log(courtPass)
    }, [])


    const [courtNum, setCourtNum] = useState(0)     // 생성할 시설 숫자를 저장할 변수
    const [result, setResult] = useState([])   // 생성된 시설 객체를 저장할 배열

    const onClickSave = () => {
        console.log("new court result : ", result)
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
            const updateResult = [...prevResult]    // 직전 result를 모두 가져옴
            updateResult[i] = { ...updateResult[i], [key]: value }
            return updateResult;
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
                    <button className="saveCourtButton"
                        onClick={() => onClickSave()}>등록</button>
                    <span className="addCourtFormText">*코트명 입력, 개방 여부 선택 후 등록 버튼을 누르면 추가됩니다.</span>
                </div>


                <div className="addCourtFormBody">
                    {result.map((item, i) => (
                        <div key={i} className="addCourtItem">
                            <input
                                name={`court_name${i}`}
                                type="text"
                                placeholder={`시설명 ${i + 1}`}
                                value={item.court_name || ""}
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
            </div>
        </div>
    );
}
