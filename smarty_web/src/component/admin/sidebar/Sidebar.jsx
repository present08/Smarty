import "./sidebar.css"
import { Link } from 'react-router-dom';
import { getListFacility } from "../../../api/admin/facilityApi";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [data, setData] = useState([])    // API에서 받은 시설 정보 저장

    useEffect(() => {
        getListFacility().then(data => {
            setData(data)
        }).catch((error) => console.log("에러 발생 : ", error))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">

                <div className="sidebarMenu">
                    <div className="sidebarTitle">빠른 메뉴</div>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Link to="/admin" className="link">
                                대시보드
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Link to="/admin" className="link">
                                통계분석
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Link to="/admin/facilities" className="link">
                                전체시설
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <div className="sidebarTitle">관리 메뉴</div>
                    <ul className="sidebarlist">
                        {data && data.map((facility, i) => (
                            <li
                                key={i}
                                className="sidebarListItem collapse"
                                id={`sidebarListItem${i}`}
                            >
                                {facility.facility_name}
                                <ul className="sidebarSubListItem">
                                    <Link to={`/admin/facilities/read/${facility.facility_id}`}
                                        className="link"
                                    >
                                        <li className="sidebarSublistItem">시설</li>
                                    </Link>
                                    <Link to={`/admin/classes/${facility.facility_id}`}
                                        className="link"
                                    >
                                        <li className="sidebarSublistItem">강의</li>
                                    </Link>
                                    <li className="sidebarSublistItem">물품</li>
                                    <li className="sidebarSublistItem">사용자</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}
