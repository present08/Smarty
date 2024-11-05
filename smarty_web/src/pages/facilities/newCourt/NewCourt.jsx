import { useEffect, useState } from "react"
import "./newCourt.css"

const initState = {
    court_name: '',
    court_status: true
}

export default function NewCourt() {
    const [courtNum, setCourtNum] = useState(0)
    const [court, setCourt] = useState({...initState})
    
    const handleInput = (e) => {
        court[e.target.name] = e.target.value
        setCourt({...court})
        console.log(court)
    }

    const createForm = () => {
        const result = []
        for(let i = 0; i < courtNum; i++) {
            result.push(
                <tr>
                    <td>
                        <input 
                            name="court_name"
                            id="court_name"
                            type={"text"} 
                            placeholder="상세시설명"
                            value={court.court_name}
                            onChange={handleInput} 
                        />
                    </td>
                    <td>
                        <input
                            name={`court_status_${i}`} 
                            id={`true_${i}`} 
                            type={"radio"} 
                            value={true}
                            // onClick={(e) => handleRadio(e)}
                        />
                        <label htmlFor="true"> 가능</label>
                        <input 
                            name={`court_status_${i}`} 
                            id={`false_${i}`} 
                            type={"radio"} 
                            value={false} 
                            // onClick={(e) => handleRadio(e)}
                        />
                        <label htmlFor="false"> 불가</label>
                    </td>            
                </tr>
            )
        }
        return result;
    }

  return (
    <div className="newCourt">
        <div className="addCourtForm">
            <div className="addCourtFormTop">
                <div className="addCourtTitle">
                    세부시설등록
                </div>
                등록 갯수
                <input type="number" min={0} onChange={(e) => setCourtNum(e.target.value)}/>
            </div>
            <div className="addCourtFormBody">
                <table>
                    <thead>
                        <tr>
                            <th>시설명</th>
                            <th>개방여부</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courtNum>0? createForm() : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
