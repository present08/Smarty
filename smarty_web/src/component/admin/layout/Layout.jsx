import "./layout.css"
import Topbar from './../topbar/Topbar';
import Sidebar from './../sidebar/Sidebar';

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
