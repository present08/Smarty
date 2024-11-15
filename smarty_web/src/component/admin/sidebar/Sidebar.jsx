import "./sidebar.css"
import { ChatBubbleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getListFacility } from "../../../api/admin/facilityApi";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [data, setData] = useState([])    // API에서 받은 시설 정보 저장
    const [display, setDisplay] = useState(null)    // 시설별 서브메뉴 상태관리

    // 각 시설 클릭 시 실행되는 함수
    const onClickFacility = (i) => {
        setDisplay(display === i? null : i)
        // 클릭된 시설의 키값이 기존에 저장된 것과 동일하면 null을 저장하고,
        // 다르면 전달된 키값을 저장
    }

    useEffect(() => {
        getListFacility().then(data => {
            setData(data)
        }).catch((error) => console.log("에러 발생 : ", error))
    }, [])
    
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">            
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">빠른 메뉴</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/admin" className="link">
                            대시보드
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        통계분석
                    </li>
                </ul>
            </div>

            <div className="sidebarMenu">
                <h3 className="sidebarTitle">시설 관리</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/admin/facilities" className="link">
                            시설 전체
                        </Link>

                    </li>
                    {data && data.map((facility, i) => (
                        <li 
                            key={i}
                            className="sidebarListItem" 
                            id={`sidebarListItem${i}`}
                            onClick={() => onClickFacility(i)}
                        >
                        {facility.facility_name}
                            <ul 
                            className="sidebarSublist"
                            // style={{ display: display === i? 'block' : 'none'}}
                            // display에 키값이 저장된 경우에만 보이고, 아니면 안보임
                            >   
                                <Link to={`/admin/facilities/read/${facility.facility_id}`}
                                    className="link"
                                >
                                    <li className="sidebarSublistItem">시설/코트</li>
                                </Link>
                                <Link to={`/admin/classes/${facility.facility_id}`}
                                    className="link"
                                >
                                    <li className="sidebarSublistItem">강의</li>
                                </Link>
                            </ul>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">테스트중</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="test" className="link">
                            테스트용
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
