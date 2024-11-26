import React, { useEffect } from 'react'
import '../../css/facilitySelect.css'
import { useLocation, useNavigate } from 'react-router-dom'

const FacilitySelect = ({ facility, selectedFacility, handleChangeRental, filteredProducts }) => {
    const navigate = useNavigate();
    const location = useLocation();

     // 내 대여 목록 버튼 클릭 시에만 로그인 체크
    const handleMyRental = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userStr = localStorage.getItem('user');
      
      if (isLoggedIn !== 'true' || !userStr) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/user/login');
          return;
      }

      navigate('/mypage/rentals');
  };

    return (
        <div className='facility-select-container'>
            <div className="select-button-group">
                <select 
                    name="facility_id"
                    value={selectedFacility}
                    onChange={handleChangeRental}
                    className="select-style"
                >
                    <option value="">시설을 선택하세요</option>
                    {facility.map(item => (
                        <option key={item.facility_id} value={item.facility_id}>
                            {item.facility_name}
                        </option>
                    ))}
                </select>
                <button 
                    className="rental-button"
                    onClick={handleMyRental}
                >
                    내 대여 목록
                </button>
            </div>
        </div>
    );
};

export default FacilitySelect;