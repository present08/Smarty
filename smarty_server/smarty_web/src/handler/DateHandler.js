import React from 'react';

function DateHandler({ selectedDate, onDateChange }) {
  // 날짜 변경 시 날짜 형식을 `YYYY-MM-DD`로 맞춤
  const handleChange = (e) => {
    const selected = e.target.value;
    const formattedDate = new Date(selected).toISOString().split('T')[0];  // 날짜를 'YYYY-MM-DD'로 포맷팅
    onDateChange(formattedDate);  // 선택된 날짜를 상위 컴포넌트에 전달
  };

  return (
    <div>
      <h3>날짜를 선택하세요:</h3>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleChange} 
        max={new Date().toISOString().split('T')[0]}  // 미래 날짜 선택 방지
      />
    </div>
  );
}

export default DateHandler;
