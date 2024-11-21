import { useParams } from 'react-router-dom'
import './classRead.css'
import { useEffect, useState } from 'react'
import { getOneClass } from '../../../../api/admin/classApi'

export default function ClassRead() {

  const {facility_id, class_id} = useParams()
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
            <div className="classReadTitle">{currentClass.class_name}<br />
              강의 조회 화면의 경우 리스트에서 조회 버튼 클릭 시 모달창으로 바로 확인할 수 있도록 구현<br /><br />
            </div>
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
