import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ usageData, facilities }) => {

    const data = {
        labels: facilities,
        datasets: [
            {
                label: '이용횟수',
                data: usageData,
                backgroundColor: ['#d5deef'],
                hoverBackgroundColor: ['#395886'],
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 30,
                    boxHeight: 10,
                },
            },
            title: {
                display: true,
                text: '시설별 이용 횟수',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#003f66',
                align: 'start',
                padding: {
                    bottom: 15,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
