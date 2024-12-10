import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./rentalProduct.css";
import { getRentalStatistic } from "../../../../api/admin/chartApi";

// Chart.js 필수 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RentalProduct = ({ facilityId }) => {
  const [graphData, setGraphData] = useState(null);
  const [rawData, setRawData] = useState([]); // 원본 데이터 저장

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRentalStatistic(facilityId);
        console.log("[Info] Fetched Data:", data);
        setRawData(data); // 원본 데이터를 저장

        // 라벨: 상품명 + 사이즈 포함
        const labels = data.map(
          (item) =>
            `${item.product_name}${item.size ? ` (${item.size})` : ""}`
        );

        // 상태별 데이터 계산
        const rentedPercentage = data.map((item) =>
          item.total_stock > 0
            ? (item.rented_quantity / item.total_stock) * 100
            : 0
        );
        const unavailablePercentage = data.map((item) =>
          item.total_stock > 0
            ? (item.unavailable_quantity / item.total_stock) * 100
            : 0
        );
        const remainingPercentage = data.map((item) =>
          item.total_stock > 0
            ? 100 -
              ((item.rented_quantity + item.unavailable_quantity) /
                item.total_stock) *
                100
            : 0
        );

        setGraphData({
          labels,
          datasets: [
            {
              label: "대여량",
              data: rentedPercentage,
              backgroundColor: "rgba(54, 162, 235, 0.6)", // 파란색
            },
            {
              label: "대여불가량",
              data: unavailablePercentage,
              backgroundColor: "rgba(255, 99, 132, 0.6)", // 빨간색
            },
            {
              label: "남은 수량",
              data: remainingPercentage,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // 녹색
            },
          ],
        });
      } catch (error) {
        console.error("[Error] Failed to fetch rental statistics:", error);
      }
    };

    fetchData();
  }, [facilityId]);

  if (!graphData) return <div>Loading...</div>;

  return (
    <div
      className="rental-product-chart"
      style={{
        height: `${Math.max(400, rawData.length * 50)}px`, // 데이터 항목 수에 따라 동적 높이
      }}
    >
      <Bar
        data={graphData}
        options={{
          indexAxis: "y", // 가로형 차트
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const rawItem = rawData[context.dataIndex];
                  let value = 0;
                  if (context.datasetIndex === 0) value = rawItem.rented_quantity || 0;
                  if (context.datasetIndex === 1) value = rawItem.unavailable_quantity || 0;
                  if (context.datasetIndex === 2)
                    value =
                      rawItem.total_stock -
                      (rawItem.rented_quantity || 0) -
                      (rawItem.unavailable_quantity || 0);
                  return `${context.dataset.label}: ${value}개`;
                },
              },
            },
            title: {
              display: true,
              text: `시설 ${facilityId}의 물품 상태 (100% 기준)`,
            },
          },
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
              max: 100, // 항상 100% 기준
              ticks: {
                callback: (value) => `${value}%`, // x축 퍼센트 표시
              },
            },
            y: {
              stacked: true,
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
