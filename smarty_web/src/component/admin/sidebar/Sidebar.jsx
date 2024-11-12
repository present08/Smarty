import "./sidebar.css"
import { Home, Troubleshoot,
    PersonOutline, Storefront, SportsMartialArts, BarChart,
    ChatBubbleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">            
            <div className="sidebarMenu">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/admin" className="link">
                            대시보드
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        통계분석
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/admin/facilities" className="link">
                            시설관리
                        </Link>
                        <ul className="sidebarSublist">
                            <li className="sidebarSublistItem">
                                전체시설
                            </li>
                            <li className="sidebarSublistItem">
                                등록시설1
                            </li>
                            <li className="sidebarSublistItem">
                                등록시설2
                            </li>
                        </ul>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="test" className="link">
                            <ChatBubbleOutline className='sidebarIcon' />
                            테스트용
                        </Link>
                    </li>
                </ul>            
            </div>
        </div>
    </div>
  )
}
