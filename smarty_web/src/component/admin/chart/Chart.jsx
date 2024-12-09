import React, { useState, useEffect } from 'react';
import "./chart.css";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDailyReservation } from '../../../api/admin/chartApi';

export default function Chart({ title, dataKey, grid }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyReservation();
        setData(result);
      } catch (error) {
        console.error("차트 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="reservation_date" stroke="#8884d8" /> {/* X축 키 설정 */}
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
