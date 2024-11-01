import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getBarChartData } from '../api/pythonApi';

function BarChart() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
    },
    title: {
      text: '강좌별 수강 인원',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: '총원',  // Y축 제목을 "명"으로 설정
      },
    },
    series: [{
      name: '인원 수',
      data: [],
    }],
  });

  useEffect(() => {
    getBarChartData().then((data) => {
      const labels = data.map(item => item.class_name);
      const values = data.map(item => item.user_count);

      setChartOptions({
        ...chartOptions,
        xAxis: {
          categories: labels,
        },
        series: [{
          name: '인원 수',
          data: values,
        }],
      });
    });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default BarChart;
