import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getPieChartData } from '../../api/pythonApi';

function PieChart() {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'pie',
        },
        title: {
            text: '시설별 예약 비율',
        },
        tooltip: {
            pointFormatter: function() {
                return `건수: ${this.total_reservations}`;
            },
        },
        series: [{
            name: '비율',
            data: [],
        }],
    });

    useEffect(() => {
        getPieChartData().then((response) => {
            const { user_name, data } = response; // user_name과 data 추출

            const chartData = data.map(item => ({
                name: item.category,
                y: item.percentage,
                total_reservations: item.total_reservations
            }));

            setChartOptions({
                ...chartOptions,
                title: {
                    text: `${user_name}의 시설별 예약 비율`
                },
                series: [{
                    name: '비율',
                    data: chartData,
                }],
            });
        });
    }, []);

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default PieChart;
