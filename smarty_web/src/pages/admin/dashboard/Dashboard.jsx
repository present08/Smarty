import "./dashboard.css"
import FeaturedInfo from './../../../component/admin/featuredInfo/FeaturedInfo';
import Chart from './../../../component/admin/chart/Chart';
import { userData } from './../../../component/admin/dummyData';
import WidgetSm from './../../../component/admin/widgetSm/WidgetSm';
import WidgetLg from './../../../component/admin/widgetLg/WidgetLg';

export default function Dashboard() {
  return (    
      <div className="home">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" dataKey="uv" grid />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
      </div>
  )
}
