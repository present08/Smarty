import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getRentalStatistics } from '../api/pythonApi';

const RentalStatisticsChart = ({ selectedDate, facilityName }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (selectedDate && facilityName) {
            getRentalStatistics(selectedDate, facilityName).then(responseData => {
                const transformedData = responseData.map(item => ({
                    displayName: item.index,  // JSON 응답에서 'index' 필드를 displayName으로 사용
                    totalStock: item.total_stock,
                    rentedQuantity: item.rented_quantity,
                    remainingQuantity: item.total_stock - item.rented_quantity  // 남은 수량 계산
                }));
                console.log("Transformed Data:", transformedData);  // 콘솔에 출력하여 확인
                setData(transformedData);
            }).catch(error => {
                console.error("Error fetching rental statistics data:", error);
            });
        }
    }, [selectedDate, facilityName]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1200px', height: '500px' }}>
            <h2>{selectedDate} {facilityName} 물품 대여 현황</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="displayName" />
                    
                    {/* 툴팁 설정 */}
                    <Tooltip 
                        content={({ payload, label }) => {
                            if (payload && payload.length) {
                                const { totalStock, rentedQuantity, remainingQuantity } = payload[0].payload;
                                return (
                                    <div style={{ backgroundColor: "white", border: "1px solid #ccc", padding: "10px" }}>
                                        전체수량: {totalStock} <br />
                                        대여량: {rentedQuantity} <br />
                                        남은수량: {remainingQuantity}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    
                    {/* Legend 순서 변경: 전체 수량이 대여량 앞에 표시되도록 설정 */}
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" payload={[
                        { value: "전체 수량", type: "square", id: "ID01", color: "#8884d8" },
                        { value: "대여량", type: "square", id: "ID02", color: "#82ca9d" }
                    ]} />

                    {/* 전체 수량을 하나의 막대로 설정하고, 대여량이 아래에서부터 채워지도록 설정 */}
                    <Bar dataKey="rentedQuantity" stackId="a" fill="#82ca9d" name="대여량"  barSize={70}/>
                    <Bar dataKey="remainingQuantity" stackId="a" fill="#8884d8" name="전체 수량"  barSize={70}/>
                </BarChart>
            </ResponsiveContainer>
            </div>
            </div>
    );
};

export default RentalStatisticsChart;
