import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { getLineChartData } from '../../api/pythonApi';

HighchartsAccessibility(Highcharts);  // 접근성 모듈 활성화

  function LineChart({ queryDate }) {  // 날짜를 prop으로 받아옵니다
    const [chartOptions, setChartOptions] = useState({
      chart: {
        type: 'line',
      },
      title: {
        text: '수익 차트',  // 제목 초기값
      },
      xAxis: {
        categories: [],  // x축은 시설명
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          formatter: function() {
            return this.value / 10000 + '만원';  // Y축 라벨을 만원 단위로 표시
          },
        },
        tickInterval: 50000,  // Y축 눈금을 5만원 단위로 고정
        min: 0,               // 최소값을 0으로 고정
        endOnTick: false,      // Y축 값이 딱 맞게 끝나지 않도록 설정
        maxPadding: 0.1,       // 데이터가 Y축 끝에 붙지 않도록 여백 설정
      },
      series: [{
        name: '수익',   // 시리즈 이름
        data: [],      // y축 데이터 (수입 값)
      }],
      accessibility: {
        enabled: false,  // 접근성 경고 제거
      },
    });

    useEffect(() => {
      getLineChartData(queryDate).then((response) => {
        console.log(response.data);  // 데이터 확인
    
        const labels = response.data.map(item => item.facility_name);  // x축 카테고리
        const values = response.data.map(item => item.total_income);   // y축 데이터
    
        setChartOptions(prevOptions => ({
          ...prevOptions,
          title: {
            text: `시설별 ${response.date} 수익`,
          },
          xAxis: {
            categories: labels,  
          },
          series: [{
            name: '총액',
            data: values,  
          }],
        }));
      }).catch(error => {
        console.error('Error fetching line chart data:', error);
      });
    }, [queryDate]);

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
  }

  export default LineChart;
