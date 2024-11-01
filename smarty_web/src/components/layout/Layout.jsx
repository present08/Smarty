import Sidebar from "../sidebar/Sidebar"
import Topbar from "../topbar/Topbar"
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
