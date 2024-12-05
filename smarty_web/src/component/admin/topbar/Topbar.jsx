import { Language, NotificationsNone, Settings } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { permissionWait } from "../../../api/admin/statusApi";
import "./topbar.css";

export default function Topbar() {
    const [newData, setNewData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        permissionWait().then(e => {
            e.map(item => {
                if (item.enrollment_status == "승인대기") {
                    setNewData(e)
                }
            })
        })
    }, [])
    const movetoPermission = () => {
        navigate("/admin/permission")
    }

    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                {/* 로고 */}
                <Link to="/" className="link">
                    <div className="topLeft">
                        <div className="adminLogo">SMARTY ADMIN</div>
                    </div>
                </Link>
                {/* 알림, 언어, 설정 프로필 아이콘 */}
                <div className="topRight">
                    <div className="topbarIconContainer" onClick={movetoPermission}>
                        <NotificationsNone className="dingdong" />
                        {newData.length == 0 ? <></> : <span className="topIconBadge">{newData.length}</span>}
                    </div>
                    {/* <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img
                        src="https://cdn.pixabay.com/photo/2020/07/03/13/48/cat-5366401_640.jpg"
                        alt=""
                        className="topAvatar"
                    /> */}
                </div>
            </div>
        </div>
    )
}
