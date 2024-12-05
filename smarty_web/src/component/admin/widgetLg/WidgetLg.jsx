import { useEffect, useState } from "react"
import { getPaymentAll } from "../../../api/admin/statusApi"
import "./widgetLg.css"

export default function WidgetLg() {
    const [itemList, setItemList] = useState([])

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }

    useEffect(() => {
        getPaymentAll().then(e => {
            console.log(e)
            setItemList(e)
        })
    }, [])


    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">최근 결제 내역</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">결제내역</th>
                        <th className="widgetLgTh">사용자</th>
                        <th className="widgetLgTh">결제일</th>
                        <th className="widgetLgTh">결제금액</th>
                        {/* <th className="widgetLgTh">Status</th> */}
                    </tr>
                </thead>
                <tbody style={{ tableLayout: 'fixed' }}>
                    {itemList.map(item => (
                        <tr key={item.user_id} className="widgetLgTr">
                            <td className="widgetLgUser">
                                {/* <img 
                        src="https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505_640.jpg" 
                        alt="" 
                        className="widgetLgImg" 
                        /> */}
                                <span className="widgetLgName">{item.reservation_id ? item.facility_name : item.enrollment_id ? item.class_name : item.product_name}</span>
                            </td>
                            <td className="widgetLgTr">{item.user_id}</td>
                            <td className="widgetLgDate">{item.payment_date}</td>
                            <td className="widgetLgAmount">{item.amount}</td>
                            {/* <td className="widgetLgStatus">
                    <Button type="Approved"/>
                    </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}