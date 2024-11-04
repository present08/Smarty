import "./modal.css";
import { Close } from '@mui/icons-material';
import { Children } from "react";

export default function Modal({Children}) {
  return (
    <div className="modalContainer">
        <div className="modalBox">
            <div className="modalBoxTop">
                <Close className="closeButton"/>
            </div>
            <div className="modalBoxContent">
                {Children}
            </div>
            <div className="modalBoxBottom">
                <button className="checkButton">등록</button>
            </div>
        </div>       
    </div>
  )
}
