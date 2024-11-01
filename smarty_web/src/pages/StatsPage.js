import React, { useState } from 'react';
import BarChart from '../chart_components/BarChart';
import LineChart from '../chart_components/LineChart';
import PieChart from '../chart_components/PieChart';
import DailyScheduler from '../chart_components/DailyScheduler';
import DateHandler from '../handler/DateHandler';  // 날짜 핸들러 컴포넌트 임포트
import FacilitiesHandler from '../handler/FacilitiesHandler';  // 시설 선택 핸들러
import RentalStatisticsChart from '../chart_components/RentalStatisticsChart';
import PersonallyChart from '../chart_components/PersonallyChart';

function StatsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);  // 오늘 날짜를 기본값으로 설정
  const [selectedFacility, setSelectedFacility] = useState('');
  const [facilityName, setFacilityName] = useState('');

  const handleFacilityChange = (facilityId, facilityName) => {
    setSelectedFacility(facilityId);  // 시설 ID 업데이트
    setFacilityName(facilityName);  // 시설 이름 업데이트
  };

  return (
    <>
      <div>
        <h1>통계 페이지</h1>
        
        {/* 날짜 선택 */}
        <DateHandler selectedDate={selectedDate} onDateChange={setSelectedDate} /> 

        {/* 시설 선택 */}
        <FacilitiesHandler 
        selectFacility={selectedFacility} 
        onFacilityChange={(facilityName) => handleFacilityChange(facilityName, facilityName)}  // facility_name 전달
        />

        {/* 차트 컴포넌트들 */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
          <div style={{ width: '50%' }}>
            <BarChart queryDate={selectedDate} />
          </div>
          <div style={{ width: '50%' }}>
            <LineChart queryDate={selectedDate} />
          </div>
          
        </div>
      </div>

      <div>
      {/* <h2>시설별 예약 스케줄</h2> */}
      <DailyScheduler 
        selectedFacility={selectedFacility} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        facilityName={facilityName}  // 시설 이름 전달
        />
      </div>
      <div>
        {/* <h2>시설별 물품 대여 현황</h2> */}
          <RentalStatisticsChart selectedDate={selectedDate} facilityName={selectedFacility} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>

        <div style={{ width: '50%' }}>
            <PieChart queryDate={selectedDate} />
        </div>
        <div style={{ width: '50%' }}>
        <PersonallyChart />
          </div>
        </div>
    </>
  );
}

export default StatsPage;
