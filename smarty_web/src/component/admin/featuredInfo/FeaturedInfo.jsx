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
        return <div>데이터 로딩중 ....</div>;
    }

    const {
        yesterday_income,
        today_income,
        change_ratio,
        total_monthly_income,
        monthly_average_income,
    } = incomeData;

    const formatPercentage = (value) => {
        if (value === "N/A" || value === null || value === undefined) {
            return "데이터 없음";
        }
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) ? `${numericValue.toFixed(2)}%` : "데이터 없음";
    };

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">전일 수익</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{yesterday_income}원</span>
                </div>
                <div className="featuredSub">전일 총 수익</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">금일 수익</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{today_income}원</span>
                </div>

                <div className="featuredSub">전일 대비 변화율</div>

                <div className="featuredMoneyRate">
                    {change_ratio !== "N/A" ? (
                        <>
                            {formatPercentage(change_ratio)}{" "}
                            {parseFloat(change_ratio) >= 0 ? (
                                <ArrowUpward className="featuredIcon" />
                            ) : (
                                <ArrowDownward className="featuredIcon negative" />
                            )}
                        </>
                    ) : (
                        "데이터 없음"
                    )}
                </div>

            </div>

            <div className="featuredItem">
                <span className="featuredTitle">월 총 수익</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{total_monthly_income}원</span>
                </div>
                <div className="featuredSub">월 평균 수익</div>
                <div className="featuredMoneyRate">{monthly_average_income}원</div>
            </div>
        </div>
    );
}
