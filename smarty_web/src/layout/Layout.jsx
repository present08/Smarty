import Sidebar from "../components/sidebar/Sidebar"
import Topbar from "../components/topbar/Topbar"
import "./layout.css"

export default function Layout({children}) {
  return (
    <div className="layoutBackground">
        <div className="layoutBox">
            <div className="contents">
                <Topbar />        
                <div className="contentsBody">
                    <Sidebar className="contentsBodySide" />
                    <div className="contentsBodyMain">
                        {children}
                    </div> 
                </div>           
            </div>
        </div>
    </div>
  )
}
