import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList, getUserReservationList } from '../../api/facilityApi'; // API Helper Import
import '../../css/facilitySelect.css';

const FacilitySelect = ({ selectedFacility, handleChangeRental }) => {
    const [facility, setFacility] = useState([]); // 시설 목록
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilities = async () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(isLoggedIn);

            if (!isLoggedIn) {
                // 비로그인: 모든 시설 표시
                try {
                    const facilities = await getList();
                    setFacility(facilities);
                } catch (error) {
                    console.error('전체 시설 목록 로드 실패:', error);
                }
            } else {
                // 로그인: 예약한 시설만 표시
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    alert('로그인 정보가 잘못되었습니다. 다시 로그인해주세요.');
                    navigate('/user/login');
                    return;
                }

                const user = JSON.parse(userStr);
                try {
                    const reservedFacilities = await getUserReservationList(user.user_id);
                    setFacility(reservedFacilities);
                } catch (error) {
                    console.error('예약한 시설 목록 로드 실패:', error);
                }
            }
        };

        fetchFacilities();
    }, [navigate]);

    const handleMyRental = () => {
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }

        navigate('/rentals/list');
    };

    const handleMyCart = () => {
        navigate('/cart')
    }

    return (
        <div className='facility-select-container'>
            <div className="select-button-group">
                <select
                    name="facility_id"
                    value={selectedFacility}
                    onChange={handleChangeRental}
                    className="select-style"
                >
                    <option value="">
                        {isLoggedIn ? '예약한 시설을 선택하세요' : '시설을 선택하세요'}
                    </option>
                    {facility.map(item => (
                        <option key={item.facility_id} value={item.facility_id}>
                            {item.facility_name}
                        </option>
                    ))}
                </select>
                {isLoggedIn && (
                    <div>
                    <button onClick={handleMyCart}>
                        장바구니
                    </button>
                    <button
                        className="rental-button"
                        onClick={handleMyRental}
                    >
                        내 대여 목록
                    </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacilitySelect;
