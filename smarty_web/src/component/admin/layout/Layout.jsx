import "./layout.css"
import Topbar from './../topbar/Topbar';
import Sidebar from './../sidebar/Sidebar';
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layoutBackground">
        <div className="layoutBox">
            <div className="contents">
                <Topbar />        
                <div className="contentsBody">
                    <Sidebar className="contentsBodySide" />
                    <div className="contentsBodyMain">
                        <Outlet />
                    </div> 
                </div>           
            </div>
        </div>
    </div>
  )
}
