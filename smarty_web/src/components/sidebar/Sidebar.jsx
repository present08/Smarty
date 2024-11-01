import "./sidebar.css"
import { Home, Troubleshoot, TrendingUp,
    PersonOutline, Storefront, SportsMartialArts, BarChart,
    MailOutline, DynamicFeed, ChatBubbleOutline,
    WorkOutline, Report, 
    } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">            
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Home className='sidebarIcon' />
                        Home
                    </li>
                    <li className="sidebarListItem">
                        <Troubleshoot className='sidebarIcon' />
                        Analytics
                    </li>
                </ul>            
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <SportsMartialArts className='sidebarIcon' />
                        Facilities
                    </li>
                    <li className="sidebarListItem">
                        <PersonOutline className='sidebarIcon' />
                        Users
                    </li>
                    <li className="sidebarListItem">
                        <Storefront className='sidebarIcon' />
                        Products
                    </li>
                    <li className="sidebarListItem">
                        <BarChart className='sidebarIcon' />
                        Reports
                    </li>
                </ul>            
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MailOutline className='sidebarIcon' />
                        Mail
                    </li>
                    <li className="sidebarListItem">
                        <DynamicFeed className='sidebarIcon' />
                        FeedBack
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleOutline className='sidebarIcon' />
                        Messages
                    </li>
                </ul>            
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <WorkOutline className='sidebarIcon' />
                        Manage
                    </li>
                    <li className="sidebarListItem">
                        <Troubleshoot className='sidebarIcon' />
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <Report className='sidebarIcon' />
                        Reports
                    </li>
                </ul>            
            </div>
        </div>
    </div>
  )
}
