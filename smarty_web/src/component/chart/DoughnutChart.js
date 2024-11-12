import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ usageData, facilities }) => { // usageData와 facilities를 props로 받음
    const data = {
        labels: facilities, // 시설 이름을 레이블로 사용
        datasets: [
            {
                label: '이용시간 (분)',
                data: usageData, // props로 받은 이용 시간 데이터
                backgroundColor: [
                    '#f0f3ea',
                    '#d5deef',
                    '#b1c9ef',
                    '#8aaee0',
                    '#638ecd',
                    '#395886',
                ],
                borderColor: 'rgba(0, 0, 0, 0)', // 테두리를 투명하게 설정
                borderWidth: 0, // 테두리 두께를 0으로 설정
            },
        ],
    };

    const totalOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10, // 네모 박스의 너비
                },
            },
            title: {
                display: true,
                text: '시설별 총 이용 시간',
                font: {
                    size: 15,
                    weight: 'bold',
                },
                color: '#003f66', // 제목 색상
            },
        },
    };

    return <Doughnut data={data} options={totalOptions} />;
};

export default DoughnutChart;
