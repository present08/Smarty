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
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" className="link">
                            <Home className='sidebarIcon' />
                            Home
                         </Link>
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
                        <Link to="/facilities" className="link">
                            <SportsMartialArts className='sidebarIcon' />
                            Facilities
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/products" className="link">
                            <Storefront className='sidebarIcon' />
                            Products
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/users" className="link">
                            <PersonOutline className='sidebarIcon' />
                            Users
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <BarChart className='sidebarIcon' />
                        Reports
                    </li>
                </ul>            
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Test</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/test" className="link">
                            <ChatBubbleOutline className='sidebarIcon' />
                            PageTest
                        </Link>
                    </li>
                </ul>            
            </div>
        </div>
    </div>
  )
}
