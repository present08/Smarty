import React, { useState, useEffect } from 'react';
import { fetchFacilities } from '../api/intellijApi';  // Spring Boot API 호출 함수 가져오기

function FacilitiesHandler({ selectFacility, onFacilityChange }) {
    const [facilities, setFacilities] = useState([]);

    // 시설 목록 가져오기
    useEffect(() => {
        fetchFacilities()
            .then(response => {
                setFacilities(response.data);  // 시설 목록 설정
            })
            .catch(error => {
                console.error("시설 목록을 불러오는 중 문제가 발생했습니다.", error);
            });
    }, []);
    
    return (
        <div>
            <h3>시설을 선택하세요</h3>
            <select value={selectFacility} onChange={(e) => {
                const selectedOption = facilities.find(f => f.facility_name === e.target.value);  // 시설 이름으로 찾음
                if (selectedOption) {
                    onFacilityChange(selectedOption.facility_name, selectedOption.facility_name);  // facility_name을 보냄
                }
            }}>
                <option value="">시설을 선택하세요</option>
                {facilities.map(facility => (
                    <option key={facility.facility_name} value={facility.facility_name}>
                        {facility.facility_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FacilitiesHandler;
