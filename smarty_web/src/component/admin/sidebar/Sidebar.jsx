import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { getListFacility } from "../../../api/admin/facilityApi";
import "./sidebar.css";

export default function Sidebar() {
    const {facility_id} = useParams()
    const [facility, setFacility] = useState([])

    useEffect(() => {
        getListFacility().then(res => {
            setFacility(res)
        }).catch((error) => console.log("ERROR! : ", error))
    }, [facility_id])

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
                        {/* <li className="sidebarListItem">
                            <Link to="/admin" className="link">
                                통계분석
                            </Link>
                        </li> */}
                        <li className="sidebarListItem">
                            <Link to="/admin/facilities/add" className="link">
                                시설추가
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Link to="/admin/permission" className="link">
                                결제/승인
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <div className="sidebarTitle">시설 관리</div>
                    <ul className="sidebarlist">
                        {facility && facility.map((facility, i) => (
                            <li
                                key={i}
                                className="sidebarListItem"
                                id={`sidebarListItem${i}`}
                            >
                                {facility.facility_name}
                                <ul className="sidebarSubListItem">
                                    <Link to={`/admin/facilities/read/${facility.facility_id}`} className="link">
                                        <li className="sidebarSublistItem">시설</li>
                                    </Link>
                                    <Link to={`/admin/classes/${facility.facility_id}`} className="link">
                                        <li className="sidebarSublistItem">강의</li>
                                    </Link>
                                    <Link to={`/admin/products/${facility.facility_id}`} className="link">
                                        <li className="sidebarSublistItem">물품</li>
                                    </Link>
                                    <Link to={`/admin/status/${facility.facility_id}`} className="link">
                                        <li className="sidebarSublistItem">이용현황</li>
                                    </Link>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}
