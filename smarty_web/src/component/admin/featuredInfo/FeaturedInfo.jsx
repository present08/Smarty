import { useEffect, useState } from "react";
import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { getIncomeComparison } from "../../../api/admin/chartApi";

export default function FeaturedInfo() {
    const [incomeData, setIncomeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIncomeComparison();
                setIncomeData(data);
            } catch (error) {
                console.error("데이터를 가져오는데 실패했습니다. : ", error);
            }
        };
        fetchData();
    }, []);

    if (!incomeData) {
        return <div>로딩중 ....</div>
    }

    const {
        yesterday_income,
        today_income,
        change_ratio,
        monthly_average_income,
    } = incomeData;

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Today's Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{today_income.toFixed(2)}원</span>
                    <span className="featuredMoneyRate">
                        {change_ratio !== null ? (
                            <>
                                {change_ratio.toFixed(1)}{" "}
                                {change_ratio >= 0 ? (
                                    <ArrowUpward className="featuredIcon" />
                                ) : (
                                    <ArrowDownward className="featuredIcon negative" />
                                )}
                            </>
                        ) : (
                            "No data"
                        )}
                    </span>
                </div>
                <div className="featuredSub">Compared to yesterday</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Yesterday's Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{yesterday_income.toFixed(2)}원</span>
                 {/*    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span> */}
                </div>
                <div className="featuredSub">Total revenue yesterday</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Monthly Avg Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{monthly_average_income.toFixed(2)}원</span>
{/*                     <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span> */}
                </div>
                <div className="featuredSub">Average daily revenue this month</div>
            </div>
        </div>
    )
}
