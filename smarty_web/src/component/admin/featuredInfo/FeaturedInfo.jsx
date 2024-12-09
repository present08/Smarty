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
        return <div>데이터 로딩중 ....</div>
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
                <span className="featuredTitle">금일 수익</span>
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
                            "데이터 없음"
                        )}
                    </span>
                </div>
                <div className="featuredSub">전일 대비 변화율</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">전일 수익</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{yesterday_income.toFixed(2)}원</span>
                 {/*    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span> */}
                </div>
                <div className="featuredSub">전일 총 수익</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">월간 평균 수익</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{monthly_average_income.toFixed(2)}원</span>
{/*                     <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span> */}
                </div>
                <div className="featuredSub">이번 달 일평균 수익</div>
            </div>
        </div>
    )
}
