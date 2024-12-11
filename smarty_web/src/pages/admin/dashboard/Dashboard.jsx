import "./dashboard.css"
import FeaturedInfo from './../../../component/admin/featuredInfo/FeaturedInfo';
import Chart from './../../../component/admin/chart/Chart';
import WidgetSm from './../../../component/admin/widgetSm/WidgetSm';
import WidgetLg from './../../../component/admin/widgetLg/WidgetLg';
import { useEffect, useState } from "react";
import { EnrollmentInfo } from "../../../component/admin/enrollmentInfo/EnrollmentInfo";

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const monthsInKorean = [
      "1월", "2월", "3월", "4월", "5월", "6월", 
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];
    const date = new Date();
    const month = date.getMonth();
    setCurrentMonth(monthsInKorean[month]);
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <div className="dashboard-container">
        <div style={{ flex: 7 }}>
          <Chart
            title={`${currentMonth} 시설 예약 현황`}
            dataKey="reservation_count"
            grid
          />
        </div>
        <div style={{ flex: 3 }}>
          <EnrollmentInfo />
        </div>
      </div>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
