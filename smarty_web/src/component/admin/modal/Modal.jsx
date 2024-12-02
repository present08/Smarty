import "./modal.css";
import { Close } from '@mui/icons-material';

export default function Modal({title, content, callbackFn}) {
  return (
    <div className="modalContainer">
        <div className="modalBox">
            <div className="modalBoxTop">
                <Close 
                    className="closeButton"
                    onClick={() => {
                        if(callbackFn) callbackFn()
                    }}
                />
            </div>
            <div className="modalBoxContent">
                {content}
            </div>
        </div>       
    </div>
  )
}
