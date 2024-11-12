import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./dashboard.css"
import {userData} from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Layout from "../../layout/Layout";

export default function Dashboard() {
  return (
    <Layout>      
      <div className="home">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" dataKey="uv" grid />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
      </div>
    </Layout>
  )
}
