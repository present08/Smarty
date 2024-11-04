import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getPersonallyData } from '../../api/pythonApi';

// Chart.js의 필요한 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const PersonallyChart = () => {
    const [chartData, setChartData] = useState({});
    const [userName, setUserName] = useState(''); // 유저 이름 상태 추가
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPersonallyData();
                if (data && data.length > 0) {
                    // 유저 이름이 포함된 데이터를 가정하여 첫 번째 항목의 유저 이름을 가져옴
                    setUserName(data[0].user_name); // 유저 이름 저장

                    // 날짜 형식에서 시간 부분 제거
                    const formattedLabels = data.map(item => item.date.split("T")[0]);

                    setChartData({
                        labels: formattedLabels,
                        datasets: [
                            {
                                label: '대여 횟수',
                                data: data.map(item => item.total_rentals),
                                backgroundColor: 'rgba(135, 206, 250, 0.7)',  // 파란색
                                yAxisID: 'y', // 첫 번째 Y축
                            },
                            {
                                label: '예약 횟수',
                                data: data.map(item => item.total_reservations),
                                backgroundColor: 'rgba(255, 99, 132, 0.7)',  // 빨간색
                                yAxisID: 'y', // 첫 번째 Y축
                            },
                            {
                                label: '총 이용 시간',
                                data: data.map(item => item.total_usage_hours),
                                type: 'line',
                                borderColor: 'green',
                                backgroundColor: 'green',
                                borderDash: [5, 5], // 점선 스타일
                                fill: false,
                                pointStyle: 'circle',
                                pointBackgroundColor: 'green',
                                yAxisID: 'y1', // 두 번째 Y축
                            }
                        ],
                    });
                } else {
                    console.warn("데이터가 비어 있습니다.");
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${userName}의 대여, 예약 횟수 및 총 이용 시간`,
                font: {
                    size: 24 // 타이틀 글씨 크기 설정
                },
            },
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: '횟수',
                },
                ticks: {
                    display: false, // 왼쪽 Y축 수치 제거
                },
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: '총 이용 시간',
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    display: false, // 오른쪽 Y축 수치 제거
                },
            },
        },
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '600px', height: '400px' }}>
            <Bar data={chartData} options={options} />
            </div>
            </div>
    );
};

export default PersonallyChart;
