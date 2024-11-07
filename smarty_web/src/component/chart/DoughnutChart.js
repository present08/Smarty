import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, } from 'chart.js';

// 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ currentUser }) => {
    const data = {
        labels: ['수영장', '골프장', '배구', '배드민턴', '농구'],
        datasets: [
            {
                label: '이용횟수',
                data: [1, 3, 2, 4, 5],
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
                text: '총 이용 횟수',
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
