import React, { useState, useEffect } from "react";
import "./chart.css";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getDailyReservation } from "../../../api/admin/chartApi";
import { getListFacility } from "../../../api/admin/facilityApi";

export default function Chart({ title, grid }) {
  const [data, setData] = useState([]);
  const [facilityColors, setFacilityColors] = useState({});
  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const facilities = await getListFacility();
        const colors = {};

        // 시설별 랜덤 색상 생성
        facilities.forEach((facility) => {
          if (!colors[facility.facility_name]) {
            colors[facility.facility_name] = generateRandomColor();
          }
        });

        setFacilityColors(colors); // 시설 이름별 색상 저장
      } catch (error) {
        console.error("시설 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyReservation();

        // details 배열의 예약 수를 합산하여 새로운 필드 추가
        const transformedData = result.map(item => ({
          ...item,
          total_count: item.details.reduce((acc, curr) => acc + curr.reservation_count, 0)
        }));

        setData(transformedData);
      } catch (error) {
        console.error("차트 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const details = payload[0]?.payload?.details || [];
      console.log("Tooltip details:", details); // 확인
      return (
        <div className="custom-tooltip">
          <p className="label">시설별 이용현황</p>
          <p ckassName="detail">시설명 (건)</p>
          <ul>
            {details.map((item, index) => (
              <li
                key={index}
                style={{ color: facilityColors[item.facility_name] || "#000" }}
              >
                <strong>{item.facility_name}:</strong> {item.reservation_count}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="reservation_date" stroke="#8884d8"  interval="preserveStartEnd"/>
          <Line type="monotone" dataKey="total_count" stroke="#82ca9d" />
          <Tooltip content={<CustomTooltip />} />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
