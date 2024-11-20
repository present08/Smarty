import "./featuredInfo.css";
import { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo() {
  const [incomeData, setIncomeData] = useState({
    yesterday_income: 125000, // 어제 수입 더미 데이터 (125,000원)
    today_income: 150000, // 오늘 수입 더미 데이터 (150,000원)
    change_ratio: 20.0, // 어제 대비 상승/하락 비율 더미 데이터 (20% 상승)
    monthly_average_income: 135000, // 월 평균 일 수입 더미 데이터 (135,000원)
  });

  // 실제 Flask API 통신 부분은 주석 처리
  /*
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/income-comparison");
        setIncomeData(response.data);
      } catch (error) {
        console.error("수익 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchIncomeData();
  }, []);
  */

  return (
    <div className="featured">
      {/* 어제 수입 */}
      <div className="featuredItem">
        <span className="featuredTitle">어제 수입</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomeData.yesterday_income.toLocaleString()}원</span>
        </div>
        <div className="featuredSub">어제의 총 수익</div>
      </div>

      {/* 오늘 수입 */}
      <div className="featuredItem">
        <span className="featuredTitle">오늘 수입</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomeData.today_income.toLocaleString()}원</span>
          <span
            className="featuredMoneyRate"
            style={{
              color: incomeData.change_ratio > 0 ? "red" : incomeData.change_ratio < 0 ? "blue" : "black",
            }}
          >
            {incomeData.change_ratio !== null ? (
              <>
                {incomeData.change_ratio.toFixed(2)}%
                {incomeData.change_ratio > 0 ? (
                  <ArrowUpward className="featuredIcon" />
                ) : (
                  <ArrowDownward className="featuredIcon negative" />
                )}
              </>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="featuredSub">어제와 비교</div>
      </div>

      {/* 월 평균 일 수입 */}
      <div className="featuredItem">
        <span className="featuredTitle">월 평균 일 수입</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomeData.monthly_average_income.toLocaleString()}원</span>
        </div>
        <div className="featuredSub">이번 달 하루 평균 수익</div>
      </div>
    </div>
  );
}