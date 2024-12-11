import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { getEnrollment } from "../../../api/admin/chartApi";
import "./enrollmentInfo.css";

export const EnrollmentInfo = () => {
    const [enrollmentData, setEnrollmentData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEnrollment();
                setEnrollmentData(data);
                console.log(data);
            } catch (error) {
                console.error("수강 데이터를 가져오는데 실패했습니다: ", error);
            }
        };
        fetchData();
    }, []);

    if (!enrollmentData.length) {
        return <div>데이터 로딩중...</div>;
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { class_name, user_count } = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p><strong>{class_name}</strong></p>
                    <p>수강 인원: {user_count}명</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="enrollment-container">
            <h3 className="chartTitle">강의별 이용현황</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={enrollmentData}
                        layout="vertical"
                        barCategoryGap={10} // 막대 간격 조정
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="class_name"/>
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="user_count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};