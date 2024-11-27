import { useParams } from 'react-router-dom'
import './classRead.css'
import { useEffect, useState } from 'react'
import { getOneClass } from '../../../../api/admin/classApi'

export default function ClassRead({class_id}) {
  console.log("props 확인 : ", class_id)
  const [currentClass, setCurrentClass] = useState(null)
 
  useEffect(() => {
    getOneClass(class_id).then(res => {
      setCurrentClass(res)
      console.log(res)
    }).catch((error) => console.error("ERROR! : ", error))
  }, [class_id])
  
  return (
    <div className="classRead">
        {currentClass && 
          <div className="classReadContainer">        
            <div className="classReadTitle">{currentClass.class_name}</div>
            <div className="classContent">

                  <div className="classContentItem">
                    <div className="classContentItemTitle">강의ID</div>
                    <input value={currentClass.class_id} readOnly/>
                  </div>
                  <div className="classContentItem">
                    <div className="classContentItemTitle">개강일</div>
                    <input value={currentClass.start_date} readOnly/>
                  </div>     
                  <div className="classContentItem">
                    <div className="classContentItemTitle">종강일</div>
                    <input value={currentClass.end_date} readOnly/>
                  </div>     
                  <div className="classContentItem">
                    <div className="classContentItemTitle">수업시작</div>
                    <input value={currentClass.start_time} readOnly/>
                  </div>     
                  <div className="classContentItem">
                    <div className="classContentItemTitle">수업종료</div>
                    <input value={currentClass.end_time} readOnly/>
                  </div>     
                  <div className="classContentItem">
                    <div className="classContentItemTitle">수강료</div>
                    <input value={currentClass.price} readOnly/>
                  </div>     
                  <div className="facilityContentRightItem">
                    <div className="classContentItemTitle">정원</div>
                    <input value={currentClass.class_size} readOnly/>
                  </div>                           
                </div>               
            </div>
        }      
    </div>
  )
}
