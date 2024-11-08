import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { sendScheduleData } from '../../api/pythonApi';

function DailyScheduler({ selectedFacility, selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 에러 상태 관리

  useEffect(() => {
    if (selectedFacility && selectedDate) {
      setLoading(true);  // 데이터를 요청할 때 로딩 상태로 설정
      setError(null);  // 기존 에러 상태 초기화

      // 선택한 시설 ID와 날짜를 Python 서버로 전송하여 예약 데이터를 받아옴
      sendScheduleData(selectedFacility, selectedDate)
        .then(response => {
          console.log("Received schedule data:", response.data);

          const { courts } = response.data;
          setData(courts);  // 받아온 코트별 데이터를 테이블에 사용
        })
        .catch(error => {
          console.error('스케줄 데이터를 가져오는 중 오류 발생:', error);
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
        })
        .finally(() => {
          setLoading(false);  // 데이터 요청이 끝나면 로딩 상태 종료
        });
    }
  }, [selectedFacility, selectedDate]);

  if (loading) {
    return <div>로딩 중입니다...</div>;  // 로딩 상태 표시
  }

  if (error) {
    return <div>{error}</div>;  // 에러 상태 표시
  }

  // 모든 코트의 고유 이름을 가져옵니다
  const uniqueCourts = [...new Set(data.map((court) => court.court_name))];

  // 시간 슬롯을 기준으로 데이터를 세로줄로 맞추기 위해 시간별 데이터를 그룹화
  const groupedData = {};
  data.forEach((court) => {
    const { time_slot, court_name, status, user_id } = court;
    if (!groupedData[time_slot]) {
      groupedData[time_slot] = {};
    }
    groupedData[time_slot][court_name] = {
      status,
      user: user_id || 'None'  // 예약 유저가 없으면 'None'
    };
  });

  // 테이블에 사용할 데이터 구조로 변환
  const tableData = Object.keys(groupedData).map((timeSlot, index) => {
    const row = { key: index, time_slot: timeSlot };
    uniqueCourts.forEach((court) => {
      const courtData = groupedData[timeSlot][court] || { status: 'Available', user: 'None' };
      row[court] = `${courtData.status} (${courtData.user})`;  // 예약 상태와 유저를 함께 표시
    });
    return row;
  });

  // 각 코트를 열로 만드는 테이블 컬럼 정의
  const columns = [
    {
      title: 'Time Slot',
      dataIndex: 'time_slot',
      key: 'time_slot',
      fixed: 'left',  // 시간 슬롯을 왼쪽에 고정
    },
    ...uniqueCourts.map((court) => ({
      title: court,
      dataIndex: court,
      key: court,
      render: (text) => {
        const [status, user] = text.split(' ');
        const displayStatus = status === 'Reserved' ? '예약 불가' : '예약 가능';  // 상태를 번역하여 표시
        return (
          <>
            <Tag color={status === 'Reserved' ? 'red' : 'green'}>
              {displayStatus}  {/* 번역된 상태를 태그에 출력 */}
            </Tag>
            <div>{user}</div>
          </>
        );
      },
    })),
  ];

  return (
    <div >
      <h2>{selectedDate} {selectedFacility} 예약 스케줄</h2>

      <Table 
        columns={columns} 
        dataSource={tableData}  // 서버에서 받아온 데이터 반영
        rowKey="time_slot"  // 시간대를 키로 사용
        pagination={false}
        bordered  // 테이블에 테두리 표시
        scroll={{ x: 'max-content' }}  // 가로 스크롤 허용
      />
    </div>
  );
}

export default DailyScheduler;

