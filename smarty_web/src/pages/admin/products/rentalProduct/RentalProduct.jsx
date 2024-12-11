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

export const RentalProduct = ({ facilityId, onDataReload }) => {
  const [graphData, setGraphData] = useState(null);
  const [rawData, setRawData] = useState([]);

  const fetchGraphData = async () => {
    try {
      const data = await getRentalStatistic(facilityId);
      setRawData(data);

      const labels = data.map(
        (item) =>
          `${item.product_name}${item.size ? ` (${item.size})` : ""}`
      );

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

      const remainingPercentage = data.map((item, index) =>
        100 - (rentedPercentage[index] + unavailablePercentage[index])
      );

      setGraphData({
        labels,
        datasets: [
          {
            label: "대여량",
            data: rentedPercentage,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "대여불가량",
            data: unavailablePercentage,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
          {
            label: "남은 수량",
            data: remainingPercentage,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    } catch (error) {
      console.error("그래프 데이터 로드 실패:", error.message);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [facilityId]);

  // 데이터 로드 함수 전달
  useEffect(() => {
    if (onDataReload) {
      onDataReload(() => fetchGraphData()); // 콜백 함수로만 전달
    }
  }, [onDataReload]); // 종속성 배열이 올바르게 설정되었는지 확인
  
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
