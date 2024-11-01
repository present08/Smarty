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
                    <Link to="/" className='link'>
                        <li className="sidebarListItem">
                            <Home className='sidebarIcon' />
                            Home
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <Troubleshoot className='sidebarIcon' />
                        Analytics
                    </li>
                </ul>            
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <Link to="/facilities" className='link'>
                        <li className="sidebarListItem">
                            <SportsMartialArts className='sidebarIcon' />
                            Facilities
                        </li>
                    </Link>
                    <Link to="/users" className='link'>
                        <li className="sidebarListItem">
                            <PersonOutline className='sidebarIcon' />
                            Users
                        </li>
                    </Link>
                    <Link to="/products" className='link'>
                        <li className="sidebarListItem">
                            <Storefront className='sidebarIcon' />
                            Products
                        </li>
                    </Link>
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
