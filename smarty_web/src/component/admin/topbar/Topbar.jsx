import { Link } from "react-router-dom";
import "./topbar.css"
import { NotificationsNone, Language, Settings } from '@mui/icons-material';

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            {/* 로고 */}
            <Link to="/" className="link">    
                <div className="topLeft">
                    <span className="logo">Admin</span>
                </div>
            </Link>
            {/* 알림, 언어, 설정 프로필 아이콘 */}
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
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
                />
            </div>
        </div>
    </div>
  )
}
