import "./topbar.css";
import { NotificationsNone, MailOutline, Logout } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { permissionWait } from "../../../api/admin/statusApi";
import axiosInstance from "../../../api/axiosInstance";

export default function Topbar() {
    const [newData, setNewData] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        permissionWait().then(e => {
            e.map(item => {
                if (item.enrollment_status == "승인대기") {
                    setNewData(prev => [...prev, item])
                }
            })
        })
    }, [])
    const movetoPermission = () => {
        navigate("/admin/permission")
    }

    //-----------------------------------시큐리티 로그인--------------------------------------//
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // 서버로 상태 검증 요청
            axiosInstance.get('/security/status')
                .then((response) => {
                    setIsLoggedIn(true);
                    setUser({
                        userName: response.data.userName,
                        userId: response.data.userId,
                        role: response.data.role,
                    });
                })
                .catch((error) => {
                    console.error('로그인 상태 확인 실패:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('jwtToken'); // 토큰 제거
                });
        }
    }, []);

    const handleLogout = () => {
        alert("로그아웃 성공");
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); // JWT 제거
        navigate("/");
    }
    //---------------------------------------------------------------------------------------//
    const movetoMailPage = () => {
        navigate("/admin/mail")
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
                <div className="topRight">
                    <div className="topbarIconContainer" onClick={movetoPermission}>
                        <NotificationsNone className="dingdong" />
                        {newData.length == 0 ? <></> : <span className="topIconBadge">{newData.length}</span>}
                    </div>
                    {/*  (영준추가) 메일 아이콘 */}
                    <div className="topbarIconContainer" onClick={movetoMailPage}>
                        <MailOutline className="dingdong" />
                    </div>
                    <div className="topbarIconContainer">
                        <Logout className="dingdong" onClick={handleLogout} />                 
                    </div>
                </div>
            </div>
        </div>
    )
}
