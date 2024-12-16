import { useEffect, useState } from "react";
import "./widgetSm.css"
import { QrCode, CropFree } from '@mui/icons-material';
import { getListUser } from "../../../api/admin/statusApi";

export default function WidgetSm() {
    const today = new Date()
    const year = today.getFullYear()
    const month = ("0"+ (today.getMonth() + 1)).slice(-2)
    const day = ("0"+ today.getDate()).slice(-2)
    const formattedDate = `${year}-${month}-${day}`
    const [userList, setUserList] = useState([])

    useEffect(() => {
        getListUser(formattedDate).then(res => {
            setUserList(res)
          }).catch((error) => console.error("ERROR!", error))
    }, [])
  
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">최근 가입 회원</span>
        <ul className="widgetSmList">
            {userList && userList.map((user, i) => (
                <li key={i} className="widgetSmListItem">
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">{user.user_name}</span>
                        <span className="widgetSmUserTitle">{user.email}</span>
                    </div>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserTitle">{user.join_date.substring(0, 10)}</span>
                    </div>
                    <div className="widgetSmUser">
                        {user.qr_code?
                        <CropFree className="widgetSmIcon" /> : <QrCode className="widgetSmIcon" />}
                    </div>
                </li>
            ))}            
        </ul>
    </div>
  )
}
